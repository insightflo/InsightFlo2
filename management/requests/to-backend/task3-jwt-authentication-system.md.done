# Task 3: JWT 기반 사용자 인증 시스템 구현 요청

**요청자**: PM  
**우선순위**: HIGH  
**예상 소요 시간**: 3-4일  
**Task Master ID**: 3

## 📋 작업 개요
Task 2에서 완성한 데이터베이스 스키마를 기반으로 이메일/패스워드 기반의 회원가입, 로그인, JWT 토큰 관리 시스템을 구현해주세요.

## 🎯 구체적 요구사항

### 1. API 엔드포인트 구현
다음 인증 관련 API를 구현해주세요:

#### `/api/auth/signup` (POST)
```typescript
// 요청
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "nickname": "사용자닉네임"
}

// 응답
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

#### `/api/auth/signin` (POST)
```typescript
// 요청
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

// 응답  
{
  "success": true,
  "message": "로그인 성공",
  "tokens": {
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  },
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "사용자닉네임"
  }
}
```

#### `/api/auth/refresh` (POST)
```typescript
// 요청
{
  "refreshToken": "jwt-refresh-token"
}

// 응답
{
  "success": true,
  "tokens": {
    "accessToken": "new-jwt-access-token",
    "refreshToken": "new-jwt-refresh-token"
  }
}
```

#### `/api/auth/profile` (GET)
```typescript
// 헤더: Authorization: Bearer <access-token>

// 응답
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

### 2. 보안 요구사항

#### 패스워드 보안
- [ ] **bcryptjs**로 패스워드 해싱 (rounds: 12)
- [ ] 패스워드 강도 검증:
  - 최소 8자 이상
  - 영문 대소문자, 숫자, 특수문자 포함
  - 일반적인 패스워드 패턴 거부

#### JWT 토큰 관리
- [ ] **Access Token**: 1시간 만료
- [ ] **Refresh Token**: 30일 만료
- [ ] Refresh Token 로테이션 구현
- [ ] 토큰에 최소한의 정보만 포함 (user_id, email)

#### 입력값 검증
- [ ] **Zod** 스키마를 사용한 요청 데이터 검증
- [ ] 이메일 형식 검증
- [ ] SQL 인젝션 방지

### 3. 미들웨어 구현
- [ ] JWT 토큰 검증 미들웨어 (`src/middleware.ts` 업데이트)
- [ ] 보호된 API 경로에 자동 적용
- [ ] 토큰 만료 시 적절한 에러 응답

### 4. 에러 처리
표준화된 에러 응답:
```typescript
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS", 
    "message": "이메일 또는 패스워드가 올바르지 않습니다."
  }
}
```

**에러 코드 정의**:
- `INVALID_CREDENTIALS`: 로그인 실패
- `EMAIL_ALREADY_EXISTS`: 중복 이메일
- `WEAK_PASSWORD`: 패스워드 강도 부족
- `INVALID_TOKEN`: 잘못된 JWT 토큰
- `EXPIRED_TOKEN`: 만료된 토큰

## 🧪 테스트 요구사항

### 1. API 테스트 구현
- [ ] 회원가입 플로우 테스트
- [ ] 로그인 플로우 테스트  
- [ ] JWT 토큰 생성/검증 테스트
- [ ] Refresh Token 로테이션 테스트
- [ ] 패스워드 검증 테스트

### 2. 통합 테스트
- [ ] `/api/test/auth` 엔드포인트 생성
- [ ] 전체 인증 플로우 자동 테스트
- [ ] 데이터베이스 연동 테스트

## 🔗 의존성
- Task 2 (데이터베이스 스키마) 완료됨 ✅
- DevOps팀의 Supabase 설정 (병렬 진행)

## 📁 예상 파일 구조
```
backend/src/
├── app/api/auth/
│   ├── signup/route.ts
│   ├── signin/route.ts
│   ├── refresh/route.ts
│   └── profile/route.ts
├── lib/
│   ├── auth.ts           # JWT 유틸리티
│   ├── validation.ts     # Zod 스키마
│   └── password.ts       # 패스워드 유틸리티
├── middleware.ts         # JWT 검증 미들웨어
└── types/
    └── auth.ts           # 인증 관련 타입
```

## 📋 완료 기준
- [ ] 모든 API 엔드포인트 구현됨
- [ ] JWT 토큰 생성/검증 동작함
- [ ] 패스워드 보안 요구사항 충족
- [ ] 입력값 검증 구현됨
- [ ] 에러 처리 표준화됨
- [ ] 테스트 스위트 구현됨
- [ ] 미들웨어가 보호된 경로에 적용됨

## 📝 결과물
완료 후 다음을 `.claude/contracts/interfaces/`에 문서화해주세요:
- JWT 인증 API 명세서
- 보안 정책 문서
- 테스트 결과 리포트

## 💬 병렬 작업 안내
이 작업과 동시에 진행되는 작업들:
- DevOps: Supabase 프로젝트 설정
- Frontend: Flutter 앱 기본 구조 (Task 4)
- UI/UX: 인증 화면 디자인

---
**생성일**: 2025-01-08  
**상태**: 요청됨  
**완료 후**: Task 5 (Flutter HTTP 클라이언트) 시작 가능