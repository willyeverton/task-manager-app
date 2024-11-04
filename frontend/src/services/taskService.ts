import { Task } from '@/types/Task';
import apiClient from '../http-common';

export async function getAllTasks(): Promise<Task[]> {
    const response = await apiClient.get('/tasks');
    return response.data;
}

export async function getTaskById(taskId: string): Promise<Task> {
    const response = await apiClient.get(`/tasks/${taskId}`);
    return response.data;
}

export async function createTask(taskData: Task): Promise<Task> {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
}

export async function deleteTask(taskId: string): Promise<void> {
    await apiClient.delete(`/tasks/${taskId}`);
}
