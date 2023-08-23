import path from 'path'
import { URL } from 'url'

export const getFilename = (relativePath = '') => {
  return new URL(relativePath, import.meta.url).pathname
}

export const getDirectory = (relativePath = '') => {
  return path.dirname(getFilename(relativePath))
}

export const getRelativePath = (filename) => `./${path.relative(getDirectory(), path.resolve(filename))}`