import { firestore } from '../config/firebase';
import { Task } from '../models/taskModel';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';

export class TaskService {
    static async createTask(task: Task) {
        const newTask = await firestore.collection('tasks').add(task);
        return { id: newTask.id, ...task };
    }

    static async getTasks(userId: string) {
        const tasksSnapshot = await firestore.collection('tasks').where('userId', '==', userId).get();
        return tasksSnapshot.docs.map((doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() }));
    }

    static async getTaskById(taskId: string) {
        const taskDoc = await firestore.collection('tasks').doc(taskId).get();
        if (!taskDoc.exists) {
            throw new Error('Tarefa não encontrada');
        }
        return { id: taskDoc.id, ...taskDoc.data() } as Task;
    }

    static async updateTask(taskId: string, updatedData: Partial<Task>) {
        await firestore.collection('tasks').doc(taskId).update(updatedData);
        return { id: taskId, ...updatedData };
    }

    static async deleteTask(taskId: string) {
        await firestore.collection('tasks').doc(taskId).delete();
        return { id: taskId };
    }

}
