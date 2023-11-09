import { Icon } from '@iconify/react'
import { Button, Modal } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { useState } from 'react'

export const buyDetailsAtom = atom({
  opened: false,
  name: '',
  author: '',
  total_stream: '',
  price: '',
  relase_date: '',
})

const BuyModal = () => {
  const [details, setDetails] = useAtom(buyDetailsAtom)
  const [isSuccess, setIsSuccess] = useState(false)
  const close = () => {
    setDetails({
      ...details,
      opened: false,
    })
  }

  const buy = () => {
    if (isSuccess) {
      close()
    } else {
      setIsSuccess(true)
    }
  }

  return (
    <Modal opened={details.opened} onClose={close}>
      {isSuccess ? (
        <>
          <div className="text-xl text-center">Stream Purchase successful</div>
          <div className="text-sm text-center mt-2">
            You have successfully purchased <span className="text-[#8a2be2]">Beat the flow</span>
          </div>
          <div className="h-[150px] w-[150px] mx-auto my-5">
            <Icon icon="ph:check-circle-thin" color="#00D455" width={150} />
          </div>
        </>
      ) : (
        <>
          <div className="text-xl">Summary</div>
          <div className="text-sm mb-5 mt-2">Review this information to be sure it's what you want</div>
          <div className="border-[#444] border py-2 px-3 rounded-lg mb-6">
            <table className="w-full">
              <tr>
                <td className="py-2">Summary</td>
                <td className="text-end text-[#AFAFAF]">{details.name}</td>
              </tr>
              <tr>
                <td className="py-2">Creator</td>
                <td className="text-end text-[#AFAFAF]">{details.author}</td>
              </tr>
              <tr>
                <td className="py-2">Total streams</td>
                <td className="text-end text-[#AFAFAF]">{details.total_stream}</td>
              </tr>
              <tr>
                <td className="py-2">Price</td>
                <td className="text-end text-[#AFAFAF]">{details.price}</td>
              </tr>
              <tr>
                <td className="py-2">Released date</td>
                <td className="text-end text-[#AFAFAF]">{details.relase_date}</td>
              </tr>
            </table>
          </div>
        </>
      )}
      <Button size="md" fullWidth radius={'md'} onClick={buy}>
        {isSuccess ? 'Start streaming' : 'Get Now'}
      </Button>
    </Modal>
  )
}

export default BuyModal
