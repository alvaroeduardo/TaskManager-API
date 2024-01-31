import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { encryptPassword } from "../lib/bcrypt";
import { authenticateJWT } from "../middlwares/auth";

export async function crudUsers(app: FastifyInstance) {

    app.get('/users/perfil', { preHandler: authenticateJWT }, async (req, res) => {
        const userId = (req as any).userId;

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (user === null) return res.status(404).send({
                mensagem: "Não foi localizado nenhum usuário com esse ID."
            });

            return res.status(200).send({ user });
        } catch {
            return res.status(400).send({
                mensagem: "Não foi possível retornar o usuário informado."
            });
        }
    });

    app.post('/users', async (req, res) => {
        const bodySchema = z.object({
            name: z.string(),
            password: z.string()
        });

        const { name, password } = bodySchema.parse(req.body);

        try {
            const existingUser = await prisma.user.findFirst({
                where: { name }
            })

            if (existingUser) return res.status(401).send({
                mensagem: "Usuário já cadastrado com esse nome."
            });

            const encriptedPassword = await encryptPassword(password);

            const user = await prisma.user.create({
                data: {
                    name,
                    password: encriptedPassword
                }
            });

            return res.status(201).send({
                mensagem: "Usuário cadastrado com sucesso.",
                user
            });

        } catch (error) {

            return res.status(400).send({
                mensagem: "Não foi possível cadastrar o usuário."
            });
        }
    });

    app.put('/users', { preHandler: authenticateJWT }, async (req, res) => {
        const userId = (req as any).userId;

        const bodySchema = z.object({
            name: z.string().optional(),
            password: z.string().optional()
        });

        const { name, password } = bodySchema.parse(req.body);

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) return res.status(404).send({
                mensagem: "Usuário não foi encontrado."
            });

            const updatedUser = await prisma.user.update({
                where: { id: user.id },
                data: {
                    name: name ? name : user.name,
                    password: password ? await encryptPassword(password) : user.password
                }
            });

            return res.status(200).send({
                mensagem: "Dados do usuário atualizado com sucesso.",
                updatedUser
            });
        } catch (error) {

            return res.status(400).send({
                mensagem: "Não foi possível cadastrar o usuário."
            });
        }
    });

    app.delete('/users', { preHandler: authenticateJWT }, async (req, res) => {
        const userId = (req as any).userId;

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) return res.status(404).send({
                mensagem: "Não foi encontrado nenhum usuário."
            });

            await prisma.user.delete({
                where: { id: user.id }
            });

            return res.status(200).send({
                mensagem: "Usuário deletado com sucesso."
            });
        } catch (error) {
            return res.status(400).send({
                mensagem: "Não foi possível deletar o usuário."
            });
        }
    });
}
