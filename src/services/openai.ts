const DEFAULT_PARAMS = {
  model: 'text-davinci-003',
  temperature: 0.5,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
}

// request to compleation
export const query = async (papiKey: string, params = {}) => {
  const params_ = { ...DEFAULT_PARAMS, ...params }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(papiKey)
    },
    body: JSON.stringify(params_)
  }
  const response = await fetch(
    'https://api.openai.com/v1/completions',
    requestOptions
  )
  const data = await response.json()
  if (data.error) {
    return { success: false, error: data.error.message }
  }
  return { success: true, data: data.choices[0].text }
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}
interface paramasChat {
  messages: Message[],
  model: string

}
// Request to chat
export const chat = async (papiKey: string, params: paramasChat) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(papiKey)
    },
    body: JSON.stringify(params)
  }
  const response = await fetch(
    'https://api.openai.com/v1/chat/completions',
    requestOptions
  )
  const data = await response.json()
  if (data.error) {
    return { success: false, error: data.error.message }
  }
  return { success: true, data }
}
