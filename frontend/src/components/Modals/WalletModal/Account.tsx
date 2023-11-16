import { Icon } from '@iconify/react'
import { useMemo } from 'react'
import { ellipseAddress } from '../../../utils/ellipseAddress'
import { getAlgodConfigFromViteEnvironment } from '../../../utils/network/getAlgoClientConfigs'
import CopyButton from '../../General/CopyButton'
import useAppClient from '../../../hooks/useAppClient'
import { useQuery } from '@tanstack/react-query'

const BalanceList = ({ name, amount, price }: { name: string; amount: number; price: number }) => {
  return (
    <div className="flex items-center justify-between gap-5 p-4 border-[#444] border rounded-xl">
      <div className="flex items-center gap-3">
        <Icon icon="cryptocurrency:algo" width="20" />
        <span>
          {amount.toFixed(2)} {name}
        </span>
      </div>
      <span>${(amount * price).toFixed(2)}</span>
    </div>
  )
}

const Account = ({ activeAddress }: { activeAddress?: string }) => {
  const { getBalance } = useAppClient()
  const algoConfig = getAlgodConfigFromViteEnvironment()

  const dappFlowNetworkName = useMemo(() => {
    return algoConfig.network === '' ? 'sandbox' : algoConfig.network.toLocaleLowerCase()
  }, [algoConfig.network])

  const { data } = useQuery({
    queryKey: ['algo-balance'],
    queryFn: () => getBalance(activeAddress),
    enabled: !!activeAddress,
    initialData: {
      name: 'ALGO',
      amount: 0,
      price: 0,
    },
  })

  // console.log(data)

  return (
    <div>
      <div className="bg-[#111]/75 p-4 rounded-xl flex items-center justify-between">
        <span className="text-sm min-[375px]:text-base">
          <span>{ellipseAddress(activeAddress, innerWidth >= 375 ? 10 : 8)}</span>
        </span>
        <CopyButton text={activeAddress} />
      </div>
      <a
        className="border border-[#444] px-2 py-1 rounded-3xl flex gap-2 items-center w-max mt-4 text-sm min-[375px]:text-base"
        target="_blank"
        href={`https://app.dappflow.org/setnetwork?name=${dappFlowNetworkName}&redirect=explorer/account/${activeAddress}/`}
      >
        <span>visit explorer</span> <Icon icon="heroicons-outline:external-link" />
      </a>
      <div className="w-max font-bold mt-6">Assets</div>
      <div className="space-y-4 mt-2 mb-4">
        <BalanceList {...data} />
        <BalanceList name="AURA" amount={0} price={0} />
      </div>
      {/* <div className="text-xl">Network: {algoConfig.network === '' ? 'localnet' : algoConfig.network}</div> */}
    </div>
  )
}

export default Account
