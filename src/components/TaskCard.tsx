// src/components/TaskCard.tsx
// Card individual de cada tarefa exibido na listagem

import { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

// Cores de acordo com o status da tarefa
const statusStyles = {
  "Pendente": "bg-slate-100 text-slate-600",
  "Em Andamento": "bg-amber-100 text-amber-700",
  "Concluída": "bg-emerald-100 text-emerald-700",
};

// Cores de acordo com a prioridade da tarefa
const priorityStyles = {
  "Alta": "bg-red-100 text-red-600",
  "Média": "bg-orange-100 text-orange-600",
  "Baixa": "bg-blue-100 text-blue-600",
};

// Barra colorida no topo do card de acordo com a prioridade
const priorityBorder = {
  "Alta": "border-t-red-500",
  "Média": "border-t-orange-400",
  "Baixa": "border-t-blue-400",
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 border-t-4 ${priorityBorder[task.priority]} p-5 flex flex-col gap-3 hover:shadow-md transition-shadow`}>
      {/* Título */}
      <h3 className="font-semibold text-slate-800 text-base leading-snug">
        {task.title}
      </h3>

      {/* Descrição */}
      {task.description && (
        <p className="text-sm text-slate-500 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Badges de status e prioridade */}
      <div className="flex flex-wrap gap-2">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[task.status]}`}>
          {task.status}
        </span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* Data de criação e botões de ação */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-xs text-slate-400">
          {new Date(task.createdAt).toLocaleDateString("pt-BR")}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}