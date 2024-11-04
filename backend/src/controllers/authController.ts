import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { UserRequest } from '../types/userRequest';

export class AuthController {
    // Registro de novos usuários
    static async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Validação básica dos campos de email e senha
            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            // Chamada ao serviço de registro
            const token = await AuthService.register(email, password);
            res.status(201).json(token);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ error: err.message });
        }
    }

    // Login de usuários
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Validação dos campos de entrada
            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            // Chamada ao serviço de login
            const token = await AuthService.login(email, password);
            res.status(200).json(token);
        } catch (error) {
            const err = error as Error;
            res.status(401).json({ error: err.message });
        }
    }

    // Logout (opcional, para frontend com gerenciamento de token)
    static async logout(req: Request, res: Response) {
        // Lógica para logout (invalidação de token pode ser implementada)
        res.status(200).json({ message: 'Logout realizado com sucesso' });
    }
}
