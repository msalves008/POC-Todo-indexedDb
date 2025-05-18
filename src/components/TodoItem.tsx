import { Checkbox } from '@/components/ui/checkbox'
import { motion } from 'framer-motion'
import type { Todo } from '@/models/Todo'
import { DeleteTodoDialog } from './DeleteTodoDialog'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const handleChange = () => {
    if (todo.id) {
      onToggle(todo.id)
    }
  }

  const handleDelete = () => {
    if (todo.id) {
      onDelete(todo.id)
    }
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center justify-between p-3 rounded-lg border bg-background shadow-sm"
    >
      <div className="flex items-center gap-2" onClick={handleChange}>
        <Checkbox checked={todo.done} onCheckedChange={handleChange} />
        <span className={todo.done ? 'line-through text-muted-foreground' : ''}>
          {todo.text}
        </span>
      </div>
      <DeleteTodoDialog onDelete={handleDelete} />
    </motion.li>
  )
}
