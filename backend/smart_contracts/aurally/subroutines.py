import pyteal as P

from smart_contracts.aurally.boxes import AurallyCreative
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
