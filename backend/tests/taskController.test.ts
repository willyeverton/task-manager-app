import request from 'supertest';
import app from '../src/app';
import { signToken } from '../src/utils/jwtUtil';

// Mocking Firebase Admin SDK
jest.mock('../src/config/firebase', () => ({
    firestore: {
        collection: jest.fn().mockReturnThis(),
        add: jest.fn().mockImplementation(task => ({
            id: 'mockedTaskId',
            ...task,
        })),
        doc: jest.fn().mockReturnThis(),
        get: jest.fn().mockImplementationOnce(() => ({
            exists: true,
            id: 'mockedTaskId',
            data: () => ({
                title: 'Mocked Task',
                description: 'This is a mocked task',
                status: 'pending',
                dueDate: new Date().toISOString(),
                userId: 'testUserId',
            }),
        })).mockImplementationOnce(() => ({
            docs: [{
                id: 'mockedTaskId',
                data: () => ({
                    title: 'Mocked Task',
                    description: 'This is a mocked task',
                    status: 'pending',
                    dueDate: new Date().toISOString(),
                    userId: 'testUserId',
                })
            }]
        })),
        update: jest.fn().mockImplementation(() => ({})),
        delete: jest.fn().mockImplementation(() => ({})),
    }
}));

describe('TaskController', () => {
    let token: string;

    beforeAll(() => {
        token = signToken({ uid: 'testUserId', email: 'test@example.com' });
    });

    it('deve criar uma nova tarefa', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Tarefa 1',
                description: 'Descrição da Tarefa 1',
                status: 'pending',
                dueDate: new Date().toISOString(),
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id', 'mockedTaskId');
    });

    it('deve obter uma tarefa específica', async () => {
        const response = await request(app)
            .get('/tasks/mockedTaskId')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 'mockedTaskId');
        expect(response.body).toHaveProperty('title', 'Mocked Task');
    });
});
