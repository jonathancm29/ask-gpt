import ButtonSubmitForm from '@/components/ButtonSubmitForm'
import InputApIKey from '@/components/InputApiKey'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import SelectModelInput from '@/components/SelectModelInput'
import TextareaQuestion from '@/components/TextareaQuestion'
import { chat, Message } from '@/services/openai'
import React, { useEffect, useRef, useState } from 'react'

export default function Chat() {
  const apiKey = useRef<HTMLInputElement>(null)
  const form = useRef<HTMLFormElement>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const question = formData.get('prompt')?.toString()!
    const model = formData.get('model')?.toString()!

    const newUserMessage = {
      role: 'user',
      content: question
    } as Message

    const textareaElement = document.querySelector(
      '#question'
    ) as HTMLTextAreaElement

    textareaElement.value = ''

    const newStateMessages = [...messages, newUserMessage]
    setMessages(newStateMessages)

    const data = await chat(apiKey.current?.value!, {
      model,
      messages: newStateMessages
    })

    setLoading(false)

    if (data.error) {
      setMessages([
        ...newStateMessages,
        { role: 'assistant', content: data.error }
      ])
      return
    }
    setMessages([...newStateMessages, data.data.choices[0].message as Message])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const question = document.querySelector('#question') as HTMLTextAreaElement

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (question.value === '' || question.value === '\n') {
        return
      }
      form.current?.requestSubmit()
    }
  }

  useEffect(() => {
    const messagesContainerElement = document.querySelector(
      '#messages-container'
    ) as HTMLTextAreaElement
    messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight
  }, [messages])
  return (
    <>
      <Layout>
        <h1 className='text-2xl font-bold leading-9 text-gray-900 border-b-2 border-gray-100'>
          Chat PlayGround
        </h1>
        <form
          onSubmit={handleSubmitForm}
          className='flex flex-col gap-2'
          ref={form}
        >
          <InputApIKey apiKey={apiKey} />

          <SelectModelInput mode='chat' />
          <div
            className='h-64 w-full overflow-auto p-4 shadow-md bg-slate-200'
            id='messages-container'
          >
            <ul className='flex flex-col gap-3 w-96'>
              {messages.map((message, index) => (
                <li key={index} className='gap-4'>
                  <span className='font-medium'>{`${message.role}: `}</span>
                  <span>{message.content}</span>
                </li>
              ))}
              <Loading show={loading} />
            </ul>
          </div>
          <button
            onClick={() => setMessages([])}
            className='text-blue-500 self-end'
            type='button'
          >
            Vaciar conversacion
          </button>
          <TextareaQuestion handleOnKeyDown={(e) => handleKeyDown(e)} />

          <ButtonSubmitForm loading={loading} />
        </form>
      </Layout>
    </>
  )
}
