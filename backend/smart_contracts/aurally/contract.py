import beaker as B
import pyteal as P

from smart_contracts.aurally.boxes import (
    ArtNFT,
    ArtAuctionItem,
    AurallyCreative,
    AurallyToken,
    Event,
    EventTicket,
    Proposal,
    SoundNFT,
)
from .states import AppState

app = B.Application("Aurally", state=AppState()).apply(
    B.unconditional_create_approval, initialize_global_state=True
)


@app.update(authorize=B.Authorize.only_creator(), bare=True)
def update() -> P.Expr:
    return P.Approve()


@app.delete(authorize=B.Authorize.only_creator(), bare=True)
def delete() -> P.Expr:
    return P.Approve()


@app.external
def promote_to_admin(
    txn: P.abi.PaymentTransaction, acc: P.abi.Account, *, output: P.abi.String
):
    from .subroutines import ensure_sender_is_creator, ensure_zero_payment

    return P.Seq(
        ensure_zero_payment(txn),
        ensure_sender_is_creator(txn),
        P.Assert(P.Not(app.state.aurally_admins[acc.address()].exists())),
        (is_admin := P.abi.String()).set("True"),
        app.state.aurally_admins[acc.address()].set(is_admin),
        output.decode(app.state.aurally_admins[acc.address()].get()),
    )


@app.external
def demote_from_admin(
    txn: P.abi.PaymentTransaction, acc: P.abi.Account, *, output: P.abi.String
):
    from .subroutines import ensure_sender_is_creator, ensure_zero_payment

    return P.Seq(
        ensure_zero_payment(txn),
        ensure_sender_is_creator(txn),
        P.Assert(app.state.aurally_admins[acc.address()].exists()),
        (is_admin := P.abi.String()).set("False"),
        app.state.aurally_admins[acc.address()].set(is_admin),
        output.decode(app.state.aurally_admins[acc.address()].get()),
    )


@app.external
def register_creator(
    txn: P.abi.Transaction,
    fullname: P.abi.String,
    username: P.abi.String,
    *,
    output: AurallyCreative,
):
    from .subroutines import create_nft_owner

    return P.Seq(
        P.If(
            P.Not(app.state.aurally_nft_owners[txn.get().sender()].exists()),
            create_nft_owner(txn, fullname, username),
        ),
        output.decode(app.state.aurally_nft_owners[txn.get().sender()].get()),
    )


@app.external
def create_sound_nft(
    txn: P.abi.Transaction,
    nft_name: P.abi.String,
    asset_key: P.abi.String,
    title: P.abi.String,
    label: P.abi.String,
    artist: P.abi.String,
    release_date: P.abi.String,
    genre: P.abi.String,
    price: P.abi.Uint64,
    cover_image_ipfs: P.abi.String,
    audio_sample_ipfs: P.abi.String,
    full_track_ipfs: P.abi.String,
    supply: P.abi.Uint64,
    for_sale: P.abi.Bool,
    aura_asset: P.abi.Asset,
    creator: P.abi.Account,
    *,
    output: SoundNFT,
):
    from .subroutines import (
        ensure_registered_creative,
        increment_creator_nft_count,
        send_aura_token,
    )

    return P.Seq(
        (creative_type := P.abi.String()).set("music"),
        ensure_registered_creative(txn, creative_type),
        P.Assert(P.Not(app.state.sound_nfts[asset_key.get()].exists())),
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.AssetConfig,
                P.TxnField.config_asset_name: nft_name.get(),
                P.TxnField.config_asset_total: supply.get(),
                P.TxnField.config_asset_url: full_track_ipfs.get(),
                P.TxnField.config_asset_manager: txn.get().sender(),
            }
        ),
        (asset_id := P.abi.Uint64()).set(P.InnerTxn.created_asset_id()),
        (owner := P.abi.Address()).set(txn.get().sender()),
        (sound_nft := SoundNFT()).set(
            asset_id,
            asset_key,
            supply,
            title,
            label,
            artist,
            release_date,
            genre,
            price,
            cover_image_ipfs,
            audio_sample_ipfs,
            full_track_ipfs,
            owner,
            for_sale,
        ),
        app.state.sound_nfts[asset_key.get()].set(sound_nft),
        increment_creator_nft_count(owner),
        (aura_amt := P.abi.Uint64()).set(1),
        send_aura_token(owner, aura_amt),
        output.decode(app.state.sound_nfts[asset_key.get()].get()),
    )


