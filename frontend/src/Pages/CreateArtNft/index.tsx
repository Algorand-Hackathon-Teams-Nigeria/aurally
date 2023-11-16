import { useRef, useState } from 'react'
import { Button, TextInput, Text } from '@mantine/core'
import { Dropzone, FileRejection, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import classes from '../../styles/textinput.module.css'
import { Icon } from '@iconify/react'
import { modals } from '@mantine/modals'
import { useCreateArtNFT } from '../../hooks/useContractHook'
import { useWallet } from '@txnlab/use-wallet'
import toast from 'react-hot-toast'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
// import { deployCall } from '../../utils/contractcalls'

const projectId = '2Y2uzvQN5CSqHMciRnMlmlaFtI0'
const projectSecret = '7f68efcacf3a67ceb9b738728c235d02'

const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`

const options = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
}

const client = create(options)

const CreateArtNft = () => {
  const { activeAddress, signer } = useWallet()
  const { isPending, isError, mutateAsync } = useCreateArtNFT({ address: activeAddress, signer })
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [supply, setSupply] = useState('')
  const [price, setPrice] = useState('')
  const [files, setFiles] = useState<FileWithPath[]>([])
  const [errors, setErrors] = useState<FileRejection[]>([])
  const openRef = useRef<() => void>(null)

  const imageFile = files[0]
  const imageName = imageFile?.name || imageFile?.path
  const error = errors[0]?.errors[0]?.message

  const uploadToIpfs = async () => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(imageFile)
    let url = ''
    let cid = ''
    reader.onloadend = async () => {
      const arrayBuffer = new Uint8Array(reader.result as ArrayBuffer)
      const { cid: cidInner } = await client.add(arrayBuffer)
      url = `https://ipfs.infura.io/ipfs/${cid}`
      // url = `https://gateway.pinata.cloud/ipfs/${cid}`
      cid = cidInner as unknown as string
    }
    return { url, cid }
  }

  const uploadcall = async () => {
    if (!activeAddress) {
      toast.error('Connect Your Wallet')
    }

    const { cid, url } = await uploadToIpfs()

    console.log(cid, url)

    const nft: [string, number | bigint, string, number | bigint, string, string, number | bigint, number | bigint, string, boolean] = [
      name,
      0,
      name,
      Number(supply),
      desc,
      cid,
      Number(price),
      0,
      activeAddress as string,
      true,
    ]

    // await deployCall({ address: activeAddress, signer })

    const a = await mutateAsync({
      creator: activeAddress as string,
      nft,
      _fullname: activeAddress as string,
      _username: activeAddress as string,
    })

    console.log(a)
    modals.openContextModal({
      modal: 'message',
      innerProps: {
        title: 'Sound Nft Created',
        icon: 'success',
        desc: 'Your Sound art has been created successfully',
        btnLabel: 'View activity',
      },
    })
  }

  return (
    <div className="routePage mb-32 max-w-[850px]">
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
          onReject={setErrors}
          onDrop={setFiles}
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
        <TextInput
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          classNames={classes}
          required
          label="Name"
          placeholder="Your NFT Name"
        />
        <TextInput
          value={supply}
          onChange={(e) => setSupply(e.currentTarget.value)}
          classNames={classes}
          required
          label="Supply"
          placeholder="1"
        />
        <TextInput
          value={desc}
          onChange={(e) => setDesc(e.currentTarget.value)}
          classNames={classes}
          required
          label="Description"
          placeholder="Enter a description"
        />
        <TextInput
          value={price}
          onChange={(e) => setPrice(e.currentTarget.value)}
          classNames={classes}
          required
          label="Bid Price"
          placeholder="0.0 ALGO"
        />
      </div>
      <Button fullWidth size="lg" radius={'md'} mt={32} loading={isPending && !isError} onClick={uploadcall}>
        Upload
      </Button>
    </div>
  )
}

export default CreateArtNft
