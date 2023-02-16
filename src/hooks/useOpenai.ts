import { useState } from 'react'
import { query } from '../services/openai'

const useOpenai = () => {
  const [responseAI, setResponseAI] = useState('') // response API
  const [error, setError] = useState('') // state with error If it is there.
  const [loading, setLoading] = useState(false)
  const hasError = error.length > 0

  const askGPT = async (apiKey: string, prompt: string) => {
    setError('')
    setResponseAI('')

    if (!apiKey) {
      setError('No existe una ApiKey')
      return
    }

    if (!prompt) {
      setError('Escribe una preugnta para GPT!')
      return
    }
    try {
      setLoading(true)
      const res = await query(apiKey, { prompt })
      if (!res.success) {
        setError(res.error)
      }
      setResponseAI(res.data)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }
  return { askGPT, responseAI, hasError, error, loading }
}

export default useOpenai
