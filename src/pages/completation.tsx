import { FormRequestQuestion } from '@/components/FormRequestQuestion'
import Layout from '@/components/Layout'
import useOpenai from '@/hooks/useOpenai'
import React, { useRef } from 'react'

export default function Completation() {
  // customHook with logic at , errors, loading, errors, loading request
  const { askGPT, responseAI, hasError, error, loading } = useOpenai()
  const apiKey = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // The const dataForm is a new instance of the FormData class, which takes in the event target as an argument.
    const dataForm = new FormData(e.target as HTMLFormElement)

    // The const prompt is getting the value of 'prompt' from the dataForm instance.
    const prompt = dataForm.get('prompt')
    const model = dataForm.get('model')
    const temperature = dataForm.get('temperature')

    // The askGPT function is being called with two arguments: apiKey.current.value and prompt.
    askGPT(apiKey.current?.value!, {
      prompt: prompt?.toString()!,
      model: model?.toString()!,
      temperature: parseFloat(temperature?.toString()!)
    })
  }
  return (
    <>
      <Layout>
        <h1 className='text-2xl font-bold leading-9 text-gray-900 border-b-2 border-gray-100'>
          Preguntale cualquier cosa a la Inteligencia Artificial
        </h1>
        <div className='w-[500px] flex justify-center items-center flex-col'>
          <FormRequestQuestion
            handleSubmit={handleSubmit}
            loading={loading}
            apiKey={apiKey}
          />
          <p className='mb-12 max-h-36 overflow-auto text-lg font-bold leading-9 text-gray-900 border-b-2 border-gray-100'>
            {responseAI}
          </p>
          {hasError && <p className='text-red-500'>{error}</p>}
        </div>
      </Layout>
    </>
  )
}
