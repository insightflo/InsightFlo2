# InsightFlo Backend API 문서

**Version**: 1.0  
**Base URL**: `http://localhost:3000/api/v1`  
**Backend Lead**: Backend Team  

---

## 📋 목차

1. [인증 API](#인증-api)
2. [뉴스 API](#뉴스-api)
3. [에러 코드](#에러-코드)
4. [데이터 타입](#데이터-타입)

---

## 🔐 인증 API

### 회원가입 (JWT 기반)
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "nickname": "사용자닉네임"
}
```

**응답 예시 (201 Created)**:
```json
{
  "success": true,
  "message": "회원가입이 완료되었습니다.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "사용자닉네임"
  }
}
```

**보안 요구사항**:
- 이메일: 유효한 이메일 형식
- 비밀번호: 최소 8자, 대소문자+숫자+특수문자 포함
- 중복 이메일 거부

### 로그인 (JWT 토큰 발급)
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**응답 예시 (200 OK)**:
```json
{
  "success": true,
  "message": "로그인 성공",
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "사용자닉네임"
  }
}
```

**JWT 토큰 스펙**:
- Access Token: 1시간 만료, 사용자 정보 포함
- Refresh Token: 30일 만료, 로테이션 적용

### 토큰 갱신
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**응답 예시 (200 OK)**:
```json
{
  "success": true,
  "tokens": {
    "accessToken": "new-jwt-access-token",
    "refreshToken": "new-jwt-refresh-token"
  }
}
```

### 프로필 조회 (인증 필요)
```http
GET /api/auth/profile
Authorization: Bearer {access-token}
```

**응답 예시 (200 OK)**:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "사용자닉네임",
    "created_at": "2025-01-08T...",
    "updated_at": "2025-01-08T..."
  }
}
```

---

## 📰 뉴스 API

### 개인화 피드 조회 (인증 필요)
```http
GET /api/v1/news/personalized?page=1&limit=20&keywords=AI,기술
Authorization: Bearer {accessToken}
```

**쿼리 파라미터**:
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 20, 최대: 100)
- `keywords`: 필터링할 키워드 (콤마로 구분, 선택사항)

**응답 예시 (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "AI 기술의 새로운 돌파구",
      "content": "인공지능 기술이 또 다른 혁신을...",
      "summary": "GPT-5의 출시가 임박하며...",
      "sentiment": "POSITIVE",
      "keywords": ["AI", "GPT-5", "인공지능"],
      "publishedAt": "2025-01-20T00:00:00Z",
      "sourceUrl": "https://example.com/news/1",
      "createdAt": "2025-01-21T00:00:00Z",
      "isBookmarked": false,
      "relevanceScore": 0.85
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### 뉴스 상세 조회
```http
GET /api/v1/news/{id}
Authorization: Bearer {accessToken} (선택사항)
```

**응답 예시 (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "AI 기술의 새로운 돌파구",
    "content": "전체 기사 내용...",
    "summary": "3줄 요약 내용",
    "sentiment": "POSITIVE",
    "keywords": ["AI", "GPT-5", "인공지능"],
    "publishedAt": "2025-01-20T00:00:00Z",
    "sourceUrl": "https://example.com/news/1",
    "createdAt": "2025-01-21T00:00:00Z",
    "isBookmarked": false,
    "relevanceScore": 0.85
  }
}
```

### 뉴스 검색
```http
GET /api/v1/news/search?query=AI&page=1&limit=20&sentiment=POSITIVE&dateFrom=2025-01-01&dateTo=2025-01-31
Authorization: Bearer {accessToken} (선택사항)
```

**쿼리 파라미터**:
- `query`: 검색어 (필수)
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 20, 최대: 100)
- `sentiment`: 감정 필터 (POSITIVE|NEGATIVE|NEUTRAL, 선택사항)
- `dateFrom`: 시작 날짜 (YYYY-MM-DD, 선택사항)
- `dateTo`: 종료 날짜 (YYYY-MM-DD, 선택사항)

**응답 형식**: 개인화 피드와 동일

---

## ❌ 에러 코드

### 표준 에러 응답 형식
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "사람이 읽을 수 있는 메시지",
    "details": {
      "field": "필드명",
      "reason": "상세 이유"
    }
  }
}
```

