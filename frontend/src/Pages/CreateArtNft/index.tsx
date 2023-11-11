import { useRef, useState } from 'react'
import { Button, TextInput, Text } from '@mantine/core'
import { Dropzone, FileRejection, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import classes from '../../styles/textinput.module.css'
import { Icon } from '@iconify/react'
import { modals } from '@mantine/modals'

const CreateArtNft = () => {
  const [files, setFiles] = useState<FileWithPath[]>([])
  const [errors, setErrors] = useState<FileRejection[]>([])
  const openRef = useRef<() => void>(null)

  const imageFile = files[0]
  const name = imageFile?.name || imageFile?.path
  const error = errors[0]?.errors[0]?.message

  const uploadcall = () => {
    modals.openContextModal({
      modal: 'message',
      innerProps: {
        title: 'Upload Successful',
        icon: 'success',
        desc: 'Your Music has been uploaded successfully',
        btnLabel: 'View activity',
      },
    })
  }

  return (
    <div className="routePage mb-32">
      <div className="flex items-center justify-between flex-wrap gap-5 mb-10">
        <div className="routeName">Create NFT</div>
        <div className="hidden md:block">
          <Button size="md" fz={14} radius={'md'} onClick={uploadcall}>
            Upload
          </Button>
        </div>
      </div>
      <div className="space-y-5 max-w-[850px]">
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
          <div className=" pointer-events-none py-6">
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
                  'Upload Media'
                )}
              </Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Drag&apos;n&apos;drop files here to upload. Files must be less than 3mb in size.
            </Text>
          </div>
        </Dropzone>
        <TextInput classNames={classes} required label="Name" placeholder="Your NFT" />
        <TextInput classNames={classes} required label="Supply" placeholder="1" />
        <TextInput classNames={classes} required label="Description" placeholder="Enter a description" />
        <TextInput classNames={classes} required label="Link" placeholder="Paste link" />
      </div>
      <div className="md:hidden mt-8">
        <Button fullWidth size="lg" fz={14} radius={'md'} onClick={uploadcall}>
          Upload
        </Button>
      </div>
    </div>
  )
}

export default CreateArtNft
