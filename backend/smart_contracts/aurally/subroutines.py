import pyteal as P

from smart_contracts.aurally.boxes import (
    ArtAuctionItem,
    ArtNFT,
    AurallyCreative,
    AurallyToken,
    Event,
    SoundNFT,
)
from .contract import app


@P.Subroutine(P.TealType.none)
def ensure_auras_exist():
    return P.Seq(
        P.Assert(
            app.state.registered_asa[P.Bytes("aura")].exists(),
            comment="aura tokens have not been created yet",
        ),
    )


@P.Subroutine(P.TealType.none)
def ensure_nft_owner_exists_from_txn(txn: P.abi.Transaction):
    return P.Assert(
        app.state.aurally_nft_owners[txn.get().sender()].exists(),
        comment="User is not an NFT owner",
    )


@P.Subroutine(P.TealType.none)
def ensure_zero_payment(txn: P.abi.PaymentTransaction):
    return P.Assert(txn.get().amount() == P.Int(0), comment="Payment amount must be 0")


@P.Subroutine(P.TealType.none)
def ensure_proposal_exists(proposal_key: P.abi.String):
    return P.Assert(
        app.state.dao_proposals[proposal_key.get()].exists(),
        comment="Proposal with specified key was not found",
    )


@P.Subroutine(P.TealType.none)
def ensure_sender_is_creator(txn: P.abi.Transaction):
    return P.Assert(
        txn.get().sender() == P.Global.creator_address(),
        comment="Not app creator: You are not authorised to perform this action",
    )


@P.Subroutine(P.TealType.none)
def ensure_is_admin_or_app_creator(addr: P.abi.Address):
    return P.Assert(
        P.Or(
            addr.get() == P.Global.creator_address(),
            app.state.aurally_admins[addr.get()].exists(),
        ),
        comment="Not admin: You are not authorised to perform this action",
    )


@P.Subroutine(P.TealType.none)
def ensure_event_exists(key: P.abi.String):
    return P.Assert(
        app.state.events[key.get()].exists(),
        comment="Event with specified key does not exist",
    )


@P.Subroutine(P.TealType.none)
def ensure_sound_nft_exists(key: P.abi.String):
    return P.Assert(
        app.state.sound_nfts[key.get()].exists(),
        comment="SoundNFT with specified key does not exist",
    )


@P.Subroutine(P.TealType.none)
def ensure_art_nft_exists(key: P.abi.String):
    return P.Assert(
        app.state.art_nfts[key.get()].exists(),
        comment="ArtNFT with specified key does not exist",
    )


@P.Subroutine(P.TealType.none)
def ensure_sender_is_event_owner(txn: P.abi.Transaction, key: P.abi.String):
    return P.Seq(
        ensure_event_exists(key),
        (event := Event()).decode(app.state.events[key.get()].get()),
        (owner := P.abi.Address()).set(event.owner),
        P.Assert(
            txn.get().sender() == owner.get(),
            comment="Not event owner: You are not authorised to perform this action",
        ),
    )


@P.Subroutine(P.TealType.none)
def ensure_sender_is_sound_nft_owner(txn: P.abi.Transaction, key: P.abi.String):
    return P.Seq(
        ensure_sound_nft_exists(key),
        (sound_nft := SoundNFT()).decode(app.state.sound_nfts[key.get()].get()),
        (owner := P.abi.Address()).set(sound_nft.owner),
        P.Assert(
            txn.get().sender() == owner.get(),
            comment="Not Sound NFT owner: You are not authorised to perform this action",
        ),
    )


@P.Subroutine(P.TealType.none)
def ensure_sender_is_art_nft_owner(txn: P.abi.Transaction, key: P.abi.String):
    return P.Seq(
        ensure_sound_nft_exists(key),
        (art_nft := ArtNFT()).decode(app.state.art_nfts[key.get()].get()),
        (owner := P.abi.Address()).set(art_nft.owner),
        P.Assert(
            txn.get().sender() == owner.get(),
            comment="Not Art NFT owner: You are not authorised to perform this action",
        ),
    )


