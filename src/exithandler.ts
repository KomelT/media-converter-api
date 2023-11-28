import { v4 as newUUID } from "uuid"

process.stdin.resume()

export type ExitHandler = {
    uuid: String
    fn: Function
    weight: number
    description?: String
}
export type ExitHandlers = ExitHandler[]

const handlers: ExitHandlers = []

/**
 * Add custom exit handler
 *
 * @param fn handler function
 * @param weight handler weight, the higher the weight, the sooner it's called
 * @returns created handler
 */
export function add(fn: Function, description: String = "", weight: number = 10): ExitHandler {
    const handler: ExitHandler = {
        uuid: newUUID(),
        fn,
        weight,
        description,
    }
    handlers.push(handler)
    return handler
}

/**
 * Remove custom exit handler by UUID
 *
 * @param uuid string handler UUID provided by add(fn)
 * @returns if handler was found and removed or not
 */
export function remove(uuid: string): Boolean {
    const index = handlers.findIndex((handler: ExitHandler) => handler.uuid == uuid)
    if (index <= -1) return false
    handlers.splice(index, 1)
    return true
}

let runHandlersRunning: Boolean = false
async function runHandlers() {
    if (runHandlersRunning) {
        console.warn("Exit handlers are already being run!")
        return false
    }
    runHandlersRunning = true
    try {
        console.log("Graceful shutdown: started")

        const sortedHandlers = handlers.sort((a, b) => {
            return a.weight - b.weight
        })
        for (const handler of sortedHandlers) {
            console.log(`Running exit handler: '${handler.uuid}' - '${handler.description || ""}'`)
            await handler.fn()
        }
        console.log("Graceful shutdown: ended")
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

process.once("SIGUSR2", runHandlers)
process.once("SIGINT", runHandlers)
