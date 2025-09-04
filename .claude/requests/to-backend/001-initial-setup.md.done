# Backend Team 초기 요청사항

**요청자**: PM
**날짜**: 2025-01-12
**우선순위**: 긴급

## 요청 내용

### 1. 프로젝트 초기 설정 (Task #1, #2)
- Next.js 14 App Router 프로젝트 생성
- TypeScript 설정
- Prisma ORM 설정
- Supabase 연동 설정

### 2. 데이터베이스 스키마 설계 (Task #2)
아래 핵심 테이블을 우선 생성해주세요:

```sql
-- users 테이블
- id (UUID)
- email
- password_hash
- nickname
- profile_image_url
- created_at
- updated_at

-- user_keywords 테이블
- id
- user_id (FK)
- keyword
- weight (1-5)
- created_at

-- news 테이블
- id
- title
- content
- summary (AI 3줄 요약)
- sentiment (긍정/부정/중립)
- keywords (JSON array)
- published_at
- source_url
- created_at

-- bookmarks 테이블
- id
- user_id (FK)
- news_id (FK)
- created_at

-- user_news_scores 테이블
- user_id
- news_id
- relevance_score
- created_at
```

### 3. JWT 인증 시스템 구현 (Task #3)
- `/api/auth/signup` - 회원가입
- `/api/auth/signin` - 로그인
- `/api/auth/refresh` - 토큰 갱신
- `/api/auth/signout` - 로그아웃

**JWT 토큰 정책**:
- Access Token: 1시간
- Refresh Token: 30일
- Refresh Token Rotation 구현

### 4. 뉴스 API 엔드포인트 (Task #7)
- `GET /api/news/personalized` - 개인화 피드
- `GET /api/news/{id}` - 뉴스 상세
- `GET /api/news/search` - 검색

## 완료 기한
- 데이터베이스 스키마: 1월 13일
- JWT 인증: 1월 14일
- 뉴스 API: 1월 15일

## 산출물
- Prisma 스키마 파일
- API 문서 (OpenAPI Spec)
- Postman Collection
- `.env.example` 파일

## 참고사항
- Supabase 프로젝트는 이미 생성되어 있음
- Row Level Security (RLS) 정책 설정 필요
- API Rate Limiting 구현 (사용자당 100 req/min)