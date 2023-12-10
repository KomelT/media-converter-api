// Documentation: https://www.npmjs.com/package/libraw.js

import { LibRaw } from "libraw.js"

export default LibRaw

export async function rawToJpg(buffer: Buffer): Promise<Buffer> {
  const libRaw = new LibRaw()

  await libRaw.openBuffer(buffer)
  await libRaw.unpackThumb()

  return await libRaw.getThumbnail()
}
