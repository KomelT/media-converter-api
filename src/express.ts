import Express, { Request, Response, NextFunction } from "express"
import multer from "multer"
import { logIncomingRequest, logOutcommingRequest } from "./middlewares/logRequest.js"

declare global {
  namespace Express {
    export interface Request {
      uuid?: string
      upload?: multer.Multer
    }
  }
}

export const express = Express()
express.use(Express.json())
express.use(Express.urlencoded({ extended: true }))
express.use(logIncomingRequest)
express.use(logOutcommingRequest)

export default express
export { Request, Response, NextFunction }
