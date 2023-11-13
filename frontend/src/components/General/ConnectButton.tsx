// import { Icon } from '@iconify/react'
import { Button } from '@mantine/core'
import { useWallet } from '@txnlab/use-wallet'
import { ellipseAddress } from '../../utils/ellipseAddress'
import { modals } from '@mantine/modals'

const ConnectButton = () => {
  const { activeAddress } = useWallet()
  const open = () => {
    modals.openContextModal({
      modal: 'wallet',
      title: activeAddress ? 'My Wallet' : 'Select wallet provider',
      innerProps: {},
    })
  }

  const elipsedAddress = activeAddress && ellipseAddress(activeAddress, 5)

  return (
    <Button onClick={open} variant="filled" size="lg" radius={'xl'}>
      {activeAddress ? elipsedAddress : 'Connect Wallet'}
    </Button>
  )
}

// rightSection={<Icon icon="solar:wallet-broken" width="24" />}

export default ConnectButton
