from beaker import GlobalStateValue
import pyteal as P
from beaker.lib.storage import BoxMapping
from .boxes import (
    ArtNFT,
    ArtAuctionItem,
    AurallyCreative,
    Event,
    EventTicket,
    Proposal,
    AurallyToken,
    SoundNFT,
)


class AppState:
    aurally_nft_owners = BoxMapping(P.abi.Address, AurallyCreative, prefix=P.Bytes("creatives"))
    sound_nfts = BoxMapping(P.abi.String, SoundNFT, prefix=P.Bytes("sound_nft"))
    art_nfts = BoxMapping(P.abi.String, ArtNFT, prefix=P.Bytes("art_nft"))
    art_auctions = BoxMapping(P.abi.String, ArtAuctionItem, prefix=P.Bytes("art_auction"))
    dao_proposals = BoxMapping(P.abi.String, Proposal, prefix=P.Bytes("proposal"))
    registered_asa = BoxMapping(P.abi.String, AurallyToken, prefix=P.Bytes("assets"))
    aurally_admins = BoxMapping(P.abi.Address, P.abi.String, prefix=P.Bytes("admins"))
    events = BoxMapping(P.abi.String, Event, prefix=P.Bytes("events"))
    event_tickets = BoxMapping(P.abi.String, EventTicket, prefix=P.Bytes("tickets"))
    active_proposal = GlobalStateValue(
        stack_type=P.TealType.bytes, default=P.Bytes("None")
    )
