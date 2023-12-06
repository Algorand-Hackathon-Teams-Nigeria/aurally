import { Button, NumberInput, Select, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { useAtom } from 'jotai'
import toast from 'react-hot-toast'
import { createdNftsAtom, daoListAtom } from '../../store/atoms'
import classes from '../../styles/textinput.module.css'
import { getAlgodClient } from '../../utils/network/contract-config'

const TYPES = ['sound', 'art']

const CreateProposal = () => {
  const [daoList, setDaoList] = useAtom(daoListAtom)
  const [myNft] = useAtom(createdNftsAtom)
  const form = useForm({
    initialValues: {
      proposal: '',
      type: '',
      item: '',
      price: 0,
      date: null as Date | null,
    },
    validate: {
      proposal: (value) => (!value ? 'Proposal is required' : null),
      type: (value) => (!TYPES.includes(value) ? "Type must be 'sound' or 'art'" : null),
      item: (value) => (!value ? 'description is required' : null),
      price: (value) => (value <= 0 ? 'price is required' : null),
      date: (value) => (!value ? 'date is required' : null),
    },
  })

  const items = myNft.map((nft) => ({ label: nft.title, value: nft.id.toString() }))

  const { activeAddress, signTransactions, sendTransactions } = useWallet()

  const sendTransaction = async (from = activeAddress, to = activeAddress, amount = 0.1) => {
    try {
      if (!from || !to || !amount) {
        throw new Error('Missing transaction params.')
      }
      amount = amount * 1000000
      const suggestedParams = await getAlgodClient().getTransactionParams().do()

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

  const createProposal = async () => {
    if (!activeAddress) {
      throw new Error('Connect Your Wallet')
    }
    if (!form.isValid()) {
      const a = form.validate()
      const errorsKey = Object.keys(a.errors)
      throw new Error(a.errors[errorsKey[0]] as string)
    }
    await sendTransaction(activeAddress, activeAddress, form.values.price)
    setDaoList((prev) => [
      ...prev,
      {
        nftId: daoList.length,
        price: form.values.price,
        type: form.values.type as 'sound' | 'art',
        voters: 0,
        proposal: form.values.proposal,
      },
    ])
  }

  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: createProposal,
    onSuccess: () => {
      toast.success(`Proposal was created successfully`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const create = async () => {
    await mutateAsync()
  }

  return (
    <div className="routePage space-y-12 pb-32 max-w-[850px]">
      <div className="routeName mb-14">Create Proposal</div>
      <div className="space-y-5">
        <TextInput {...form.getInputProps('proposal')} classNames={classes} required label="Title" placeholder="Your Proposal Title" />
        <div>
          <div className="mb-2">
            NFT Type <span className="text-[#8A2BE2]">*</span>
          </div>
          <Select {...form.getInputProps('type')} placeholder="Nft Type" data={TYPES} classNames={classes} />
        </div>
        <div>
          <div className="mb-2">
            Item <span className="text-[#8A2BE2]">*</span>
          </div>
          <Select {...form.getInputProps('item')} placeholder="Choose Item" data={items} classNames={classes} />
        </div>
        <DateInput label="Closing Date" {...form.getInputProps('date')} classNames={classes} placeholder="Date input" required />
        <NumberInput {...form.getInputProps('price')} classNames={classes} required label="Dao Price" placeholder="0.0 ALGO" />
      </div>
      <Button fullWidth size="lg" loading={isPending && !isError} onClick={create} radius={'md'} mt={32}>
        Create
      </Button>
    </div>
  )
}

export default CreateProposal
