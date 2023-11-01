import Express from "express"
import * as settings from "./settings.js"

export const express = Express()
express.use(Express.json())
express.use(Express.urlencoded({ extended: true }))

express.listen(settings.HTTP_PORT, () => {
    console.log(`
    .- - - - - - - - - - - - - - - - - - - -
    |   Started the API http server on port ${settings.HTTP_PORT}
    '- - - - - - - - - - - - - - - - - - - -
    `)
})

export default express