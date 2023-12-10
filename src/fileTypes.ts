import { FormatEnum } from "sharp"
export type FileType = undefined | "jpg" | "jpeg" | "png" | "nef" | "webp" | "svg"

// All sharp files "avif" | "dz" | "fits" | "gif" | "heif" | "input" | "jpeg" | "jpg" | "jp2" | "jxl" | "magick" | "openslide" | "pdf" | "png" | "ppm" | "raw" | "svg" | "tiff" | "tif" | "v" | "webp"

export function isSupportedFileType(fileName: string, types: FileType[]): FileType {
  try {
    const fileNameArr = fileName.split(".")
    const fileTy: FileType = fileNameArr[fileNameArr.length - 1].toLocaleLowerCase() as FileType

    for (const type of types) {
      if (type == fileTy) return fileTy
    }
  } catch (e) {
    console.log(e)
    return undefined
  }
}

export function toSharpFileType(type: string): keyof FormatEnum {
  try {
    const fileTy: keyof FormatEnum = type as keyof FormatEnum
    return fileTy
  } catch (e) {
    console.log(e)
    return "jpg" as keyof FormatEnum
  }
}
