# 💻 InsightFlo 코딩 스타일 가이드

**버전**: 1.0  
**최종 업데이트**: 2025-01-21  
**표준 수립자**: Standards Guardian  
**적용 범위**: 전체 개발 팀

---

## 📋 목차

1. [파일 명명 규칙](#파일-명명-규칙)
2. [코드 스타일 표준](#코드-스타일-표준)
3. [Git 브랜치 전략](#git-브랜치-전략)
4. [커밋 메시지 규칙](#커밋-메시지-규칙)
5. [코드 리뷰 가이드](#코드-리뷰-가이드)
6. [문서화 표준](#문서화-표준)

---

## 📁 파일 명명 규칙

### 1. Backend (Next.js/TypeScript)

#### API 라우트
```typescript
// ✅ 올바른 명명
app/api/v1/auth/login/route.ts
app/api/v1/news/search/route.ts
app/api/v1/users/profile/route.ts

// 🚫 잘못된 명명  
app/api/v1/auth/loginUser.ts
app/api/v1/news/searchNews.ts
app/api/v1/users/UserProfile.ts
```

#### 유틸리티 및 라이브러리
```typescript
// ✅ camelCase 사용
lib/utils/jwtHelper.ts
lib/utils/passwordValidator.ts
lib/database/connectionManager.ts

// 🚫 잘못된 명명
lib/utils/jwt_helper.ts
lib/utils/PasswordValidator.ts
lib/database/connection-manager.ts
```

#### 타입 정의
```typescript
// ✅ PascalCase 사용
types/ApiResponse.ts
types/UserEntity.ts
types/NewsModel.ts

// 🚫 잘못된 명명
types/api-response.ts
types/userEntity.ts
types/news_model.ts
```

### 2. Frontend (Flutter/Dart)

#### 화면 및 페이지
```dart
// ✅ snake_case 사용
lib/presentation/pages/login_screen.dart
lib/presentation/pages/news_feed_page.dart
lib/presentation/pages/user_profile_screen.dart

// 🚫 잘못된 명명
lib/presentation/pages/LoginScreen.dart
lib/presentation/pages/newsFeedPage.dart
lib/presentation/pages/user-profile-screen.dart
```

#### 위젯
```dart
// ✅ snake_case 사용 + widget 접미사
lib/presentation/widgets/news_card_widget.dart
lib/presentation/widgets/loading_indicator_widget.dart
lib/presentation/widgets/custom_app_bar_widget.dart

// 🚫 잘못된 명명
lib/presentation/widgets/NewsCard.dart
lib/presentation/widgets/loading_indicator.dart
lib/presentation/widgets/CustomAppBar.dart
```

#### 모델 및 엔티티
```dart
// ✅ snake_case 사용
lib/domain/entities/user_entity.dart
lib/data/models/news_model.dart
lib/data/models/auth_response_model.dart

// 🚫 잘못된 명명
lib/domain/entities/UserEntity.dart
lib/data/models/NewsModel.dart
lib/data/models/authResponseModel.dart
```

### 3. 공통 파일

#### 설정 및 환경 파일
```
✅ 올바른 명명:
.env.example
.env.local
.gitignore
.eslintrc.json
analysis_options.yaml
pubspec.yaml
package.json
tsconfig.json

🚫  잘못된 명명:
env.example
EnvLocal
gitIgnore
eslint.config.js
AnalysisOptions.yaml
```

#### 문서 파일
```markdown
✅ 올바른 명명:
README.md
CHANGELOG.md
CONTRIBUTING.md
API_DOCS.md
DEPLOYMENT_GUIDE.md

🚫 잘못된 명명:
readme.md
change-log.md
contributing.txt
ApiDocs.md
deployment_guide.md
```

---

## 🎨 코드 스타일 표준

### 1. Backend (TypeScript/Next.js)

#### ESLint 설정
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "import"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always"
      }
    ],
    "no-console": "warn",
    "prefer-const": "error"
  }
}
```

#### Prettier 설정
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

#### TypeScript 코딩 스타일
```typescript
// ✅ 올바른 스타일
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { verifyJWT } from '@/lib/auth/jwt';
import { createErrorResponse, createSuccessResponse } from '@/lib/utils/api-response';

interface LoginRequest {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: LoginRequest = await request.json();
    const validatedData = loginSchema.parse(body);
    
    // 로직 구현
    const user = await authenticateUser(validatedData.email, validatedData.password);
    
    return createSuccessResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken: generateAccessToken(user.id),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        'VALIDATION_ERROR',
        '입력값이 올바르지 않습니다.',
        error.errors
      );
    }
    
    return createErrorResponse(
      'INTERNAL_ERROR',
      '서버 내부 오류가 발생했습니다.'
    );
  }
}
```

### 2. Frontend (Dart/Flutter)

#### analysis_options.yaml
```yaml
include: package:flutter_lints/flutter.yaml

