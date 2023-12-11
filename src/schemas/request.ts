import { model, Schema } from "mongoose"

export interface IRequest extends Document {
  timestamp: Date
  sourceIP: string
  requestMethod: string
  requestUrl: string
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
  apiKey: String,
  uploadSize: Number,
  downloadSize: Number,
  responseStatus: Number,
  responseBody: Object,
})

export const Request = model("Request", requestSchema)
