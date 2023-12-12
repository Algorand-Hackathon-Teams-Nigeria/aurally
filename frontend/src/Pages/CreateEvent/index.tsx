import { useRef } from 'react'
import { Button, TextInput, Text, NumberInput } from '@mantine/core'
import { Dropzone, FileRejection, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import classes from '../../styles/textinput.module.css'
import { Icon } from '@iconify/react'
import { modals } from '@mantine/modals'
import { useWallet } from '@txnlab/use-wallet'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@mantine/form'
import algosdk from 'algosdk'
import { getAlgodClient } from '../../utils/network/contract-config'
import { useAtom } from 'jotai'
import { appClientAtom, appRefAtom } from '../../store/contractAtom'
import { encodeText, generateBoxKey } from '../../utils/encoding'
import { getTimeStamp } from '../../utils/parsing'
import { uploadToIpfs } from '../../utils/ipfs-calls'
import { DateInput } from '@mantine/dates'

const CreateEvent = () => {
  const { activeAddress } = useWallet()
  const [appClient] = useAtom(appClientAtom)
  const [appRef] = useAtom(appRefAtom)
  const openRef = useRef<() => void>(null)

  const form = useForm({
    initialValues: {
      name: '',
      startDate: '',
      endDate: '',
      ticketPrice: 0,
      files: [] as FileWithPath[],
      errors: [] as FileRejection[],
    },
    validate: {
      name: (value) => (!value ? 'name is required' : null),
      startDate: (value) => (!value ? 'start date is required' : null),
      endDate: (value) => (!value ? 'end date is required' : null),
      ticketPrice: (value) => (value <= 0 ? 'ticket price is required' : null),
      files: (value) => (!value[0] ? 'Provide a cover image' : null),
    },
  })

  const imageFile = form.values.files[0]
  const imageName = imageFile?.name || imageFile?.path
  const error = form.values.errors[0]?.errors[0]?.message


  const createEventCall = async () => {
    const url = await uploadToIpfs(imageFile)
    const eventKey = generateBoxKey("Event", form.values.name, activeAddress ?? "")
    const sp = await getAlgodClient().getTransactionParams().do()
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({ from: activeAddress ?? "", to: activeAddress ?? "", amount: 0, suggestedParams: sp })
    await appClient?.createEvent(
      {
        txn,
        name: form.values.name,
        key: eventKey,
        start_date: getTimeStamp(form.values.startDate) ?? 0,
        end_date: getTimeStamp(form.values.endDate) ?? 0,
        ticket_price: form.values.ticketPrice,
        cover_image_ipfs: url
      },
      {
        boxes: [{ appId: appRef?.appId ?? 0, name: encodeText(eventKey) }]
      }
    )
    form.reset()
  }

  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: createEventCall,
    onSuccess: () => {
      modals.openContextModal({
        modal: 'message',
        innerProps: {
          title: 'Event Created',
          icon: 'success',
          desc: 'Your event has been created successfully',
          btnLabel: 'Explore Events',
          link: `/dapp/events`,
        },
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const create = async () => {
    await mutateAsync()
  }

  return (
    <form title={!activeAddress ? "Please connect your wallet" : undefined} className="routePage mb-32 max-w-[850px]">
      <div className="routeName mb-10">Create Event</div>
      <fieldset disabled={!activeAddress} className={!activeAddress ? "pointer-events-none opacity-60" : ""}>
        <div className="space-y-5">
          <div>
            <div>
              Event Banner <span className="text-[#8A2BE2]">*</span>
            </div>
            <div>
              <div className="text-sm opacity-70">File types supported: JPG, PNG, GIF, Max size: 5 MB</div>
            </div>
          </div>
          <Dropzone
            openRef={openRef}
            onReject={(value) => form.setFieldValue('errors', value)}
            onDrop={(value) => form.setFieldValue('files', value)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            className="flex justify-center"
            radius="md"
            bg={'#1E1E1E'}
          >
            <div className=" pointer-events-none py-10">
              <Icon className="mx-auto" icon="fluent:collections-20-regular" width="38px" stroke="1.5" />
              <Text ta="center" fw={700} fz="lg" mt="lg">
                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                <Dropzone.Reject>Image must be less than 3mb</Dropzone.Reject>
                <Dropzone.Idle>
                  {error ? (
                    <span className="text-red-500">{error}</span>
                  ) : imageName ? (
                    <span className="text-[#8A2BE2]">{imageName}</span>
                  ) : (
                    'Upload Media'
                  )}
                </Dropzone.Idle>
              </Text>
              <Text ta="center" fz="sm" mt="xs" c="dimmed">
                Drag&apos;n&apos;drop files here to upload. Files must be less than 3mb in size.
              </Text>
            </div>
          </Dropzone>
          <TextInput {...form.getInputProps('name')} classNames={classes} required label="Event Title" placeholder="Your NFT Title" />
          <NumberInput {...form.getInputProps('ticketPrice')} classNames={classes} required label="Ticket Price" placeholder="0.0 ALGO" />
          <DateInput {...form.getInputProps("startDate")} classNames={classes} required label="Start Date" placeholder='December 10, 2023' />
          <DateInput {...form.getInputProps("endDate")} classNames={classes} required label="End Date" placeholder='December 10, 2023' />
        </div>
        <Button fullWidth size="lg" radius={'md'} mt={32} loading={isPending && !isError} onClick={create}>
          Create
        </Button>
      </fieldset>
    </form>
  )
}

export default CreateEvent
