import pyteal as P

from smart_contracts.aurally.boxes import ArtAuctionItem, ArtNFT, AurallyCreative
from .contract import app


@P.Subroutine(P.TealType.none)
def create_nft_owner(
    txn: P.abi.AssetConfigTransaction,
    fullname: P.abi.String,
    username: P.abi.String,
):
    return P.Seq(
        (is_music_creative := P.abi.Bool()).set(False),
        (is_art_creative := P.abi.Bool()).set(False),
        (minted := P.abi.Uint64()).set(0),
        (dnft_id := P.abi.Uint64()).set(txn.get().config_asset()),
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


def transfer_art_auction_item_to_highest_bidder(auction_key: P.abi.String):
    return P.Seq(
        (auction_item := ArtAuctionItem()).decode(
            app.state.art_auctions[auction_key.get()].get()
        ),
        (highest_bidder := P.abi.Address()).set(auction_item.highest_bidder),
        (nft_key := P.abi.String()).set(auction_item.item_id),
        # Update the art_nft owner
        (art_nft := ArtNFT()).decode(app.state.art_nfts[nft_key.get()].get()),
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
            highest_bidder,
            for_sale,
        ),
        app.state.art_nfts[nft_key.get()].set(art_nft),
    )
