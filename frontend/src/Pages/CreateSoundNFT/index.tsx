import { Icon } from '@iconify/react'
import { Button, FileInput, NumberInput, Select, Text, TextInput, Textarea } from '@mantine/core'
import '@mantine/dates/styles.css'
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
import { DateInput } from '@mantine/dates'
import { getTimeStamp } from '../../utils/parsing'
import { encodeText, generateBoxKey } from '../../utils/encoding'

const GENRES = ['Pop', 'Electronic', 'R&B', 'Alte', 'Reggae', 'Afrobeat', 'Rock', 'Amapiano']

const SButton = () => <Button radius="md">Upload File</Button>

const CreateSoundNFt = () => {
  const { activeAddress } = useWallet()
  const [appClient] = useAtom(appClientAtom)
  const [appRef] = useAtom(appRefAtom)
  const [creative] = useAtom(aurallyCreativeAtom)
  const [auraToken] = useAtom(auraTokenAtom)
  const openRef = useRef<() => void>(null)

  const form = useForm({
    initialValues: {
      title: '',
      label: '',
      artist: '',
      genre: '',
      desc: '',
      supply: 0,
      price: 0,
      releaseDate: "",
      sample: null as File | null,
      audio: null as File | null,
      files: [] as FileWithPath[],
      errors: [] as FileRejection[],
    },
    validate: {
      title: (value) => (!value ? 'title is required' : null),
      label: (value) => (!value ? 'label is required' : null),
      artist: (value) => (!value ? 'artist is required' : null),
      genre: (value) => (!value ? 'genre is required' : null),
      desc: (value) => (!value ? 'description is required' : null),
      supply: (value) => (value <= 0 ? 'supply is required' : null),
      price: (value) => (value <= 0 ? 'price is required' : null),
      sample: (value) => (!value ? 'Provide a sample audio file' : null),
      audio: (value) => (!value ? 'Provide a valid audio file' : null),
      files: (value) => (!value[0] ? 'Provide a cover image' : null),
    },
  })

  const imageFile = form.values.files[0]
  const name = imageFile?.name || imageFile?.path
  const error = form.values.errors[0]?.errors[0]?.message


  const createArtCall = async () => {
    const assetKey = generateBoxKey("Sound", form.values.title, activeAddress ?? "")
    const toastId = toast.loading('Uploading files')
    const imageUrl = await uploadToIpfs(imageFile)
    const sampleUrl = await uploadToIpfs(form.values.sample as File)
    const audioUrl = await uploadToIpfs(form.values.audio as File)

    toast.success('File uploaded successfully', {
      id: toastId,
    })

    const sp = await getAlgodClient().getTransactionParams().do()

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject(
      {
        from: activeAddress ?? "",
        to: activeAddress ?? "",
        amount: 0, suggestedParams: sp
      }
    )
    await appClient?.createSoundNft(
      {
        txn,
        audio_sample_ipfs: sampleUrl,
        label: form.values.label,
        title: form.values.title,
        genre: form.values.genre,
        supply: form.values.supply,
        nft_name: form.values.title,
        full_track_ipfs: audioUrl,
        cover_image_ipfs: imageUrl,
        price: form.values.price,
        artist: form.values.artist,
        creator: activeAddress ?? "",
        asset_key: assetKey,
        aura_asset: Number(auraToken?.asset_id ?? 0),
        release_date: getTimeStamp(form.values.releaseDate) ?? 0
      },
      {
        boxes: [
          { appId: appRef?.appId ?? 0, name: encodeText(assetKey) },
          { appId: appRef?.appId ?? 0, name: encodeText("aura") },
          { appId: appRef?.appId ?? 0, name: algosdk.decodeAddress(activeAddress ?? "").publicKey }
        ]
      }
    )
    form.reset()
  }

  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: createArtCall,
    onSuccess: () => {
      modals.openContextModal({
        modal: 'message',
        innerProps: {
          title: 'Aura Nft Created',
          icon: 'success',
          desc: 'Your aura has been created successfully',
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
    <form title={!creative ? "You need to become a creative first" : undefined} onSubmit={create} className="routePage mb-32 max-w-[850px]">
      <fieldset disabled={!creative} className={!creative ? "pointer-events-none opacity-60" : ""}>
        <div className="routeName mb-10">Upload</div>
        <div className="space-y-5">
          <div>
            <div>
              Music Cover <span className="text-[#8A2BE2]">*</span>
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
                  ) : name ? (
                    <span className="text-[#8A2BE2]">{name}</span>
                  ) : (
                    'Upload Cover'
                  )}
                </Dropzone.Idle>
              </Text>
              <Text ta="center" fz="sm" mt="xs" c="dimmed">
                Drag&apos;n&apos;drop files here to upload. Files must be less than 3mb in size.
              </Text>
            </div>
          </Dropzone>
          <FileInput
            rightSection={<SButton />}
            label="Audio File"
            placeholder="(WAV or MP3)"
            required
            accept="audio/*"
            rightSectionPointerEvents="none"
            {...form.getInputProps('audio')}
            classNames={{ ...classes, input: classes.input2, section: classes.section2 }}
            mt="md"
          />
          <FileInput
            rightSection={<SButton />}
            label="Sample Audio File"
            description="No more than 15 seconds"
            placeholder="No more than 15 seconds"
            required
            accept="audio/*"
            rightSectionPointerEvents="none"
            {...form.getInputProps('sample')}
            classNames={{ ...classes, input: classes.input2, section: classes.section2 }}
            mt="md"
          />
          <TextInput {...form.getInputProps('title')} classNames={classes} required label="Music Title" placeholder="Your music title" />
          <TextInput {...form.getInputProps('label')} classNames={classes} required label="Music Label" placeholder="Your music label" />
          <TextInput {...form.getInputProps('artist')} classNames={classes} required label="Artist" placeholder="Add name of artists" />
          <div>
            <div className="mb-2">
              Genre <span className="text-[#8A2BE2]">*</span>
            </div>
            <Select {...form.getInputProps('genre')} placeholder="Pick a genre" data={GENRES} classNames={classes} />
          </div>
          <NumberInput {...form.getInputProps('supply')} classNames={classes} required label="Supply" placeholder="200" />
          <NumberInput {...form.getInputProps('price')} classNames={classes} required label="Stream Price" placeholder="0.0 ALGO" />
          <DateInput {...form.getInputProps('releaseDate')} placeholder='December 10, 2023' classNames={classes} required label="Release Data" />
          <Textarea
            required
            autosize
            minRows={8}
            label="Description"
            {...form.getInputProps('desc')}
            classNames={classes}
            placeholder="Description about your music"
          />
          <Button type='submit' fullWidth size="lg" radius={'md'} mt={32} loading={isPending && !isError}>
            Create
          </Button>
        </div>
      </fieldset>
    </form>
  )
}

export default CreateSoundNFt
