import React from 'react'

export default function InputApIKey ({ apiKey }: {apiKey: React.RefObject<HTMLInputElement>}) {
  return (
    <>
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

    </>

  )
}
