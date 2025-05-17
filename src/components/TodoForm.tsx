import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter, FilterX } from 'lucide-react'

interface TodoFormProps {
  onAdd: (text: string) => Promise<void>
  isShowFilters: boolean
  setIsShowFilters: (isShowFilters: boolean) => void
}

export function TodoForm({
  onAdd,
  isShowFilters,
  setIsShowFilters,
}: TodoFormProps) {
  const [newTodo, setNewTodo] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onAdd(newTodo)
    setNewTodo('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Adicionar nova tarefa..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">Adicionar</Button>
      <Button
        size={'icon'}
        variant={'outline'}
        onClick={() => setIsShowFilters(!isShowFilters)}
      >
        {isShowFilters ? <FilterX /> : <Filter />}
      </Button>
    </form>
  )
}
