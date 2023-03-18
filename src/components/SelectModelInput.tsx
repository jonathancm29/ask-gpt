import { MODELS_OPENAI } from '@/consts/consts'
interface Props {
  mode?: 'completation' | 'chat'
}
export default function SelectModelInput({ mode = 'completation' }: Props) {
  const models = MODELS_OPENAI[mode]
  return (
    <>
      <label htmlFor='model-list' className='text-gray-700'>
        Selecciona un modelo
      </label>
      <select
        name='model'
        id='model-list'
        className='block px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500'
      >
        {models.map((model, index) => (
          <option key={index}>{model}</option>
        ))}
      </select>
    </>
  )
}
