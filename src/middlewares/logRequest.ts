import { Request, Response, NextFunction } from "../express.js"
import { Request as Req } from "../schemas/request.js"

export async function logIncomingRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const requ = await Req.create({
      timestamp: new Date(),
      sourceIP: req.ip,
      requestMethod: req.method,
      requestUrl: req.url,
      uploadSize: req.headers["content-length"],
      apiKey: req.headers["x-api-key"],
    })
    req.uuid = requ._id.toString()

    next()
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ code: 500, message: "An internal error occured!" })
  }
}

export async function logOutcommingRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const originalSend = res.send
    const originalJson = res.json

    res.send = function (body: any) {
      const uuid = req.uuid
      if (!uuid) return originalSend.call(this, body)
      console.log("Hej " + res.getHeader("content-length"))
      ;(async () => {
        await Req.updateOne(
          { _id: uuid },
          {
            responseStatus: res.statusCode,
            downloadSize: res.getHeader("content-length"),
          }
        )
      })()

      return originalSend.call(this, body)
    }

    res.json = function (body) {
      const uuid = req.uuid
      if (!uuid) return originalSend.call(this, body)
      ;(async () => {
        await Req.updateOne(
          { _id: uuid },
          {
            responseStatus: res.statusCode,
            body: body,
          }
        )
      })()

      return originalJson.call(this, body)
    }

    next()
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ code: 500, message: "An internal error occured!" })
  }
}
