import { api } from '../utils/api'
import { useQuery } from 'react-query'
import { Folder } from '../types'

function getFolders() {
  return api.get<Folder[]>(`/api/folder`).then(({ data }) => data)
}

export default function useFolders(initialFolders: Folder[]) {
  return useQuery<Folder[]>('folders', getFolders, {
    initialData: initialFolders,
  })
}
