'use client'
import { KeyboardEvent, MouseEvent, useRef, useState } from 'react'

type Props = {
  reload: () => void
}

export default function InputAdd({ reload }: Props) {
  const [content, setContent] = useState('')
  // const inputRef = useRef<HTMLInputElement>(null)

  async function sendContentToAPI() {
    if (content.length < 1) {
      window?.alert('내용을 입력하여야 합니다')
      return
    }

    const newTodo = {
      content: content,
      isDone: false,
    }

    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })

      if (response.ok) {
        const newTodo = await response.json()
        // 등록 성공
        setContent('') // clear current input
        reload() // reload all todo list and refresh screen
      } else {
        window?.alert('등록에 문제가 발생하였습니다.')
      }
    } catch (err) {
      window?.alert('등록에 문제가 발생하였습니다.')
    }
  }

  function handleAddButton(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    sendContentToAPI()
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const keyCode = event.code
    if (keyCode === 'Enter') {
      event.preventDefault()
      if (content.length > 0) {
        sendContentToAPI()
      }
    }
  }

  return (
    <>
      <input
        // ref={inputRef}
        className='border-gray-600 border p-2 flex-1'
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleInputKeyDown}
      ></input>
      <button
        className='border rounded-lg border-gray-500 px-8 py-2 hover:text-white hover:bg-gray-500'
        onClick={handleAddButton}
      >
        ADD
      </button>
    </>
  )
}
