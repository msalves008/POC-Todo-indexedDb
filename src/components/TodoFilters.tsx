import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TodoFiltersProps {
  filters: {
    search: string
    status: 'done' | 'pending' | 'all'
    fromDate: string
    toDate: string
  }
  onFilterChange: (filters: {
    search?: string
    status?: 'done' | 'pending' | 'all'
    fromDate?: string
    toDate?: string
  }) => void
  onClear: () => void
}

export function TodoFilters({
  filters,
  onFilterChange,
  onClear,
}: TodoFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== '' && value !== 'all'
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefa..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="pl-9"
          />
        </div>
        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFilterChange({ status: value as 'done' | 'pending' | 'all' })
          }
        >
          <SelectTrigger className="w-[150px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="done">Concluídos</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="h-10 w-10"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div
        className={cn(
          'grid gap-4 transition-all duration-200',
          hasActiveFilters ? 'grid-cols-2' : 'hidden'
        )}
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">Data inicial</label>
          <Input
            type="date"
            value={filters.fromDate}
            onChange={(e) => onFilterChange({ fromDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Data final</label>
          <Input
            type="date"
            value={filters.toDate}
            onChange={(e) => onFilterChange({ toDate: e.target.value })}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClear}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  )
}
