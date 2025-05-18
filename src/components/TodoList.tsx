import { AnimatePresence } from 'framer-motion'
import { useTodos } from '@/hooks/useTodos'
import { TodoForm } from './TodoForm'
import { TodoFilters } from './TodoFilters'
import { TodoItem } from './TodoItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { EmptyState } from './EmptyState'

export function TodoList() {
  const [isShowFilters, setIsShowFilters] = useState(false)
  const {
    todos,
    filters,
    handleAddTodo,
    handleToggle,
    handleDelete,
    updateFilters,
    clearFilters,
  } = useTodos()

  return (
    <div className="mt-4 space-y-4 w-full flex flex-col items-center">
      <Card className=" w-full max-w-xl">
        <CardHeader>
          <CardTitle>Tarefas</CardTitle>
          <TodoForm
            onAdd={handleAddTodo}
            isShowFilters={isShowFilters}
            setIsShowFilters={setIsShowFilters}
          />

          {isShowFilters && (
            <div className="pt-4">
              <TodoFilters
                filters={filters}
                onFilterChange={updateFilters}
                onClear={clearFilters}
              />
            </div>
          )}
        </CardHeader>
        <Separator />
        <CardContent>
          {todos.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="space-y-2">
              <AnimatePresence>
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
