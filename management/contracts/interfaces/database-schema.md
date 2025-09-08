# InsightFlo 데이터베이스 스키마 정의서

## 개요
InsightFlo 프로젝트의 데이터베이스 스키마 정의와 구조를 문서화합니다.

## 플랫폼
- **데이터베이스 엔진**: Supabase PostgreSQL
- **접속 방식**: @supabase/supabase-js 클라이언트
- **스키마 버전**: v1.0.0

## 데이터베이스 스키마

### 1. users 테이블
```sql
CREATE TABLE public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nickname VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 테이블 권한 설정
ALTER TABLE public.users OWNER TO postgres;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
```

#### 테이블 설명
- 사용자 계정 정보 저장
- 이메일 기반 인증
- 기본 생성 시간 트래킹

### 2. news 테이블
```sql
CREATE TABLE public.news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  summary TEXT,
  content TEXT,
  sentiment VARCHAR(20),
  keywords TEXT[] DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 테이블 권한 설정
ALTER TABLE public.news OWNER TO postgres;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
```

#### 테이블 설명
- 뉴스 기사 정보 저장
- 감정 분석 결과 포함
- 키워드 배열로 효율적 검색 지원

### 3. user_keywords 테이블
```sql
CREATE TABLE public.user_keywords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  keyword VARCHAR(100) NOT NULL,
  weight INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT fk_user_keywords_user_id FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- 인덱스 생성
CREATE INDEX idx_user_keywords_user_id ON public.user_keywords(user_id);
CREATE INDEX idx_user_keywords_keyword ON public.user_keywords(keyword);

-- 테이블 권한 설정
ALTER TABLE public.users OWNER TO postgres;
ALTER TABLE public.user_keywords ENABLE ROW LEVEL SECURITY;
```

#### 테이블 설명
- 사용자 관심 키워드 저장
- 관심도 가중치로 우선순위 관리
- CASCADE 삭제로 데이터 일관성 유지

### 4. bookmarks 테이블
```sql
CREATE TABLE public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  news_id UUID NOT NULL REFERENCES public.news(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT fk_bookmarks_user_id FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT fk_bookmarks_news_id FOREIGN KEY (news_id) REFERENCES public.news(id),
  UNIQUE(user_id, news_id)
);

-- 인덱스 생성
CREATE INDEX idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX idx_bookmarks_news_id ON public.bookmarks(news_id);

-- 테이블 권한 설정
ALTER TABLE public.bookmarks OWNER TO postgres;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
```

#### 테이블 설명
- 사용자 북마크 항목 저장
- 중복 북마크 방지를 위한 UNIQUE 제약
- CASCADE 삭제로 데이터 일관성 유지

## 관계 다이어그램
```
users (1) ────┬─── (N) user_keywords
              │
              └─── (N) bookmarks (N) ──── (1) news
```

## Row Level Security (RLS) 정책

### users 테이블 RLS 정책
```sql
-- 사용자 본인만 자신의 데이터에 접근 가능
CREATE POLICY "Users can access their own data" ON public.users
  FOR ALL USING (auth.uid() = id);
```

### user_keywords 테이블 RLS 정책
```sql
-- 사용자 본인만 자신의 키워드에 CRUD 가능
CREATE POLICY "Users can CRUD their own keywords" ON public.user_keywords
  FOR ALL USING (auth.uid() = user_id);
```

### bookmarks 테이블 RLS 정책
```sql
-- 사용자 본인만 자신의 북마크에 CRUD 가능
CREATE POLICY "Users can CRUD their own bookmarks" ON public.bookmarks
  FOR ALL USING (auth.uid() = user_id);
```

### news 테이블 RLS 정책
```sql
-- 모든 사용자가 뉴스 대략 보기 가능 (READ)
CREATE POLICY "All users can read news" ON public.news
  FOR SELECT USING (true);
```

## 인덱스 전략
- `users.email`: UNIQUE 인덱스 (자동 생성)
- `user_keywords.keyword`: 일반 인덱스
- `bookmarks.user_id, news_id`: 복합 UNIQUE 인덱스 (자동 생성)
- `bookmarks.user_id, bookmarks.news_id`: 일반 인덱스들

## 마이그레이션 순서
1. users 테이블 생성
2. news 테이블 생성
3. user_keywords 테이블 생성 (users FK)
4. bookmarks 테이블 생성 (users, news FK)
5. RLS 정책 적용
6. 인덱스 생성

## 데이터 타입 선택 근거
- `UUID`: 보안성과 분산 시스템 호환성 고려
- `VARCHAR(255)` for email: RFC 3696 준수
- `TEXT[]` for keywords: PostgreSQL의 배열 타입 활용
- `TIMESTAMP WITH TIME ZONE`: UTC 표준화

## 보안 고려사항
- 모든 테이블에 RLS 활성화
- Supabase Auth와의 통합
- 민감한 데이터 암호화 고려 (password_hash 등)

## 성능 고려사항
- `user_keywords` 테이블의 복합 인덱스
- `bookmarks` 테이블의 복합 인덱스
- 배열 타입 활용으로 LIKE 검색 최적화