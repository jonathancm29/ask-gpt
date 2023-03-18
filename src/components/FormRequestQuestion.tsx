import React from 'react'
import InputApIKey from './InputApiKey'
import TextareaQuestion from './TextareaQuestion'
import ButtonSubmitForm from './ButtonSubmitForm'
import SelectModelInput from './SelectModelInput'

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
      <InputApIKey apiKey={apiKey} />
      <a
        href='https://platform.openai.com/account/api-keys'
        target='_blank'
        rel='noreferrer'
        className='text-sm text-blue-800 '
      >
        Consigue un API Key Aqui!
      </a>

      <SelectModelInput />

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

      <TextareaQuestion />

      <ButtonSubmitForm loading={loading} />
    </form>
  )
}
