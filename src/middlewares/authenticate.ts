import { Request, Response, NextFunction } from "express"
import * as settings from "../settings.js"

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const apiKey = req.header("x-api-key")
    if (!apiKey || !settings.AUTHORIZED_API_KEYS[apiKey])
      return res.status(401).json({
        code: 401,
        message: "Unathorized",
      })

    next()
  } catch (e: any) {
    res.status(500)
    console.log(e)
  }
}
