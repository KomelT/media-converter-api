import Yaml from "yaml"

if (!process.env.AUTHORIZED_API_KEYS) throw new Error("AUTHORIZED_API_KEYS environment variable is required!")
{
    const parsed = Yaml.parse(process.env.AUTHORIZED_API_KEYS)
    if (!(parsed instanceof Object)) throw new Error("AUTHORIZED_API_KEYS must be an array of items!")
    for (const [key, item] of Object.entries(parsed) as [string, any]) {
        if (!(item instanceof Object)) throw new Error(`AUTHORIZED_API_KEYS[${key}] must be an object!`)
        if (typeof item.name != "string") throw new Error(`AUTHORIZED_API_KEYS[${key}].name must be a string!`)
        if (typeof item.key_id != "string") throw new Error(`AUTHORIZED_API_KEYS[${key}].key_id must be a string!`)
        if (typeof item.key_secret != "string") throw new Error(`AUTHORIZED_API_KEYS[${key}].key_secret must be a string!`)
        if (item.key_secret.length >= 30) throw new Error(`AUTHORIZED_API_KEYS[${key}].key must be long at least 30 characters!`)
    }
}
export type AuthorizedApiKeysItem = {
    name: string
    key: string
}
export const AUTHORIZED_API_KEYS: { [key: string]: AuthorizedApiKeysItem } = Yaml.parse(process.env.AUTHORIZED_API_KEYS)

if (!process.env.PUBLIC_URL_ROOT) throw new Error("PUBLIC_URL_ROOT environment variable is required!")
export const PUBLIC_URL_ROOT: string = process.env.PUBLIC_URL_ROOT

export const HTTP_PORT: number = parseInt(process.env.HTTP_PORT || "8080")
