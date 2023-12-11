import Http from "http"
import { express } from "./express.js"
import { add as addExitHandler } from "./exithandler.js"
import * as settings from "./settings.js"

export const http = Http.createServer()
addExitHandler(() => http.close(), "graceful http server shutdown")

http.on("request", express)

http.listen(settings.HTTP_PORT, () => {
  console.log(`
    .- - - - - - - - - - - - - - - - - - - -
    |   Started the API http server on port ${settings.HTTP_PORT}
    '- - - - - - - - - - - - - - - - - - - -
    `)
})
