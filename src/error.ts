type message = "FILE_TOO_BIG" | "BAD_HEADER_CONTENT_LENGTH"

export class CustomError extends Error {
  constructor(message: message) {
    super(message)
    this.name = "CustomError"
  }
}
