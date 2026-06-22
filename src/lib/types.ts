export type Status = "Pendente" | "Em Andamento" | "Concluída";
export type Priority = "Alta" | "Média" | "Baixa";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  completionPercentage: number;
  byPriority: Record<Priority, number>;
  byStatus: Record<Status, number>;
}