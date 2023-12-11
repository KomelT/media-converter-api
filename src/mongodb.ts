import mongoose from "mongoose"
import { add as addExitHandler } from "./exithandler.js"
import * as settings from "./settings.js"

await mongoose.connect(settings.MONGO_CONNSTR, { maxPoolSize: 10 })
mongoose.set("strictQuery", false)
console.log(`
    .- - - - - - - - - - - - - - - - - - - -
    |   Connected to MongoDB
    '- - - - - - - - - - - - - - - - - - - -
`)

addExitHandler(async () => {
  await mongoose.connection.close()
}, "graceful MongoDB conn shutdown")

const healthcheck = {
  get healthy() {
    return mongoose?.connection?.readyState === 1
  },
}

export let healthy = healthcheck.healthy
