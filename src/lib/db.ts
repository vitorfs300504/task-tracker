import fs from "fs/promises";
import path from "path";
import { Task } from "./types";

const DB_PATH = path.join(process.cwd(), "src/data/tasks.json");

async function readTasks(): Promise<Task[]> {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

async function writeTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
}

export async function getAllTasks(): Promise<Task[]> {
  return readTasks();
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  const tasks = await readTasks();
  return tasks.find((t) => t.id === id);
}

export async function createTask(
  data: Omit<Task, "id" | "createdAt" | "updatedAt">
): Promise<Task> {
  const tasks = await readTasks();
  const now = new Date().toISOString();
  const newTask: Task = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  return newTask;
}

export async function updateTask(
  id: string,
  data: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>
): Promise<Task | null> {
  const tasks = await readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await writeTasks(tasks);
  return tasks[index];
}

export async function deleteTask(id: string): Promise<boolean> {
  const tasks = await readTasks();
  const filtered = tasks.filter((t) => t.id !== id);
  if (filtered.length === tasks.length) return false;

  await writeTasks(filtered);
  return true;
}