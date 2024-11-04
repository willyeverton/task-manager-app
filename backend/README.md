# Task Manager Backend

Este é o backend do sistema de gerenciamento de tarefas, construído com Node.js, Express e Firebase.

## Requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

## Instalação

1. Instale as dependências:
    ```bash
    npm install
    ```

2. Configure as variáveis de ambiente no arquivo `.env`:
    ```dotenv
    PORT=3000
    FIREBASE_SERVICE_ACCOUNT_PATH=./src/config/serviceAccountKey.json
    JWT_SECRET=<sua_chave_secreta_jwt>
    FRONTEND_URL=http://localhost:8080
    ```

## Executando o Servidor

1. Execute o servidor em modo de desenvolvimento:
    ```bash
    npm run dev
    ```