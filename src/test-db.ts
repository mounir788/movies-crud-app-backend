// backend/src/test-db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
    try {
        await prisma.$connect();
        console.log('Database connection successful!');

        const mediaCount = await prisma.media.count();
        console.log(`Found ${mediaCount} media records`);
    } catch (error) {
        console.error('Database connection error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();