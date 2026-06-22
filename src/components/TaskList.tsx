// src/components/TaskList.tsx
// Exibe a lista de tarefas em formato grid usando o TaskCard

import { Task } from "@/lib/types";
import TaskCard from "@/components/TaskCard";
import EmptyState from "@/components/EmptyState";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onCreateTask?: () => void;
}

export default function TaskList({ tasks, onEdit, onDelete, onCreateTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState onCreateTask={onCreateTask || (() => {})} />;
  }

  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-700 mb-4">
        Tarefas <span className="text-slate-400 font-normal text-sm">({tasks.length})</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}