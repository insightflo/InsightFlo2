# VSCode 워크스페이스 사용 가이드

## 🌟 개요

InsightFlo2 프로젝트는 Flutter 모바일 앱과 Next.js 백엔드를 포함하는 멀티플랫폼 프로젝트입니다. 효율적인 개발을 위해 멀티폴더 VSCode 워크스페이스가 구성되어 있습니다.

## 📁 워크스페이스 구조

### 폴더 구성
- **🌟 InsightFlo2 Root**: 프로젝트 루트 디렉토리
- **📱 Frontend (Flutter)**: Flutter 모바일 앱 코드
- **🔧 Backend (Next.js)**: Next.js API 서버 코드
- **🐳 Infrastructure**: Docker 및 배포 설정
- **🎨 Design & Docs**: 디자인 시스템 및 문서
- **🧪 QA & Testing**: 테스트 코드 및 QA 자료
- **📋 Documentation**: 프로젝트 문서

## 🔧 주요 기능

### 1. 자동 설치 권장 확장 프로그램

워크스페이스를 열면 다음 확장 프로그램 설치가 권장됩니다:

#### Flutter & Dart
- `Dart-Code.dart-code` - Dart 언어 지원
- `Dart-Code.flutter` - Flutter 개발 도구

#### TypeScript & Next.js
- `bradlc.vscode-tailwindcss` - TailwindCSS 지원
- `ms-vscode.vscode-typescript-next` - TypeScript 지원
- `esbenp.prettier-vscode` - 코드 포맷터
- `dbaeumer.vscode-eslint` - ESLint 지원

#### 데이터베이스 & Prisma
- `Prisma.prisma` - Prisma ORM 지원
- `ms-ossdata.vscode-postgresql` - PostgreSQL 지원

#### Docker & 인프라
- `ms-vscode-remote.remote-containers` - 컨테이너 개발
- `ms-azuretools.vscode-docker` - Docker 지원

#### 협업 도구
- `GitHub.vscode-pull-request-github` - GitHub PR 관리
- `GitHub.copilot` - AI 코딩 어시스턴트
- `GitHub.copilot-chat` - AI 채팅

### 2. 통합 작업 시스템 (Tasks)

`Ctrl+Shift+P` → "Tasks: Run Task"로 실행 가능한 작업들:

#### 🐳 Docker 작업
- **🐳 Start Development Environment**: 전체 개발 환경 시작
- **🐳 Stop Development Environment**: 전체 개발 환경 종료

#### 🔧 백엔드 작업
- **🔧 Backend: Install Dependencies**: npm install 실행
- **🔧 Backend: Start Dev Server**: 개발 서버 시작
- **🔧 Backend: Run Tests**: 백엔드 테스트 실행
- **🔧 Backend: Lint Code**: 코드 린팅
- **🔧 Backend: Database Migration**: DB 마이그레이션

#### 📱 프론트엔드 작업
- **📱 Frontend: Get Dependencies**: flutter pub get 실행
- **📱 Frontend: Run Tests**: Flutter 테스트 실행
- **📱 Frontend: Analyze Code**: 코드 분석
- **📱 Frontend: Build APK**: APK 빌드

#### 🧪 품질 관리 작업
- **🧪 Run All Tests**: 전체 테스트 실행
- **🧪 Full Quality Check**: 전체 품질 검사 (린트 + 분석 + 테스트)

### 3. 디버그 구성 (Debug Configurations)

`F5` 키로 실행 가능한 디버그 설정:

#### Flutter 디버그
- **📱 Flutter: Debug**: 일반 디버그 모드
- **📱 Flutter: Profile**: 성능 프로파일링 모드
- **📱 Flutter: Release**: 릴리스 모드

#### Next.js 디버그
- **🔧 Next.js: Debug Server**: Next.js 서버 디버깅

#### Docker 디버그
- **🐳 Attach to Backend Container**: 백엔드 컨테이너 디버깅

## ⚙️ 자동 설정

### 에디터 설정
- **포맷팅**: 저장 시 자동 포맷팅
- **Import 정리**: 저장 시 자동 import 정리
- **Tab 크기**: 2 스페이스
- **줄 길이**: 80/120자 가이드라인
- **자동 줄바꿈**: 120자에서 자동 줄바꿈

### 언어별 설정

#### TypeScript/JavaScript
- 상대 경로 import 우선
- 자동 import 제안
- 파일 이동 시 자동 import 업데이트

#### Dart/Flutter
- 120자 줄 길이
- 클로징 라벨 표시
- Flutter UI 가이드 미리보기

### 파일 제외
다음 파일들은 탐색기와 검색에서 제외됩니다:
- `node_modules`
- `build`, `dist`
- `.git`
- `*.log`
- `.env`, `.env.local`

## 🚀 빠른 시작

### 1. 워크스페이스 열기
```bash
code InsightFlo2.code-workspace
```

### 2. 권장 확장 프로그램 설치
워크스페이스를 열면 오른쪽 하단에 확장 프로그램 설치 알림이 표시됩니다. "Install All" 클릭하여 일괄 설치하세요.

### 3. 개발 환경 시작
`Ctrl+Shift+P` → "Tasks: Run Task" → "🐳 Start Development Environment"

### 4. 개발 시작
- Frontend: `F5` → "📱 Flutter: Debug" 선택
- Backend: `F5` → "🔧 Next.js: Debug Server" 선택

## 🔧 커스터마이징

### 개인 설정 추가
워크스페이스 설정을 개인 설정으로 오버라이드하려면 개인 `settings.json`에 설정을 추가하세요.

### 새로운 작업 추가
`InsightFlo2.code-workspace` 파일의 `tasks` 섹션에 새로운 작업을 추가할 수 있습니다.

### 디버그 구성 추가
`launch` 섹션에 새로운 디버그 구성을 추가할 수 있습니다.

## 🐛 문제 해결

### 확장 프로그램이 작동하지 않는 경우
1. 확장 프로그램이 설치되어 있는지 확인
2. VSCode 재시작
3. 워크스페이스 다시 열기

### Task가 실행되지 않는 경우
1. 터미널에서 명령어가 정상 작동하는지 확인
2. 해당 디렉토리에 필요한 파일이 있는지 확인
3. 권한 문제인 경우 관리자 권한으로 VSCode 실행

### Flutter 디버깅 문제
1. Flutter SDK가 설치되어 있는지 확인
2. `flutter doctor` 명령으로 환경 확인
3. Dart 확장 프로그램 설정에서 Flutter SDK 경로 확인

## 📝 추가 정보

- **문서 위치**: `docs/VSCodeWorkspaceGuide.md`
- **워크스페이스 파일**: `InsightFlo2.code-workspace`
- **팀 협업**: 워크스페이스 파일은 Git으로 관리되며, 모든 팀원이 동일한 개발 환경을 공유합니다.