@P.Subroutine(P.TealType.none)
def ensure_registered_creative(txn: P.abi.Transaction, creative_type: P.abi.String):
    """
    Ensures that the person carrying out this transaction is a valid creatie
    """
    return P.Seq(
        P.Assert(
            app.state.aurally_nft_owners[txn.get().sender()].exists(),
            comment="Account is not a registered creative",
        ),
        (creative := AurallyCreative()).decode(
            app.state.aurally_nft_owners[txn.get().sender()].get()
        ),
        (is_music_creative := P.abi.Bool()).set(creative.is_music_creative),
        (is_art_creative := P.abi.Bool()).set(creative.is_art_creative),
        (minted := P.abi.Uint64()).set(creative.minted),
        (fullname := P.abi.String()).set(creative.fullname),
        (username := P.abi.String()).set(creative.username),
        (d_nft_id := P.abi.Uint64()).set(creative.d_nft_id),
        P.If(creative_type.get() == P.Bytes("music"), is_music_creative.set(True)),
        P.If(creative_type.get() == P.Bytes("art"), is_music_creative.set(True)),
        creative.set(
            is_music_creative, is_art_creative, minted, fullname, username, d_nft_id
        ),
        app.state.aurally_nft_owners[txn.get().sender()].set(creative),
    )


@P.Subroutine(P.TealType.none)
def create_nft_owner(
    txn: P.abi.Transaction,
    fullname: P.abi.String,
    username: P.abi.String,
):
    return P.Seq(
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.AssetConfig,
                P.TxnField.config_asset_name: txn.get().sender(),
                P.TxnField.config_asset_manager: P.Global.current_application_address(),
                P.TxnField.config_asset_total: P.Int(1),
            }
        ),
        (dnft_id := P.abi.Uint64()).set(P.InnerTxn.created_asset_id()),
        (is_music_creative := P.abi.Bool()).set(False),
        (is_art_creative := P.abi.Bool()).set(False),
        (minted := P.abi.Uint64()).set(0),
        (creative := AurallyCreative()).set(
            is_music_creative, is_art_creative, minted, fullname, username, dnft_id
        ),
        app.state.aurally_nft_owners[txn.get().sender()].set(creative),
    )


@P.Subroutine(P.TealType.none)
def save_art_nft(
    asset_id: P.abi.Uint64,
    asset_key: P.abi.String,
    title: P.abi.String,
    name: P.abi.String,
    supply: P.abi.Uint64,
    description: P.abi.String,
    ipfs_location: P.abi.String,
    price: P.abi.Uint64,
    sold_price: P.abi.Uint64,
    owner: P.abi.Address,
    for_sale: P.abi.Bool,
):
    return P.Seq(
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
    )


@P.Subroutine(P.TealType.none)
def increment_creator_nft_count(creator: P.abi.Address):
    return P.Seq(
        (creative := AurallyCreative()).decode(
            app.state.aurally_nft_owners[creator.get()].get()
        ),
        (minted := P.abi.Uint64()).set(creative.minted),
        (minted.set(minted.get() + P.Int(1))),
        (is_music_creative := P.abi.Bool()).set(creative.is_music_creative),
        (is_art_creative := P.abi.Bool()).set(creative.is_art_creative),
        (fullname := P.abi.String()).set(creative.fullname),
        (username := P.abi.String()).set(creative.username),
        (d_nft_id := P.abi.Uint64()).set(creative.d_nft_id),
        creative.set(
            is_music_creative, is_art_creative, minted, fullname, username, d_nft_id
        ),
        app.state.aurally_nft_owners[creator.get()].set(creative),
    )


@P.Subroutine(P.TealType.none)
def create_art_auction(
    txn: P.abi.Transaction,
    auction_key: P.abi.String,
    asset_key: P.abi.String,
    name: P.abi.String,
    min_bid: P.abi.Uint64,
    starts_at: P.abi.Uint64,
    ends_at: P.abi.Uint64,
):
    return P.Seq(
        P.Assert(
            P.Not(app.state.art_auctions[auction_key.get()].exists()),
            comment="an art auction with this key already exists",
        ),
        (auctionier := P.abi.Address()).set(txn.get().sender()),
        (highest_bid := P.abi.Uint64()).set(0),
        (highest_bidder := P.abi.Address()).set(P.Global.current_application_address()),
        (art_auction := ArtAuctionItem()).set(
            auctionier,
            asset_key,
            name,
            min_bid,
            starts_at,
            ends_at,
            highest_bid,
            highest_bidder,
        ),
        app.state.art_auctions[auction_key.get()].set(art_auction),
    )


