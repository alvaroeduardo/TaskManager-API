import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    data: {
        id: string;
        name: string;
        password: string;
    };
    iat: number;
    exp: number;
}

const verifyJWT = (token: string): DecodedToken | null => {
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY!);
        return decoded as DecodedToken;
    } catch (error) {
        return null;
    }
};

export const authenticateJWT = async (req: FastifyRequest, rep: FastifyReply) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return rep.code(401).send({ message: 'Token de autenticação ausente' });
    }

    const decodedToken = verifyJWT(token);

    if (!decodedToken || !decodedToken.data || !decodedToken.data.id) {
        return rep.code(401).send({ message: 'Token de autenticação inválido' });
    }

    (req as any).userId = decodedToken.data.id;
    
    return;
}