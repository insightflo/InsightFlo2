# Database Schema Interface v1.0

**작성자**: Backend Lead  
**작성일**: 2025-01-08  
**버전**: 1.0  
**상태**: 완료

## 📋 개요
InsightFlo 프로젝트의 Supabase PostgreSQL 데이터베이스 스키마 및 API 연동 인터페이스 정의서입니다.

## 🏗️ 데이터베이스 구조

### 1. users 테이블
```typescript
interface User {
  id: string;                    // UUID, Primary Key
  email: string;                 // 이메일 (UNIQUE, NOT NULL)
  password_hash: string;         // 해시된 비밀번호
  nickname: string | null;       // 닉네임 (선택사항)
  created_at: string;           // 생성 시각
  updated_at: string;           // 수정 시각
}
```

### 2. news 테이블
```typescript
interface News {
  id: string;                    // UUID, Primary Key
  title: string;                 // 뉴스 제목 (최대 500자)
  content: string | null;        // 뉴스 본문
  summary: string | null;        // 요약문
  sentiment: 'positive' | 'negative' | 'neutral' | null;  // 감정 분석
  keywords: string[] | null;     // 키워드 배열
  published_at: string | null;   // 발행 시각
  created_at: string;           // 생성 시각
  updated_at: string;           // 수정 시각
  source_url: string | null;    // 원본 URL
  source_name: string | null;   // 언론사명
  author: string | null;        // 기자명
  category: string | null;      // 카테고리
  image_url: string | null;     // 이미지 URL
  is_active: boolean;           // 활성화 상태
}
```

### 3. user_keywords 테이블
```typescript
interface UserKeyword {
  id: string;                   // UUID, Primary Key
  user_id: string;              // 사용자 ID (Foreign Key)
  keyword: string;              // 관심 키워드
  weight: number;               // 가중치 (1-10)
  created_at: string;          // 생성 시각
  updated_at: string;          // 수정 시각
}
```

### 4. bookmarks 테이블
```typescript
interface Bookmark {
  id: string;                   // UUID, Primary Key
  user_id: string;              // 사용자 ID (Foreign Key)
  news_id: string;              // 뉴스 ID (Foreign Key)
  created_at: string;          // 생성 시각
  notes: string | null;        // 개인 메모
  tags: string[] | null;       // 개인 태그
}
```

## 🔒 보안 정책 (RLS)

### users 테이블
- ✅ 사용자는 본인 데이터만 SELECT/UPDATE/INSERT 가능
- ✅ 이메일 형식 검증 제약조건 적용

### news 테이블  
- ✅ 인증된 사용자는 활성화된 뉴스만 SELECT 가능
- ✅ 서비스 역할만 뉴스 관리 가능

### user_keywords 테이블
- ✅ 사용자는 본인의 키워드만 CRUD 가능
- ✅ (user_id, keyword) 조합의 유니크 제약조건

### bookmarks 테이블
- ✅ 사용자는 본인의 북마크만 CRUD 가능  
- ✅ (user_id, news_id) 조합의 유니크 제약조건

## 🚀 API 연동

### Supabase 클라이언트
```typescript
// 공개 클라이언트 (앱에서 사용)
export const supabase = createClient<Database>(supabaseUrl, anonKey);

// 관리자 클라이언트 (서버 사이드 전용)  
export const supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey);
```

### 환경변수 구성
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

## 🧪 테스트 엔드포인트

### 데이터베이스 테스트
```
GET /api/test/database
```

**응답 예시**:
```json
{
  "success": true,
  "message": "All database tests passed successfully",
  "timestamp": "2025-01-08T14:30:00.000Z",
  "endpoint": "/api/test/database"
}
```

## 📊 성능 최적화

### 인덱스 구성
- **users**: email, created_at
- **news**: published_at, created_at, sentiment, category, keywords(GIN), is_active
- **user_keywords**: user_id, keyword, weight, created_at
- **bookmarks**: user_id, news_id, created_at, tags(GIN)

### 자동 업데이트
- 모든 테이블에 `updated_at` 자동 업데이트 트리거 적용

## 📁 파일 구조
```
backend/
├── database/
│   ├── migrations/
│   │   ├── 001_create_users_table.sql
│   │   ├── 002_create_news_table.sql  
│   │   ├── 003_create_user_keywords_table.sql
│   │   ├── 004_create_bookmarks_table.sql
│   │   └── 005_create_rls_policies.sql
│   └── README.md
├── src/
│   ├── lib/
│   │   ├── supabase.ts
│   │   └── db-test.ts
│   ├── types/
│   │   └── database.ts
│   └── app/api/test/database/
│       └── route.ts
```

## ✅ 완료 체크리스트
- [x] 4개 핵심 테이블 스키마 설계
- [x] RLS 정책 구성
- [x] TypeScript 타입 정의  
- [x] Supabase 클라이언트 설정
- [x] 연결 테스트 구현
- [x] API 엔드포인트 생성
- [x] 문서화 완료

## 🔄 다음 단계
1. Supabase 프로젝트 생성 및 마이그레이션 실행
2. 환경변수 설정 
3. 연결 테스트 실행
4. JWT 인증 시스템 구현 (Task 3)