import { Request, Response } from "express"
import { express } from "../express.js"
import { authenticate } from "../middlewares/authenticate.js"
import { upload } from "../middlewares/storage.js"
import sharp from "../sharp.js"
import { isSupportedFileType } from "../fileTypes.js"
import { rawToJpg } from "../libraw.js"

express.post("/api/photo", authenticate, upload.single("file"), async (req: Request, res: Response) => {
  const file = req.file
  if (!file) return res.json({ code: 400, message: "Missing file!" })

  const inputType = isSupportedFileType(file.filename, ["jpg", "jpeg", "png", "nef"])
  if (!inputType) return res.status(400).json({ code: 400, message: "Incorrect file type!" })

  if (inputType === "nef") file.buffer = await rawToJpg(file.buffer)

  await sharp(file.buffer)
    .toFormat("jpg")
    .toBuffer()
    .then((buffer) => {
      res.status(200).send(buffer)
    })
    .catch((err: any) => {
      res.status(500).json({
        code: 500,
        message: err.message,
      })
    })
})
console.log("API:EXPRESS registered route POST:/api/photo")
