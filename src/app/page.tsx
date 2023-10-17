'use client'
import InputAdd from '@/components/InputAdd'
import TodoItem from '@/components/TodoItem'
import { useEffect, useState } from 'react'

export default function Home() {
  const [todoList, setTodoList] = useState<Ttodo[]>([])

  async function getTodoList() {
    const response = await fetch('/todo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const newTodoList = await response.json()
      setTodoList(newTodoList)
    } else {
      window?.alert('todo 목록을 가저오는데 실패하였습니다.')
    }
  }

  useEffect(() => {
    getTodoList()
  }, [])

  return (
    <main className='w-full p-4'>
      <div className='max-w-[600px] mx-auto'>
        <h1 className='text-center text-xl mb-2'>ToDo List</h1>
        <div className='flex gap-2'>
          <InputAdd reload={getTodoList} />
        </div>
        <ul className='border border-gray-400 p-4 my-4'>
          {todoList?.map((todo) => (
            <TodoItem key={todo?.id} todo={todo!} reload={getTodoList} />
          ))}
        </ul>
      </div>
    </main>
  )
}
