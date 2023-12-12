import { Button, TextInput, Textarea } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { useAtom } from 'jotai'
import toast from 'react-hot-toast'
import classes from '../../styles/textinput.module.css'

const Page = () => {
  const { activeAddress, signTransactions, sendTransactions } = useWallet()

  const form = useForm({
    initialValues: {
      proposal: '',
      details: "",
      date: null as Date | null,
    },
    validate: {
      proposal: (value) => (!value ? 'Proposal title is required' : null),
      details: (value) => (!value ? "Proposal details is required" : null),
      date: (value) => (!value ? 'date is required' : null),
    },
  })


  const createProposal = async () => {

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
        <Textarea autosize minRows={8} {...form.getInputProps("details")} classNames={classes} required label="Details" placeholder='You Proposal Details' />
        <DateInput label="Closing Date" {...form.getInputProps('date')} classNames={classes} placeholder="Date input" required />
      </div>
      <Button fullWidth size="lg" loading={isPending && !isError} onClick={create} radius={'md'} mt={32}>
        Create
      </Button>
    </div>
  )
}

export default Page
