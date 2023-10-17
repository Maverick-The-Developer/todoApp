'use client'
import React from 'react'
import { BsTrash } from 'react-icons/bs'

type Props = {
  todo: Ttodo
  reload: () => void
}

export default function TodoItem({ todo, reload }: Props) {
  async function toggleIsDone(id: number) {
    const newIsDone = !todo.isDone
    try {
      const response = await fetch(`/todo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isDone: newIsDone }),
      })
      if (response.ok) {
        // update 되었음
        const newTodo = await response.json()
        reload()
      } else {
        window?.alert('수정 작업에 문제가 발생하였습니다.')
      }
    } catch (err) {
      console.log(err)
      window?.alert('수정 작업에 문제가 발생하였습니다.')
    }
  }

  async function deleteTodo(id: number) {
    try {
      const response = await fetch(`/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        // DELETE 되었음
        const deletedTodo = await response.json()
        reload()
      } else {
        window?.alert('삭제 작업에 문제가 발생하였습니다.')
      }
    } catch (err) {
      window?.alert('삭제 작업에 문제가 발생하였습니다.')
    }
  }

  return (
    <li className='border-b border-gray-400 py-2 mb-4 flex justify-start items-center gap-4'>
      <input
        className='cursor-pointer w-4 h-4'
        type='checkbox'
        defaultChecked={todo.isDone ? true : false}
        onClick={() => toggleIsDone(todo.id)}
      />
      <span className='flex-1 text-lg'>{todo.content}</span>
      <button onClick={() => deleteTodo(todo.id)}>
        <BsTrash />
      </button>
    </li>
  )
}
