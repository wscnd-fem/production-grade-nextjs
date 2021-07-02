import path from 'path'
import fs from 'fs/promises'

const returnFilesFromFolder = async (fromPath: string, callback) => {
  const filesFromPath = await fs.readdir(fromPath)
  const files = await filesFromPath.map(async (filename) => {
    const fileContent = await fs.readFile(path.join(fromPath, filename), 'utf-8')
    return callback(fileContent)
  })
  return await Promise.all(files)
}

const readFileFromFolder = async (file: string) => {
  console.log('looking for file', file)
  const read = await fs
    .readFile(file, 'utf-8')
    .then((content) => content)
    .catch(() => undefined)
  return read
}

export { returnFilesFromFolder, readFileFromFolder }
