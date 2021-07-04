import { api } from '../utils/api'
import { useMutation, useQueryClient } from 'react-query'
import { Doc } from '../types'

function createDoc(newDoc: { _id: string; name: string }) {
  return api.post<Doc>(`/api/doc`, newDoc)
}

export default function useCreateDoc() {
  const queryClient = useQueryClient()
  return useMutation(createDoc, {
    onSuccess: ({data}) => {
      queryClient.invalidateQueries(['docs', data.folder])
    },
  })
}