@P.Subroutine(P.TealType.none)
def perform_auction_bid(
    txn: P.abi.Transaction, auction_key: P.abi.String, bid_ammount: P.abi.Uint64
):
    return P.Seq(
        (auction_item := ArtAuctionItem()).decode(
            app.state.art_auctions[auction_key.get()].get()
        ),
        (highest_bid := P.abi.Uint64()).set(auction_item.highest_bid),
        (min_bid := P.abi.Uint64()).set(auction_item.min_bid),
        (starts_at := P.abi.Uint64()).set(auction_item.starts_at),
        (ends_at := P.abi.Uint64()).set(auction_item.ends_at),
        P.Assert(
            bid_ammount.get() > highest_bid.get(),
            comment="The new bid must be larger than the current highest bid",
        ),
        P.Assert(
            bid_ammount.get() > min_bid.get(),
            comment="The new bid must be greater that the minimum bid price",
        ),
        (auctioneer := P.abi.Address()).set(auction_item.auctioneer),
        (item_id := P.abi.String()).set(auction_item.item_id),
        (item_name := P.abi.String()).set(auction_item.item_name),
        (highest_bidder := P.abi.Address()).set(txn.get().sender()),
        auction_item.set(
            auctioneer,
            item_id,
            item_name,
            min_bid,
            starts_at,
            ends_at,
            bid_ammount,
            highest_bidder,
        ),
        app.state.art_auctions[auction_key.get()].set(auction_item),
    )


@P.Subroutine(P.TealType.none)
def transfer_art_auction_item_to_highest_bidder(auction_key: P.abi.String):
    return P.Seq(
        (auction_item := ArtAuctionItem()).decode(
            app.state.art_auctions[auction_key.get()].get()
        ),
        (highest_bidder := P.abi.Address()).set(auction_item.highest_bidder),
        (nft_key := P.abi.String()).set(auction_item.item_id),
        update_art_nft_owner(nft_key, highest_bidder),
    )


@P.Subroutine(P.TealType.none)
def update_art_nft_owner(asset_key: P.abi.String, new_owner: P.abi.Address):
    return P.Seq(
        (art_nft := ArtNFT()).decode(app.state.art_nfts[asset_key.get()].get()),
        (asset_id := P.abi.Uint64()).set(art_nft.asset_id),
        (title := P.abi.String()).set(art_nft.title),
        (name := P.abi.String()).set(art_nft.name),
        (supply := P.abi.Uint64()).set(art_nft.supply),
        (description := P.abi.String()).set(art_nft.description),
        (ipfs_location := P.abi.String()).set(art_nft.ipfs_location),
        (price := P.abi.Uint64()).set(art_nft.price),
        (sold_price := P.abi.Uint64()).set(art_nft.sold_price),
        (for_sale := P.abi.Bool()).set(art_nft.for_sale),
        art_nft.set(
            asset_id,
            asset_key,
            title,
            name,
            supply,
            description,
            ipfs_location,
            price,
            sold_price,
            new_owner,
            for_sale,
        ),
        app.state.art_nfts[asset_key.get()].set(art_nft),
    )


@P.Subroutine(P.TealType.none)
def update_sound_nft_owner(asset_key: P.abi.String, new_owner: P.abi.Address):
    return P.Seq(
        (sound_nft := SoundNFT()).decode(app.state.sound_nfts[asset_key.get()].get()),
        (asset_id := P.abi.Uint64()).set(sound_nft.asset_id),
        (supply := P.abi.Uint64()).set(sound_nft.supply),
        (title := P.abi.String()).set(sound_nft.title),
        (label := P.abi.String()).set(sound_nft.label),
        (artist := P.abi.String()).set(sound_nft.artist),
        (release_date := P.abi.Uint64()).set(sound_nft.release_date),
        (genre := P.abi.String()).set(sound_nft.genre),
        (price := P.abi.Uint64()).set(sound_nft.price),
        (cover_image_ipfs := P.abi.String()).set(sound_nft.cover_image_ipfs),
        (audio_sample_ipfs := P.abi.String()).set(sound_nft.audio_sample_ipfs),
        (full_track_ipfs := P.abi.String()).set(sound_nft.full_track_ipfs),
        (for_sale := P.abi.Bool()).set(sound_nft.for_sale),
        sound_nft.set(
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
            new_owner,
            for_sale,
        ),
    )


