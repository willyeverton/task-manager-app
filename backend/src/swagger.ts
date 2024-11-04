import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API de gerenciamento de tarefas',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Task: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID da tarefa',
                        },
                        title: {
                            type: 'string',
                            description: 'Título da tarefa',
                        },
                        description: {
                            type: 'string',
                            description: 'Descrição da tarefa',
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'completed'],
                            description: 'Status da tarefa',
                        },
                        dueDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de vencimento da tarefa',
                        },
                        userId: {
                            type: 'string',
                            description: 'ID do usuário que criou a tarefa',
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        uid: {
                            type: 'string',
                            description: 'ID do usuário',
                        },
                        email: {
                            type: 'string',
                            description: 'Email do usuário',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação do usuário',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data da última atualização do usuário',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};