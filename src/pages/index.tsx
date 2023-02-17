import { LoadingIcon } from '@/components/Icons'
import useOpenai from '@/hooks/useOpenai'
import Head from 'next/head'
import React, { useRef } from 'react'

function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Ask GPT</title>
      </Head>
      <main className='w-full relative gap-4 bg-colorCustom h-screen flex items-center justify-center flex-col'>
        {children}
      </main>
    </>
  )
}

function FormRequestQuestion({ apiKey, loading, handleSubmit }: any) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='w-full p-1 flex flex-col gap-4'
    >
      <label htmlFor='apiKey' className='text-gray-700'>
        API Key
      </label>
      <input
        className='rounded-lg border-transparent  appearance-none border border-gray-300 w-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
        placeholder='sk-CgYQ1oRQBmF2CvUadZihT3sdbkFJvV1g1ko8vdAXU4dzApkZ'
        type='password'
        id='apiKey'
        ref={apiKey}
      />
      <a
        href='https://platform.openai.com/account/api-keys'
        target='_blank'
        rel='noreferrer'
        className='text-sm text-blue-800 '
      >
        Consigue un API Key Aqui!
      </a>
      <label htmlFor='question' className='text-gray-700'>
        Escribe una pregunta
      </label>
      <textarea
        id='question'
        name='prompt'
        className='flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
        rows={3}
        placeholder='¿De que color es el caballo blanco de simon bolivar?'
      />
      <button className='py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg'>
        <LoadingIcon show={loading} />
        Preguntar
      </button>
    </form>
  )
}

export default function Home() {
  // customHook with logic at , errors, loading, errors, loading request
  const { askGPT, responseAI, hasError, error, loading } = useOpenai()
  const apiKey: any = useRef(null)

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    // The const dataForm is a new instance of the FormData class, which takes in the event target as an argument.
    const dataForm = new FormData(e.target)

    // The const prompt is getting the value of 'prompt' from the dataForm instance.
    const prompt = dataForm.get('prompt')

    // The askGPT function is being called with two arguments: apiKey.current.value and prompt.
    askGPT(apiKey.current.value, prompt?.toString()!)
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
