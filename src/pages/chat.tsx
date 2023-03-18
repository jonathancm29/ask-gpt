import ButtonSubmitForm from '@/components/ButtonSubmitForm'
import InputApIKey from '@/components/InputApiKey'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import SelectModelInput from '@/components/SelectModelInput'
import TextareaQuestion from '@/components/TextareaQuestion'
import { chat, Message } from '@/services/openai'
import React, { useEffect, useRef, useState } from 'react'

function ChatMessage({ message }: { message: Message }) {
  return (
    <li className='gap-4'>
      <span className='font-medium'>{`${message.role}: `}</span>
      <span>{message.content}</span>
    </li>
  )
}

function ChatMessages({
  messages,
  loading
}: {
  messages: Message[]
  loading: boolean
}) {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesContainerRef.current?.scrollTo(
      0,
      messagesContainerRef.current?.scrollHeight
    )
  }, [messages])

  return (
    <div
      className='h-64 w-full overflow-auto p-4 shadow-md bg-slate-200'
      ref={messagesContainerRef}
    >
      <ul className='flex flex-col gap-3 w-96'>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <Loading show={loading} />
      </ul>
    </div>
  )
}

export default function Chat() {
  const apiKeyRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const question = formData.get('prompt')?.toString() || ''
    const model = formData.get('model')?.toString() || ''

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

    const data = await chat(apiKeyRef.current?.value!, {
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
      formRef.current?.requestSubmit()
    }
  }

  return (
    <>
      <Layout>
        <h1 className='text-2xl font-bold leading-9 text-gray-900 border-b-2 border-gray-100'>
          Chat PlayGround
        </h1>
        <form
          onSubmit={handleSubmitForm}
          className='flex flex-col gap-2'
          ref={formRef}
        >
          <InputApIKey apiKey={apiKeyRef} />

          <SelectModelInput mode='chat' />

          <ChatMessages messages={messages} loading={loading} />

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
