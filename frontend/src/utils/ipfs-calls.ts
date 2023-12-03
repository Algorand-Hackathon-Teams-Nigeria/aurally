import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'

const projectId = '2Y2uzvQN5CSqHMciRnMlmlaFtI0'
const projectSecret = '7f68efcacf3a67ceb9b738728c235d02'

const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`

const options = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
}

const client = create(options)

export const uploadToIpfs = (imageFile: File): Promise<string> => {
  const reader = new FileReader()
  reader.readAsArrayBuffer(imageFile)
  return new Promise((resolve) => {
    reader.onloadend = async () => {
      const arrayBuffer = new Uint8Array(reader.result as ArrayBuffer)
      const { path } = await client.add(arrayBuffer)
      const url = `https://gateway.pinata.cloud/ipfs/${path}`
      resolve(url)
    }
  })
}
