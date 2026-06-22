// src/app/api/tasks/[id]/route.ts
import { NextResponse } from "next/server";
import { updateTask, deleteTask } from "@/lib/db";
import { updateTaskSchema } from "@/lib/validations";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const parsed = updateTaskSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await updateTask(id, parsed.data);

    if (!updated) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar tarefa" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteTask(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tarefa deletada com sucesso" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro ao deletar tarefa" },
      { status: 500 }
    );
  }
}