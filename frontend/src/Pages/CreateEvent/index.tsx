import { useRef } from 'react'
import { Button, TextInput, Text, NumberInput, Textarea, Group, Radio } from '@mantine/core'
import { Dropzone, FileRejection, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import classes from '../../styles/textinput.module.css'
import { Icon } from '@iconify/react'
import { modals } from '@mantine/modals'
import { useWallet } from '@txnlab/use-wallet'
import toast from 'react-hot-toast'
// import { algodClient } from '../../utils/contract-config'
// import algosdk from 'algosdk'
import { useMutation } from '@tanstack/react-query'
// import { nftListAtom } from '../../store/atoms'
// import { useAtom } from 'jotai'
// import { uploadToIpfs } from '../../utils/ipfs-calls'
import { useForm } from '@mantine/form'

const CreateEvent = () => {
  const { activeAddress } = useWallet()
  const openRef = useRef<() => void>(null)
  const form = useForm({
    initialValues: {
      title: '',
      desc: '',
      artist: '',
      price: 0,
      files: [] as FileWithPath[],
      errors: [] as FileRejection[],
    },
    validate: {
      title: (value) => (!value ? 'title is required' : null),
      artist: (value) => (!value ? 'artist is required' : null),
      desc: (value) => (!value ? 'description is required' : null),
      price: (value) => (value <= 0 ? 'price is required' : null),
      files: (value) => (!value[0] ? 'Provide a cover image' : null),
    },
  })

  const imageFile = form.values.files[0]
  const imageName = imageFile?.name || imageFile?.path
  const error = form.values.errors[0]?.errors[0]?.message

  // const sendTransaction = async (from = activeAddress, to = activeAddress, amount = 0.1) => {
  //   try {
  //     if (!from || !to || !amount) {
  //       throw new Error('Missing transaction params.')
  //     }
  //     amount = amount * 1000000

  //     const suggestedParams = await algodClient.getTransactionParams().do()

  //     const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
  //       from,
  //       to,
  //       amount,
  //       suggestedParams,
  //     })

  //     const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)
  //     const signedTransactions = await signTransactions([encodedTransaction])
  //     const waitRoundsToConfirm = 4
  //     const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
  //     return id
  //   } catch (error) {
  //     throw new Error('Error while sending transaction')
  //   }
  // }

  const createArtCall = async () => {
    if (!activeAddress) {
      throw new Error('Connect Your Wallet')
    }
    if (error) {
      throw new Error(error)
    }
    if (!form.isValid()) {
      const a = form.validate()
      const errorsKey = Object.keys(a.errors)
      throw new Error(a.errors[errorsKey[0]] as string)
    }
    // const toastId = toast.loading('Uploading files')
    // const url = await uploadToIpfs(imageFile)
    // toast.success('File uploaded successfully', {
    //   id: toastId,
    // })
    // await sendTransaction(activeAddress, activeAddress, Number(form.values.price.toString()))

    // setEventList((prev) => [
    //   ...prev,
    //   {
    //     id: nftList.length,
    //     title: form.values.title,
    //     desc: form.values.desc,
    //     price: form.values.price,
    //     creator: '@user23456',
    //     imgUrl: url,
    //     type: 'art',
    //   },
    // ])
  }

  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: createArtCall,
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
    <div className="routePage mb-32 max-w-[850px]">
      <div className="routeName mb-10">Create Event</div>
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
        <TextInput {...form.getInputProps('title')} classNames={classes} required label="Event Title" placeholder="Your NFT Title" />
        <Radio.Group label="Event Entry" classNames={{ required: classes.required }} withAsterisk>
          <Group mt="xs">
            <Radio classNames={{ radio: classes.checkbox_input }} value="free" label="Free" />
            <Radio classNames={{ radio: classes.checkbox_input }} value="paid" label="Paid" />
          </Group>
        </Radio.Group>
        <Textarea {...form.getInputProps('desc')} classNames={classes} required label="Description" placeholder="Enter a description" />
        <NumberInput {...form.getInputProps('price')} classNames={classes} required label="Ticket Price" placeholder="0.0 ALGO" />
        <Radio.Group label="Event Entry" classNames={{ required: classes.required }} withAsterisk>
          <Group mt="xs">
            <Radio classNames={{ radio: classes.checkbox_input }} value="free" label="Free" />
            <Radio classNames={{ radio: classes.checkbox_input }} value="paid" label="Paid" />
          </Group>
        </Radio.Group>
      </div>
      <Button fullWidth size="lg" radius={'md'} mt={32} loading={isPending && !isError} onClick={create}>
        Create
      </Button>
    </div>
  )
}

export default CreateEvent
