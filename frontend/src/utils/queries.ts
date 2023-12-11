import { encodeAddress } from "algosdk";
import { AurallyClient, AurallyCreative } from "../contracts/Aurally";
import { AurallyCreativeTupple, aurallyCreativeDecoder } from "./encoding";
import { UserAccount } from "../types/account";



export async function getUserFromAddressSlice(addr: string, appClient: AurallyClient): Promise<UserAccount> {
  const boxes = await appClient.appClient.getBoxValues(name => !name.name.startsWith("Art") && !name.name.startsWith("Sound") && !name.name.startsWith("Event") && !name.name.startsWith("Ticket") && !name.name.startsWith("aura") && encodeAddress(name.nameRaw).startsWith(addr))
  const decoded = AurallyCreative(aurallyCreativeDecoder.decode(boxes[0].value) as AurallyCreativeTupple)
  return {
    address: encodeAddress(boxes[0].name.nameRaw),
    data: decoded
  }
}
