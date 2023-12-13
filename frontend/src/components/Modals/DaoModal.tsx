import { Button } from '@mantine/core'
import { ContextModalProps, modals } from '@mantine/modals'

const DaoModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  title: string
  details: string
  endDate: string
  btnAction?: () => void
}>) => {
  const message = () => {
    context.closeModal(id)
    innerProps.btnAction?.()
    modals.openContextModal({
      modal: 'message',
      innerProps: {
        title: 'Voted Successfully',
        icon: 'success',
        desc: 'You have successfully voted for this Top10 playlist',
        btnLabel: 'Start streaming',
      },
    })
  }

  return (
    <>
      <div className="mb-5">{innerProps.title}</div>
      <div className="border-[#444] border py-2 px-3 rounded-lg mb-6">
        <table className="w-full text-xs">
          <tr>
            <td className="py-2">Sound name</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.details}</td>
          </tr>
          <tr>
            <td className="py-2">Creator</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.endDate}</td>
          </tr>
        </table>
      </div>
      <Button size="md" fullWidth radius={'md'} onClick={message}>
        Vote Now
      </Button>
    </>
  )
}

export default DaoModal
