import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { authenticateJWT } from "../middlwares/auth";

export async function crudTasks(app: FastifyInstance) {
    app.addHook('preHandler', authenticateJWT)

    app.get('/tasks', async (req, res) => {
        const userId = (req as any).userId;

        const searchParametersSchema = z.object({
            initialDate: z.coerce.date().optional(),
            finalDate: z.coerce.date().optional(),
            priority: z.string().optional()
        })

        const { finalDate, initialDate, priority } = searchParametersSchema.parse(req.query)

        if(!!initialDate && !!finalDate && finalDate > initialDate ) {
            const tasks = await prisma.task.findMany({
                where: {
                    idUser: userId,
                    expirationDate: {
                        lte: finalDate,
                        gte: initialDate
                    }
                }
            })
    
            return res.status(200).send(tasks)
        }

        if(!!priority && priority === "BAIXA" || "MEDIA" || "ALTA" ) {
            const tasks = await prisma.task.findMany({
                where: {
                    idUser: userId,
                    priority: priority
                }
            })
    
            return res.status(200).send(tasks)
        }

        const tasks = await prisma.task.findMany({
            where: {
                idUser: userId
            }
        })

        return res.status(200).send(tasks)
    });

    app.get('/tasks/:idTask', async (req, res) => {
        const userId = (req as any).userId;

        const paramsSchema = z.object({
            idTask: z.string().uuid()
        });

        const { idTask } = paramsSchema.parse(req.params);

        try {
            const task = await prisma.task.findUnique({
                where: {
                    id: idTask,
                    idUser: userId
                }
            });

            if (task === null) return res.status(404).send({
                mensagem: "Não foi localizado nenhuma tarefa com esse ID."
            });

            return res.status(200).send(task)
        } catch (error) {
            return res.status(400).send({
                mensagem: "Não foi possível retornar a tarefa informada."
            });
        }
    });

    app.post('/tasks', async (req, res) => {
        const userId = (req as any).userId;

        const bodySchema = z.object({
            title: z.string(),
            descripton: z.string(),
            priority: z.string(),
            expirationDate: z.coerce.date(),
        });

        const bodyData = bodySchema.parse(req.body)

        try {
            await prisma.task.create({
                data: {
                    idUser: userId,
                    title: bodyData.title,
                    description: bodyData.descripton,
                    priority: bodyData.priority,
                    expirationDate: bodyData.expirationDate
                }
            });

            return res.status(201).send({
                mensagem: "Tafera incluída com sucesso."
            })
        } catch (error) {
            return res.status(400).send({
                mensagem: "Não foi possível inserir a tarefa."
            });
        }
    });

    app.put('/tasks/:idTask', async (req, res) => {
        const userId = (req as any).userId;

        const paramsSchema = z.object({
            idTask: z.string().uuid()
        });

        const bodySchema = z.object({
            title: z.string().optional(),
            descripton: z.string().optional(),
            priority: z.string().optional(),
            completed: z.boolean().optional(),
            expirationDate: z.coerce.date().optional(),
        });

        const bodyData = bodySchema.parse(req.body)

        const { idTask } = paramsSchema.parse(req.params);

        try {
            const task = await prisma.task.findUnique({
                where: {
                    id: idTask,
                    idUser: userId
                }
            });

            if (task === null) return res.status(404).send({
                mensagem: "Não foi localizado nenhuma tarefa com esse ID."
            });

            await prisma.task.update({
                where: {
                    id: idTask,
                    idUser: userId
                },
                data: {
                    title: bodyData.title ? bodyData.title : task.title,
                    description: bodyData.descripton ? bodyData.descripton : task.description,
                    expirationDate: bodyData.expirationDate ? bodyData.expirationDate : task.expirationDate,
                    priority: bodyData.priority ? bodyData.priority : task.priority,
                    completed: bodyData.completed ? bodyData.completed : task.completed
                }
            });

            return res.status(200).send({
                mensagem: "Tarefa atualizada com sucesso."
            });

        } catch (error) {
            return res.status(400).send({
                mensagem: "Não foi possível retornar a tarefa informada."
            });
        }
    });

    app.delete('/tasks/:taskId', async (req, res) => {
        const userId = (req as any).userId;

        const paramsSchema = z.object({
            taskId: z.string().uuid()
        });

        const { taskId } = paramsSchema.parse(req.params);

        try {
            const task = await prisma.task.findUnique({
                where: {
                    id: taskId,
                    idUser: userId
                }
            });

            if (task === null) return res.status(404).send({
                mensagem: "Não foi localizado nenhuma tarefa com esse ID."
            });

            await prisma.task.delete({
                where: {
                    id: task.id,
                    idUser: task.idUser
                }
            });

            return res.status(200).send({
                mensagem: "Tarefa deletada com sucesso."
            });
        } catch (error) {
            return res.status(400).send({
                mensagem: "Não foi possível retornar a tarefa informada."
            });
        }
    });
}