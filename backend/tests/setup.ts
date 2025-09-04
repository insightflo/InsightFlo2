import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @ts-ignore
beforeAll(async () => {
  // 테스트 데이터베이스 연결
});

// @ts-ignore
afterAll(async () => {
  // 테스트 데이터베이스 정리
  await prisma.$disconnect();
});

// @ts-ignore
beforeEach(async () => {
  // 각 테스트 전 데이터 초기화
});