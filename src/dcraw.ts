// Documentation: https://github.com/zfedoran/dcraw.js

// @ts-ignore
import dcraw from "dcraw"

export default dcraw
export async function rawToTiff(buffer: Buffer): Promise<Buffer> {
  return await dcraw(buffer, { exportAsTiff: true })
}
