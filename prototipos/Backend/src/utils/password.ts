import bcrypt from 'bcryptjs';

export const PasswordUtil = {

    hashPassword: async (plainText: string): Promise<string> => {
        return bcrypt.hash(plainText, 10);
    },

    comparePasswords: async (plainText: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(plainText, hash);
    }
};