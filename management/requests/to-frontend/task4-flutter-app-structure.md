# Task 4: Flutter 앱 기본 구조 및 의존성 설정 요청

**요청자**: PM  
**우선순위**: HIGH  
**예상 소요 시간**: 2-3일  
**Task Master ID**: 4

## 📋 작업 개요
Clean Architecture 기반의 Flutter 앱 구조를 설정하고 InsightFlo 프로젝트에 필요한 핵심 패키지들을 구성해주세요.

## 🎯 구체적 요구사항

### 1. Clean Architecture 구조 설계

```
frontend/lib/
├── main.dart                    # 앱 진입점
├── app.dart                     # MaterialApp 설정
├── core/
│   ├── constants/              # 상수 및 설정값
│   │   ├── api_constants.dart
│   │   ├── app_constants.dart
│   │   └── storage_constants.dart
│   ├── errors/                 # 에러 처리
│   │   ├── exceptions.dart
│   │   └── failures.dart
│   ├── network/               # 네트워크 관련
│   │   ├── network_info.dart
│   │   └── dio_client.dart
│   ├── storage/               # 로컬 저장소
│   │   └── secure_storage.dart
│   └── utils/                 # 유틸리티
│       ├── date_formatter.dart
│       └── validators.dart
├── features/
│   ├── auth/                  # 인증 기능
│   │   ├── data/
│   │   │   ├── datasources/
│   │   │   ├── models/
│   │   │   └── repositories/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   ├── repositories/
│   │   │   └── usecases/
│   │   └── presentation/
│   │       ├── pages/
│   │       ├── providers/
│   │       └── widgets/
│   └── news/                  # 뉴스 기능 (구조만)
│       ├── data/
│       ├── domain/
│       └── presentation/
├── shared/
│   ├── widgets/               # 공통 위젯
│   │   ├── custom_button.dart
│   │   ├── custom_text_field.dart
│   │   └── loading_widget.dart
│   └── themes/               # 테마 설정
│       ├── app_theme.dart
│       └── app_colors.dart
└── injection_container.dart   # 의존성 주입 설정
```

### 2. 필수 패키지 구성

#### `pubspec.yaml` 업데이트
다음 패키지들을 추가해주세요:

**상태 관리**
```yaml
riverpod: ^2.4.9
flutter_riverpod: ^2.4.9
riverpod_annotation: ^2.3.3
```

**네트워킹**
```yaml
dio: ^5.4.0
retrofit: ^4.0.3
json_annotation: ^4.8.1
```

**로컬 저장소**
```yaml
flutter_secure_storage: ^9.0.0
shared_preferences: ^2.2.2
```

**UI/UX**
```yaml
go_router: ^12.1.3
flutter_svg: ^2.0.9
cached_network_image: ^3.3.0
```

**개발 도구**
```yaml
dev_dependencies:
  build_runner: ^2.4.7
  riverpod_generator: ^2.3.9
  retrofit_generator: ^8.0.4
  json_serializable: ^6.7.1
  flutter_test:
    sdk: flutter
```

### 3. 기본 설정 구현

#### 앱 진입점 (`main.dart`)
```dart
void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}
```

#### 의존성 주입 설정 (`injection_container.dart`)
```dart
final container = ProviderContainer();

// 기본 의존성들 설정
final dioProvider = Provider<Dio>((ref) => Dio());
final storageProvider = Provider<FlutterSecureStorage>((ref) => FlutterSecureStorage());
```

#### 네트워크 클라이언트 기본 설정
```dart
class DioClient {
  late final Dio _dio;
  
  DioClient() {
    _dio = Dio();
    _dio.options.baseUrl = 'http://localhost:3000/api';
    _dio.options.connectTimeout = Duration(seconds: 5);
    _dio.options.receiveTimeout = Duration(seconds: 3);
  }
}
```

### 4. 인증 도메인 모델 구현

#### User Entity
```dart
class User {
  final String id;
  final String email;
  final String? nickname;
  final DateTime createdAt;
  
  const User({
    required this.id,
    required this.email,
    this.nickname,
    required this.createdAt,
  });
}
```

#### Auth Repository Interface
```dart
abstract class AuthRepository {
  Future<Either<Failure, User>> signUp({
    required String email,
    required String password,
    String? nickname,
  });
  
  Future<Either<Failure, User>> signIn({
    required String email,
    required String password,
  });
  
  Future<Either<Failure, void>> signOut();
  Future<Either<Failure, User?>> getCurrentUser();
}
```

### 5. 기본 UI 테마 설정

#### 색상 팔레트
```dart
class AppColors {
  static const primary = Color(0xFF2563EB);
  static const secondary = Color(0xFF64748B);
  static const success = Color(0xFF10B981);
  static const error = Color(0xFFEF4444);
  static const warning = Color(0xFFF59E0B);
}
```

#### Material Theme
```dart
class AppTheme {
  static ThemeData get lightTheme => ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: AppColors.primary),
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
    ),
  );
}
```

### 6. 공통 위젯 구현

#### Custom Button
```dart
class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isLoading;
  
  const CustomButton({
    Key? key,
    required this.text,
    this.onPressed,
    this.isLoading = false,
  }) : super(key: key);
}
```

#### Custom Text Field
```dart
class CustomTextField extends StatelessWidget {
  final String label;
  final String? hint;
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  
  const CustomTextField({
    Key? key,
    required this.label,
    this.hint,
    this.controller,
    this.validator,
  }) : super(key: key);
}
```

## 🧪 테스트 설정

### 1. 단위 테스트 구조
```
test/
├── features/
│   └── auth/
│       ├── domain/
│       ├── data/
│       └── presentation/
├── core/
│   └── network/
└── helpers/
    └── test_helper.dart
```

### 2. 기본 테스트 헬퍼
```dart
class TestHelper {
  static ProviderContainer createContainer() {
    return ProviderContainer();
  }
}
```

## 🔗 의존성
- Task 1 (프로젝트 초기 설정) 완료됨 ✅

## 📋 완료 기준
- [ ] Clean Architecture 폴더 구조 생성
- [ ] 필수 패키지 설치 및 설정
- [ ] 의존성 주입 기본 설정
- [ ] 네트워크 클라이언트 기본 구성
- [ ] 인증 도메인 모델 구현
- [ ] 기본 UI 테마 설정
- [ ] 공통 위젯 구현
- [ ] 테스트 구조 설정
- [ ] `flutter analyze` 통과
- [ ] `flutter test` 기본 실행 가능

## 📝 결과물
완료 후 다음을 `.claude/contracts/interfaces/`에 문서화해주세요:
- Flutter 앱 아키텍처 가이드
- 패키지 의존성 명세서
- 폴더 구조 설명서

## 💬 병렬 작업 안내
이 작업과 동시에 진행되는 작업들:
- Backend: JWT 인증 시스템 (Task 3)
- DevOps: Supabase 프로젝트 설정
- UI/UX: 인증 화면 디자인

완료 후 Task 5 (Flutter HTTP 클라이언트)에서 Backend API와 연동됩니다.

---
**생성일**: 2025-01-08  
**상태**: 요청됨  
**완료 후**: Task 5 (HTTP 클라이언트) 시작 가능