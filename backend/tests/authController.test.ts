import request from 'supertest';
import app from '../src/app';
import { auth } from '../src/config/firebase';

// Mocking Firebase Admin SDK
jest.mock('../src/config/firebase', () => ({
    auth: {
        createUser: jest.fn().mockImplementation(({ email }) => ({
            uid: 'testUserId',
            email,
        })),
        getUserByEmail: jest.fn().mockImplementation(email => ({
            uid: 'testUserId',
            email,
        })),
    },
}));

describe('AuthController', () => {
    const email = `testuser-${Date.now()}@example.com`;
    const password = 'password123';

    it('deve registrar um novo usuário', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({ email, password });

        expect(response.status).toBe(201);
    });

    it('deve falhar ao autenticar com credenciais incorretas', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ email, password: 'wrongpassword' });

        expect(response.status).toBe(401);
    });
});