@app.external
def create_art_nft(
    txn: P.abi.PaymentTransaction,
    asset_key: P.abi.String,
    nft_name: P.abi.String,
    title: P.abi.String,
    name: P.abi.String,
    supply: P.abi.Uint64,
    description: P.abi.String,
    ipfs_location: P.abi.String,
    price: P.abi.Uint64,
    aura_asset: P.abi.Asset,
    creator: P.abi.Account,
    *,
    output: ArtNFT,
):
    from .subroutines import (
        ensure_registered_creative,
        increment_creator_nft_count,
        ensure_zero_payment,
        send_aura_token,
    )

    return P.Seq(
        ensure_zero_payment(txn),
        P.Assert(
            P.Not(app.state.art_nfts[asset_key.get()].exists()),
            comment="An art NFT with this key already exists",
        ),
        (creative_type := P.abi.String()).set("art"),
        ensure_registered_creative(txn, creative_type),
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.AssetConfig,
                P.TxnField.config_asset_name: nft_name.get(),
                P.TxnField.config_asset_total: supply.get(),
                P.TxnField.config_asset_url: ipfs_location.get(),
                P.TxnField.config_asset_manager: txn.get().sender(),
            }
        ),
        (asset_id := P.abi.Uint64()).set(P.InnerTxn.created_asset_id()),
        (owner := P.abi.Address()).set(txn.get().sender()),
        (sold_price := P.abi.Uint64()).set(0),
        (for_sale := P.abi.Bool()).set(False),
        (art_nft := ArtNFT()).set(
            asset_id,
            asset_key,
            title,
            name,
            supply,
            description,
            ipfs_location,
            price,
            sold_price,
            owner,
            for_sale,
        ),
        app.state.art_nfts[asset_key.get()].set(art_nft),
        increment_creator_nft_count(owner),
        (aura_amt := P.abi.Uint64()).set(1),
        send_aura_token(owner, aura_amt),
        output.decode(app.state.art_nfts[asset_key.get()].get()),
    )


@app.external
def create_art_auction(
    txn: P.abi.PaymentTransaction,
    auction_key: P.abi.String,
    asset_key: P.abi.String,
    min_bid: P.abi.Uint64,
    starts_at: P.abi.Uint64,
    ends_at: P.abi.Uint64,
    *,
    output: ArtAuctionItem,
):
    from .subroutines import create_art_auction, ensure_zero_payment

    return P.Seq(
        P.Assert(
            P.Not(app.state.art_auctions[auction_key.get()].exists()),
            comment="An auction with this key already exists",
        ),
        ensure_zero_payment(txn),
        P.Assert(
            starts_at.get() < ends_at.get(),
            comment="End date must be greater that start date",
        ),
        P.Assert(
            app.state.art_nfts[asset_key.get()].exists(),
            comment="Art NFT with this key was not found",
        ),
        (art_nft := ArtNFT()).decode(app.state.art_nfts[asset_key.get()].get()),
        (art_nft_owner := P.abi.Address()).set(art_nft.owner),
        (nft_name := P.abi.String()).set(art_nft.name),
        P.Assert(
            art_nft_owner.get() == txn.get().sender(),
            comment="Only the owner of this NFT can auction it",
        ),
        create_art_auction(
            txn, auction_key, asset_key, nft_name, min_bid, starts_at, ends_at
        ),
        output.decode(app.state.art_auctions[auction_key.get()].get()),
    )


@app.external
def bid_on_art_auction(
    txn: P.abi.PaymentTransaction,
    auction_key: P.abi.String,
    bid_ammount: P.abi.Uint64,
    *,
    output: ArtAuctionItem,
):
    from .subroutines import perform_auction_bid, ensure_zero_payment

    return P.Seq(
        ensure_zero_payment(txn),
        P.Assert(app.state.art_auctions[auction_key.get()].exists()),
        perform_auction_bid(txn, auction_key, bid_ammount),
        output.decode(app.state.art_auctions[auction_key.get()].get()),
    )


@app.external
def complete_art_auction(
    txn: P.abi.PaymentTransaction, auction_key: P.abi.String, *, output: ArtNFT
):
    from .subroutines import (
        transfer_art_auction_item_to_highest_bidder,
        ensure_zero_payment,
    )

    return P.Seq(
        ensure_zero_payment(txn),
        P.Assert(app.state.art_auctions[auction_key.get()].exists()),
        (auction_item := ArtAuctionItem()).decode(
            app.state.art_auctions[auction_key.get()].get()
        ),
        (nft_key := P.abi.String()).set(auction_item.item_id),
        (auctioneer := P.abi.Address()).set(auction_item.auctioneer),
        P.Assert(auctioneer.get() == txn.get().sender()),
        transfer_art_auction_item_to_highest_bidder(auction_key),
        output.decode(app.state.art_nfts[nft_key.get()].get()),
    )


