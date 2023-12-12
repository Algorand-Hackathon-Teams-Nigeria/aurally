import { encodeAddress } from 'algosdk'
import { AurallyClient, AurallyCreative, AurallyToken } from '../contracts/Aurally'
import { AurallyCreativeTupple, AurallyTokenTupple, aurallyCreativeDecoder, aurallyTokenDecoder } from './encoding'
import { UserAccount } from '../types/account'

export async function getUserFromAddressSlice(addr: string, appClient: AurallyClient): Promise<UserAccount | undefined> {
  const boxes = await appClient.appClient.getBoxValues(
    (name) =>
      !name.name.startsWith('Art') &&
      !name.name.startsWith('Sound') &&
      !name.name.startsWith('Event') &&
      !name.name.startsWith('Ticket') &&
      !name.name.startsWith('aura') &&
      encodeAddress(name.nameRaw).startsWith(addr),
  )
  if (boxes.length > 0) {
    const decoded = AurallyCreative(aurallyCreativeDecoder.decode(boxes[0].value) as AurallyCreativeTupple)
    return {
      address: encodeAddress(boxes[0].name.nameRaw),
      data: decoded,
    }
  }
  return undefined
}

export async function getAuraTokenInfo(client: AurallyClient): Promise<AurallyToken | undefined> {
  const boxes = await client.appClient.getBoxValues((name) => name.name == "aura")
  if (boxes.length > 0) {
    const decoded = AurallyToken(aurallyTokenDecoder.decode(boxes[0].value) as AurallyTokenTupple)
    return decoded
  }
  return undefined
}
