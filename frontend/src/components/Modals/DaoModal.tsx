import { Button } from '@mantine/core'
import { ContextModalProps, modals } from '@mantine/modals'

const DaoModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  key: string
  title: string
  details: string
  end_date: number
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

  const dat = new Date(innerProps.end_date).toDateString()
  return (
    <>
      <div className="border-[#444] border py-2 px-3 rounded-lg mb-6">
        <div className="w-full space-y-3">
          <div>
            <div className="font-bold text-sm">Description</div>
            <div className="text-[#AFAFAF] text-xs">{innerProps.details}</div>
          </div>
          <div>
            <div className="font-bold text-sm">Closing Date</div>
            <div className="text-[#AFAFAF] text-xs">{dat}</div>
          </div>
        </div>
      </div>
      <Button size="md" fullWidth radius={'md'} onClick={message}>
        Vote Now
      </Button>
    </>
  )
}

export default DaoModal
