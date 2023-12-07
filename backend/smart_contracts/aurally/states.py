from beaker import GlobalStateValue
import pyteal as P
from beaker.lib.storage import BoxMapping
from .boxes import (
    ArtNFT,
    ArtAuctionItem,
    AurallyCreative,
    Proposal,
    AurallyToken,
    SoundNFT,
)


class AppState:
    aurally_nft_owners = BoxMapping(P.abi.Address, AurallyCreative)
    sound_nfts = BoxMapping(P.abi.String, SoundNFT)
    art_nfts = BoxMapping(P.abi.String, ArtNFT)
    art_auctions = BoxMapping(P.abi.String, ArtAuctionItem)
    dao_proposals = BoxMapping(P.abi.String, Proposal)
    registered_asa = BoxMapping(P.abi.String, AurallyToken)
    aurally_admins = BoxMapping(P.abi.Address, P.abi.String)
    active_proposal = GlobalStateValue(
        stack_type=P.TealType.bytes, default=P.Bytes("None")
    )
