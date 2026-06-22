// src/components/StatsPanel.tsx
// Painel de estatísticas com resumo visual das tarefas

import { TaskStats } from "@/lib/types";

interface StatsPanelProps {
  stats: TaskStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-700">Visão Geral</h2>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total</span>
          <span className="text-3xl font-bold text-slate-800">{stats.total}</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Concluídas</span>
          <span className="text-3xl font-bold text-emerald-600">{stats.completed}</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Em Andamento</span>
          <span className="text-3xl font-bold text-amber-500">{stats.byStatus?.["Em Andamento"] || 0}</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Pendentes</span>
          <span className="text-3xl font-bold text-slate-500">{stats.byStatus?.["Pendente"] || 0}</span>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Progresso geral</span>
          <span className="text-sm font-bold text-indigo-600">{stats.completionPercentage}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${stats.completionPercentage}%` }}
          />
        </div>

        {/* Distribuição por prioridade */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Por prioridade</span>
          <div className="flex gap-4 flex-wrap">
            <span className="text-xs bg-red-100 text-red-600 px-2.5 py-1 rounded-full font-medium">
              🔴 Alta: {stats.byPriority?.["Alta"] || 0}
            </span>
            <span className="text-xs bg-orange-100 text-orange-600 px-2.5 py-1 rounded-full font-medium">
              🟠 Média: {stats.byPriority?.["Média"] || 0}
            </span>
            <span className="text-xs bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full font-medium">
              🔵 Baixa: {stats.byPriority?.["Baixa"] || 0}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}