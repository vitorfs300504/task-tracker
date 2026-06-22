// src/components/TaskForm.tsx
// Formulário para criação e edição de tarefas

import { useState } from "react";
import { Task, Status, Priority } from "@/lib/types";

interface TaskFormProps {
  task?: Task | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TaskForm({ task, onSuccess, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<Status>(task?.status || "Pendente");
  const [priority, setPriority] = useState<Priority>(task?.priority || "Média");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!task;

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("O título é obrigatório.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = isEditing ? `/api/tasks/${task.id}` : "/api/tasks";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status, priority }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erro ao salvar tarefa.");
        return;
      }

      onSuccess();
    } catch {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Título do modal */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          {isEditing ? "Editar Tarefa" : "Nova Tarefa"}
        </h2>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 text-xl leading-none"
        >
          ✕
        </button>
      </div>

      {/* Campo de título */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Estudar TypeScript"
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Campo de descrição */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva a tarefa (opcional)"
          rows={3}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        />
      </div>

      {/* Status e Prioridade lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option>Pendente</option>
            <option>Em Andamento</option>
            <option>Concluída</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Prioridade</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option>Alta</option>
            <option>Média</option>
            <option>Baixa</option>
          </select>
        </div>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Botões de ação */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {loading ? "Salvando..." : isEditing ? "Salvar alterações" : "Criar tarefa"}
        </button>
      </div>
    </div>
  );
}