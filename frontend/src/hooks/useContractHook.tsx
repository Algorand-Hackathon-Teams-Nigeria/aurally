import { Aurally } from '../contracts/AurallyClient'
import toast from 'react-hot-toast'
import useAppClient from './useAppClient'
import { useMutation } from '@tanstack/react-query'

export const useCreateSoundNFT = () => {
  const { deployCall, appClient } = useAppClient()
  const createSoundNFT = async (props: Aurally['methods']['createSoundNFT']['argsObj']) => {
    await deployCall()
    return await appClient.createSoundNft(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSoundNFT,
    onSuccess: () => {
      toast.success(`Sound Nft was created successfully`)
    },
    onError: () => {
      toast.error(`Error while creating Sound Nft`)
    },
  })

  return { mutateAsync, isPending }
}

export const useCreateArtNFT = () => {
  const { deployCall, appClient } = useAppClient()
  const createArtNFT = async (props: Aurally['methods']['createArtNFT']['argsObj']) => {
    await deployCall()
    return await appClient.createArtNft(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createArtNFT,
    onSuccess: () => {
      toast.success(`Art Nft was created successfully`)
    },
    onError: () => {
      toast.error(`Error while creating Art Nft`)
    },
  })

  return { mutateAsync, isPending }
}

export const useStartAuction = () => {
  const { deployCall, appClient } = useAppClient()
  const startAuction = async (props: Aurally['methods']['startAuction']['argsObj']) => {
    await deployCall()
    return await appClient.startAuction(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: startAuction,
    onSuccess: () => {
      toast.success(`Auction was started successfully`)
    },
    onError: () => {
      toast.error(`Error while starting auction`)
    },
  })

  return { mutateAsync, isPending }
}

export const useBidOnArtAuction = () => {
  const { deployCall, appClient } = useAppClient()
  const bidOnArtAuction = async (props: Aurally['methods']['bidOnArtAuction']['argsObj']) => {
    await deployCall()
    return await appClient.bidOnArtAuction(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: bidOnArtAuction,
    onSuccess: () => {
      toast.success(`Your bid is placed succesfully`)
    },
    onError: () => {
      toast.error(`Error while placing bid`)
    },
  })

  return { mutateAsync, isPending }
}

export const useEndArtAuction = () => {
  const { deployCall, appClient } = useAppClient()
  const endArtAuction = async (props: Aurally['methods']['endArtAuction']['argsObj']) => {
    await deployCall()
    return await appClient.endArtAuction(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: endArtAuction,
    onSuccess: () => {
      toast.success(`Nft Auction Ended`)
    },
    onError: () => {
      toast.error(`Error ending nft auction`)
    },
  })

  return { mutateAsync, isPending }
}

export const usePurchaseNFT = () => {
  const { deployCall, appClient } = useAppClient()
  const purchaseNFT = async (props: Aurally['methods']['purchaseNFT']['argsObj']) => {
    await deployCall()
    return await appClient.purchaseNft(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: purchaseNFT,
    onSuccess: () => {
      toast.success(`Nft purchased successfully`)
    },
    onError: () => {
      toast.error(`Error while purchasing Nft`)
    },
  })

  return { mutateAsync, isPending }
}

export const useTransferNFT = () => {
  const { deployCall, appClient } = useAppClient()
  const transferNFT = async (props: Aurally['methods']['transferNFT']['argsObj']) => {
    await deployCall()
    return await appClient.transferNft(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: transferNFT,
    onSuccess: () => {
      toast.success(`Nft transferred successfully`)
    },
    onError: () => {
      toast.error(`Error while transfering Nft`)
    },
  })

  return { mutateAsync, isPending }
}

export const useVoteOnProposal = () => {
  const { deployCall, appClient } = useAppClient()
  const voteOnProposal = async (props: Aurally['methods']['voteOnProposal']['argsObj']) => {
    await deployCall()
    return await appClient.voteOnProposal(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: voteOnProposal,
    onSuccess: () => {
      toast.success(`You have voted successfully`)
    },
    onError: () => {
      toast.error(`Error while casting vote.`)
    },
  })

  return { mutateAsync, isPending }
}

export const useCreateProposal = () => {
  const { deployCall, appClient } = useAppClient()
  const createProposal = async (props: Aurally['methods']['createProposal']['argsObj']) => {
    await deployCall()
    return await appClient.createProposal(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProposal,
    onSuccess: () => {
      toast.success(`Proposal created successfully`)
    },
    onError: () => {
      toast.error(`Error creating Proposal`)
    },
  })

  return { mutateAsync, isPending }
}

export const useStreamNFT = () => {
  const { deployCall, appClient } = useAppClient()
  const streamNFT = async (props: Aurally['methods']['streamNFT']['argsObj']) => {
    await deployCall()
    return await appClient.streamNft(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: streamNFT,
    onSuccess: () => {
      toast.success(`Aura streamed successfully`)
    },
    onError: () => {
      toast.error(`Error streaming nft`)
    },
  })

  return { mutateAsync, isPending }
}

export const useOptInToAsset = () => {
  const { deployCall, appClient } = useAppClient()
  const optInToAsset = async (props: Aurally['methods']['optInToAsset']['argsObj']) => {
    await deployCall()
    return await appClient.optInToAsset(props)
  }
  const { mutateAsync, isPending } = useMutation({
    mutationFn: optInToAsset,
    onSuccess: (_, variable) => {
      toast.success(`Nft ${variable.asset} Created successfully`)
    },
    onError: () => {
      toast.error(`Error creating NFT`)
    },
  })

  return { mutateAsync, isPending }
}
