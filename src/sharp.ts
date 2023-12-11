// Documentation: https://www.npmjs.com/package/sharp

import sharp from "sharp"

console.log(`
    .- - - - - - - - - - - - - - - - - - - -
    |   Sharp uses ${sharp.concurrency(0)} threads
    |   Liborc is ${sharp.simd() ? "" : "not "}enabled
    '- - - - - - - - - - - - - - - - - - - -
    `)

export default sharp