@P.Subroutine(P.TealType.none)
def perform_sound_nft_sale(txn: P.abi.PaymentTransaction, asset_key: P.abi.String):
    return P.Seq(
        (asset_item := SoundNFT()).decode(app.state.sound_nfts[asset_key.get()].get()),
        (price := P.abi.Uint64()).set(asset_item.price),
        (nft_owner := P.abi.Address()).set(asset_item.owner),
        (buyer := P.abi.Address()).set(txn.get().sender()),
        (asset_id := P.abi.Uint64()).set(asset_item.asset_id),
        (amount := P.abi.Uint64()).set(1),
        (for_sale := P.abi.Bool()).set(asset_item.for_sale),
        P.Assert(for_sale.get(), comment="This asset is not currently for sale"),
        pay_95_percent(txn, price, nft_owner),
        perform_asset_transfer(asset_id, buyer, amount),
        update_sound_nft_owner(asset_key, buyer),
        (aura_amt := P.abi.Uint64()).set(1),
        send_aura_token(buyer, aura_amt),
        P.Approve(),
    )


@P.Subroutine(P.TealType.none)
def perform_art_nft_sale(txn: P.abi.PaymentTransaction, asset_key: P.abi.String):
    return P.Seq(
        (asset_item := ArtNFT()).decode(app.state.art_nfts[asset_key.get()].get()),
        (price := P.abi.Uint64()).set(asset_item.price),
        (nft_owner := P.abi.Address()).set(asset_item.owner),
        (buyer := P.abi.Address()).set(txn.get().sender()),
        (asset_id := P.abi.Uint64()).set(asset_item.asset_id),
        (amount := P.abi.Uint64()).set(1),
        (for_sale := P.abi.Bool()).set(asset_item.for_sale),
        P.Assert(for_sale.get(), comment="This asset is not currently for sale"),
        pay_95_percent(txn, price, nft_owner),
        perform_asset_transfer(asset_id, buyer, amount),
        update_art_nft_owner(asset_key, buyer),
        (aura_amt := P.abi.Uint64()).set(1),
        send_aura_token(buyer, aura_amt),
        P.Approve(),
    )


@P.Subroutine(P.TealType.none)
def buy_event_ticket(txn: P.abi.PaymentTransaction, event_key: P.abi.String):
    return P.Seq(
        (asset_item := ArtNFT()).decode(app.state.art_nfts[event_key.get()].get()),
        (price := P.abi.Uint64()).set(asset_item.price),
        (nft_owner := P.abi.Address()).set(asset_item.owner),
        (buyer := P.abi.Address()).set(txn.get().sender()),
        pay_95_percent(txn, price, nft_owner),
        update_art_nft_owner(event_key, buyer),
        (aura_amt := P.abi.Uint64()).set(1),
        send_aura_token(buyer, aura_amt),
        P.Approve(),
    )


@P.Subroutine(P.TealType.none)
def pay_95_percent(
    txn: P.abi.PaymentTransaction, price: P.abi.Uint64, receiver: P.abi.Address
):
    return P.Seq(
        P.Assert(
            txn.get().amount() == price.get(),
            comment="Transaction price is not the required amount",
        ),
        P.Assert(
            txn.get().receiver() == P.Global.current_application_address(),
            comment="Transaction receiver has to be the app Address",
        ),
        (nity_five_percent := P.abi.Uint64()).set(
            P.Div(price.get() * P.Int(5), P.Int(100))
        ),
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.Payment,
                P.TxnField.amount: nity_five_percent.get(),
                P.TxnField.sender: P.Global.current_application_address(),
                P.TxnField.receiver: receiver.get(),
            }
        ),
    )


@P.Subroutine(P.TealType.none)
def validate_sound_nft_owner(txn: P.abi.Transaction, asset_key: P.abi.String):
    return P.Seq(
        ensure_sound_nft_exists(asset_key),
        (sound_nft := SoundNFT()).decode(app.state.sound_nfts[asset_key.get()].get()),
        (owner := P.abi.Address()).set(sound_nft.owner),
        P.Assert(
            owner.get() == txn.get().sender(),
            comment="The transaction sender is not the owner of the nft",
        ),
    )


