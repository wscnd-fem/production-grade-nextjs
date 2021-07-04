import { api } from '../utils/api'
import { useQuery } from 'react-query'
import { Doc } from '../types'

export default function useDocs(initialDocs: Doc[], _id: string) {
  return useQuery<Doc[]>(
    ['docs', _id],
    () =>
      api
        .get<Doc[]>(`/api/doc`, { params: { id: _id } })
        .then(({ data }) => data),
    {
      initialData: initialDocs,
    },
  )
}