analyzer:
  exclude:
    - "**/*.g.dart"
    - "**/*.freezed.dart"
  strong-mode:
    implicit-casts: false
    implicit-dynamic: false

linter:
  rules:
    # 코드 스타일
    prefer_const_constructors: true
    prefer_const_declarations: true
    prefer_final_fields: true
    prefer_final_locals: true
    
    # 네이밍
    camel_case_types: true
    file_names: true
    library_names: true
    
    # 문서화
    public_member_api_docs: true
    
    # 에러 처리
    avoid_print: true
    avoid_unnecessary_containers: true
    avoid_web_libraries_in_flutter: true
    
    # 성능
    avoid_function_literals_in_foreach_calls: true
    prefer_collection_literals: true
    prefer_spread_collections: true
```

#### Dart 코딩 스타일
```dart
// ✅ 올바른 스타일
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/constants/app_constants.dart';
import '../../../core/utils/validators.dart';
import '../../domain/entities/user_entity.dart';

/// 사용자 프로필을 표시하는 위젯
/// 
/// [user] 파라미터는 null일 수 없으며, 유효한 사용자 정보를 포함해야 합니다.
class UserProfileWidget extends ConsumerWidget {
  const UserProfileWidget({
    super.key,
    required this.user,
    this.onEditPressed,
  });

  final UserEntity user;
  final VoidCallback? onEditPressed;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Card(
      elevation: AppConstants.cardElevation,
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            const SizedBox(height: AppConstants.spacingMedium),
            _buildUserInfo(),
            if (onEditPressed != null) _buildEditButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      children: [
        const Icon(Icons.person),
        const SizedBox(width: AppConstants.spacingSmall),
        Text(
          '사용자 프로필',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
      ],
    );
  }

  Widget _buildUserInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildInfoRow('이름', user.name),
        _buildInfoRow('이메일', user.email),
        _buildInfoRow('가입일', _formatDate(user.createdAt)),
      ],
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppConstants.spacingSmall),
      child: Row(
        children: [
          SizedBox(
            width: 60,
            child: Text(
              label,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
          Text(value),
        ],
      ),
    );
  }

  Widget _buildEditButton() {
    return Align(
      alignment: Alignment.centerRight,
      child: ElevatedButton(
        onPressed: onEditPressed,
        child: const Text('편집'),
      ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.year}.${date.month.toString().padLeft(2, '0')}.${date.day.toString().padLeft(2, '0')}';
  }
}
```

---

## 🌿 Git 브랜치 전략

### 1. 브랜치 구조

```mermaid
gitgraph
    commit id: "Initial commit"
    
    branch develop
    checkout develop
    commit id: "Setup project"
    
    branch feature/auth-system
    checkout feature/auth-system  
    commit id: "Add login API"
    commit id: "Add JWT validation"
    
    checkout develop
    merge feature/auth-system
    commit id: "Merge auth system"
    
    branch hotfix/login-bug
    checkout main
    merge hotfix/login-bug
    commit id: "Fix login bug"
    
    checkout develop
    merge main
```

### 2. 브랜치 명명 규칙

```bash
# 메인 브랜치
main              # 프로덕션 브랜치 (배포 가능한 상태)
develop          # 통합 개발 브랜치 (다음 릴리스 준비)

# 기능 개발 브랜치
feature/auth-jwt           # 새 기능 개발
feature/news-search        # 뉴스 검색 기능
feature/user-profile       # 사용자 프로필 기능

# 버그 수정 브랜치  
bugfix/login-validation    # 일반 버그 수정
bugfix/news-loading-error  # 뉴스 로딩 에러 수정

# 긴급 수정 브랜치
hotfix/security-patch      # 보안 패치
hotfix/critical-bug        # 치명적 버그 긴급 수정

# 릴리스 브랜치
release/v1.0.0            # 릴리스 준비
release/v1.1.0            # 다음 버전 준비
```

### 3. 브랜치 워크플로우

#### 기능 개발 워크플로우
```bash
# 1. develop에서 기능 브랜치 생성
git checkout develop
git pull origin develop
git checkout -b feature/news-search

# 2. 개발 작업 수행
git add .
git commit -m "feat(news): add search functionality"

# 3. 원격 저장소에 푸시
git push -u origin feature/news-search