@P.Subroutine(P.TealType.none)
def validate_art_nft_owner(txn: P.abi.Transaction, asset_key: P.abi.String):
    return P.Seq(
        ensure_art_nft_exists(asset_key),
        (art_nft := ArtNFT()).decode(app.state.art_nfts[asset_key.get()].get()),
        (owner := P.abi.Address()).set(art_nft.owner),
        P.Assert(
            owner.get() == txn.get().sender(),
            comment="The transaction sender is not the owner of the art nft",
        ),
    )


@P.Subroutine(P.TealType.none)
def validate_and_update_sound_nft_owner(
    txn: P.abi.Transaction, asset_key: P.abi.String, to: P.abi.Address
):
    return P.Seq(
        validate_sound_nft_owner(txn),
        update_sound_nft_owner(asset_key, to),
        P.Approve(),
    )


@P.Subroutine(P.TealType.none)
def bootstrap_token(asset_key: P.abi.String, total: P.abi.Uint64):
    return P.Seq(
        P.Assert(
            P.Not(app.state.registered_asa[asset_key.get()].exists()),
            comment="Aura tokens already exist",
        ),
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.AssetConfig,
                P.TxnField.config_asset_total: total.get(),
                P.TxnField.config_asset_name: asset_key.get(),
                P.TxnField.config_asset_freeze: P.Global.current_application_address(),
                P.TxnField.config_asset_manager: P.Global.current_application_address(),
                P.TxnField.config_asset_reserve: P.Global.current_application_address(),
                P.TxnField.config_asset_clawback: P.Global.current_application_address(),
            }
        ),
        (asset_id := P.abi.Uint64()).set(P.InnerTxn.created_asset_id()),
        (P.Log(P.Itob(asset_id.get()))),
        (proposal_token := AurallyToken()).set(asset_id, asset_key, total),
        app.state.registered_asa[asset_key.get()].set(proposal_token),
    )


@P.Subroutine(P.TealType.none)
def send_aura_token(receiver: P.abi.Address, amt: P.abi.Uint64):
    return P.Seq(
        ensure_auras_exist(),
        (aura_asset_key := P.abi.String()).set("aura"),
        (aura_asset := AurallyToken()).decode(
            app.state.registered_asa[aura_asset_key.get()].get()
        ),
        (aura_asset_id := P.abi.Uint64()).set(aura_asset.asset_id),
        (aura_asset_total := P.abi.Uint64()).set(aura_asset.asset_total),
        P.Assert(aura_asset_total.get() > P.Int(1), comment="Not enough aura tokens"),
        # Perform Asset Transfer
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.AssetTransfer,
                P.TxnField.xfer_asset: aura_asset_id.get(),
                P.TxnField.asset_receiver: receiver.get(),
                P.TxnField.asset_amount: amt.get(),
            }
        ),
        # Update Asset Total
        aura_asset_total.set(aura_asset_total.get() - P.Int(1)),
        aura_asset.set(aura_asset_id, aura_asset_key, aura_asset_total),
        app.state.registered_asa[aura_asset_key.get()].set(aura_asset),
    )


@P.Subroutine(P.TealType.none)
def ensure_has_auras(txn: P.abi.Transaction):
    return P.Seq(
        ensure_auras_exist(),
        (aura_token := AurallyToken()).decode(
            app.state.registered_asa[P.Bytes("aura")].get()
        ),
        (aura_id := P.abi.Uint64()).set(aura_token.asset_id),
        (asset_bal := P.AssetHolding.balance(txn.get().sender(), aura_id.get())),
        P.Assert(
            asset_bal.value() > P.Int(0),
            comment="User must have at least one aura token",
        ),
    )


