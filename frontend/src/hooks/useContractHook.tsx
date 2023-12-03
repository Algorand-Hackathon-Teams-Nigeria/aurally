import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { AppClientProps } from '../utils/contract-config'
import {
  bidOnArtAuction,
  createArtNFT,
  createProposal,
  createSoundNFT,
  endArtAuction,
  optInToAsset,
  purchaseNFT,
  startAuction,
  streamNFT,
  transferNFT,
  voteOnProposal,
} from '../utils/contractcalls'
import { handleContractError } from '../utils/handlingErrors'

export const useCreateSoundNFT = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: createSoundNFT(props),
    onSuccess: () => {
      toast.success(`Sound Nft was created successfully`)
    },
    onError: (error) => {
      handleContractError(error, `Error while creating Sound Nft`)
    },
  })

  return data
}

export const useCreateArtNFT = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: createArtNFT(props),
    onSuccess: () => {
      toast.success(`Art Nft was created successfully`)
    },
    onError: (error) => {
      handleContractError(error, `Error while creating Art Nft`)
    },
  })

  return data
}

export const useStartAuction = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: startAuction(props),
    onSuccess: () => {
      toast.success(`Auction was started successfully`)
    },
    onError: (error) => {
      handleContractError(error, `Error while starting auction`)
    },
  })

  return data
}

export const useBidOnArtAuction = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: bidOnArtAuction(props),
    onSuccess: () => {
      toast.success(`Your bid is placed succesfully`)
    },
    onError: (error) => {
      handleContractError(error, `Error while placing bid`)
    },
  })

  return data
}

export const useEndArtAuction = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: endArtAuction(props),
    onSuccess: () => {
      toast.success(`Nft Auction Ended`)
    },
    onError: (error) => {
      handleContractError(error, `Error ending nft auction`)
    },
  })

  return data
}

export const usePurchaseNFT = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: purchaseNFT(props),
    onSuccess: () => {
      toast.success(`Nft purchased successfully`)
    },
    onError: (error) => {
      handleContractError(error, `Error while purchasing Nft`)
    },
  })

  return data
}

export const useTransferNFT = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: transferNFT(props),
    onSuccess: () => {
      toast.success(`Nft transferred successfully`)
    },
    onError: (error) => {
      handleContractError(error, `Error while transfering Nft`)
    },
  })

  return data
}

export const useVoteOnProposal = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: voteOnProposal(props),
    onSuccess: () => {
      toast.success(`You have voted successfully`)
    },
    onError: (error) => {
      handleContractError(error, `Error while casting vote.`)
    },
  })

  return data
}

export const useCreateProposal = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: createProposal(props),
    onSuccess: () => {
      toast.success(`Proposal created successfully`)
    },
    onError: (error) => {
      handleContractError(error, `Error creating Proposal`)
    },
  })

  return data
}

export const useStreamNFT = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: streamNFT(props),
    onSuccess: () => {
      toast.success(`Aura streamed successfully`)
    },
    onError: (error) => {
      handleContractError(error, `Error streaming nft`)
    },
  })

  return data
}

export const useOptInToAsset = (props: AppClientProps) => {
  const data = useMutation({
    mutationFn: optInToAsset(props),
    onSuccess: (_, variable) => {
      toast.success(`Nft ${variable.asset} Created successfully`)
    },
    onError: (error) => {
      handleContractError(error, `Error creating NFT`)
    },
  })

  return data
}
