import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "O título é obrigatório").max(100),
  description: z.string().max(500).optional().default(""),
  status: z.enum(["Pendente", "Em Andamento", "Concluída"]),
  priority: z.enum(["Alta", "Média", "Baixa"]),
});

export const updateTaskSchema = taskSchema.partial();