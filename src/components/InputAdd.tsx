'use client'
import { MouseEvent, useRef, useState } from 'react'

type Props = {
  reload: () => void
}

export default function InputAdd({reload}: Props) {
  const [content, setContent] = useState('')
  // const inputRef = useRef<HTMLInputElement>(null)

  async function handleAddButton(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

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
        // reload all todo list and refresh screen
        reload()
      } else {
        window?.alert('등록에 문제가 발생하였습니다.')
      }
    } catch (err) {
      window?.alert('등록에 문제가 발생하였습니다.')
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
