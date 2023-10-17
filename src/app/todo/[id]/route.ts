import prisma from '@/lib/prisma'
/*
* =========================================================================================
*
* End Point : /todo/:id
* Dynamic Route Params: todo table id
*
* End point todo의 파라메터로 todo 테이블의 id 값을 받아오는 API의 PUT, PATCH, DELETE method 처리
* =========================================================================================
*/

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // params는 string으로 처리하고, 필요 시 아래처럼 문자형 변환 및 유효성 검사를 함.
  // localhost:3000/todo/AAA 이렇게 입력해 보는 사람이 꼭 있음.
  const todoID = parseInt(params.id, 10) // params.id가 abc 등 문자이면 todoID 값는 NaN이 됨
  const todoNoID: TtodoNoID = await request.json()

  // 파라메터와 입력데이터의 유효성 검사
  if (
    !isNaN(todoID) && // isNaN:Not A Number 이면, - 숫자가 아니면 -> 전체 부정(!) -> 숫자이면
    todoID > 0 &&
    todoNoID != null &&
    todoNoID.content?.length > 0 &&
    typeof todoNoID.isDone === 'boolean'
  ) {
    // try..catch 구문으로 DB Access 에러 발생 시 대처함
    try {
      const updatedTodo: Ttodo = await prisma.todos.update({
        data: todoNoID,
        where: { id: todoID },
      })

      return Response.json(updatedTodo, { status: 200 }) // 요청 사항 정상 완료 코드
    } catch (err) {
      return Response.json(null, { status: 400 }) // BAD REQUEST (원래는 500(내부오류))
    }
  } else {
    return Response.json(null, { status: 400 }) // BAD REQEUST
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const todoPatch: Ttodo4Patch = await request.json()
  const todoID = parseInt(params.id, 10)

  // 파라메터와 입력데이터의 유효성 검사
  if (
    !isNaN(todoID) && todoID > 0 &&
    todoPatch != null &&
    ( todoPatch.content !== undefined || todoPatch?.isDone !== undefined )
  ) {
    let updateDataArray: string[] = [] 
    if (todoPatch.content !== undefined && todoPatch.content.length > 0) {
      updateDataArray.push(`"content" : "${todoPatch.content}"`)
    }
    if (todoPatch.isDone !== undefined && typeof todoPatch.isDone === "boolean") {
      updateDataArray.push(`"isDone": ${todoPatch.isDone}`)
    }
    const updateData = JSON.parse(`{ ${updateDataArray.join(',')} }`)

    // try..catch 구문으로 DB Access 에러 발생 시 대처함
    try {
      const updatedTodo: Ttodo = await prisma.todos.update({
        data: updateData,
        where: { id: todoID },
      })

      return Response.json(updatedTodo, { status: 200 }) // 요청 사항 정상 완료 코드
    } catch (err) {
      return Response.json(null, { status: 400 }) // 원칙상 500번 에러 코드(내부오류) 전송해야함.
    }
  } else {
    // 입력데이터 오류 발생
    return Response.json(null, { status: 400 }) // bad request
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string }}) {
  const todoID = parseInt(params.id, 10)
  // 유효성 검사
  if (!isNaN(todoID) && todoID > 0) {
    // DB 작업은 항상 try.. catch를 사용하도록 함.
    try {
      const todo: Ttodo | null = await prisma.todos.findUnique({
        where: { id: todoID }
      })

      if (todo?.id === todoID) {
        const todo: Ttodo = await prisma.todos.delete({
          where: { id: todoID }
        })
        return Response.json(todo, { status: 200 })
      } else {
        return Response.json(null, { status: 404 }) // NOT FOUND 에러 코드 : id에 해당하는 데이터가 존재하지 않음
      }
    } catch(err) {
      console.log(err)
      return Response.json(null, { status: 400 })
    }
  } else {
    return Response.json(null, { status: 400 })
  }
}