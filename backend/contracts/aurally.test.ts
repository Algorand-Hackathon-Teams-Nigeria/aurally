import { AppMetadata, AppReference } from "@algorandfoundation/algokit-utils/types/app";
import { AurallyClient } from "./clients/AurallyClient"
import { algorandFixture } from "@algorandfoundation/algokit-utils/testing"
import type { Account } from "algosdk";

const fixtures = algorandFixture();

let appClient: AurallyClient;
let account: Account
let appRef: AppMetadata | AppReference

describe("Aurally", () => {
  beforeEach(fixtures.beforeEach)

  beforeAll(async () => {
    await fixtures.beforeEach();
    const { algod, testAccount } = fixtures.context;

    account = testAccount;

    appClient = new AurallyClient({
      sender: testAccount,
      resolveBy: "id",
      id: 0
    }, algod)
    await appClient.create.createApplication({});
    appRef = await appClient.appClient.getAppReference()
  })

  test("create-sound-nft", async () => {
    await appClient.createSoundNft({
      creator: new Uint8Array(Buffer.from(account.addr)),
      nft: "My NFT",
      genre: "pop",
      label: "The Collective",
      price: 8000,
      title: "The Collective",
      artist: "Vice",
      supply: 300,
      releaseDate: 2023,
      coverImageIpfs: "img",
      audioSampleIpfs: "aud",
      _fullname: "Vice",
      _username: "other"
    }, {
      boxes: [
        {
          appIndex: Number(appRef.appId),
          name: new Uint8Array(Buffer.from(account.addr))
        },
        {
          appIndex: Number(appRef.appId),
          name: new Uint8Array(Buffer.from("My NFT"))
        }
      ]
    })
  })
})
