import Yaml from "yaml"

if (!process.env.AUTHORIZED_API_KEYS) throw new Error("AUTHORIZED_API_KEYS environment variable is required!")
{
    const parsed = Yaml.parse(process.env.AUTHORIZED_API_KEYS)
    if (!(parsed instanceof Object)) throw new Error("AUTHORIZED_API_KEYS must be an array of items!")
    for (const [key, item] of Object.entries(parsed) as [string, any]) {
        if (!(item instanceof Object)) throw new Error(`AUTHORIZED_API_KEYS[${key}] must be an object!`)
        if (typeof key != "string") throw new Error(`AUTHORIZED_API_KEYS[${key}] must be a string!`)
        if (typeof item.name != "string") throw new Error(`AUTHORIZED_API_KEYS[${key}].name must be a string!`)
        if (typeof item.secret != "string") throw new Error(`AUTHORIZED_API_KEYS[${key}].secret must be a string!`)
        if (typeof item.description != "string") throw new Error(`AUTHORIZED_API_KEYS[${key}].description must be a string!`)
        if (key.length >= 20) throw new Error(`AUTHORIZED_API_KEYS[${key}] must be long at least 10 characters!`)
        if (item.secret.length >= 30) throw new Error(`AUTHORIZED_API_KEYS[${key}].secret must be long at least 30 characters!`)
    }
}
export type AuthorizedApiKeysItem = {
    name: string
    secret: string
    description: string
}
export const AUTHORIZED_API_KEYS: { [key: string]: AuthorizedApiKeysItem } = Yaml.parse(process.env.AUTHORIZED_API_KEYS)

if (!process.env.PUBLIC_URL_ROOT) throw new Error("PUBLIC_URL_ROOT environment variable is required!")
export const PUBLIC_URL_ROOT: string = process.env.PUBLIC_URL_ROOT

export const HTTP_PORT: number = parseInt(process.env.HTTP_PORT || "80")
