import { LoadingIcon } from './Icons'

export default function ButtonSubmitForm({
  loading = false
}: {
  loading?: boolean
}) {
  return (
    <>
      <button
        className='py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg'
        disabled={loading}
      >
        <LoadingIcon show={loading} />
        Preguntar
      </button>
    </>
  )
}