@app.external
def purchase_nft(
    txn: P.abi.PaymentTransaction,
    optin_txn: P.abi.AssetTransferTransaction,
    asset_key: P.abi.String,
    nft_type: P.abi.String,
    seller: P.abi.Account,
    nft_id: P.abi.Asset,
    aura_id: P.abi.Asset,
    aura_optin_txn: P.abi.AssetTransferTransaction,
    buyer: P.abi.Account,
):
    from .subroutines import transfer_sound_nft, transfer_art_nft

    return P.Seq(
        P.Assert(
            P.Or(nft_type.get() == P.Bytes("sound"), nft_type.get() == P.Bytes("art"))
        ),
        P.If(
            nft_type.get() == P.Bytes("sound"),
            transfer_sound_nft(txn, asset_key),
            transfer_art_nft(txn, asset_key),
        ),
    )


@app.external
def transfer_nft(
    txn: P.abi.PaymentTransaction,
    to: P.abi.Address,
    asset_key: P.abi.String,
    nft_type: P.abi.String,
):
    from .subroutines import (
        validate_and_update_art_nft_owner,
    )

    return P.Seq(
        P.Assert(txn.get().amount() == P.Int(0)),
        P.Assert(
            P.Or(nft_type.get() == P.Bytes("ticket"), nft_type.get() == P.Bytes("art"))
        ),
        P.If(
            nft_type.get() == P.Bytes("art"),
            validate_and_update_art_nft_owner(txn, asset_key, to),
        ),
    )


@app.external
def create_proposal(
    txn: P.abi.PaymentTransaction,
    proposal_key: P.abi.String,
    proposal_detail: P.abi.String,
    *,
    output: Proposal,
):
    from .subroutines import (
        ensure_zero_payment,
        ensure_nft_owner_exists_from_txn,
        ensure_is_admin_or_app_creator,
    )

    return P.Seq(
        (proposal_creator := P.abi.Address()).set(txn.get().sender()),
        ensure_is_admin_or_app_creator(proposal_creator),
        ensure_zero_payment(txn),
        ensure_nft_owner_exists_from_txn(txn),
        P.Assert(
            app.state.active_proposal.get() == P.Bytes("None"),
            comment="There's already an active proposal",
        ),
        P.Assert(
            P.Not(app.state.dao_proposals[proposal_key.get()].exists()),
            comment="Proposal with this key already exists",
        ),
        (yes_votes := P.abi.Uint64()).set(0),
        (no_votes := P.abi.Uint64()).set(0),
        (proposal := Proposal()).set(
            proposal_key, yes_votes, no_votes, proposal_detail
        ),
        app.state.dao_proposals[proposal_key.get()].set(proposal),
        app.state.active_proposal.set(proposal_key.get()),
        output.decode(app.state.dao_proposals[proposal_key.get()].get()),
    )


@app.external
def vote_on_proposal(
    txn: P.abi.PaymentTransaction,
    vote_for: P.abi.Bool,
    aura_id: P.abi.Asset,
    voter: P.abi.Account,
    proposal_key: P.abi.String,
    *,
    output: Proposal,
):
    from .subroutines import (
        ensure_has_auras,
        ensure_zero_payment,
        set_aura_tokens_frozen,
        ensure_auras_frozen_status,
        ensure_proposal_exists,
        ensure_nft_owner_exists_from_txn,
    )

    return P.Seq(
        ensure_nft_owner_exists_from_txn(txn),
        ensure_zero_payment(txn),
        ensure_proposal_exists(proposal_key),
        P.Assert(
            proposal_key.get() == app.state.active_proposal.get(),
            comment="This proposal is currenlty not active",
        ),
        ensure_has_auras(txn),
        (auras_frozen_status := P.abi.Bool()).set(False),
        ensure_auras_frozen_status(txn, auras_frozen_status),
        (proposal := Proposal()).decode(
            app.state.dao_proposals[proposal_key.get()].get()
        ),
        (proposal_id := P.abi.String()).set(proposal.proposal_id),
        (yes_votes := P.abi.Uint64()).set(proposal.yes_votes),
        (no_votes := P.abi.Uint64()).set(proposal.no_votes),
        (details := P.abi.String()).set(proposal.details),
        P.If(
            vote_for.get(),
            yes_votes.set(yes_votes.get() + P.Int(1)),
            no_votes.set(no_votes.get() + P.Int(1)),
        ),
        proposal.set(proposal_id, yes_votes, no_votes, details),
        app.state.dao_proposals[proposal_key.get()].set(proposal),
        auras_frozen_status.set(True),
        set_aura_tokens_frozen(txn, auras_frozen_status),
        ensure_auras_frozen_status(txn, auras_frozen_status),
        output.decode(app.state.dao_proposals[proposal_key.get()].get()),
    )


