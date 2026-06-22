// src/app/api/tasks/stats/route.ts
// Responsável por calcular e retornar as estatísticas das tarefas

import { NextResponse } from "next/server";
import { getAllTasks } from "@/lib/db";
import { Priority, Status } from "@/lib/types";

// GET /api/tasks/stats — retorna estatísticas calculadas sobre as tarefas
export async function GET() {
  try {
    const tasks = await getAllTasks();
    const total = tasks.length;

    // Conta quantas tarefas estão concluídas
    const completed = tasks.filter((t) => t.status === "Concluída").length;

    // Calcula o percentual de conclusão (evita divisão por zero)
    const completionPercentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    // Agrupa a quantidade de tarefas por prioridade
    const byPriority = tasks.reduce(
      (acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
      },
      {} as Record<Priority, number>
    );

    // Agrupa a quantidade de tarefas por status
    const byStatus = tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      {} as Record<Status, number>
    );

    return NextResponse.json(
      {
        total,
        completed,
        completionPercentage,
        byPriority,
        byStatus,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro ao calcular estatísticas" },
      { status: 500 }
    );
  }
}