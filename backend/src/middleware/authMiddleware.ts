import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtil';
import { UserRequest } from '../types/userRequest';
import { User } from '../models/userModel';

export const authenticate = (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Exemplo: "Bearer <token>"

    if (!token) {
        return res.status(403).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = verifyToken(token);
        if (typeof decoded === 'string' || !decoded.uid) {
            throw new Error('Token inválido');
        }
        req.user = decoded; // `req.user` conterá informações como `uid`, `email`, etc.
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
};
