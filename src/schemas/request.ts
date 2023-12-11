import { model, Schema } from "mongoose"

export interface IRequest extends Document {
  timestamp: Date
  sourceIP: string
  requestMethod: string
  requestUrl: string
  requestHeaders: object
  requestBody: object
  apiKey: string
  uploadSize: number
  downloadSize: number
  responseStatus: number
  responseBody: object
}

export const requestSchema = new Schema<IRequest>({
  timestamp: Date,
  sourceIP: String,
  requestMethod: String,
  requestUrl: String,
  requestHeaders: Object,
  requestBody: Object,
  apiKey: String,
  uploadSize: Number,
  downloadSize: Number,
  responseStatus: Number,
  responseBody: Object,
})

export const Request = model("Request", requestSchema)