@app.external
def end_proposal_voting(
    txn: P.abi.PaymentTransaction, proposal_key: P.abi.String, *, output: Proposal
):
    from .subroutines import (
        ensure_is_admin_or_app_creator,
        ensure_proposal_exists,
        ensure_zero_payment,
    )

    return P.Seq(
        ensure_zero_payment(txn),
        (proposal_creator := P.abi.Address()).set(txn.get().sender()),
        ensure_is_admin_or_app_creator(proposal_creator),
        ensure_proposal_exists(proposal_key),
        P.Assert(app.state.active_proposal.get() == proposal_key.get()),
        app.state.active_proposal.set(P.Bytes("None")),
        output.decode(app.state.dao_proposals[proposal_key.get()].get()),
    )


@app.external
def unfreeze_auras(
    txn: P.abi.PaymentTransaction, aura: P.abi.Asset, acc: P.abi.Account
):
    from .subroutines import (
        set_aura_tokens_frozen,
        ensure_auras_frozen_status,
        ensure_zero_payment,
    )

    return P.Seq(
        ensure_zero_payment(txn),
        P.Assert(
            app.state.active_proposal.get() == P.Bytes("None"),
            comment="Cannot unfreeze while a proposal is still active",
        ),
        (auras_frozen_status := P.abi.Bool()).set(False),
        set_aura_tokens_frozen(txn, auras_frozen_status),
        ensure_auras_frozen_status(txn, auras_frozen_status),
    )


@app.external
def create_aura_tokens(*, output: AurallyToken):
    from .subroutines import bootstrap_token

    return P.Seq(
        (token_key := P.abi.String()).set("aura"),
        P.If(
            P.Not(app.state.registered_asa[token_key.get()].exists()),
            P.Seq(
                (total := P.abi.Uint64()).set(1000000000000),
                bootstrap_token(token_key, total),
                P.Assert(app.state.registered_asa[token_key.get()].exists()),
            ),
        ),
        output.decode(app.state.registered_asa[token_key.get()].get()),
    )


@app.external
def create_event(
    txn: P.abi.PaymentTransaction,
    key: P.abi.String,
    name: P.abi.String,
    start_date: P.abi.Uint64,
    end_date: P.abi.Uint64,
    cover_image_ipfs: P.abi.String,
    ticket_price: P.abi.Uint64,
    *,
    output: Event,
):
    from .subroutines import ensure_zero_payment

    return P.Seq(
        ensure_zero_payment(txn),
        P.Assert(P.Not(app.state.events[key.get()].exists())),
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.AssetConfig,
                P.TxnField.config_asset_name: name.get(),
                P.TxnField.config_asset_total: P.Int(1),
                P.TxnField.config_asset_url: cover_image_ipfs.get(),
                P.TxnField.config_asset_manager: txn.get().sender(),
            }
        ),
        (asset_id := P.abi.Uint64()).set(P.InnerTxn.created_asset_id()),
        (owner := P.abi.Address()).set(txn.get().sender()),
        (event := Event()).set(
            asset_id,
            key,
            name,
            start_date,
            end_date,
            cover_image_ipfs,
            ticket_price,
            owner,
        ),
        app.state.events[key.get()].set(event),
        output.decode(app.state.events[key.get()].get()),
    )


@app.external
def purchase_event_ticket(
    txn: P.abi.PaymentTransaction,
    event_key: P.abi.String,
    ticket_key: P.abi.String,
    event_owner: P.abi.Account,
    *,
    output: EventTicket,
):
    from .subroutines import ensure_event_exists, pay_95_percent

    return P.Seq(
        P.Assert(
            P.Not(app.state.event_tickets[ticket_key.get()].exists()),
            comment="A ticket with this key already exists",
        ),
        ensure_event_exists(event_key),
        (event := Event()).decode(app.state.events[event_key.get()].get()),
        (event_owner_address := P.abi.Address()).set(event.owner),
        (ticket_price := P.abi.Uint64()).set(event.ticket_price),
        (event_name := P.abi.String()).set(event.name),
        (event_image_url := P.abi.String()).set(event.cover_image_ipfs),
        pay_95_percent(txn, ticket_price, event_owner_address),
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.AssetConfig,
                P.TxnField.config_asset_name: P.Concat(
                    event_name.get(), P.Bytes(" Ticket")
                ),
                P.TxnField.config_asset_total: P.Int(1),
                P.TxnField.config_asset_url: event_image_url.get(),
                P.TxnField.config_asset_manager: txn.get().sender(),
            }
        ),
        (ticket_id := P.abi.Uint64()).set(P.InnerTxn.created_asset_id()),
        (ticket_buyer := P.abi.Address()).set(txn.get().sender()),
        (ticket := EventTicket()).set(
            ticket_id, ticket_key, event_key, ticket_price, ticket_buyer
        ),
        app.state.event_tickets[ticket_key.get()].set(ticket),
        output.decode(app.state.event_tickets[ticket_key.get()].get()),
    )


@app.external
def hello(name: P.abi.String, *, output: P.abi.String) -> P.Expr:
    return output.set(P.Concat(name.get(), P.Bytes(" World")))
