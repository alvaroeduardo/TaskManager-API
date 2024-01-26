import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { comparePasswords } from "../lib/bcrypt";
import * as jwt from "jsonwebtoken";

export async function authentication(app: FastifyInstance) {
    app.post('/login', async (req, res) => {
        const bodySchema = z.object({
            name: z.string(),
            password: z.string()
        });

        const { name, password } = bodySchema.parse(req.body);

        const user = await prisma.user.findFirst({
            where: { name }
        });

        if (!user) return res.status(404).send({
            mensagem: "Usuário não encontrado."
        });

        const verifyPassword = await comparePasswords(password, user.password);

        if (!verifyPassword) return res.status(401).send({
            mensagem: "Usuário ou senha incorretos. Verifique os dados informados."
        });

        const token = jwt.sign({data: user}, process.env.PRIVATE_KEY!, {expiresIn: '2h'});

        return res.status(200).send({
            mensagem: "Login realizado com sucesso.",
            user,
            token
        });
    })
}