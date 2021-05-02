import fs from 'fs'
import path from 'path'

const getAllFilesRecursively = (folder) => {
  const filesAndSubFolders = fs.readdirSync(folder)

  const returner = filesAndSubFolders
    .map((fileOrFolder) => {
      const fullPath = path.join(folder, fileOrFolder)

      return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
    })
    .reduce((acc, n) => (Array.isArray(n) ? [...acc, ...n] : [...acc, n]), [])

  return returner
}

export { getAllFilesRecursively }