### 에러 코드 목록

| 코드 | HTTP 상태 | 설명 |
|------|-----------|------|
| `VALIDATION_ERROR` | 400 | 입력값 검증 실패 |
| `AUTHENTICATION_REQUIRED` | 401 | 인증 필요 |
| `INVALID_CREDENTIALS` | 401 | 잘못된 인증 정보 |
| `ACCESS_DENIED` | 403 | 접근 권한 없음 |
| `RESOURCE_NOT_FOUND` | 404 | 리소스를 찾을 수 없음 |
| `RESOURCE_ALREADY_EXISTS` | 409 | 이미 존재하는 리소스 |
| `RATE_LIMIT_EXCEEDED` | 429 | 요청 한도 초과 |
| `INTERNAL_SERVER_ERROR` | 500 | 서버 내부 오류 |
| `SERVICE_UNAVAILABLE` | 503 | 서비스 사용 불가 |

---

## 📊 데이터 타입

### User (사용자)
```typescript
interface User {
  id: string;              // UUID
  email: string;           // 이메일 주소
  nickname: string | null; // 닉네임 (선택사항)
  profileImageUrl: string | null; // 프로필 이미지 URL
  createdAt: string;       // ISO 8601 날짜
  updatedAt: string;       // ISO 8601 날짜
}
```

### News (뉴스)
```typescript
interface News {
  id: string;              // UUID
  title: string;           // 뉴스 제목
  content: string;         // 뉴스 내용
  summary: string | null;  // AI 3줄 요약
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'; // 감성 분석 결과
  keywords: string[] | null; // 키워드 배열
  publishedAt: string;     // 원본 게시일 (ISO 8601)
  sourceUrl: string;       // 원본 URL
  createdAt: string;       // 생성일 (ISO 8601)
  isBookmarked?: boolean;  // 북마크 여부 (인증된 사용자만)
  relevanceScore?: number; // 개인화 점수 0.0-1.0 (인증된 사용자만)
}
```

### Pagination Meta (페이지네이션)
```typescript
interface Meta {
  page: number;        // 현재 페이지
  limit: number;       // 페이지당 항목 수
  total: number;       // 전체 항목 수
  totalPages: number;  // 전체 페이지 수
}
```

---

## 🔧 개발 가이드

### 로컬 환경 설정

1. **환경 변수 설정**
```bash
cp .env.example .env
# .env 파일의 값들을 실제 값으로 수정
```

2. **데이터베이스 설정**
```bash
npm run db:generate  # Prisma 클라이언트 생성
npm run db:push      # 스키마를 DB에 적용
npm run db:seed      # 테스트 데이터 생성
```

3. **개발 서버 실행**
```bash
npm run dev          # 개발 서버 시작 (localhost:3000)
```

### API 테스트

테스트 계정:
- 이메일: `test@insightflo.com`
- 비밀번호: `password123`

### 보안 요구사항 (Standards Guardian 준수)

1. **JWT 토큰**
   - Access Token: 1시간 만료
   - Refresh Token: 30일 만료
   - Token Rotation 구현
   - 32자+ 시크릿 키 필수

2. **비밀번호**
   - bcrypt 12라운드 해싱
   - 최소 8자 이상 요구
   - 복잡도 검증 구현

3. **API 보안**
   - HTTPS 강제 (프로덕션)
   - Rate Limiting: 사용자당 100 req/min
   - 입력값 검증 100%
   - 민감정보 로깅 금지

---

**문서 버전**: 1.0  
**최종 업데이트**: 2025-01-21  
**Backend Lead**: Backend Team