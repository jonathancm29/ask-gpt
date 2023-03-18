import React from 'react'

interface Props {
  handleOnKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}
export default function TextareaQuestion({ handleOnKeyDown }: Props) {
  return (
    <>
      <label htmlFor='question' className='text-gray-700'>
        Escribe una pregunta
      </label>
      <textarea
        id='question'
        name='prompt'
        className='flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
        rows={3}
        placeholder='¿De que color es el caballo blanco de simon bolivar?'
        onKeyDown={handleOnKeyDown}
      />
    </>
  )
}
