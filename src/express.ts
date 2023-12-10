import Express, { Request, Response, NextFunction } from "express"
import multer from "multer"

declare global {
  namespace Express {
    export interface Request {
      upload?: multer.Multer
    }
  }
}

export const express = Express()
express.use(Express.json())
express.use(Express.urlencoded({ extended: true }))

export default express
export { Request, Response, NextFunction }
