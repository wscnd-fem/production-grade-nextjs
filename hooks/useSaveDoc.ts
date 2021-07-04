import { api } from '../utils/api'
import { useMutation, useQueryClient } from 'react-query'
import { Doc } from '../types'

function updateDoc({ docId, content }) {
  return api.put<Doc>(`/api/doc/${docId}`, content)
}

export default function useSaveDoc() {
  const queryClient = useQueryClient()
  return useMutation(updateDoc, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(['doc', data._id])
    },
  })
}
