import { api } from '../utils/api'
import { useMutation, useQueryClient } from 'react-query'

function createFolder(folderName: string) {
  return api.post(`/api/folder`, { name: folderName })
}

export default function useCreateFolder() {
  const queryClient = useQueryClient()
  return useMutation(createFolder, {
    onSuccess: () => {
      queryClient.invalidateQueries('folders')
    },
  })
}
