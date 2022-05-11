import defaultAxios from '@/services/axiosService'
import { useEffect, useState } from 'react'

interface UseFetchResult<T> {
  data: T
  isLoading: boolean
  error: null | string
}

export const useFetch = <T = any>(url: string): UseFetchResult<T> => {

  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      const resp = await defaultAxios.get(url)
      setData(resp.data)
      setIsLoading(false)
    } catch (e) {
      setError(e || 'Error')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return {
    data,
    isLoading,
    error
  }

}