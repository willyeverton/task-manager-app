import { Response } from 'express';
import { UserRequest } from '../types/userRequest';
import { TaskService } from '../services/taskService';
import { Task } from '../models/taskModel';

export class TaskController {
    static async create(req: UserRequest, res: Response) {
        try {
            const task: Task = { ...req.body, userId: req.user?.uid };
            const newTask = await TaskService.createTask(task);
            res.status(201).json(newTask);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: 'Erro interno: ' + err.message });
        }
    }

    static async getAll(req: UserRequest, res: Response) {
        try {
            const userId = req.user?.uid || '';
            const tasks = await TaskService.getTasks(userId);
            res.json(tasks);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: 'Erro interno: ' + err.message });
        }
    }

    static async getById(req: UserRequest, res: Response) {
        console.error(req);
        try {
            const taskId = req.params.id;
            const task = await TaskService.getTaskById(taskId);
            if (!task) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }
            res.json(task);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message });
        }
    }

    static async update(req: UserRequest, res: Response) {
        try {
            const taskId = req.params.id;
            const updatedData = req.body; // Os dados para atualizar
            const updatedTask = await TaskService.updateTask(taskId, updatedData);
            res.json(updatedTask);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ error: err.message });
        }
    }

    static async delete(req: UserRequest, res: Response) {
        try {
            const taskId = req.params.id;
            await TaskService.deleteTask(taskId);
            res.status(204).send(); // No Content
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ error: err.message });
        }
    }

}
