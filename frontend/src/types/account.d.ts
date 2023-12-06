type WalletAccountType = {
  address: string
  amount: number
  assets: {
    amount: number
    'asset-id': number
    'if-frozen': boolean
  }[]
  'min-balance': number
}
