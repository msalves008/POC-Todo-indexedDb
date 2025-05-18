import { ClipboardList } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <ClipboardList className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Nenhuma tarefa encontrada</h3>
      <p className="text-muted-foreground max-w-sm">
        Comece adicionando uma nova tarefa para organizar suas atividades do
        dia.
      </p>
    </div>
  )
}
