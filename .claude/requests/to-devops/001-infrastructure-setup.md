# DevOps/Operator 초기 요청사항

**요청자**: PM
**날짜**: 2025-01-12
**우선순위**: 높음

## 요청 내용

### 1. 개발 환경 설정

#### Docker 구성
- Backend용 Dockerfile 작성
- Docker Compose 설정
  - Next.js 앱 서비스
  - PostgreSQL (로컬 개발용)
  - Redis (캐싱용)

#### 환경 변수 관리
```env
# .env.example 템플릿
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
REDIS_URL=
FCM_SERVER_KEY=
```

### 2. CI/CD 파이프라인 구축 (Task #20)

#### GitHub Actions Workflows

**Backend CI/CD**
```yaml
- 코드 체크아웃
- 의존성 설치
- 린트 실행
- 테스트 실행
- 빌드
- Vercel 배포
```

**Flutter CI/CD**
```yaml
- 코드 체크아웃
- Flutter 설정
- 의존성 설치
- 테스트 실행
- APK/IPA 빌드
- 아티팩트 업로드
```

### 3. 인프라 구성

#### Vercel 설정
- 프로젝트 생성
- 환경 변수 설정
- 도메인 연결
- Preview 배포 설정

#### Supabase 설정
- 데이터베이스 설정
- Row Level Security 정책
- 백업 정책 (일 1회)
- 모니터링 대시보드

#### CDN 설정
- 이미지 CDN (Cloudinary 또는 Vercel)
- 정적 자산 캐싱

### 4. 모니터링 및 로깅

#### 모니터링 도구
- Vercel Analytics
- Sentry 에러 트래킹
- Supabase 대시보드
- Uptime 모니터링

#### 로깅 전략
- API 요청/응답 로깅
- 에러 로깅
- 성능 메트릭
- 사용자 행동 추적

### 5. 보안 설정

#### API 보안
- Rate Limiting 설정
- CORS 정책
- API Key 관리
- HTTPS 강제

#### 시크릿 관리
- GitHub Secrets 설정
- Vercel 환경 변수
- 로컬 개발용 .env 관리

### 6. 배포 전략

#### 배포 단계
1. 개발 환경 (Local)
2. 스테이징 (Vercel Preview)
3. 프로덕션 (Vercel Production)

#### 롤백 계획
- 이전 버전 즉시 복구
- 데이터베이스 마이그레이션 롤백
- 긴급 핫픽스 프로세스

## 완료 기한
- Docker 설정: 1월 13일
- CI/CD 파이프라인: 1월 14일
- 모니터링 설정: 1월 15일
- 프로덕션 준비: 1월 18일

## 산출물
- Docker 설정 파일
- GitHub Actions Workflows
- 인프라 다이어그램
- 배포 가이드 문서
- 모니터링 대시보드

## 성능 목표
- 서비스 가용성: 99.9%
- API 응답 시간: < 300ms (P95)
- 배포 시간: < 5분
- 롤백 시간: < 2분

## 참고사항
- 초기에는 비용 최적화 우선
- 자동 스케일링 설정
- 백업 자동화 필수