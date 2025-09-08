# ✅ InsightFlo 코드 리뷰 체크리스트

**버전**: 1.0  
**최종 업데이트**: 2025-01-21  
**표준 수립자**: Standards Guardian  
**적용 범위**: 전체 개발 팀

---

## 📋 목차

1. [코드 리뷰 프로세스](#코드-리뷰-프로세스)
2. [아키텍처 검토](#아키텍처-검토)
3. [코드 품질 검토](#코드-품질-검토)
4. [보안 검토](#보안-검토)
5. [성능 검토](#성능-검토)
6. [테스트 검토](#테스트-검토)

---

## 🔄 코드 리뷰 프로세스

### 1. Pull Request 생성 규칙

#### PR 제목 형식
```markdown
[TYPE] Brief description

예시:
[FEAT] Add user authentication with JWT
[FIX] Resolve news loading infinite loop
[REFACTOR] Extract news card component
[DOCS] Update API documentation
```

#### PR 설명 필수 포함 사항
```markdown
## 🎯 변경 목적
- 해결하려는 문제나 추가하려는 기능

## 📝 주요 변경 사항
- 변경된 파일별 주요 수정 내용
- 새로 추가된 의존성 (있는 경우)

## 🧪 테스트 방법
- 수동 테스트 절차
- 자동화된 테스트 추가 여부

## 📸 스크린샷 (UI 변경 시)
- 변경 전후 비교 이미지

## ✅ 체크리스트
- [ ] 자기 점검 완료
- [ ] 테스트 추가/수정
- [ ] 문서 업데이트
- [ ] Breaking Changes 없음

## 🔗 관련 이슈
Closes #이슈번호
```

### 2. 리뷰어 할당 규칙

```yaml
리뷰어 할당:
  Backend 변경:
    - Backend Lead (필수)
    - Standards Guardian (보안/아키텍처 변경 시)
    
  Frontend 변경:
    - Frontend Lead (필수)
    - UI/UX Designer (UI 변경 시)
    - Standards Guardian (아키텍처 변경 시)
    
  Infrastructure 변경:
    - DevOps Operator (필수)
    - Standards Guardian (필수)
    
  Cross-cutting 변경:
    - 해당 영역 Lead
    - Standards Guardian (필수)

승인 기준:
  - 최소 1명의 승인 (일반 변경)
  - 2명의 승인 (아키텍처/보안 변경)
  - Standards Guardian 승인 (필수 사항 위반 시)
```

---

## 🏗️ 아키텍처 검토

### 1. 분리 아키텍처 준수

#### ✅ 확인 사항
```yaml
시스템 분리:
  - [ ] 데이터 수집 시스템과 앱 서비스 시스템 간 직접 통신 없음
  - [ ] 공유 데이터베이스를 통한 간접 통신만 사용
  - [ ] 각 시스템의 독립적인 배포 가능성 확보
  - [ ] 한 시스템의 장애가 다른 시스템에 영향 없음

의존성 방향:
  - [ ] Clean Architecture 레이어 규칙 준수
  - [ ] Presentation → Domain ← Data 방향 확인
  - [ ] Domain 레이어의 외부 라이브러리 의존성 없음
  - [ ] 순환 의존성 발생 안 함
```

#### 🚫 즉시 거부 대상
```yaml
아키텍처 위반:
  - 데이터 수집 ↔ 앱 서비스 간 직접 API 호출
  - UI에서 직접 API 호출 (Repository 우회)
  - Domain에서 외부 라이브러리 직접 사용
  - 레이어 간 순환 의존성
  - Pages Router 사용 (Next.js)
```

### 2. Next.js App Router 표준

#### ✅ 확인 사항
```typescript
// 디렉토리 구조 검증
app/
├── api/
│   └── v1/                    // ✅ 버전 관리
│       ├── auth/
│       ├── news/
│       └── users/
├── middleware.ts              // ✅ 인증 미들웨어
└── layout.tsx

// API 라우트 파일 확인
- [ ] 파일명이 route.ts로 끝남
- [ ] HTTP 메서드 함수로 구현 (GET, POST, PUT, DELETE)
- [ ] 표준 응답 형식 사용
- [ ] 에러 처리 완성도
```

### 3. Flutter Clean Architecture

#### ✅ 확인 사항
```dart
// 폴더 구조 검증
lib/
├── core/                      // ✅ 공통 유틸리티
├── features/
│   └── auth/
│       ├── data/             // ✅ Repository 구현
│       ├── domain/           // ✅ Entity, UseCase
│       └── presentation/     // ✅ UI, State Management
└── shared/                   // ✅ 공유 컴포넌트

// 의존성 검증
- [ ] Presentation이 Domain만 의존
- [ ] Data가 Domain 인터페이스 구현
- [ ] Domain이 외부 패키지에 의존하지 않음
- [ ] Riverpod Provider 적절히 사용
```

---

## 💻 코드 품질 검토

### 1. TypeScript/JavaScript (Backend)

#### ✅ 코드 품질 체크리스트
```typescript
타입 안전성:
  - [ ] any 타입 사용 최소화 (불가피한 경우 주석으로 설명)
  - [ ] 인터페이스/타입 정의 완성도
  - [ ] Generic 타입 적절한 사용
  - [ ] 타입 가드 함수 사용

함수 품질:
  - [ ] 함수 길이 50줄 이하
  - [ ] 단일 책임 원칙 준수
  - [ ] 순수 함수 우선 사용
  - [ ] 사이드 이펙트 최소화

변수 및 상수:
  - [ ] const 우선 사용
  - [ ] 의미 있는 변수명
  - [ ] 매직 넘버 상수로 추출
  - [ ] 환경 변수 하드코딩 금지

에러 처리:
  - [ ] try-catch 적절한 사용
  - [ ] 에러 타입별 처리
  - [ ] 사용자 친화적 에러 메시지
  - [ ] 에러 로깅 구현
```

#### 🚫 코드 품질 위반 사례
```typescript
// ❌ 나쁜 예시
export async function POST(req: any) {  // any 사용
  const email = req.body.email;
  const password = req.body.password;
  
  if (email == null) return;  // 느슨한 비교
  
  const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);  // SQL Injection
  
  if (user.password === password) {  // 평문 비교
    return { success: true };
  }
}

// ✅ 좋은 예시
interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: LoginRequest = await request.json();
    const validatedData = loginSchema.parse(body);
    
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }  // Parameterized query
    });
    
    if (!user || !await verifyPassword(validatedData.password, user.passwordHash)) {
      return createErrorResponse('INVALID_CREDENTIALS', '이메일 또는 비밀번호가 올바르지 않습니다.');
    }
    
    return createSuccessResponse({
      accessToken: generateAccessToken(user.id, user.email)
    });
  } catch (error) {
    return handleError(error);
  }
}
```

### 2. Dart/Flutter (Frontend)

#### ✅ 코드 품질 체크리스트
```dart
위젯 품질:
  - [ ] 위젯 크기 적절함 (200줄 이하)
  - [ ] const 생성자 적절한 사용
  - [ ] Key 매개변수 적절한 사용
  - [ ] 불필요한 rebuild 방지

상태 관리:
  - [ ] Riverpod Provider 적절한 사용
  - [ ] 상태 변경 최소화
  - [ ] immutable 객체 사용
  - [ ] side effect 처리 적절함

성능 최적화:
  - [ ] ListView.builder 사용 (대용량 리스트)
  - [ ] 이미지 캐싱 적용
  - [ ] 불필요한 애니메이션 없음
  - [ ] 메모리 누수 방지

코드 구조:
  - [ ] 파일 크기 500줄 이하
  - [ ] private 멤버 적절한 사용
  - [ ] 의존성 주입 적절한 사용
  - [ ] 확장 함수 적절한 활용
```

### 3. 명명 규칙 준수

#### ✅ 파일 및 변수명 검증
```yaml
Backend (TypeScript):
  - [ ] 파일명: kebab-case (API routes)
  - [ ] 파일명: camelCase (utilities)
  - [ ] 파일명: PascalCase (types)
  - [ ] 변수명: camelCase
  - [ ] 상수명: UPPER_SNAKE_CASE
  - [ ] 함수명: camelCase
  - [ ] 클래스명: PascalCase

Frontend (Dart):
  - [ ] 파일명: snake_case
  - [ ] 클래스명: PascalCase
  - [ ] 변수명: camelCase
  - [ ] 상수명: camelCase
  - [ ] 함수명: camelCase
  - [ ] private 멤버: _camelCase
```

---

## 🔐 보안 검토

### 1. 인증 및 권한

#### ✅ 보안 체크리스트
```typescript
JWT 토큰:
  - [ ] 토큰 만료 시간 1시간 이하
  - [ ] 시크릿 키 32자 이상
  - [ ] 토큰 타입 검증 (access/refresh)
  - [ ] 토큰 블랙리스트 확인

권한 검증:
  - [ ] 모든 보호된 API에 인증 미들웨어 적용
  - [ ] 사용자별 데이터 접근 권한 확인
  - [ ] 관리자 권한 별도 검증
  - [ ] CORS 설정 적절함

패스워드 보안:
  - [ ] bcrypt 해싱 사용 (12라운드 이상)
  - [ ] 패스워드 복잡도 규칙 적용
  - [ ] 평문 패스워드 로그 금지
  - [ ] 패스워드 재설정 보안 처리
```

### 2. 입력 검증

#### ✅ 입력 검증 체크리스트
```typescript
데이터 검증:
  - [ ] Zod 스키마 적용
  - [ ] SQL Injection 방지 (Parameterized Query)
  - [ ] XSS 방지 (HTML 이스케이프)
  - [ ] 파일 업로드 검증 (타입, 크기)

Rate Limiting:
  - [ ] 로그인 API 제한 (5회/15분)
  - [ ] 일반 API 제한 (100회/분)
  - [ ] IP 기반 제한
  - [ ] 사용자 기반 제한

데이터 보호:
  - [ ] 민감 정보 암호화
  - [ ] HTTPS 강제 적용
  - [ ] 보안 헤더 설정
  - [ ] 에러 메시지 정보 노출 금지
```

### 3. 클라이언트 보안

#### ✅ Flutter 앱 보안 체크리스트
```dart
토큰 저장:
  - [ ] FlutterSecureStorage 사용
  - [ ] SharedPreferences 민감정보 저장 금지
  - [ ] 토큰 자동 갱신 구현
  - [ ] 로그아웃 시 토큰 삭제

네트워크 보안:
  - [ ] Certificate Pinning 적용
  - [ ] HTTPS 강제 사용
  - [ ] 요청/응답 로깅 민감정보 제외
  - [ ] 타임아웃 설정 적절함

앱 보안:
  - [ ] 디버그 모드에서만 로깅
  - [ ] 화면 캡처 방지 (민감 화면)
  - [ ] 루팅/탈옥 탐지
  - [ ] 앱 백그라운드 시 화면 가림
```

---

## ⚡ 성능 검토

### 1. Backend 성능

#### ✅ API 성능 체크리스트
```typescript
응답 시간:
  - [ ] 인증 API < 200ms
  - [ ] 뉴스 피드 API < 300ms
  - [ ] 검색 API < 500ms
  - [ ] 사용자 API < 100ms

데이터베이스:
  - [ ] 적절한 인덱스 사용
  - [ ] N+1 쿼리 문제 없음
  - [ ] 페이지네이션 구현
  - [ ] Connection Pool 적절한 설정

캐싱:
  - [ ] 반복 조회 데이터 캐싱
  - [ ] 캐시 만료 정책 설정
  - [ ] 캐시 키 충돌 방지
  - [ ] 캐시 무효화 전략

메모리 관리:
  - [ ] 메모리 누수 방지
  - [ ] 대용량 데이터 스트리밍
  - [ ] 가비지 컬렉션 고려
  - [ ] 리소스 정리 적절함
```

### 2. Frontend 성능

#### ✅ Flutter 앱 성능 체크리스트
```dart
앱 시작 성능:
  - [ ] 콜드 스타트 < 0.8초
  - [ ] 스플래시 스크린 적절한 시간
  - [ ] 지연 로딩 적용
  - [ ] 불필요한 초기화 제거

UI 성능:
  - [ ] 60 FPS 유지
  - [ ] 부드러운 애니메이션
  - [ ] ListView.builder 사용
  - [ ] 이미지 최적화 및 캐싱

메모리 사용:
  - [ ] 메모리 사용량 < 200MB
  - [ ] 이미지 메모리 관리
  - [ ] 위젯 트리 최적화
  - [ ] 리스너 정리 적절함

네트워크 성능:
  - [ ] 이미지 압축 및 캐싱
  - [ ] API 응답 캐싱
  - [ ] 불필요한 API 호출 제거
  - [ ] 로딩 상태 표시
```

---

## 🧪 테스트 검토

### 1. 테스트 커버리지

#### ✅ 테스트 품질 체크리스트
```yaml
커버리지 목표:
  - [ ] Backend: 80% 이상
  - [ ] Frontend: 75% 이상
  - [ ] Critical Path: 95% 이상

테스트 유형:
  - [ ] 단위 테스트 (Unit Test)
  - [ ] 통합 테스트 (Integration Test)
  - [ ] E2E 테스트 (End-to-End Test)
  - [ ] 성능 테스트 (Performance Test)

테스트 품질:
  - [ ] 테스트 케이스 명확한 네이밍
  - [ ] Given-When-Then 패턴 사용
  - [ ] Edge Case 테스트 포함
  - [ ] Mock 데이터 적절한 사용
```

### 2. API 테스트

#### ✅ API 테스트 체크리스트
```typescript
기능 테스트:
  - [ ] 성공 케이스 테스트
  - [ ] 실패 케이스 테스트
  - [ ] Edge Case 테스트
  - [ ] 경계값 테스트

보안 테스트:
  - [ ] 인증 실패 테스트
  - [ ] 권한 확인 테스트
  - [ ] 입력 검증 테스트
  - [ ] Rate Limiting 테스트

성능 테스트:
  - [ ] 응답 시간 측정
  - [ ] 동시 요청 처리
  - [ ] 메모리 사용량 확인
  - [ ] 부하 테스트
```

### 3. Flutter 테스트

#### ✅ Widget 테스트 체크리스트
```dart
단위 테스트:
  - [ ] 비즈니스 로직 테스트
  - [ ] 유틸리티 함수 테스트
  - [ ] 모델 클래스 테스트
  - [ ] Provider 상태 테스트

위젯 테스트:
  - [ ] 위젯 렌더링 테스트
  - [ ] 사용자 상호작용 테스트
  - [ ] 상태 변경 테스트
  - [ ] 네비게이션 테스트

통합 테스트:
  - [ ] 전체 사용자 플로우
  - [ ] API 연동 테스트
  - [ ] 데이터 베이스 테스트
  - [ ] 플랫폼별 테스트
```

---

## 📝 코드 리뷰 코멘트 가이드

### 1. 건설적인 피드백

#### ✅ 좋은 리뷰 코멘트
```markdown
# 구체적이고 실행 가능한 제안
이 함수가 너무 많은 책임을 가지고 있는 것 같습니다. 
다음과 같이 분리를 고려해보세요:

```typescript
// 현재 코드
function processUserLogin(email, password) {
  // 60줄의 복잡한 로직
}

// 개선 제안
function processUserLogin(email, password) {
  const user = await validateCredentials(email, password);
  const tokens = generateAuthTokens(user);
  await logLoginActivity(user);
  return tokens;
}
```

# 보안 이슈 지적
⚠️ 보안 취약점: 비밀번호가 평문으로 로그에 기록되고 있습니다.
`console.log` 문에서 password 필드를 제거하거나 마스킹 처리해주세요.

# 성능 개선 제안
🔄 성능 개선: 이 부분에서 N+1 쿼리가 발생할 수 있습니다.
`include` 옵션을 사용해서 관련 데이터를 한 번에 가져오는 것을 고려해보세요.

# 칭찬과 함께 추가 제안
✅ 에러 처리가 잘 되어 있네요! 
한 가지 더 고려해볼 점은 에러 메시지를 다국어로 지원하는 것입니다.
```

#### 🚫 피해야 할 리뷰 코멘트
```markdown
# 모호하고 도움이 되지 않는 코멘트
- "이상합니다"
- "다시 작성하세요"
- "이해가 안 됩니다"
- "왜 이렇게 했나요?"
- "틀렸습니다"

# 감정적이거나 공격적인 코멘트
- "이런 코드를 어떻게 작성할 수 있나요?"
- "기본도 모르시나요?"
- "말이 안 됩니다"
```

### 2. 우선순위별 분류

#### 🔴 Critical (즉시 수정 필요)
- 보안 취약점
- 프로덕션 장애 가능성
- 데이터 손실 위험
- 아키텍처 표준 위반

#### 🟡 Major (배포 전 수정 권장)
- 성능 이슈
- 메모리 누수 가능성
- 사용성 문제
- 테스트 누락

#### 🟢 Minor (다음 버전에서 개선)
- 코드 스타일 개선
- 리팩토링 제안
- 문서화 개선
- 최적화 기회

#### 💡 Suggestion (선택적 개선)
- 더 나은 방법 제안
- 라이브러리 추천
- 개발 경험 개선
- 학습 자료 공유

---

## 🚨 Standards Guardian 리뷰 강제 규칙

### ✅ 승인 조건

```yaml
필수 통과 항목:
  - [ ] 아키텍처 표준 100% 준수
  - [ ] 보안 가이드라인 준수
  - [ ] 성능 기준 만족
  - [ ] 테스트 커버리지 기준 달성
  - [ ] ESLint/Dart Analyzer 에러 0개

자동 승인 조건:
  - 문서 업데이트만 있는 경우
  - 테스트 추가만 있는 경우
  - 마이너한 버그 수정

수동 승인 필수:
  - API 변경
  - 데이터베이스 스키마 변경
  - 보안 관련 변경
  - 아키텍처 변경
```

### 🚫 자동 거부 조건

```yaml
즉시 거부:
  - Pages Router 사용
  - 평문 비밀번호 저장
  - SQL Injection 가능성
  - 토큰 하드코딩
  - 민감 정보 로그 출력
  - 아키텍처 표준 위반
  - 테스트 커버리지 기준 미달

재검토 요청:
  - 성능 기준 미달
  - 보안 가이드라인 일부 위반
  - 코드 품질 기준 미달
  - 문서화 부족
```

### 📊 리뷰 품질 지표

```yaml
목표 지표:
  - 리뷰 시간: 평균 2시간 이내
  - 수정 사이클: 평균 2회 이하
  - 버그 발견률: 리뷰에서 80% 이상 발견
  - 표준 준수율: 95% 이상

측정 방법:
  - GitHub PR 통계 분석
  - 코드 품질 도구 연동
  - 주간 리뷰 품질 보고서
  - 팀별 리뷰 효율성 분석
```

---

**Standards Guardian**: 🛡️ 코드 품질 및 표준 수호  
**Authority**: ⚠️ 거부권 보유 - 표준 미준수 시 PR 차단  
**Review Process**: 모든 PR은 Standards Guardian 승인 필수  
**Contact**: Standards Guardian 응답 파일로 리뷰 관련 문의