import Yaml from "yaml"

if (!process.env.MONGO_CONNSTR) throw new Error("MONGO_CONNSTR environment variable is required!")
export const MONGO_CONNSTR: string = process.env.MONGO_CONNSTR

if (!process.env.AUTHORIZED_API_KEYS) throw new Error("AUTHORIZED_API_KEYS environment variable is required!")
{
  const parsed = Yaml.parse(process.env.AUTHORIZED_API_KEYS)
  if (!(parsed instanceof Object)) throw new Error("AUTHORIZED_API_KEYS must be an array of items!")
  for (const [id, item] of Object.entries(parsed) as [string, any]) {
    if (!(item instanceof Object)) throw new Error(`AUTHORIZED_API_KEYS[${id}] must be an object!`)
    if (typeof id != "string") throw new Error(`AUTHORIZED_API_KEYS[${id}] must be a string!`)
    if (typeof item.name != "string") throw new Error(`AUTHORIZED_API_KEYS[${id}].name must be a string!`)
    if (typeof item.description != "string") throw new Error(`AUTHORIZED_API_KEYS[${id}].description must be a string!`)
    if (id.length < 30) throw new Error(`AUTHORIZED_API_KEYS[${id}] must be long at least 30 characters!`)
  }
}
export type AuthorizedApiKeysItem = {
  name: string
  description: string
}
export const AUTHORIZED_API_KEYS: { [id: string]: AuthorizedApiKeysItem } = Yaml.parse(process.env.AUTHORIZED_API_KEYS)

if (!process.env.PUBLIC_URL_ROOT) throw new Error("PUBLIC_URL_ROOT environment variable is required!")
export const PUBLIC_URL_ROOT: string = process.env.PUBLIC_URL_ROOT

export const HTTP_PORT: number = parseInt(process.env.HTTP_PORT || "80")
