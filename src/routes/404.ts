import { Request, Response, NextFunction } from "express"
import { express } from "../express.js"
import { MulterError } from "multer"
import { CustomError } from "./error.js"

express.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  if (error instanceof MulterError && error.code === "LIMIT_UNEXPECTED_FILE") return res.status(400).send("Unexpected file field!")
  else if (error instanceof CustomError && error.message === "BAD_HEADER_CONTENT_LENGTH") return res.status(400).send("Bad Header 'Content-Length'!")
  else if (error instanceof CustomError && error.message === "FILE_TOO_BIG") return res.status(400).send("Too big file!")
})
