import { Icon } from '@iconify/react'
import { Button, NumberInput, Text, TextInput, Textarea } from '@mantine/core'
import { Dropzone, FileRejection, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { useMutation } from '@tanstack/react-query'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { nftListAtom } from '../../store/atoms'
import classes from '../../styles/textinput.module.css'
import { uploadToIpfs } from '../../utils/ipfs-calls'
import { getAlgodClient } from '../../utils/network/contract-config'
import { appClientAtom, appRefAtom } from '../../store/contractAtom'
import { auraAtom } from '../../store/auraAtoms'
import encodeText from '../../utils/encoding'

const CreateArtNft = () => {
  const { activeAddress, signTransactions, sendTransactions } = useWallet()
  const openRef = useRef<() => void>(null)
  const [appClient,] = useAtom(appClientAtom)
  const [auraToken,] = useAtom(auraAtom)
  const [appRef,] = useAtom(appRefAtom)
  const [nftList, setNftList] = useAtom(nftListAtom)
  const form = useForm({
    initialValues: {
      title: '',
      desc: '',
      artist: '',
      price: 0,
      supply: 0,
      files: [] as FileWithPath[],
      errors: [] as FileRejection[],
    },
    validate: {
      title: (value) => (!value ? 'title is required' : null),
      // artist: (value) => (!value ? 'artist is required' : null),
      desc: (value) => (!value ? 'description is required' : null),
      price: (value) => (value <= 0 ? 'price is required' : null),
      supply: (value) => (value <= 0 ? 'supply is required' : null),
      files: (value) => (!value[0] ? 'Provide a cover image' : null),
    },
  })

  const imageFile = form.values.files[0]
  const imageName = imageFile?.name || imageFile?.path
  const error = form.values.errors[0]?.errors[0]?.message

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
    const toastId = toast.loading('Uploading files')
    const url = await uploadToIpfs(imageFile)
    toast.success('File uploaded successfully', {
      id: toastId,
    })
    await sendTransaction(activeAddress, activeAddress, Number(form.values.price.toString()))

    setNftList((prev) => [
      ...prev,
      {
        id: nftList.length,
        title: form.values.title,
        supply: form.values.supply,
        desc: form.values.desc,
        price: form.values.price,
        artist: '@user23456',
        imgUrl: url,
        type: 'art',
      },
    ])
  }

  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: createArtCall,
    onSuccess: () => {
      modals.openContextModal({
        modal: 'message',
        innerProps: {
          title: 'Art Nft Created',
          icon: 'success',
          desc: 'Your art has been created successfully',
          btnLabel: 'View activity',
          link: `/dapp/marketplace/art/${nftList.length}`,
        },
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const assetKey = `${form.values.title} ${new Date().toLocaleString()}`
    const url = await uploadToIpfs(imageFile)
    const sp = await getAlgodClient().getTransactionParams().do()
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({ from: activeAddress ?? "", to: activeAddress ?? "", amount: 0, suggestedParams: sp })
    appClient?.createArtNft(
      {
        nft_name: form.values.title,
        name: form.values.title,
        price: form.values.price,
        supply: form.values.supply,
        creator: activeAddress ?? "",
        for_sale: true,
        asset_key: assetKey,
        description: form.values.desc,
        title: form.values.title,
        ipfs_location: url,
        txn: txn,
        aura_asset: auraToken?.asset_id ?? 0
      },
      {
        boxes: [
          { appId: appRef?.appId ?? 0, name: encodeText(url)},
          { appId: appRef?.appId ?? 0, name: encodeText("aura")},
          { appId: appRef?.appId ?? 0, name: algosdk.decodeAddress(activeAddress ?? "").publicKey}
        ]
      }
    )
    await mutateAsync()
  }

  return (
    <form onSubmit={create} className="routePage mb-32 max-w-[850px]">
      <div className="routeName mb-10">Create NFT</div>
      <div className="space-y-5">
        <div>
          <div>
            Upload Media <span className="text-[#8A2BE2]">*</span>
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
        <TextInput {...form.getInputProps('title')} classNames={classes} required label="Title" placeholder="Your NFT Title" />
        <NumberInput {...form.getInputProps('supply')} classNames={classes} required label="Supply" placeholder="1" />
        <NumberInput {...form.getInputProps('price')} classNames={classes} required label="Bid Price" placeholder="0.0 ALGO" />
        <Textarea {...form.getInputProps('desc')} classNames={classes} required label="Description" placeholder="Enter a description" />
      </div>
      <Button type="submit" fullWidth size="lg" radius={'md'} mt={32} loading={isPending && !isError}>
        Create
      </Button>
    </form>
  )
}

export default CreateArtNft
