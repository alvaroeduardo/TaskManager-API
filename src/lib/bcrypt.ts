import bcrypt from 'bcrypt';

// Função para criptografar uma senha
export async function encryptPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rounds para a geração do salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Função para verificar se uma senha corresponde ao seu hash
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}
