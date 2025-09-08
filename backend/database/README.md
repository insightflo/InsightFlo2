# InsightFlo 데이터베이스 설정 가이드

## 📋 개요
이 가이드는 InsightFlo 프로젝트의 Supabase PostgreSQL 데이터베이스 설정 방법을 설명합니다.

## 🚀 Supabase 프로젝트 설정

### 1. Supabase 프로젝트 생성
1. [Supabase Dashboard](https://supabase.com/dashboard)에 접속
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `insightflo-db`
   - Database Password: 강력한 패스워드 설정
   - Region: 가장 가까운 지역 선택 (예: Northeast Asia)

### 2. 환경변수 설정
프로젝트 생성 후 다음 정보를 `.env.local`에 추가:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. 데이터베이스 스키마 생성
Supabase Dashboard의 SQL Editor에서 다음 순서로 마이그레이션 파일들을 실행:

1. `migrations/001_create_users_table.sql`
2. `migrations/002_create_news_table.sql`
3. `migrations/003_create_user_keywords_table.sql`
4. `migrations/004_create_bookmarks_table.sql`
5. `migrations/005_create_rls_policies.sql`

## 📊 데이터베이스 스키마

### users 테이블
```sql
- id (UUID, PK)
- email (VARCHAR, UNIQUE, NOT NULL)
- password_hash (VARCHAR, NOT NULL)
- nickname (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### news 테이블
```sql
- id (UUID, PK)
- title (VARCHAR(500), NOT NULL)
- content (TEXT)
- summary (TEXT)
- sentiment (VARCHAR(50)) -- positive, negative, neutral
- keywords (TEXT[])
- published_at (TIMESTAMP)
- source_url (TEXT)
- source_name (VARCHAR(100))
- author (VARCHAR(100))
- category (VARCHAR(50))
- image_url (TEXT)
- is_active (BOOLEAN, DEFAULT true)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### user_keywords 테이블
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- keyword (VARCHAR(100), NOT NULL)
- weight (INTEGER, DEFAULT 1, 1-10 범위)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- UNIQUE(user_id, keyword)
```

### bookmarks 테이블
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- news_id (UUID, FK → news.id)
- notes (TEXT)
- tags (TEXT[])
- created_at (TIMESTAMP)
- UNIQUE(user_id, news_id)
```

## 🔒 Row Level Security (RLS) 정책

### users 테이블
- 사용자는 본인의 프로필만 보기/수정/생성 가능

### news 테이블
- 모든 인증된 사용자는 활성화된 뉴스 읽기 가능
- 서비스 역할만 뉴스 관리 가능

### user_keywords 테이블
- 사용자는 본인의 키워드만 CRUD 가능

### bookmarks 테이블
- 사용자는 본인의 북마크만 CRUD 가능

## 🧪 테스트

### 1. 연결 테스트
```bash
# 개발 서버 시작
npm run dev

# 데이터베이스 테스트 실행
curl http://localhost:3000/api/test/database
```

### 2. 수동 테스트
Supabase Dashboard의 Table Editor에서:
- 각 테이블이 올바르게 생성되었는지 확인
- RLS 정책이 활성화되어 있는지 확인
- 인덱스가 적용되어 있는지 확인

## 🔧 유용한 SQL 쿼리

### 테이블 정보 확인
```sql
-- 모든 테이블 목록
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- 테이블 구조 확인
\d+ users;
\d+ news;
\d+ user_keywords;
\d+ bookmarks;
```

### 인덱스 확인
```sql
SELECT indexname, indexdef FROM pg_indexes 
WHERE tablename IN ('users', 'news', 'user_keywords', 'bookmarks');
```

### RLS 정책 확인
```sql
SELECT schemaname, tablename, policyname, cmd, roles, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public';
```

## 🚨 트러블슈팅

### 일반적인 문제들

1. **환경변수 오류**
   - `.env.local` 파일이 올바른 위치에 있는지 확인
   - 키 값에 따옴표가 없는지 확인

2. **RLS 정책 오류**
   - Supabase Auth가 활성화되어 있는지 확인
   - JWT 토큰이 올바르게 설정되어 있는지 확인

3. **마이그레이션 오류**
   - 마이그레이션을 순서대로 실행했는지 확인
   - 중복 실행으로 인한 오류인지 확인

### 로그 확인
```bash
# Next.js 로그
npm run dev

# Supabase 로그
# Dashboard > Logs > API / Database 섹션에서 확인
```

## 📚 참고 자료
- [Supabase 공식 문서](https://supabase.com/docs)
- [PostgreSQL 공식 문서](https://www.postgresql.org/docs/)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)