import { Icon } from '@iconify/react'
import { Button } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'

const icons = {
  success: 'ph:check-circle-thin',
  gift: 'iconamoon:gift-thin',
}

const MessageModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  title: string
  icon: keyof typeof icons
  iconColor?: string
  purpleDesc?: string
  desc: string
  btnLabel: string
  btnAction?: () => void
}>) => {
  const fireAction = () => {
    context.closeModal(id)
    if (innerProps.btnAction) {
      innerProps.btnAction()
    }
  }
  return (
    <>
      <div className="text-xl text-center">{innerProps.title}</div>
      <div className="text-sm text-center mt-2">
        {innerProps.desc} {innerProps.purpleDesc && <span className="text-[#8a2be2]">{innerProps.purpleDesc}</span>}
      </div>
      <div className="h-[150px] w-[150px] mx-auto my-5">
        <Icon icon={icons[innerProps.icon]} color={innerProps.iconColor || '#00D455'} width={150} />
      </div>
      <Button size="md" fullWidth radius={'md'} onClick={fireAction}>
        {innerProps.btnLabel}
      </Button>
    </>
  )
}

export default MessageModal