export type fileType = undefined | "jpg" | "jpeg" | "png" | "nef"

export function isSupportedFileType(fileName: string, types: fileType[]): fileType {
  const fileNameArr = fileName.split(".")

  try {
    const fileTy: fileType = fileNameArr[fileNameArr.length - 1].toLocaleLowerCase() as fileType
    types.forEach((type) => {
      if (type === fileTy) return type
    })
  } catch (e) {}

  return undefined
}
