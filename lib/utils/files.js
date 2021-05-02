import fs from 'fs'
import path from 'path'

const getAllFilesRecursively = (...folders) => {
  const filesAndSubFolders = fs.readdirSync(path.join(...folders))

  const returner = filesAndSubFolders
    .map((fileOrFolder) => {
      const fullPath = [...folders, fileOrFolder]

      return fs.statSync(path.join(...fullPath)).isFile()
        ? path.join(...fullPath)
        : getAllFilesRecursively(...fullPath)
    })
    .reduce((acc, n) => (Array.isArray(n) ? [...acc, ...n] : [...acc, n]), [])

  return returner
}

export { getAllFilesRecursively }