# 4. Pull Request 생성 (develop <- feature/news-search)
# 5. 코드 리뷰 및 승인
# 6. develop에 머지 후 브랜치 삭제
git checkout develop
git pull origin develop
git branch -d feature/news-search
```

#### 긴급 수정 워크플로우
```bash
# 1. main에서 핫픽스 브랜치 생성
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# 2. 긴급 수정 작업
git add .
git commit -m "fix(security): patch critical vulnerability"

# 3. main과 develop에 모두 머지
git checkout main
git merge hotfix/critical-security-fix
git push origin main

git checkout develop  
git merge hotfix/critical-security-fix
git push origin develop

# 4. 핫픽스 브랜치 삭제
git branch -d hotfix/critical-security-fix
```

---

## 📝 커밋 메시지 규칙

### 1. Conventional Commits 형식

```bash
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### 2. Type 분류

```bash
feat      # 새로운 기능 추가
fix       # 버그 수정
docs      # 문서 수정
style     # 코드 포맷팅, 세미콜론 누락 등 (로직 변경 없음)
refactor  # 코드 리팩토링 (기능 변경 없음)
perf      # 성능 개선
test      # 테스트 추가 또는 수정
chore     # 빌드 설정, 패키지 매니저 설정, CI/CD 등
```

### 3. Scope 분류

```bash
auth      # 인증 관련
news      # 뉴스 관련  
user      # 사용자 관련
search    # 검색 관련
ui        # UI/UX 관련
api       # API 관련
db        # 데이터베이스 관련
config    # 설정 관련
```

### 4. 커밋 메시지 예시

```bash
# ✅ 올바른 커밋 메시지
feat(auth): add JWT token refresh functionality

- Implement automatic token refresh
- Add token expiration handling  
- Update API client to use new tokens

Closes #123

fix(news): resolve infinite loading on empty search results

perf(ui): optimize news card rendering performance

docs(api): update authentication endpoint documentation

style(flutter): format code according to dart style guide

refactor(auth): extract JWT validation logic to separate service

test(news): add unit tests for news search functionality

chore(deps): update Flutter to 3.16.0

# 🚫 잘못된 커밋 메시지
fixed bug
Update
WIP
added new feature
Fix issue
```

### 5. 커밋 메시지 한국어 가이드

```bash
# 제목: 영어 사용 (국제 표준)
feat(auth): add social login functionality

# 본문: 한국어 사용 가능
소셜 로그인 기능을 추가했습니다.
- 구글, 카카오 로그인 지원
- JWT 토큰 기반 인증 유지
- 기존 이메일 회원가입과 통합

이슈 해결: #456
```

---

## 👀 코드 리뷰 가이드

### 1. Pull Request 템플릿

```markdown
## 📋 변경 사항
간략한 변경 사항 설명

## 🎯 변경 목적
- [ ] 새 기능 추가
- [ ] 버그 수정
- [ ] 리팩토링
- [ ] 성능 개선
- [ ] 문서 업데이트

## 🧪 테스트
- [ ] 단위 테스트 추가/수정
- [ ] 통합 테스트 확인
- [ ] 수동 테스트 완료

## 📸 스크린샷 (UI 변경 시)
<!-- 변경 전/후 스크린샷 첨부 -->

## ✅ 체크리스트
- [ ] 코드가 프로젝트 스타일 가이드를 준수하는가?
- [ ] 자기 점검 코드 리뷰를 완료했는가?
- [ ] 변경 사항에 대한 테스트를 추가했는가?
- [ ] 기존 테스트가 통과하는가?
- [ ] 문서를 업데이트했는가?

## 🔗 관련 이슈
Closes #이슈번호
```

### 2. 리뷰어 체크포인트

#### 아키텍처 및 설계
```yaml
✅ 확인 사항:
  - 분리 아키텍처 원칙 준수
  - Clean Architecture 레이어 분리 적절
  - 의존성 방향이 올바른가
  - 단일 책임 원칙 준수
  - SOLID 원칙 적용

🚫 거부 기준:
  - 아키텍처 표준 위반
  - 순환 의존성 발생
  - 레이어 간 직접 의존성
```

#### 코드 품질
```yaml
✅ 확인 사항:
  - 코드가 읽기 쉽고 이해하기 쉬운가
  - 함수와 클래스가 적절한 크기인가
  - 변수명과 함수명이 명확한가
  - 주석이 필요한 부분에 적절히 작성되었는가
  - 중복 코드가 없는가

🚫 거부 기준:
  - ESLint/Dart Analyzer 에러 존재
  - 코드 포맷팅 표준 위반
  - 하드코딩된 값 사용
  - 보안 취약점 존재
```

