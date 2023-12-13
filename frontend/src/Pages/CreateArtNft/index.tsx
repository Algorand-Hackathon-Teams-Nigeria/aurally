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
import classes from '../../styles/textinput.module.css'
import { uploadToIpfs } from '../../utils/ipfs-calls'
import { getAlgodClient } from '../../utils/network/contract-config'
import { appClientAtom, appRefAtom, auraTokenAtom, aurallyCreativeAtom } from '../../store/contractAtom'
import { encodeText, generateBoxKey } from '../../utils/encoding'

const CreateArtNft = () => {
  const { activeAddress } = useWallet()
  const openRef = useRef<() => void>(null)
  const [appClient] = useAtom(appClientAtom)
  const [creative] = useAtom(aurallyCreativeAtom)
  const [auraToken] = useAtom(auraTokenAtom)
  const [appRef] = useAtom(appRefAtom)

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
      desc: (value) => (!value ? 'description is required' : null),
      price: (value) => (value <= 0 ? 'price is required' : null),
      supply: (value) => (value <= 0 ? 'supply is required' : null),
      files: (value) => (!value[0] ? 'Provide a cover image' : null),
    },
  })

  const imageFile = form.values.files[0]
  const imageName = imageFile?.name || imageFile?.path
  const error = form.values.errors[0]?.errors[0]?.message

  const createArtCall = async () => {
    const assetKey = generateBoxKey('Art', form.values.title, activeAddress ?? '')
    const url = await uploadToIpfs(imageFile)
    const sp = await getAlgodClient().getTransactionParams().do()

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: activeAddress ?? '',
      to: activeAddress ?? '',
      amount: 0,
      suggestedParams: sp,
    })

    await appClient?.createArtNft(
      {
        nft_name: form.values.title,
        name: form.values.title,
        price: BigInt(form.values.price * 1_000000),
        supply: BigInt(form.values.supply),
        creator: activeAddress ?? '',
        asset_key: assetKey,
        description: form.values.desc,
        title: form.values.title,
        ipfs_location: url,
        txn: txn,
        aura_asset: auraToken?.asset_id ?? 0,
      },
      {
        boxes: [
          { appId: appRef?.appId ?? 0, name: encodeText(assetKey) },
          { appId: appRef?.appId ?? 0, name: encodeText('aura') },
          { appId: appRef?.appId ?? 0, name: algosdk.decodeAddress(activeAddress ?? '').publicKey },
        ],
      },
    )
    form.reset()
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
          btnLabel: 'Explore Arts',
          link: `/dapp/marketplace`,
        },
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await mutateAsync()
  }

  return (
    <form
      title={!creative ? 'You need to register as a creative first' : undefined}
      onSubmit={create}
      className={`routePage mb-32 max-w-[850px]`}
    >
      <fieldset className={!creative ? 'pointer-events-none opacity-60' : ''} disabled={!creative}>
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
      </fieldset>
    </form>
  )
}

export default CreateArtNft
