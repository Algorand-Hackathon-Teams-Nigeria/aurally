import { Icon } from '@iconify/react'
import { ActionIcon } from '@mantine/core'
import { useTimeout } from '@mantine/hooks'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

const CopyButton = ({ text }: { text?: string }) => {
  const [copied, setCopied] = useState(false)
  const { start } = useTimeout(() => setCopied(false), 500)

  const handleCopy = () => {
    setCopied(true)
    start()
  }

  return (
    <CopyToClipboard text={text || ''} onCopy={handleCopy}>
      <ActionIcon variant="default">
        <Icon
          onClick={handleCopy}
          color={copied ? '#8a2be2' : ''}
          icon={copied ? 'fluent:checkmark-48-filled' : 'solar:copy-broken'}
          fontSize="1.1em"
        />
      </ActionIcon>
    </CopyToClipboard>
  )
}

export default CopyButton
