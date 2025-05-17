import { getDB, STORE_NAME } from '../db/todoDB'
import type { Todo } from '../models/Todo'

export const addTodo = async (todo: Omit<Todo, 'id'>): Promise<void> => {
  const db = await getDB()
  await db.add(STORE_NAME, todo)
}

export const getTodos = async (): Promise<Todo[]> => {
  const db = await getDB()
  return db.getAll(STORE_NAME)
}

export const deleteTodo = async (id: number): Promise<void> => {
  const db = await getDB()
  await db.delete(STORE_NAME, id)
}

export const toggleTodo = async (id: number): Promise<void> => {
  const db = await getDB()
  const todo = await db.get(STORE_NAME, id)
  if (todo) {
    todo.done = !todo.done
    await db.put(STORE_NAME, todo)
  }
}

export const filterTodos = async (query: {
  search?: string
  status?: 'done' | 'pending'
  fromDate?: string
  toDate?: string
}): Promise<Todo[]> => {
  const all = await getTodos()
  return all.filter((todo) => {
    const matchText = query.search
      ? todo.text.toLowerCase().includes(query.search.toLowerCase())
      : true
    const matchStatus =
      query.status === 'done'
        ? todo.done
        : query.status === 'pending'
        ? !todo.done
        : true
    const matchFrom = query.fromDate
      ? new Date(todo.createdAt) >= new Date(query.fromDate)
      : true
    const matchTo = query.toDate
      ? new Date(todo.createdAt) <= new Date(query.toDate)
      : true
    return matchText && matchStatus && matchFrom && matchTo
  })
}
