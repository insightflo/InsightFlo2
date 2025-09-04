# 요청: 테스트 환경 및 전략 초기 설정

**요청자**: PM (Project Manager)  
**요청일**: 2025-01-21  
**우선순위**: HIGH  
**Task ID**: Task 1 - 프로젝트 초기 설정 및 디렉토리 구조 생성

## 📋 요청 사항

QA/Tester님께서 다음 작업을 수행해 주시기 바랍니다:

### 1. 테스트 전략 문서 작성

#### 전체 테스트 전략
```
qa/docs/test-strategy.md

테스트 피라미드:
- Unit Tests (70%): 개별 함수/메서드 테스트
- Integration Tests (20%): API/데이터베이스 연동 테스트  
- E2E Tests (10%): 사용자 시나리오 테스트

Backend 테스트:
- Framework: Jest + Supertest
- Coverage: 최소 80%
- API 엔드포인트별 테스트
- 데이터베이스 트랜잭션 테스트

Flutter 테스트:
- Unit Tests: Flutter Test
- Widget Tests: Flutter Test
- Integration Tests: Flutter Integration Test
- Coverage: 최소 75%

E2E 테스트:
- Tools: Cypress (Web), Maestro (Mobile)
- Critical User Journeys 위주
- Cross-platform 테스트
```

### 2. Backend 테스트 설정

#### Jest 설정 파일
```json
// backend/jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testTimeout: 30000,
};
```

#### 테스트 유틸리티
```typescript
// backend/tests/setup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // 테스트 데이터베이스 연결
});

afterAll(async () => {
  // 테스트 데이터베이스 정리
  await prisma.$disconnect();
});

beforeEach(async () => {
  // 각 테스트 전 데이터 초기화
});

// backend/tests/utils/test-helpers.ts
export const createTestUser = async () => {
  return await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'hashed_password',
      name: 'Test User',
    },
  });
};

export const generateJWTToken = (userId: string) => {
  // JWT 토큰 생성 헬퍼
};
```

### 3. Flutter 테스트 설정

#### 테스트 설정 파일
```dart
// frontend/test/helpers/test_helpers.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class TestHelpers {
  static Widget wrapWithProviders(Widget widget) {
    return ProviderScope(
      child: MaterialApp(
        home: widget,
      ),
    );
  }
  
  static Future<void> pumpAndSettle(WidgetTester tester, Widget widget) async {
    await tester.pumpWidget(wrapWithProviders(widget));
    await tester.pumpAndSettle();
  }
}

// Mock 클래스들
class MockApiClient extends Mock implements ApiClient {}
class MockAuthRepository extends Mock implements AuthRepository {}
```

#### 위젯 테스트 예시
```dart
// frontend/test/presentation/widgets/news_card_test.dart
void main() {
  group('NewsCard Widget Tests', () {
    testWidgets('should display news information correctly', (tester) async {
      // Given
      final mockNews = NewsEntity(
        id: '1',
        title: 'Test News',
        summary: 'Test Summary',
        sentiment: NewsSentiment.positive,
        publishedAt: DateTime.now(),
      );

      // When
      await TestHelpers.pumpAndSettle(tester, NewsCard(news: mockNews));

      // Then
      expect(find.text('Test News'), findsOneWidget);
      expect(find.text('Test Summary'), findsOneWidget);
    });
  });
}
```

### 4. E2E 테스트 설정

#### Cypress 설정 (Future Web Support)
```javascript
// qa/e2e-tests/cypress.config.js
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/commands.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    video: true,
    screenshotOnRunFailure: true,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
};
```

#### Critical User Journey 테스트
```
qa/e2e-tests/scenarios/critical-user-journeys.md

1. 사용자 회원가입 및 로그인
   - 이메일 회원가입
   - 이메일 인증 (향후)
   - 로그인 
   - JWT 토큰 저장

2. 뉴스 피드 조회
   - 홈 화면 뉴스 목록 로드
   - 무한 스크롤
   - 새로고침

3. 키워드 관리
   - 키워드 추가
   - 키워드 삭제
   - 키워드 기반 필터링

4. 뉴스 상호작용
   - 뉴스 상세보기
   - 북마크 추가/제거
   - 공유하기
```

### 5. CI/CD 테스트 통합

#### GitHub Actions 테스트 단계
```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: |
          cd backend
          npm ci
          
      - name: Run Prisma migrations
        run: |
          cd backend
          npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
          
      - name: Run tests
        run: |
          cd backend
          npm test -- --coverage --watchAll=false
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

  flutter-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.0'
          
      - name: Install dependencies
        run: |
          cd frontend
          flutter pub get
          
      - name: Run tests
        run: |
          cd frontend
          flutter test --coverage
          
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: frontend/coverage/lcov.info
```

### 6. 품질 게이트 설정

```
qa/docs/quality-gates.md

코드 커버리지 기준:
- Backend: 최소 80%
- Frontend: 최소 75%
- Critical Path: 95%

성능 기준:
- API 응답 시간: < 200ms
- 앱 시작 시간: < 800ms
- 메모리 사용량: < 100MB

보안 기준:
- SAST 스캔 통과
- 의존성 보안 검사 통과
- API 보안 헤더 확인

품질 기준:
- ESLint 규칙 0 에러
- Dart Analyzer 0 에러
- 타입 검사 100% 통과
```

## 🎯 완료 기준
- [ ] 테스트 전략 문서 작성 완료
- [ ] Backend Jest 테스트 환경 설정
- [ ] Flutter 테스트 유틸리티 및 설정 완료
- [ ] E2E 테스트 프레임워크 준비
- [ ] CI/CD 테스트 파이프라인 구성
- [ ] 품질 게이트 기준 정의
- [ ] 샘플 테스트 케이스 작성

## 📅 기한
- **목표 완료일**: 2025-01-22
- **블로킹 이슈**: 없음

## 🔗 연관 작업
- DevOps CI/CD 파이프라인과 통합
- Backend/Frontend 초기 코드 테스트 적용

## 📞 문의
질문이나 이슈가 있으시면 PM에게 응답 파일로 알려주세요.

---
*이 요청은 Task Master Task 1의 일부입니다.*