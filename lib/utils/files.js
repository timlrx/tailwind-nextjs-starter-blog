import fs from 'fs'
import path from 'path'

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

const flatternArray = (input) =>
  input.reduce((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], [])

const map = (fn) => (input) => input.map(fn)

const walkDir = (prefixPath) => (subPath) => {
  const fullPath = path.join(prefixPath, subPath)
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}

const getAllFilesRecursively = (folder) =>
  pipe(fs.readdirSync, map(walkDir(folder)), flatternArray)(folder)

export { getAllFilesRecursively }
