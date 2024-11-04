import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { RequestError } from './types/requestError';
import { setupSwagger } from './swagger'; // Importação do Swagger

dotenv.config();

const app = express();

// Configurações de Segurança
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Middlewares de Parsing e Logging
app.use(express.json());
app.use(morgan('combined'));

// Limitador de Requisições
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por IP
});
app.use(limiter);

// Rotas
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Configuração do Swagger
setupSwagger(app);

// Middleware de Tratamento de Erros
app.use((err: RequestError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Inicializar o Servidor
const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;