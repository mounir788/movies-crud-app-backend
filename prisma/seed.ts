// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.media.createMany({
        data: [
            {
                title: 'Inception',
                type: 'Movie',
                director: 'Christopher Nolan',
                budget: '$160M',
                location: 'LA, Paris',
                duration: '148 min',
                year: '2010',
            },
            {
                title: 'Breaking Bad',
                type: 'TV Show',
                director: 'Vince Gilligan',
                budget: '$3M/ep',
                location: 'Albuquerque',
                duration: '49 min/ep',
                year: '2008-2013',
            },
            {
                title: 'The Shawshank Redemption',
                type: 'Movie',
                director: 'Frank Darabont',
                budget: '$25M',
                location: 'Mansfield, Ohio',
                duration: '142 min',
                year: '1994',
            },
            {
                title: 'Game of Thrones',
                type: 'TV Show',
                director: 'David Benioff, D.B. Weiss',
                budget: '$6M/ep',
                location: 'Northern Ireland, Croatia',
                duration: '57 min/ep',
                year: '2011-2019',
            },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });