import { Request, Response, NextFunction } from "../express.js"
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
    console.log(e)
    return res.status(500).json({ code: 500, message: "An internal error occured!" })
  }
}
