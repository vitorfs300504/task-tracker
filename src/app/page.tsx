// src/app/page.tsx
// Página principal da aplicação — gerencia o estado global e conecta todos os componentes

"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, TaskStats } from "@/lib/types";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import StatsPanel from "@/components/StatsPanel";
import LoadingState from "@/components/LoadingState";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Busca todas as tarefas e estatísticas da API
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [tasksRes, statsRes] = await Promise.all([
        fetch("/api/tasks"),
        fetch("/api/tasks/stats"),
      ]);
      const tasksData = await tasksRes.json();
      const statsData = await statsRes.json();
      setTasks(tasksData);
      setStats(statsData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Deleta uma tarefa pelo ID
  const handleDelete = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchData();
  };

  // Abre o formulário para editar uma tarefa existente
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Fecha o formulário e limpa o estado de edição
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Chamado após criar ou editar uma tarefa com sucesso
  const handleSuccess = () => {
    handleCloseForm();
    fetchData();
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">TaskTracker</h1>
            <p className="text-sm text-slate-500">Gerencie suas tarefas com eficiência</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Nova Tarefa
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Painel de estatísticas */}
        {stats && <StatsPanel stats={stats} />}

        {/* Lista de tarefas */}
        {loading ? (
          <LoadingState />
        ) : (
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>

      {/* Modal do formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <TaskForm
              task={editingTask}
              onSuccess={handleSuccess}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}
    </main>
  );
}