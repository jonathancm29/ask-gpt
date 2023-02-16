import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head><title>Understand NextJS</title></Head>
      <main className='w-full relative bg-colorCustom h-screen flex items-center justify-center'>
        <p className='text-colorContrast text-6xl font-bold'>Hellow World!</p>
      </main>
    </>
  )
}
