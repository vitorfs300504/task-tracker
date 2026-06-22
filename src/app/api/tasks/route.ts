// src/app/api/tasks/route.ts
// Responsável por listar todas as tarefas (GET) e criar uma nova tarefa (POST)

import { NextResponse } from "next/server";
import { getAllTasks, createTask } from "@/lib/db";
import { taskSchema } from "@/lib/validations";

// GET /api/tasks — retorna todas as tarefas salvas no JSON
export async function GET() {
  try {
    const tasks = await getAllTasks();
    return NextResponse.json(tasks, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar tarefas" },
      { status: 500 }
    );
  }
}

// POST /api/tasks — recebe os dados do body, valida com Zod e cria uma nova tarefa
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Valida os dados recebidos usando o schema do Zod
    const parsed = taskSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newTask = await createTask(parsed.data);
    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar tarefa" },
      { status: 500 }
    );
  }
}