@P.Subroutine(P.TealType.none)
def ensure_auras_frozen_status(txn: P.abi.Transaction, status: P.abi.Bool):
    return P.Seq(
        ensure_auras_exist(),
        (aura_token := AurallyToken()).decode(
            app.state.registered_asa[P.Bytes("aura")].get()
        ),
        (aura_id := P.abi.Uint64()).set(aura_token.asset_id),
        (asset_frozen := P.AssetHolding.frozen(txn.get().sender(), aura_id.get())),
        P.If(
            status.get(),
            P.Assert(asset_frozen.value(), comment="auras should be frozen"),
            P.Assert(P.Not(asset_frozen.value()), comment="auras should not be frozen"),
        ),
    )


@P.Subroutine(P.TealType.none)
def set_aura_tokens_frozen(txn: P.abi.Transaction, state: P.abi.Bool):
    return P.Seq(
        ensure_auras_exist(),
        (aura_token := AurallyToken()).decode(
            app.state.registered_asa[P.Bytes("aura")].get()
        ),
        (aura_id := P.abi.Uint64()).set(aura_token.asset_id),
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.AssetFreeze,
                P.TxnField.freeze_asset: aura_id.get(),
                P.TxnField.freeze_asset_account: txn.get().sender(),
                P.TxnField.freeze_asset_frozen: state.get(),
            }
        ),
    )


@P.Subroutine(P.TealType.none)
def update_sound_nft_sale(asset_key: P.abi.String, for_sale: P.abi.Bool):
    return P.Seq(
        ensure_sound_nft_exists(asset_key),
        (sound_nft := SoundNFT()).decode(app.state.sound_nfts[asset_key.get()].get()),
        (asset_id := P.abi.Uint64()).set(sound_nft.asset_id),
        (supply := P.abi.Uint64()).set(sound_nft.supply),
        (title := P.abi.String()).set(sound_nft.title),
        (label := P.abi.String()).set(sound_nft.label),
        (artist := P.abi.String()).set(sound_nft.artist),
        (release_date := P.abi.Uint64()).set(sound_nft.release_date),
        (genre := P.abi.String()).set(sound_nft.genre),
        (price := P.abi.Uint64()).set(sound_nft.price),
        (cover_image_ipfs := P.abi.String()).set(sound_nft.cover_image_ipfs),
        (audio_sample_ipfs := P.abi.String()).set(sound_nft.audio_sample_ipfs),
        (full_track_ipfs := P.abi.String()).set(sound_nft.full_track_ipfs),
        (owner := P.abi.Address()).set(sound_nft.owner),
        sound_nft.set(
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
    )


@P.Subroutine(P.TealType.none)
def update_art_nft_sale(asset_key: P.abi.String, for_sale: P.abi.Bool):
    return P.Seq(
        ensure_art_nft_exists(asset_key),
        (art_nft := ArtNFT()).decode(app.state.art_nfts[asset_key.get()].get()),
        (asset_id := P.abi.Uint64()).set(art_nft.asset_id),
        (title := P.abi.String()).set(art_nft.title),
        (name := P.abi.String()).set(art_nft.name),
        (supply := P.abi.Uint64()).set(art_nft.supply),
        (description := P.abi.String()).set(art_nft.description),
        (ipfs_location := P.abi.String()).set(art_nft.ipfs_location),
        (price := P.abi.Uint64()).set(art_nft.price),
        (sold_price := P.abi.Uint64()).set(art_nft.sold_price),
        (owner := P.abi.Address()).set(art_nft.owner),
        opt_app_into_asset(asset_id),
        art_nft.set(
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
    )


@P.Subroutine(P.TealType.none)
def opt_app_into_asset(asset_id: P.abi.Uint64):
    return P.Seq(
        # Perform Asset Transfer
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.AssetTransfer,
                P.TxnField.xfer_asset: asset_id.get(),
                P.TxnField.asset_receiver: P.Global.current_application_address(),
                P.TxnField.sender: P.Global.current_application_address(),
                P.TxnField.asset_amount: P.Int(0),
            }
        )
    )


@P.Subroutine(P.TealType.none)
def perform_asset_transfer(
    asset_id: P.abi.Uint64, to: P.abi.Address, amt: P.abi.Uint64
):
    return P.Seq(
        P.InnerTxnBuilder.Execute(
            {
                P.TxnField.type_enum: P.TxnType.AssetTransfer,
                P.TxnField.xfer_asset: asset_id.get(),
                P.TxnField.asset_receiver: to.get(),
                P.TxnField.asset_amount: amt.get(),
            }
        )
    )
