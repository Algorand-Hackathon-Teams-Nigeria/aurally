import { Button } from '@mantine/core'
import { ContextModalProps, modals } from '@mantine/modals'
import { useWallet } from '@txnlab/use-wallet'
import { algodClient } from '../../utils/contract-config'
import algosdk from 'algosdk'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const BuyModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  id: number
  title: string
  artist: string
  streams: string
  price: number
  relase_date: string
  btnAction?: () => Promise<void>
}>) => {
  const { activeAddress, signTransactions, sendTransactions } = useWallet()
  const sendTransaction = async (from = activeAddress, to = activeAddress, amount = 0.1) => {
    try {
      if (!from || !to || !amount) {
        throw new Error('Missing transaction params.')
      }
      amount = amount * 1000000

      const suggestedParams = await algodClient.getTransactionParams().do()

      const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from,
        to,
        amount,
        suggestedParams,
      })

      const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)
      const signedTransactions = await signTransactions([encodedTransaction])
      const waitRoundsToConfirm = 4
      const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
      return id
    } catch (error) {
      throw new Error('Error while sending transaction')
    }
  }

  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: () => sendTransaction(activeAddress, activeAddress, innerProps.price),
    onSuccess: () => {
      modals.openContextModal({
        modal: 'message',
        innerProps: {
          title: `Nft #${innerProps.id} purchased`,
          icon: 'success',
          desc: 'Your art has been created successfully',
          btnLabel: 'Close',
        },
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const buy = async () => {
    await mutateAsync()
    context.closeModal(id)
  }

  return (
    <>
      <div className="text-xl">Summary</div>
      <div className="text-sm mb-5 mt-2">Review this information to be sure it's what you want</div>
      <div className="border-[#444] border py-2 px-3 rounded-lg mb-6">
        <table className="w-full">
          <tr>
            <td className="py-2">Title</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.title}</td>
          </tr>
          <tr>
            <td className="py-2">Artist</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.artist}</td>
          </tr>
          <tr>
            <td className="py-2">Total streams</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.streams}</td>
          </tr>
          <tr>
            <td className="py-2">Price</td>
            <td className="text-end text-[#AFAFAF]">{`${innerProps.price} ALGO`}</td>
          </tr>
          <tr>
            <td className="py-2">Released date</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.relase_date}</td>
          </tr>
        </table>
      </div>
      <Button size="md" fullWidth loading={isPending && !isError} radius={'md'} onClick={buy}>
        Get Now
      </Button>
    </>
  )
}

export default BuyModal
