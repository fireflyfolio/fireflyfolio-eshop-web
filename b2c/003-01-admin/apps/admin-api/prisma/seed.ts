import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

(async () => {
  const login = 'test';
  const existing = await prisma.user.findUnique({ where: { login } });
  if (!existing) {
    await prisma.user.create({
      data: {
        login,
        passwordHash: await argon2.hash('test'),
        displayName: 'Test User',
      },
    });
    console.log('Seeded user: test / test');
  } else {
    console.log('User already exists');
  }
  await prisma.$disconnect();
})();
