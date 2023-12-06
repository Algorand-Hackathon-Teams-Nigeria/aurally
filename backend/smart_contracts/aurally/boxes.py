import pyteal as P


class AurallyCreative(P.abi.NamedTuple):
    """
    Represents a registered account
    """

    is_music_creative: P.abi.Field[P.abi.Bool]
    is_art_creative: P.abi.Field[P.abi.Bool]
    minted: P.abi.Field[P.abi.Uint64]
    fullname: P.abi.Field[P.abi.String]
    username: P.abi.Field[P.abi.String]
    d_nft_id: P.abi.Field[P.abi.Uint64]


class SoundNFT(P.abi.NamedTuple):
    asset_id: P.abi.Field[P.abi.Uint64]
    supply: P.abi.Field[P.abi.Uint64]
    title: P.abi.Field[P.abi.String]
    label: P.abi.Field[P.abi.String]
    artist: P.abi.Field[P.abi.String]
    release_date: P.abi.Field[P.abi.String]  # A UTC timestamp of the release_date
    genre: P.abi.Field[P.abi.String]
    price: P.abi.Field[P.abi.Uint64]
    cover_image_ipfs: P.abi.Field[P.abi.String]
    audio_sample_ipfs: P.abi.Field[P.abi.String]
    full_track_ipfs: P.abi.Field[P.abi.String]
    owner: P.abi.Field[P.abi.Address]
    for_sale: P.abi.Field[P.abi.Bool]


class ArtNFT(P.abi.NamedTuple):
    asset_id: P.abi.Field[P.abi.Uint64]
    title: P.abi.Field[P.abi.String]
    name: P.abi.Field[P.abi.String]
    supply: P.abi.Field[P.abi.Uint64]
    description: P.abi.Field[P.abi.String]
    ipfs_location: P.abi.Field[P.abi.String]
    price: P.abi.Field[P.abi.Uint64]
    sold_price: P.abi.Field[P.abi.Uint64]
    owner: P.abi.Field[P.abi.Address]
    for_sale: P.abi.Field[P.abi.Bool]


class ArtAuctionItem(P.abi.NamedTuple):
    auctioneer: P.abi.Field[P.abi.Address]
    item_id: P.abi.Field[P.abi.String]
    item_name: P.abi.Field[P.abi.String]
    min_bid: P.abi.Field[P.abi.Uint64]
    starts_at: P.abi.Field[P.abi.Uint64]
    ends_at: P.abi.Field[P.abi.Uint64]
    highest_bid: P.abi.Field[P.abi.Uint64]
    highest_bidder: P.abi.Field[P.abi.Address]


class Proposal(P.abi.NamedTuple):
    proposal_id: P.abi.Field[P.abi.String]
    yes_votes: P.abi.Field[P.abi.Uint64]
    no_votes: P.abi.Field[P.abi.Uint64]
    details: P.abi.Field[P.abi.String]


class AurallyToken(P.abi.NamedTuple):
    asset_id: P.abi.Field[P.abi.Uint64]
    asset_key: P.abi.Field[P.abi.String]
    asset_total: P.abi.Field[P.abi.Uint64]
