import { useCallback, useEffect, useState } from 'react'
import type { Todo } from '@/models/Todo'
import {
  addTodo,
  deleteTodo,
  filterTodos,
  toggleTodo,
} from '@/services/todoService'

interface FilterOptions {
  search: string
  status: 'done' | 'pending' | 'all'
  fromDate: string
  toDate: string
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'all',
    fromDate: '',
    toDate: '',
  })

  const loadTodos = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await filterTodos({
        search: filters.search,
        status: filters.status === 'all' ? undefined : filters.status,
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      })
      setTodos(data)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  const handleAddTodo = async (text: string) => {
    if (!text.trim()) return

    await addTodo({
      text: text.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    })
    loadTodos()
  }

  const handleToggle = async (id: number) => {
    await toggleTodo(id)
    loadTodos()
  }

  const handleDelete = async (id: number) => {
    await deleteTodo(id)
    loadTodos()
  }

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      fromDate: '',
      toDate: '',
    })
  }

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  return {
    todos,
    filters,
    isLoading,
    loadTodos,
    handleAddTodo,
    handleToggle,
    handleDelete,
    updateFilters,
    clearFilters,
  }
}
