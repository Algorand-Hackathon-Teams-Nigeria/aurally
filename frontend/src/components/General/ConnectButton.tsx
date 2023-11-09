// import { Icon } from '@iconify/react'
import { Button } from '@mantine/core'
import { useWallet } from '@txnlab/use-wallet'
import { ellipseAddress } from '../../utils/ellipseAddress'
import { atom, useSetAtom } from 'jotai'

export const walletModalAtom = atom(false)

const ConnectButton = () => {
  const { activeAddress } = useWallet()
  const setIsModal = useSetAtom(walletModalAtom)
  const open = () => setIsModal(true)

  const elipsedAddress = activeAddress && ellipseAddress(activeAddress, 5)

  return (
    <Button onClick={open} variant="filled" size="lg" radius={'xl'}>
      {activeAddress ? elipsedAddress : 'Connect Wallet'}
    </Button>
  )
}

// rightSection={<Icon icon="solar:wallet-broken" width="24" />}

export default ConnectButton
