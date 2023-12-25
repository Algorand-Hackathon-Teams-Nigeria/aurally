import { encodeAddress } from "algosdk";
import { AurallyClient, AurallyCreative } from "../contracts/Aurally";
import { AurallyCreativeTupple, aurallyCreativeDecoder } from "./encoding";
import { createAppClient} from "./contract-config";
import { parseNftBoxData } from "./boxDataParsing";
import { ArtType, SoundType } from "@/types/assets";

export type UserAccount = {
  address: string
  data: AurallyCreative
}

export const getUserFromAddressSlice = async (
  addr: string,
  client: AurallyClient
): Promise<UserAccount | undefined> => {
  const boxes = await client.appClient.getBoxValues(
    (name) =>
      !name.name.startsWith("Art") &&
      !name.name.startsWith("Sound") &&
      !name.name.startsWith("Event") &&
      !name.name.startsWith("Ticket") &&
      !name.name.startsWith("aura") &&
      encodeAddress(name.nameRaw).startsWith(addr)
  );
  if (boxes.length > 0) {
    const decoded = AurallyCreative(
      aurallyCreativeDecoder.decode(boxes[0].value) as AurallyCreativeTupple
    );
    return {
      address: encodeAddress(boxes[0].name.nameRaw),
      data: decoded,
    };
  }
  return undefined;
};

export const getArtAndSoundData = async (): Promise<
  (SoundType | ArtType)[]
> => {
  const boxes = await createAppClient().appClient.getBoxValues(
    (name) => name.name.startsWith("Art") || name.name.startsWith("Sound")
  );
  if (boxes) {
    return parseNftBoxData(boxes);
  }
  return [];
};

export async function getCreator(owner: string) {
  const appClient = createAppClient();
  return await getUserFromAddressSlice(owner, appClient);
}
