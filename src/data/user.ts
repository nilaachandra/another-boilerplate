import { db } from '@/lib/db';

export async function getUserByEmail(email: string | null | undefined) {
    if (!email) return null;
    
    try {
        const user = await db.user.findUnique({ 
            where: { email },
            include: { accounts: true } // Include linked accounts
        });
        return user;
    } catch {
        return null;
    }
}

export async function getUserByID(id: string) {
    try {
        const user = await db.user.findUnique({ 
            where: { id },
            include: { accounts: true } // Include linked accounts
        });
        return user;
    } catch {
        return null;
    }
}