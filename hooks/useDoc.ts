import { api } from '../utils/api'
import { useQuery } from 'react-query'

type DocContent = {
  content: any
}

export default function useDoc(initialDoc: DocContent, _id: string) {
  return useQuery<DocContent>(['doc', _id], () => api.get(`/api/doc/${_id}`).then(({ data }) => data), {
    initialData: initialDoc,
    refetchOnWindowFocus: false,
  })
}
