import { Button } from '@mantine/core'
import { ContextModalProps, modals } from '@mantine/modals'

const DaoModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  name: string
  author: string
  total_stream: string
  price: string
  relase_date: string
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
      <div className="text-xl">Summary</div>
      <div className="text-sm mb-5 mt-2">Review this information to be sure it's what you want</div>
      <div className="border-[#444] border py-2 px-3 rounded-lg mb-6">
        <table className="w-full">
          <tr>
            <td className="py-2">Sound name</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.name}</td>
          </tr>
          <tr>
            <td className="py-2">Creator</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.author}</td>
          </tr>
          <tr>
            <td className="py-2">Total streams</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.total_stream}</td>
          </tr>
          <tr>
            <td className="py-2">Realeased Date</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.relase_date}</td>
          </tr>
        </table>
      </div>
      <div className="border-[#444] border py-2 px-3 rounded-lg mb-6 text-sm">
        <div className="text-[#919191] mb-4">Stake fee</div>
        <div>{innerProps.price} ALGO</div>
      </div>
      <Button size="md" fullWidth radius={'md'} onClick={message}>
        Get Now
      </Button>
    </>
  )
}

export default DaoModal