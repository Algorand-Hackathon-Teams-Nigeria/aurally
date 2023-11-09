import { Avatar, Button, Modal } from '@mantine/core'
import { Provider, useWallet } from '@txnlab/use-wallet'
import { useAtom } from 'jotai'
import { walletModalAtom } from '../General/ConnectButton'
import Account from './Account'
import classes from './wallet.module.css'

const WalletModal = () => {
  const { providers, activeAddress } = useWallet()
  const isKmd = (provider: Provider) => provider.metadata.name.toLowerCase() === 'kmd'
  const [opened, setClose] = useAtom(walletModalAtom)

  const close = () => {
    setClose(false)
  }

  const logout = () => {
    if (providers) {
      const activeProvider = providers.find((p) => p.isActive)
      if (activeProvider) {
        activeProvider.disconnect()
      } else {
        // Required for logout/cleanup of inactive providers
        // For instance, when you login to localnet wallet and switch network
        // to testnet/mainnet or vice verse.
        localStorage.removeItem('txnlab-use-wallet')
        window.location.reload()
      }
    }
  }

  return (
    <Modal title={activeAddress ? 'My Wallet' : 'Select wallet provider'} opened={opened} onClose={close}>
      <div className="flex flex-col items-center">
        {!activeAddress && (
          <div className="text-sm max-w-xs tracking-wider text-center mt-3">You can talk about our music journey and achievements</div>
        )}
        <div className="w-full grid gap-3 mt-6">
          {activeAddress ? (
            <>
              <Account activeAddress={activeAddress} />
            </>
          ) : (
            providers?.map((provider) => (
              <Button
                size="md"
                radius={'md'}
                color="#444"
                variant="outline"
                key={`provider-${provider.metadata.id}`}
                onClick={() => {
                  return provider.connect()
                }}
                classNames={{ root: classes.root, inner: classes.inner }}
              >
                {!isKmd(provider) && <Avatar src={provider.metadata.icon} alt={`wallet_icon_${provider.metadata.id}`} />}
                <span>{isKmd(provider) ? 'LocalNet Wallet' : `${provider.metadata.name} Wallet`}</span>
              </Button>
            ))
          )}
        </div>
      </div>

      {activeAddress && (
        <Button className="tracking-wider" size="md" radius="md" mt={20} fullWidth onClick={logout}>
          Disconnect
        </Button>
      )}
    </Modal>
  )
}

export default WalletModal
