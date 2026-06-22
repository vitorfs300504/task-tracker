// src/components/EmptyState.tsx
// Exibido quando não há nenhuma tarefa cadastrada

interface EmptyStateProps {
  onCreateTask: () => void;
}

export default function EmptyState({ onCreateTask }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="text-6xl">📋</div>
      <h3 className="text-lg font-semibold text-slate-700">Nenhuma tarefa ainda</h3>
      <p className="text-slate-500 text-sm text-center max-w-xs">
        Você ainda não tem tarefas cadastradas. Crie sua primeira tarefa para começar!
      </p>
      <button
        onClick={onCreateTask}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        + Criar primeira tarefa
      </button>
    </div>
  );
}