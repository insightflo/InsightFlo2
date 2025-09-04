# 요청: Flutter 앱 프로젝트 초기화

**요청자**: PM (Project Manager)  
**요청일**: 2025-01-21  
**우선순위**: HIGH  
**Task ID**: Task 1 - 프로젝트 초기 설정 및 디렉토리 구조 생성

## 📋 요청 사항

Frontend Lead Developer님께서 다음 작업을 수행해 주시기 바랍니다:

### 1. Flutter 프로젝트 생성
```bash
cd frontend
flutter create . --org com.insightflo --project-name insightflo_app
```

### 2. Clean Architecture 디렉토리 구조 설정
```
frontend/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── core/
│   │   ├── constants/
│   │   │   ├── app_constants.dart
│   │   │   └── api_constants.dart
│   │   ├── errors/
│   │   │   ├── exceptions.dart
│   │   │   └── failures.dart
│   │   ├── network/
│   │   │   └── network_info.dart
│   │   ├── usecases/
│   │   │   └── usecase.dart
│   │   └── utils/
│   │       └── input_validators.dart
│   ├── data/
│   │   ├── datasources/
│   │   │   ├── local/
│   │   │   └── remote/
│   │   ├── models/
│   │   └── repositories/
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── usecases/
│   └── presentation/
│       ├── pages/
│       │   ├── splash/
│       │   ├── auth/
│       │   ├── home/
│       │   └── settings/
│       ├── widgets/
│       │   └── common/
│       ├── providers/
│       └── routes/
│           └── app_router.dart
├── test/
├── pubspec.yaml
└── analysis_options.yaml
```

### 3. 필수 패키지 설치 (pubspec.yaml)
```yaml
dependencies:
  # State Management
  flutter_riverpod: ^2.4.0
  riverpod_annotation: ^2.3.0
  
  # Navigation
  go_router: ^13.0.0
  
  # Network
  dio: ^5.4.0
  retrofit: ^4.0.3
  
  # Local Database
  drift: ^2.14.0
  sqlite3_flutter_libs: ^0.5.18
  
  # Dependency Injection
  get_it: ^7.6.4
  injectable: ^2.3.2
  
  # Utilities
  equatable: ^2.0.5
  dartz: ^0.10.1
  uuid: ^4.2.1
  
  # UI
  flutter_screenutil: ^5.9.0
  cached_network_image: ^3.3.0
  shimmer: ^3.0.0
  
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1
  build_runner: ^2.4.7
  riverpod_generator: ^2.3.5
  retrofit_generator: ^8.0.4
  drift_dev: ^2.14.0
  injectable_generator: ^2.4.1
```

### 4. Riverpod 상태 관리 초기 설정
```dart
// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(
    const ProviderScope(
      child: InsightFloApp(),
    ),
  );
}
```

### 5. 라우팅 설정 (GoRouter)
```dart
// lib/presentation/routes/app_router.dart
final goRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/splash',
    routes: [
      GoRoute(
        path: '/splash',
        builder: (context, state) => const SplashPage(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: '/home',
        builder: (context, state) => const HomePage(),
      ),
    ],
  );
});
```

### 6. 환경 설정 파일
- analysis_options.yaml (lint 규칙)
- .env.example (환경변수 템플릿)
- Android/iOS 플랫폼별 설정
  - 최소 SDK 버전 설정
  - 권한 설정 준비

## 🎯 완료 기준
- [ ] Flutter 프로젝트 생성 완료
- [ ] Clean Architecture 폴더 구조 생성
- [ ] 필수 패키지 설치 및 설정
- [ ] Riverpod 초기 설정
- [ ] GoRouter 기본 라우팅 설정
- [ ] 앱 정상 빌드 및 실행 확인

## 📅 기한
- **목표 완료일**: 2025-01-22
- **블로킹 이슈**: 없음

## 🔗 연관 작업
- Backend API 구조와 연동 준비
- UI/UX 디자인 시스템 적용 대기

## 📞 문의
질문이나 이슈가 있으시면 PM에게 응답 파일로 알려주세요.

---
*이 요청은 Task Master Task 1의 일부입니다.*