import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

export const signToken = (payload: Omit<User, 'createdAt' | 'updatedAt'>) => {
    // Validação do payload
    if (!payload.uid || !payload.email) {
        throw new Error('Payload do token inválido');
    }
    return jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '1h' });
};

export const verifyToken = (token: string): User => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as User;
        if (!decoded.uid || !decoded.email) {
            throw new Error('Token inválido');
        }
        return {
            uid: decoded.uid,
            email: decoded.email,
        };
    } catch (error) {
        throw new Error('Token inválido ou expirado');
    }
};
