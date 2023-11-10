import { Button } from '@mantine/core'
import { ContextModalProps, modals } from '@mantine/modals'

const BuyModal = ({
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
  const buy = () => {
    context.closeModal(id)
    innerProps.btnAction?.()
    modals.openContextModal({
      modal: 'message',
      innerProps: {
        title: 'Stream Purchase successful',
        icon: 'ph:check-circle-thin',
        purpleDesc: 'Beat the flow',
        desc: 'You have successfully purchased',
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
            <td className="py-2">Summary</td>
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
            <td className="py-2">Price</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.price}</td>
          </tr>
          <tr>
            <td className="py-2">Released date</td>
            <td className="text-end text-[#AFAFAF]">{innerProps.relase_date}</td>
          </tr>
        </table>
      </div>
      <Button size="md" fullWidth radius={'md'} onClick={buy}>
        Get Now
      </Button>
    </>
  )
}

export default BuyModal
