import pyteal as P


class AurallyCreative(P.abi.NamedTuple):
    """
    Represents a registered account
    """

    creative_type: P.abi.Field[P.abi.String]
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