#### 성능
```yaml
✅ 확인 사항:
  - 불필요한 렌더링이나 연산이 없는가
  - 메모리 누수 가능성이 없는가
  - 데이터베이스 쿼리가 최적화되었는가
  - API 호출이 효율적인가

🚫 거부 기준:
  - 성능 기준 미달
  - 메모리 누수 발생 가능성
  - N+1 쿼리 문제
```

### 3. 리뷰 코멘트 가이드

```markdown
# ✅ 좋은 리뷰 코멘트

## 구체적이고 건설적인 피드백
이 함수는 너무 많은 책임을 가지고 있는 것 같습니다. 
`validateUser`와 `createToken` 로직을 별도 함수로 분리하는 것을 고려해보세요.

## 대안 제시
```typescript
// 현재
function loginUser(email, password) {
  // 50줄의 복잡한 로직
}

// 개선안
function loginUser(email, password) {
  const user = validateUser(email, password);
  return createToken(user);
}
```

## 보안 이슈 지적
비밀번호를 평문으로 로그에 출력하고 있습니다. 
보안상 위험하므로 로그에서 제거해야 합니다.

# 🚫 좋지 않은 리뷰 코멘트

이상합니다.
다시 작성하세요.
왜 이렇게 했나요?
```

---

## 📚 문서화 표준

### 1. README.md 구조

```markdown
# 프로젝트명

간단한 프로젝트 설명

## 🚀 시작하기

### 사전 요구사항
- Node.js 20.x
- Flutter 3.16.x
- PostgreSQL 15.x

### 설치 방법
```bash
# Backend 설치
cd backend
npm install

# Frontend 설치  
cd frontend
flutter pub get
```

### 실행 방법
```bash
# 개발 서버 실행
npm run dev

# Flutter 앱 실행
flutter run
```

## 📁 프로젝트 구조
```
project/
├── backend/
├── frontend/
└── docs/
```

## 🤝 기여하기

[CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

## 📄 라이선스

MIT License
```

### 2. API 문서화

```typescript
/**
 * 사용자 로그인 API
 * 
 * @description 이메일과 비밀번호로 사용자 인증을 수행합니다.
 * @param {LoginRequest} body - 로그인 요청 데이터
 * @returns {LoginResponse} 로그인 결과 및 JWT 토큰
 * @throws {ValidationError} 유효하지 않은 입력 데이터
 * @throws {AuthenticationError} 인증 실패
 * 
 * @example
 * ```typescript
 * const response = await fetch('/api/v1/auth/login', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     email: 'user@example.com',
 *     password: 'password123'
 *   })
 * });
 * ```
 */
export async function POST(request: Request) {
  // 구현
}
```

### 3. Flutter 위젯 문서화

```dart
/// 뉴스 카드를 표시하는 위젯
/// 
/// 뉴스의 제목, 요약, 감정 아이콘 등을 카드 형태로 보여줍니다.
/// 카드를 탭하면 뉴스 상세 페이지로 이동합니다.
/// 
/// Example:
/// ```dart
/// NewsCard(
///   news: NewsEntity(
///     id: '1',
///     title: '삼성전자 주가 상승',
///     summary: '신규 반도체 기술 발표...',
///     sentiment: NewsSentiment.positive,
///   ),
///   onTap: (newsId) => Navigator.push(...),
/// )
/// ```
class NewsCard extends StatelessWidget {
  /// 표시할 뉴스 데이터
  final NewsEntity news;
  
  /// 카드 탭 시 실행될 콜백 함수
  final ValueChanged<String>? onTap;

  const NewsCard({
    super.key,
    required this.news,
    this.onTap,
  });
}
```

---

## 🚨 Standards Guardian 강제 규칙

### ✅ 필수 준수 사항

1. **파일 명명 규칙 100% 준수**
2. **Conventional Commits 형식 사용**
3. **브랜치 명명 규칙 준수**
4. **코드 리뷰 필수 진행**

### 🚫 즉시 거부 대상

1. 명명 규칙 위반
2. 커밋 메시지 형식 위반
3. ESLint/Dart Analyzer 에러 존재
4. 문서화 누락

### 📊 품질 게이트

```yaml
머지 조건:
  - 모든 테스트 통과
  - 코드 리뷰 승인 (최소 1명)
  - Standards Guardian 표준 준수 확인
  - CI/CD 파이프라인 통과
```

---

**Standards Guardian**: 🛡️ 코딩 표준 수호  
**Authority**: ⚠️ 거부권 보유 - 스타일 가이드 위반 시 PR 거부  
**Contact**: Standards Guardian 응답 파일로 문의