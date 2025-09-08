# 🚀 InsightFlo API 설계 표준

**버전**: 1.0  
**최종 업데이트**: 2025-01-21  
**표준 수립자**: Standards Guardian  
**적용 범위**: Backend 팀, Frontend 팀

---

## 📋 목차

1. [Next.js App Router 표준](#nextjs-app-router-표준)
2. [API 응답 형식](#api-응답-형식)
3. [라우팅 규칙](#라우팅-규칙)
4. [인증 및 권한](#인증-및-권한)
5. [에러 처리](#에러-처리)
6. [API 문서화](#api-문서화)

---

## 🏗️ Next.js App Router 표준

### ✅ 필수 준수 사항

#### 1. App Router 전용 사용
```typescript
// ✅ 올바른 구조
app/
├── api/                 
│   └── v1/              // 모든 API는 버전 관리 필수
│       ├── auth/
│       ├── news/
│       └── users/
├── layout.tsx           // 루트 레이아웃
└── page.tsx            // 홈페이지 (선택사항)

// 🚫 금지된 구조  
pages/                   // ❌ Pages Router 사용 금지
api/                     // ❌ app/ 외부 API 라우트 금지
```

#### 2. API 라우트 구조 표준
```typescript
// app/api/v1/auth/login/route.ts
export async function POST(request: Request) {
  // 구현 내용
}

// app/api/v1/news/[id]/route.ts  
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // 구현 내용
}
```

### 🚫 금지된 패턴

```typescript
// ❌ Pages Router API 패턴 사용 금지
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 사용 금지
}

// ❌ getServerSideProps, getStaticProps 사용 금지
export async function getServerSideProps() {
  // 사용 금지
}
```

---

## 📡 API 응답 형식

### 1. 표준 응답 형식

#### 성공 응답
```typescript
interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasNext?: boolean;
  };
  timestamp: string;
  version: string;
}

// 예시
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "삼성전자 주가 상승",
    "summary": "삼성전자가 신규 반도체 기술 발표로 주가가 상승했습니다."
  },
  "timestamp": "2025-01-21T10:30:00.000Z",
  "version": "v1"
}
```

#### 에러 응답
```typescript
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;           // 에러 코드 (대문자_스네이크_케이스)
    message: string;        // 사용자용 메시지 (한국어)
    details?: any;          // 개발자용 상세 정보
    field?: string;         // 유효성 검사 실패 필드
  };
  timestamp: string;
  version: string;
}

// 예시
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "이메일 형식이 올바르지 않습니다.",
    "details": {
      "field": "email",
      "value": "invalid-email",
      "expected": "Valid email format"
    },
    "field": "email"
  },
  "timestamp": "2025-01-21T10:30:00.000Z",
  "version": "v1"
}
```

### 2. 페이지네이션 응답

```typescript
// 뉴스 피드 조회 응답
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "title": "뉴스 제목 1",
      "summary": "뉴스 요약 1"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "hasNext": true,
    "hasPrev": false
  },
  "timestamp": "2025-01-21T10:30:00.000Z",
  "version": "v1"
}
```

### 3. 빈 데이터 응답

```typescript
// 데이터가 없는 경우
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "hasNext": false,
    "hasPrev": false
  },
  "timestamp": "2025-01-21T10:30:00.000Z",
  "version": "v1"
}
```

---

## 🛤️ 라우팅 규칙

### 1. URL 구조 표준

```typescript
기본 구조: /api/v1/{resource}/{action}

인증:
POST /api/v1/auth/login
POST /api/v1/auth/register  
POST /api/v1/auth/refresh
POST /api/v1/auth/logout

뉴스:
GET    /api/v1/news/feed?page=1&limit=20
GET    /api/v1/news/search?query=삼성전자&page=1
GET    /api/v1/news/{id}
POST   /api/v1/news/{id}/bookmark
DELETE /api/v1/news/{id}/bookmark

사용자:
GET    /api/v1/users/profile
PUT    /api/v1/users/profile
GET    /api/v1/users/keywords
POST   /api/v1/users/keywords
DELETE /api/v1/users/keywords/{id}

북마크:
GET    /api/v1/bookmarks?page=1&limit=20
DELETE /api/v1/bookmarks/{id}
```

### 2. HTTP 메서드 사용 규칙

```typescript
GET:    데이터 조회 (멱등성 보장)
POST:   새 리소스 생성 또는 액션 실행
PUT:    전체 리소스 업데이트
PATCH:  부분 리소스 업데이트
DELETE: 리소스 삭제
```

### 3. 쿼리 파라미터 규칙

```typescript
페이지네이션:
?page=1&limit=20             // 기본값: page=1, limit=20

정렬:
?sort=created_at&order=desc  // 기본값: created_at desc

필터링:
?category=technology&sentiment=positive

검색:
?query=삼성전자&fields=title,summary
```

---

## 🔐 인증 및 권한

### 1. JWT 토큰 인증

```typescript
// 헤더 형식
Authorization: Bearer <jwt_token>

// 토큰 페이로드 구조
interface JWTPayload {
  sub: string;        // 사용자 ID (UUID)
  email: string;      // 사용자 이메일
  iat: number;        // 발행 시각
  exp: number;        // 만료 시각
  type: 'access' | 'refresh';
}

// 토큰 만료 시간
{
  "accessToken": "1h",
  "refreshToken": "30d"
}
```

### 2. 미들웨어 인증

```typescript
// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth/jwt';

export async function middleware(request: NextRequest) {
  // Public 경로는 인증 제외
  if (isPublicPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  
  const token = extractToken(request);
  if (!token || !await verifyJWT(token)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '인증이 필요합니다.'
        },
        timestamp: new Date().toISOString(),
        version: 'v1'
      },
      { status: 401 }
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/v1/:path*']
};
```

### 3. 권한 확인

```typescript
// 사용자 본인 데이터만 접근 가능
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const currentUser = await getCurrentUser(request);
  
  if (currentUser.id !== params.userId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: '접근 권한이 없습니다.'
        },
        timestamp: new Date().toISOString(),
        version: 'v1'
      },
      { status: 403 }
    );
  }
  
  // 정상 처리
}
```

---

## ❌ 에러 처리

### 1. 표준 에러 코드

```typescript
// 인증 관련
UNAUTHORIZED          // 401: 인증 필요
FORBIDDEN            // 403: 권한 없음  
TOKEN_EXPIRED        // 401: 토큰 만료
INVALID_TOKEN        // 401: 유효하지 않은 토큰

// 유효성 검사
VALIDATION_ERROR     // 400: 입력값 검증 실패
MISSING_FIELD       // 400: 필수 필드 누락
INVALID_FORMAT      // 400: 잘못된 형식

// 리소스 관련
NOT_FOUND           // 404: 리소스 없음
ALREADY_EXISTS      // 409: 이미 존재하는 리소스
RESOURCE_CONFLICT   // 409: 리소스 충돌

// 서버 관련  
INTERNAL_ERROR      // 500: 서버 내부 오류
DATABASE_ERROR      // 500: 데이터베이스 오류
EXTERNAL_API_ERROR  // 502: 외부 API 오류
```

### 2. 에러 응답 생성 유틸리티

```typescript
// lib/utils/api-response.ts
export function createErrorResponse(
  code: string,
  message: string,
  details?: any,
  field?: string
): Response {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
        field
      },
      timestamp: new Date().toISOString(),
      version: 'v1'
    },
    { 
      status: getHttpStatusFromCode(code),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

export function createSuccessResponse<T>(
  data: T,
  meta?: any
): Response {
  return NextResponse.json({
    success: true,
    data,
    meta,
    timestamp: new Date().toISOString(),
    version: 'v1'
  });
}
```

### 3. 글로벌 에러 처리

```typescript
// app/api/v1/[...catchall]/route.ts
export async function GET() {
  return createErrorResponse(
    'NOT_FOUND',
    '요청한 API 엔드포인트를 찾을 수 없습니다.',
    { endpoint: 'unknown' }
  );
}
```

---

## 📚 API 문서화

### 1. OpenAPI 스펙 (Swagger)

```typescript
// lib/swagger/config.ts
export const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InsightFlo API',
      version: '1.0.0',
      description: 'InsightFlo 뉴스 플랫폼 API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: '개발 서버'
      },
      {
        url: 'https://api.insightflo.com/api/v1',
        description: '프로덕션 서버'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./app/api/v1/**/*.ts'],
};
```

### 2. API 문서 주석 형식

```typescript
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: password123
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccessResponse'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function POST(request: Request) {
  // 구현
}
```

### 3. Postman Collection 자동 생성

```json
{
  "info": {
    "name": "InsightFlo API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{accessToken}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000/api/v1",
      "type": "string"
    }
  ]
}
```

---

## 🚨 Standards Guardian 강제 규칙

### ✅ 필수 준수 사항

1. **모든 API는 /api/v1/ 프리픽스 필수**
2. **표준 응답 형식 100% 준수**
3. **인증이 필요한 API는 JWT 검증 필수**
4. **에러 응답은 표준 형식만 사용**

### 🚫 즉시 거부 대상

1. Pages Router API 패턴 사용
2. 표준 응답 형식 위반
3. 에러 메시지 영어 사용
4. API 버전 관리 누락

### 📊 코드 리뷰 체크포인트

```yaml
필수 확인 사항:
  - App Router 구조 준수
  - 응답 형식 표준화
  - 에러 처리 완성도
  - API 문서화 여부
  - 보안 헤더 설정

성능 기준:
  - 응답 시간 < 300ms
  - 메모리 사용량 최적화
  - 데이터베이스 쿼리 최적화
```

---

**Standards Guardian**: 🛡️ API 표준 수호  
**Authority**: ⚠️ 거부권 보유 - API 표준 위반 시 코드 리뷰 거부  
**Contact**: Standards Guardian 응답 파일로 문의