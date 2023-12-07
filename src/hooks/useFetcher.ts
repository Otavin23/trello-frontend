import { api } from '@/service/api'

const useFetcher = async (url: string) => {
  const { data } = await api.get(url)

  return data
}

export { useFetcher }
