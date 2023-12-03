import pyteal as P
from beaker.lib.storage import BoxMapping
from .boxes import ArtNFT, ArtAuctionItem, AurallyCreative, Proposal, SoundNFT


class AppState:
    aurally_nft_owners = BoxMapping(P.abi.Address, AurallyCreative)
    sound_nfts = BoxMapping(P.abi.String, SoundNFT)
    art_nfts = BoxMapping(P.abi.String, ArtNFT)
    art_auctions = BoxMapping(P.abi.String, ArtAuctionItem)
    dao_proposals = BoxMapping(P.abi.String, Proposal)
