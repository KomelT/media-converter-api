if (!process.env.PUBLIC_URL_ROOT) throw new Error("PUBLIC_URL_ROOT environment variable is required!")
export const PUBLIC_URL_ROOT: string = process.env.PUBLIC_URL_ROOT

export const HTTP_PORT: number = parseInt(process.env.HTTP_PORT || "8080")
