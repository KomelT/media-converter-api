import { Request, Response, NextFunction } from "../express.js"
import { Request as Req } from "../schemas/request.js"

export async function logRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const requ = await Req.create({
      timestamp: new Date(),
      sourceIP: req.ips,
      requestMethod: req.method,
      requestUrl: req.url,
      requestHeaders: req.headers,
      requestBody: req.body,
    })
    req.uuid = requ._id.toString()

    next()
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ code: 500, message: "An internal error occured!" })
  }
}
