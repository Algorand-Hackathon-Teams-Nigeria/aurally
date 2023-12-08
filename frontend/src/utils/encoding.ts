export default function encodeText(text: string): Uint8Array {
  return new Uint8Array(new TextEncoder().encode(text))
}
