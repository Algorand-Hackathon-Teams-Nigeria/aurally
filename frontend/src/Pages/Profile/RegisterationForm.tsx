import { Button, Input } from "@mantine/core";
import React from "react";
import { getAlgodClient } from "../../utils/network/contract-config";
import algosdk from "algosdk";
import { useAtom } from "jotai";
import { appClientAtom, appRefAtom, auraTokenAtom, aurallyCreativeAtom } from "../../store/contractAtom";
import { useWallet } from "@txnlab/use-wallet";
import { toast } from "react-hot-toast";

export default function RegistrationForm() {
  const [appClient] = useAtom(appClientAtom)
  const [appRef] = useAtom(appRefAtom)
  const [auraToken] = useAtom(auraTokenAtom)
  const [, setCreative] = useAtom(aurallyCreativeAtom)
  const [loading, setLoading] = React.useState(false)
  const { activeAddress } = useWallet()

  const fullNameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const userNameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(curr => !curr)

    const sp = await getAlgodClient().getTransactionParams().do()
    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({ from: activeAddress ?? "", to: activeAddress ?? "", amount: 0, suggestedParams: sp, assetIndex: Number(auraToken?.asset_id ?? 0) })
    try {
      const res = await appClient?.registerCreator(
        {
          fullname: fullNameRef.current.value,
          username: userNameRef.current.value,
          txn: optInTxn
        },
        {
          boxes: [
            { appId: appRef?.appId ?? 0, name: algosdk.decodeAddress(activeAddress ?? "").publicKey },
          ]
        }
      )
      setLoading(curr => !curr)
      setCreative(res?.return)
      toast.success(`${res?.return?.username} registred`)
    } catch (err) {
      setLoading(curr => !curr)
      toast.error(JSON.stringify(err))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-10 flex flex-col w-full">
      <fieldset className="w-full">
        <legend className="text-3xl font-bold">Become a Creative</legend>
        <div className="pt-5 flex w-full flex-col gap-3 lg:flex-row">
          <div className="w-full">
            <label className="py-3" htmlFor="fullname">Full Name</label>
            <Input size="lg" ref={fullNameRef} id="fullname" placeholder="John Doe" required aria-label="full name" type="text" />
          </div>
          <div className="w-full">
            <label className="py-3" htmlFor="username">Username</label>
            <Input size="lg" ref={userNameRef} id="username" placeholder="johncena" required aria-label="full name" type="text" />
          </div>
        </div>
      </fieldset>
      <Button loading={loading} disabled={loading} type="submit" mt={20} size="lg" radius={"md"} className="w-fit self-end">
        Register
      </Button>
    </form>
  )
}
