import { ReactNode } from 'react'

interface Props {
    children: ReactNode
  }
export default function Layout ({ children }: Props) {
  return (
    <>
      <header>
        <title>Ask GPT</title>
      </header>
      <main className='w-full relative gap-4 bg-colorCustom h-screen flex items-center justify-center flex-col'>
        {children}
      </main>
    </>
  )
}
