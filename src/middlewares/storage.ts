import { storage, multer } from "../multer.js"
import { CustomError } from "../error.js"

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const contentLength = req.headers["content-length"]
    if (!contentLength) return cb(new CustomError("BAD_HEADER_CONTENT_LENGTH"))

    const fileSize: number = parseInt(contentLength)
    if (isNaN(fileSize)) return cb(new CustomError("BAD_HEADER_CONTENT_LENGTH"))

    // Reject files larger than 4GB
    if (fileSize > 4 * 1024 * 1024 * 1024) {
      cb(new CustomError("FILE_TOO_BIG"))
    } else {
      cb(null, true)
    }
  },
})
