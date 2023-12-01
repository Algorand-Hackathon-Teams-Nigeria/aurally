import pyteal as P
from beaker.lib.storage import BoxMapping
from .boxes import AurallyCreative, SoundNFT


class AppState:
    aurally_nft_owners = BoxMapping(P.abi.Address, AurallyCreative)
    sound_nfts = BoxMapping(P.abi.String, SoundNFT)
