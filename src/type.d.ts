type Ttodo = {
  id: number
  content: string
  isDone: boolean
}

type TtodoNoID = {
  content: string
  isDone: boolean
}

type Ttodo4Patch = {
  content: string | undefined
  isDone: boolean | undefined
}