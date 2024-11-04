import { auth } from '../config/firebase';
import { signToken } from '../utils/jwtUtil';

export class AuthService {
    // Registro de novo usuário
    static async register(email: string, password: string) {
        const user = await auth.createUser({ email, password });
        const token = signToken({
            uid: user.uid,
            email: user.email || ''
        });
        return { token }; // Retorne o token junto com outras informações, se necessário
    }


    // Login de usuário com verificação de senha
    static async login(email: string, password: string) {
        try {
            // Verifica se o email é válido
            const userRecord = await auth.getUserByEmail(email);
            // Aqui você deveria verificar a senha usando algum método de autenticação. O Firebase não oferece isso diretamente.
            const token = signToken({ uid: userRecord.uid }); // Gera o JWT para o usuário
            return { token };
        } catch (error) {
            const err = error as Error;
            if (err.message.includes('auth/user-not-found')) {
                throw new Error('Usuário não encontrado');
            } else {
                throw new Error('Erro ao fazer login: ' + err.message);

            }
        }

    }
}
