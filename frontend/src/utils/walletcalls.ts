import algosdk from 'algosdk'
import { getAlgodClient } from './network/contract-config'

export async function getBalance(address?: string) {
  if (!address) {
    return {
      name: 'ALGO',
      amount: 0,
      price: 0,
    }
  }

  const accountInfo = await getAlgodClient().accountInformation(address).do()
  console.log(accountInfo)
  const balance = algosdk.microalgosToAlgos(accountInfo.amount)
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=algorand&vs_currencies=usd')
  const algoData = await response.json()

  return {
    name: 'ALGO',
    amount: balance || 0,
    price: algoData.algorand.usd || 0,
  }
}
