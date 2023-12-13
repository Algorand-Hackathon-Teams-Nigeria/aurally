import { AurallyClient, AurallyToken } from "../contracts/Aurally";
import { encodeText } from "./encoding";

export async function createAuraTokens(client: AurallyClient, appId: number): Promise<AurallyToken | undefined> {
  const auras_result = await client.createAuraTokens(
    {},
    {
      boxes: [{ appId: appId, name: encodeText('aura') }],
    },
  )
  return auras_result.return
}
