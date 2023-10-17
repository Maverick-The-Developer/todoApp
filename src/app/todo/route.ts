import prisma from '@/lib/prisma'
/*
* =========================================================================================
*
* End Point : /todo
*
* End point todo의 API의 GET, POST 처리
* =========================================================================================
*/

export async function GET(request: Request) {
  const todoList: Ttodo[] = await prisma.todos.findMany()
  return Response.json(todoList, { status: 200 })
}

export async function POST(request: Request) {
  const todoDTO: TtodoNoID = await request.json()
  if (
    todoDTO != null &&
    todoDTO.content?.length > 0 &&
    typeof todoDTO.isDone === 'boolean'
  ) {
    try {
      const newTodo: Ttodo = await prisma.todos.create({
        data: todoDTO,
      })
      return Response.json(newTodo, { status: 200 })
    } catch (err) {
      return Response.json(null, { status: 400 })
    }
  } else {
    return Response.json(null, { status: 400 })
  }
}
