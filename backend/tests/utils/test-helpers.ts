import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTestUser = async () => {
  return await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: 'hashed_password',
      nickname: 'Test User',
    },
  });
};

export const generateJWTToken = (userId: string) => {
  // JWT 토큰 생성 헬퍼
};