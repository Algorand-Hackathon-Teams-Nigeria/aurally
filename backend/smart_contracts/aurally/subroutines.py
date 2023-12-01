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
        (creative_type := P.abi.String()).set("music"),
        (minted := P.abi.Uint64()).set(0),
        (dnft_id := P.abi.Uint64()).set(txn.get().config_asset()),
        (creative := AurallyCreative()).set(
            creative_type, minted, fullname, username, dnft_id
        ),
        app.state.aurally_nft_owners[txn.get().sender()].set(creative),
    )


@P.Subroutine(P.TealType.none)
def ensure_registered_creative(txn: P.abi.Transaction, creative_type: P.abi.String):
    return P.Seq(
        P.Assert(app.state.aurally_nft_owners[txn.get().sender()].exists()),
        (creative := AurallyCreative()).decode(
            app.state.aurally_nft_owners[txn.get().sender()].get()
        ),
        (curr_creative_type := P.abi.String()).set(creative.creative_type),
        P.Assert(curr_creative_type.get() == creative_type.get()),
    )
