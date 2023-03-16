import React from 'react'
import { LoadingIcon } from '@/components/Icons'
import { MODELS_OPENAI } from '@/consts/consts'

interface Props {
  apiKey: React.RefObject<HTMLInputElement>
  loading: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const FormRequestQuestion: React.FC<Props> = ({
  apiKey,
  loading,
  handleSubmit
}) => {
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

      <label htmlFor='model-list' className='text-gray-700'>
        Selecciona un modelo
      </label>
      <select
        name='model'
        id='model-list'
        className='block px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500'
      >
        {MODELS_OPENAI.map((model, index) => (
          <option key={index}>{model}</option>
        ))}
      </select>

      <label htmlFor='temperature-input' className='text-gray-700'>
        Temperatura
      </label>
      <input
        id='temperature-input'
        type='range'
        min='0'
        max='1'
        step='0.1'
        name='temperature'
      />

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
