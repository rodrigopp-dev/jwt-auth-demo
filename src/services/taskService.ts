import { httpClient } from './httpClient'
import type { NewTask, Task } from '../types'

export async function getTasks(): Promise<Task[]> {
  const { data } = await httpClient.get<Task[]>('/tasks')
  return data
}

export async function createTask(id: number, body: NewTask): Promise<Task> {
  const { data } = await httpClient.post<Task>(`/projects/${id}/tasks`, body)
  return data
}

export async function getTasksByProject(projectId: number): Promise<Task[]> {
  const { data } = await httpClient.get<Task[]>(`/projects/${projectId}/tasks`);

  return data;
}

export async function deleteTasksById(id: number): Promise<Task[]> {
  const { data } = await httpClient.delete<Task[]>(`/tasks/${id}`);

  return data;
}
