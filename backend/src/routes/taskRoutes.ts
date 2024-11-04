import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Aplica o middleware de autenticação em todas as rotas de tarefas
router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Não autorizado
 */
router.post('/', TaskController.create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas do usuário
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autorizado
 */
router.get('/', TaskController.getAll);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa específica pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Não autorizado
 */
router.get('/:id', TaskController.getById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', TaskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa existente
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', TaskController.delete);

export default router;
