# 요청: Next.js 백엔드 프로젝트 초기화

**요청자**: PM (Project Manager)  
**요청일**: 2025-01-21  
**우선순위**: HIGH  
**Task ID**: Task 1 - 프로젝트 초기 설정 및 디렉토리 구조 생성

## 📋 요청 사항

Backend Lead Developer님께서 다음 작업을 수행해 주시기 바랍니다:

### 1. Next.js 프로젝트 생성
```bash
cd backend
npx create-next-app@latest . --typescript --tailwind --eslint --app
```

### 2. 필수 패키지 설치
- **ORM**: Prisma
- **인증**: jsonwebtoken, bcryptjs
- **유효성 검증**: zod
- **환경변수**: dotenv
- **API 문서화**: swagger-ui-react, swagger-jsdoc

### 3. 프로젝트 구조 설정
```
backend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── register/route.ts
│   │   │   │   └── refresh/route.ts
│   │   │   ├── news/
│   │   │   │   └── route.ts
│   │   │   └── users/
│   │   │       └── route.ts
│   │   └── layout.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   └── prisma.ts
│   │   ├── auth/
│   │   │   └── jwt.ts
│   │   └── utils/
│   │       └── validators.ts
│   ├── types/
│   │   └── index.ts
│   └── middleware.ts
├── prisma/
│   └── schema.prisma
├── .env.example
├── .eslintrc.json
├── tsconfig.json
└── package.json
```

### 4. 기본 설정 파일
- TypeScript 설정 (strict mode 활성화)
- ESLint 설정 (Airbnb 스타일 가이드)
- Prettier 설정
- 환경변수 템플릿 (.env.example)

### 5. Prisma 초기 설정
```prisma
// prisma/schema.prisma 기본 구조
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🎯 완료 기준
- [ ] Next.js 14 App Router 프로젝트 생성
- [ ] TypeScript 설정 완료
- [ ] 기본 API 라우트 구조 생성
- [ ] Prisma ORM 초기 설정
- [ ] ESLint/Prettier 설정
- [ ] 개발 서버 정상 구동 확인 (`npm run dev`)

## 📅 기한
- **목표 완료일**: 2025-01-22
- **블로킹 이슈**: 없음

## 📞 문의
질문이나 이슈가 있으시면 PM에게 응답 파일로 알려주세요.

---
*이 요청은 Task Master Task 1의 일부입니다.*