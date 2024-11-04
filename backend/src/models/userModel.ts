export interface User {
    uid: string;
    email?: string; // Para armazenar o email do usuário
    createdAt?: Date; // Data de criação do usuário
    updatedAt?: Date; // Data da última atualização
}
