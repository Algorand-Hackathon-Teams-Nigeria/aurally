import pyteal as P

from smart_contracts.aurally.boxes import (
    ArtAuctionItem,
    ArtNFT,
    AurallyCreative,
    AurallyToken,
    SoundNFT,
)
from .contract import app


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
def ensure_registered_creative(txn: P.abi.Transaction, creative_type: P.abi.String):
    """
    Ensures that the person carrying out this transaction is a valid creatie
    """
    return P.Seq(
        P.Assert(app.state.aurally_nft_owners[txn.get().sender()].exists()),
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
    ipfs_location: P.abi.String,
    name: P.abi.String,
    min_bid: P.abi.Uint64,
    starts_at: P.abi.Uint64,
    ends_at: P.abi.Uint64,
):
    return P.Seq(
        (P.Assert(P.Not(app.state.art_auctions[auction_key.get()].exists()))),
        (auctionier := P.abi.Address()).set(txn.get().sender()),
        (highest_bid := P.abi.Uint64()).set(0),
        (highest_bidder := P.abi.Address()).set(P.Global.current_application_address()),
        (art_auction := ArtAuctionItem()).set(
            auctionier,
            ipfs_location,
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
        P.Assert(P.Global.latest_timestamp() > starts_at.get()),
        P.Assert(P.Global.latest_timestamp() < ends_at.get()),
        P.Assert(bid_ammount.get() > highest_bid.get()),
        P.Assert(bid_ammount.get() > min_bid.get()),
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
        (release_date := P.abi.String()).set(sound_nft.release_date),
        (genre := P.abi.String()).set(sound_nft.genre),
        (price := P.abi.Uint64()).set(sound_nft.price),
        (cover_image_ipfs := P.abi.String()).set(sound_nft.cover_image_ipfs),
        (audio_sample_ipfs := P.abi.String()).set(sound_nft.audio_sample_ipfs),
        (full_track_ipfs := P.abi.String()).set(sound_nft.full_track_ipfs),
        (for_sale := P.abi.Bool()).set(sound_nft.for_sale),
        sound_nft.set(
            asset_id,
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
def transfer_sound_nft(txn: P.abi.PaymentTransaction, asset_key: P.abi.String):
    return P.Seq(
        (asset_item := SoundNFT()).decode(app.state.sound_nfts[asset_key.get()].get()),
        (price := P.abi.Uint64()).set(asset_item.price),
        (owner := P.abi.Address()).set(asset_item.owner),
        P.Assert(txn.get().amount() == price.get()),
        P.Assert(txn.get().receiver() == owner.get()),
        (new_owner := P.abi.Address()).set(txn.get().sender()),
        update_sound_nft_owner(asset_key, new_owner),
        P.Approve(),
    )


@P.Subroutine(P.TealType.none)
def transfer_art_nft(txn: P.abi.PaymentTransaction, asset_key: P.abi.String):
    return P.Seq(
        (asset_item := ArtNFT()).decode(app.state.art_nfts[asset_key.get()].get()),
        (price := P.abi.Uint64()).set(asset_item.price),
        (owner := P.abi.Address()).set(asset_item.owner),
        P.Assert(txn.get().amount() == price.get()),
        P.Assert(txn.get().receiver() == owner.get()),
        (new_owner := P.abi.Address()).set(txn.get().sender()),
        update_art_nft_owner(asset_key, new_owner),
        P.Approve(),
    )


@P.Subroutine(P.TealType.none)
def validate_and_update_sound_nft_owner(
    txn: P.abi.Transaction, asset_key: P.abi.String, to: P.abi.Address
):
    return P.Seq(
        P.Assert(app.state.sound_nfts[asset_key.get()].exists()),
        (sound_nft := SoundNFT()).decode(app.state.sound_nfts[asset_key.get()].get()),
        (owner := P.abi.Address()).set(sound_nft.owner),
        P.Assert(owner.get() == txn.get().sender()),
        update_sound_nft_owner(asset_key, to),
        P.Approve(),
    )


@P.Subroutine(P.TealType.none)
def validate_and_update_art_nft_owner(
    txn: P.abi.Transaction, asset_key: P.abi.String, to: P.abi.Address
):
    return P.Seq(
        P.Assert(app.state.art_nfts[asset_key.get()].exists()),
        (art_nft := ArtNFT()).decode(app.state.art_nfts[asset_key.get()].get()),
        (owner := P.abi.Address()).set(art_nft.owner),
        P.Assert(owner.get() == txn.get().sender()),
        update_art_nft_owner(asset_key, to),
        P.Approve(),
    )


@P.Subroutine(P.TealType.none)
def bootstrap_token(asset_key: P.abi.String, total: P.abi.Uint64):
    return P.Seq(
        P.Assert(P.Not(app.state.registered_asa[asset_key.get()].exists())),
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
        (aura_asset_key := P.abi.String()).set("aura"),
        P.Assert(app.state.registered_asa[aura_asset_key.get()].exists()),

        (aura_asset := AurallyToken()).decode(
            app.state.registered_asa[aura_asset_key.get()].get()
        ),
        (aura_asset_id := P.abi.Uint64()).set(aura_asset.asset_id),
        (aura_asset_total := P.abi.Uint64()).set(aura_asset.asset_total),
        P.Assert(aura_asset_total.get() > P.Int(1)),

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
        app.state.registered_asa[aura_asset_key.get()].set(aura_asset)
    )


