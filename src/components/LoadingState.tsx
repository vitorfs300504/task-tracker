// src/components/LoadingState.tsx
// Exibido enquanto as tarefas estão sendo carregadas da API

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-slate-500 text-sm">Carregando tarefas...</p>
    </div>
  );
}