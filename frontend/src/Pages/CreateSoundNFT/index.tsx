import { useRef, useState } from 'react'
import { Button, TextInput, Text, Select, FileInput } from '@mantine/core'
import { Dropzone, FileRejection, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import classes from '../../styles/textinput.module.css'
import { Icon } from '@iconify/react'
import { modals } from '@mantine/modals'
import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'

const GENRES = ['Pop', 'Electronic', 'R&B', 'Alte', 'Reggae', 'Afrobeat', 'Rock', 'Amapiano']

const SButton = () => <Button radius="md">Upload File</Button>

const CreateSoundNFt = () => {
  const [dateValue, setDateValue] = useState<Date | null>(null)
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
        <div className="routeName">Upload</div>
        <Button size="md" radius={'md'} onClick={uploadcall}>
          Upload
        </Button>
      </div>
      <div className="space-y-5 max-w-[850px]">
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
          rightSectionPointerEvents="none"
          classNames={{ ...classes, input: classes.input2, section: classes.section2 }}
          mt="md"
        />
        <FileInput
          rightSection={<SButton />}
          label="Sample Audio File"
          description="No more than 15 seconds"
          placeholder="No more than 15 seconds"
          required
          rightSectionPointerEvents="none"
          classNames={{ ...classes, input: classes.input2, section: classes.section2 }}
          mt="md"
        />
        <TextInput classNames={classes} required label="Music Title" placeholder="Your music title" />
        <TextInput classNames={classes} required label="Music Label" placeholder="Your music label" />
        <TextInput classNames={classes} required label="Artist" placeholder="Add name of artists" />
        <DateInput
          classNames={classes}
          rightSection={<Icon icon="uil:calender" width="20px" />}
          value={dateValue}
          onChange={setDateValue}
          label="Date input"
          placeholder="Date input"
        />
        <div>
          <div className="mb-2">
            Genre <span className="text-[#8A2BE2]">*</span>
          </div>
          <Select placeholder="Pick a genre" data={GENRES} classNames={classes} />
        </div>
        <TextInput classNames={classes} required label="Music Link" placeholder="Paste link" />
        <TextInput classNames={classes} required label="Stream Price" placeholder="0.0 ALGO" />
        {/* <div className="pt-10">
          <div>
            <div>
              Audio Files for Selling <span className="text-[#8A2BE2]">*</span>
            </div>
            <div>
              <div className="text-sm opacity-70">Upload the necessarv beat tiles here</div>
            </div>
          </div>
          <div className=" grid md:grid-cols-2 md:gap-10">
            <FileInput
              rightSection={<SButton />}
              label="Un-Tagged Beat"
              placeholder="Un-Tagged (WAV or MP3)"
              required
              rightSectionPointerEvents="none"
              classNames={{ ...classes, input: classes.input2, section: classes.section2 }}
              mt="md"
            />
            <FileInput
              rightSection={<SButton />}
              label="Terms or Use"
              placeholder="Terms of use (PDF or.DOC)"
              required
              rightSectionPointerEvents="none"
              classNames={{ ...classes, input: classes.input2, section: classes.section2 }}
              mt="md"
            />
            <FileInput
              rightSection={<SButton />}
              label="Track Stems"
              placeholder="Track Stems (ZIP or RAR)"
              required
              rightSectionPointerEvents="none"
              classNames={{ ...classes, input: classes.input2, section: classes.section2 }}
              mt="md"
            />
            <FileInput
              rightSection={<SButton />}
              label="Tagged Beat (Audio File for streaming)"
              placeholder="Tagged (WAV or MP3)"
              required
              rightSectionPointerEvents="none"
              classNames={{ ...classes, input: classes.input2, section: classes.section2 }}
              mt="md"
            />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default CreateSoundNFt
