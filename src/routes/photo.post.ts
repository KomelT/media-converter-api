import { express, Request, Response } from "../express.js"
import { authenticate } from "../middlewares/authenticate.js"
import { upload } from "../middlewares/storage.js"
import sharp from "../sharp.js"
import { FileType, isSupportedFileType, toSharpFileType } from "../fileTypes.js"
import { rawToJpg } from "../libraw.js"

type Params = {
  inType: FileType
  outType: FileType
  quality: number // number between 0 - 100
  keepExif: boolean
}

const params: Params = {
  inType: undefined,
  outType: "jpg",
  quality: 100,
  keepExif: true,
}

express.post("/api/photo", authenticate, upload.single("file"), async (req: Request, res: Response) => {
  try {
    const file = req.file
    if (!file) return res.json({ code: 400, message: "Missing file!" })
    console.log(`File: ${file.originalname}`)

    // Check input file type
    params.inType = isSupportedFileType(file.originalname, ["jpg", "jpeg", "png", "webp", "svg", "nef"])
    if (!params.inType) return res.status(400).json({ code: 400, message: "Unsupported input file type!" })
    console.log(`- Type: ${params.inType}`)

    // Check outType parametr
    params.outType = isSupportedFileType(req.query.outType?.toString() || "jpg", ["jpg", "jpeg", "png", "webp", "svg"])
    if (!params.outType) return res.status(400).json({ code: 400, message: "Unsupported output file type!" })
    console.log(`- Out Type: ${params.outType}`)

    // Check compress parametr
    if ("true" == req.query.compress) params.quality = 60
    console.log(`- Compress: ${params.quality != 100 ? true : false}`)

    // Check keepExif parametr
    if ("false" == req.query.keepExif) params.keepExif = false
    console.log(`- Keep EXIF: ${params.keepExif}`)

    // Convert to .jpg if buffer is raw file type
    if (!isSupportedFileType(params.inType, ["jpg", "jpeg", "png", "webp", "svg"])) file.buffer = await rawToJpg(file.buffer)
    console.log(`- RAW treatment: ${!isSupportedFileType(params.inType, ["jpg", "jpeg", "png", "webp", "svg"])}`)

    // Create output file
    const output = sharp(file.buffer).toFormat(toSharpFileType(params.outType))

    if (params.outType == "jpeg" || params.outType == "jpg") output.jpeg({ quality: params.quality })
    if (params.outType == "png") output.png({ quality: params.quality })
    if (params.outType == "webp") output.webp({ quality: params.quality })

    if (params.keepExif) output.keepExif()

    output.toBuffer((err, buffer, info) => {
      console.log(info)
      if (err) {
        console.log(`- ERROR: ${err}`)
        return res.status(500).json({
          code: 500,
          message: "Internal error!",
        })
      }
      console.log(`- DONE \n`)
      return res.status(200).send(buffer)
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ code: 500, message: "Internal error!" })
  }
})
console.log("API:EXPRESS registered route POST:/api/photo")
