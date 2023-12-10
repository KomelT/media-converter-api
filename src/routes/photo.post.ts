import { express, Request, Response } from "../express.js"
import { authenticate } from "../middlewares/authenticate.js"
import { upload } from "../middlewares/storage.js"
import sharp from "../sharp.js"
import { isSupportedFileType, toSharpFileType } from "../fileTypes.js"
import { rawToJpg } from "../libraw.js"

express.post("/api/photo", authenticate, upload.single("file"), async (req: Request, res: Response) => {
  try {
    const file = req.file
    if (!file) return res.json({ code: 400, message: "Missing file!" })

    // Check output file type
    let outFileType = req.query.outFileType?.toString()
    outFileType = isSupportedFileType(outFileType || "jpg", ["jpg", "jpeg", "png", "webp", "svg"])
    if (!outFileType) return res.status(400).json({ code: 400, message: "Unsupported output file type!" })

    // Check input file type
    const inputType = isSupportedFileType(file.originalname, ["jpg", "jpeg", "png", "webp", "svg", "nef"])
    if (!inputType) return res.status(400).json({ code: 400, message: "Unsupported input file type!" })

    // Convert to .jpg if buffer is raw file type
    if (!isSupportedFileType(inputType, ["jpg", "jpeg", "png", "webp", "svg"])) file.buffer = await rawToJpg(file.buffer)

    await sharp(file.buffer)
      .toFormat(toSharpFileType(outFileType))
      .toBuffer()
      .then((buffer) => {
        res.status(200).send(buffer)
      })
      .catch((err: any) => {
        console.log(err)
        res.status(500).json({
          code: 500,
          message: "Internal error!",
        })
      })
  } catch (e) {
    console.log(e)
    res.status(500).json({ code: 500, message: "Internal error!" })
  }
})
console.log("API:EXPRESS registered route POST:/api/photo")
