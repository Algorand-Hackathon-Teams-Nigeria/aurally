import beaker as B
import pyteal as P

from smart_contracts.aurally.boxes import ArtNFT, AurallyCreative, SoundNFT
from .states import AppState

app = B.Application("Aurally", state=AppState()).apply(B.unconditional_create_approval)


@app.external
def register_creator(
    txn: P.abi.AssetConfigTransaction,
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
    txn: P.abi.AssetConfigTransaction,
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
    *,
    output: SoundNFT,
):
    from .subroutines import ensure_registered_creative, increment_creator_nft_count

    return P.Seq(
        (creative_type := P.abi.String()).set("music"),
        ensure_registered_creative(txn, creative_type),
        P.Assert(P.Not(app.state.sound_nfts[asset_key.get()].exists())),
        (asset_id := P.abi.Uint64()).set(txn.get().created_asset_id()),
        (owner := P.abi.Address()).set(txn.get().sender()),
        (sound_nft := SoundNFT()).set(
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
            owner,
            for_sale,
        ),
        app.state.sound_nfts[asset_key.get()].set(sound_nft),
        increment_creator_nft_count(owner),
        output.decode(app.state.sound_nfts[asset_key.get()].get()),
    )


@app.external
def create_art_nft(
    txn: P.abi.AssetConfigTransaction,
    title: P.abi.String,
    name: P.abi.String,
    supply: P.abi.Uint64,
    description: P.abi.String,
    ipfs_location: P.abi.String,
    price: P.abi.Uint64,
    for_sale: P.abi.Bool,
    *,
    output: ArtNFT,
):
    from .subroutines import ensure_registered_creative, increment_creator_nft_count

    return P.Seq(
        P.Assert(P.Not(app.state.art_nfts[ipfs_location.get()].exists())),
        (creative_type := P.abi.String()).set("art"),
        ensure_registered_creative(txn, creative_type),
        (asset_id := P.abi.Uint64()).set(txn.get().created_asset_id()),
        (owner := P.abi.Address()).set(txn.get().sender()),
        (sold_price := P.abi.Uint64()).set(0),
        (art_nft := ArtNFT()).set(
            asset_id,
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
        app.state.art_nfts[ipfs_location.get()].set(art_nft),
        increment_creator_nft_count(owner),
        output.decode(app.state.art_nfts[ipfs_location.get()].get()),
    )


@app.external
def hello(name: P.abi.String, *, output: P.abi.String) -> P.Expr:
    return output.set(P.Concat(P.Bytes("Hello, "), name.get()))
