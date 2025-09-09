# 인증 시스템 UI 컴포넌트 스펙

**버전**: 1.0  
**작성일**: 2025-09-09  
**작성자**: UI/UX Designer  
**관련 작업**: Task 3 (Authentication Screens Design)

## 📋 개요

InsightFlo 앱의 사용자 인증 관련 UI 컴포넌트들의 상세 설계 스펙입니다. Flutter 개발팀이 이 문서를 기반으로 UI 구현을 진행할 수 있습니다.

## 🎯 설계 원칙

- **사용자 중심**: 직관적이고 사용하기 쉬운 인터페이스
- **접근성 우선**: WCAG 2.1 AA 기준 준수
- **일관성**: InsightFlo 브랜드 아이덴티티와 일치
- **반응형**: 모든 화면 크기에서 최적화된 경험

## 🎨 디자인 토큰

### 색상 팔레트
```dart
// Primary Colors
static const Color primary = Color(0xFF2563EB);      // Blue
static const Color primaryHover = Color(0xFF1D4ED8);
static const Color primaryDisabled = Color(0xFFBFDBFE);

// Semantic Colors  
static const Color success = Color(0xFF10B981);      // Green
static const Color error = Color(0xFF EF4444);       // Red
static const Color warning = Color(0xFFF59E0B);      // Amber
static const Color info = Color(0xFF3B82F6);         // Blue

// Neutral Colors
static const Color textPrimary = Color(0xFF1F2937);
static const Color textSecondary = Color(0xFF6B7280);
static const Color textTertiary = Color(0xFF9CA3AF);
static const Color background = Color(0xFFFFFFFF);
static const Color surface = Color(0xFFF9FAFB);
static const Color border = Color(0xFFD1D5DB);
```

### 타이포그래피
```dart
// Text Styles
static const TextStyle titleLarge = TextStyle(
  fontSize: 28,
  fontWeight: FontWeight.w700,
  height: 1.2,
);

static const TextStyle titleMedium = TextStyle(
  fontSize: 24,
  fontWeight: FontWeight.w700,
  height: 1.2,
);

static const TextStyle subtitleMedium = TextStyle(
  fontSize: 18,
  fontWeight: FontWeight.w500,
  height: 1.4,
);

static const TextStyle bodyLarge = TextStyle(
  fontSize: 16,
  fontWeight: FontWeight.w400,
  height: 1.5,
);

static const TextStyle bodyMedium = TextStyle(
  fontSize: 14,
  fontWeight: FontWeight.w400,
  height: 1.4,
);

static const TextStyle labelMedium = TextStyle(
  fontSize: 14,
  fontWeight: FontWeight.w600,
  height: 1.3,
);

static const TextStyle caption = TextStyle(
  fontSize: 12,
  fontWeight: FontWeight.w400,
  height: 1.3,
);
```

### 간격 및 크기
```dart
// Spacing
static const double spacingXs = 4.0;
static const double spacingSm = 8.0;
static const double spacingMd = 16.0;
static const double spacingLg = 24.0;
static const double spacingXl = 32.0;
static const double spacingXxl = 48.0;

// Component Sizes
static const double inputFieldHeight = 56.0;
static const double buttonHeight = 48.0;
static const double buttonHeightLarge = 56.0;
static const double borderRadius = 8.0;
static const double borderRadiusLarge = 12.0;

// Touch Target Minimum Size
static const double minTouchTarget = 44.0;
```

## 🧩 핵심 UI 컴포넌트

### 1. AuthTextField - 인증 입력 필드

```dart
class AuthTextField extends StatefulWidget {
  final String? label;
  final String placeholder;
  final TextInputType keyboardType;
  final bool isPassword;
  final bool showPasswordToggle;
  final String? errorText;
  final String? successText;
  final bool isLoading;
  final Function(String)? onChanged;
  final Function(String)? onSubmitted;
  final TextEditingController? controller;
  final bool autofocus;
  
  const AuthTextField({
    Key? key,
    this.label,
    required this.placeholder,
    this.keyboardType = TextInputType.text,
    this.isPassword = false,
    this.showPasswordToggle = false,
    this.errorText,
    this.successText,
    this.isLoading = false,
    this.onChanged,
    this.onSubmitted,
    this.controller,
    this.autofocus = false,
  }) : super(key: key);
}
```

**스타일 스펙:**
- 높이: 56px
- 테두리 반지름: 8px
- 패딩: 16px (좌우), 16px (상하)
- 폰트 크기: 16px
- 플레이스홀더 색상: #9CA3AF
- 포커스 테두리: 2px solid #2563EB
- 에러 테두리: 2px solid #EF4444
- 성공 테두리: 2px solid #10B981

**상태별 디자인:**
- **Default**: 테두리 #D1D5DB, 배경 #FFFFFF
- **Focus**: 테두리 #2563EB, 그림자 효과
- **Error**: 테두리 #EF4444, 하단 에러 메시지
- **Success**: 테두리 #10B981, 하단 성공 메시지
- **Disabled**: 배경 #F3F4F6, 텍스트 #9CA3AF

### 2. AuthButton - 인증 버튼

```dart
class AuthButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isLoading;
  final AuthButtonType type;
  final AuthButtonSize size;
  final bool enabled;
  
  const AuthButton({
    Key? key,
    required this.text,
    this.onPressed,
    this.isLoading = false,
    this.type = AuthButtonType.primary,
    this.size = AuthButtonSize.medium,
    this.enabled = true,
  }) : super(key: key);
}

enum AuthButtonType { primary, secondary, text }
enum AuthButtonSize { medium, large }
```

**Primary 버튼 스펙:**
- 배경색: #2563EB
- 텍스트 색상: #FFFFFF
- 높이: 48px (medium), 56px (large)
- 테두리 반지름: 8px
- 폰트: 16px Medium
- 호버 시: #1D4ED8
- 로딩 시: 스피너 표시, 배경 #93C5FD

### 3. PasswordStrengthIndicator - 패스워드 강도 표시기

```dart
class PasswordStrengthIndicator extends StatelessWidget {
  final String password;
  final Function(PasswordStrength)? onStrengthChanged;
  
  const PasswordStrengthIndicator({
    Key? key,
    required this.password,
    this.onStrengthChanged,
  }) : super(key: key);
}

enum PasswordStrength { weak, fair, good, strong }
```

**스타일 스펙:**
- 강도 바 높이: 6px
- 테두리 반지름: 3px
- 배경색: #F3F4F6
- 약함 (25%): #EF4444
- 보통 (50%): #F59E0B
- 좋음 (75%): #10B981
- 강함 (100%): #10B981

### 4. ValidationChecklist - 패스워드 요구사항 체크리스트

```dart
class ValidationChecklist extends StatelessWidget {
  final String password;
  final List<ValidationRule> rules;
  
  const ValidationChecklist({
    Key? key,
    required this.password,
    required this.rules,
  }) : super(key: key);
}

class ValidationRule {
  final String text;
  final bool Function(String) validator;
  final String id;
  
  ValidationRule({
    required this.text,
    required this.validator,
    required this.id,
  });
}
```

**기본 규칙:**
- 8자 이상: `password.length >= 8`
- 대소문자 포함: 정규식 검증
- 숫자 포함: 정규식 검증
- 특수문자 포함: 정규식 검증

### 5. ErrorMessage - 에러 메시지 컴포넌트

```dart
class ErrorMessage extends StatelessWidget {
  final String message;
  final ErrorType type;
  final VoidCallback? onDismiss;
  final bool showIcon;
  
  const ErrorMessage({
    Key? key,
    required this.message,
    this.type = ErrorType.error,
    this.onDismiss,
    this.showIcon = true,
  }) : super(key: key);
}

enum ErrorType { info, warning, error, success }
```

## 📱 화면별 컴포넌트 구성

### 로그인 화면 (SignInPage)

```dart
class SignInPage extends StatefulWidget {
  @override
  _SignInPageState createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  
  bool _isLoading = false;
  String? _emailError;
  String? _passwordError;
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Logo Section
              SizedBox(height: 80),
              _buildLogoSection(),
              
              SizedBox(height: 48),
              
              // Form Section
              Form(
                key: _formKey,
                child: Column(
                  children: [
                    // Email Field
                    AuthTextField(
                      controller: _emailController,
                      placeholder: "이메일을 입력하세요",
                      keyboardType: TextInputType.emailAddress,
                      errorText: _emailError,
                      onChanged: _onEmailChanged,
                      autofocus: true,
                    ),
                    
                    SizedBox(height: 16),
                    
                    // Password Field
                    AuthTextField(
                      controller: _passwordController,
                      placeholder: "패스워드를 입력하세요",
                      isPassword: true,
                      showPasswordToggle: true,
                      errorText: _passwordError,
                      onChanged: _onPasswordChanged,
                      onSubmitted: (_) => _onSignIn(),
                    ),
                    
                    SizedBox(height: 24),
                    
                    // Sign In Button
                    AuthButton(
                      text: "로그인",
                      isLoading: _isLoading,
                      onPressed: _isFormValid ? _onSignIn : null,
                      size: AuthButtonSize.large,
                    ),
                    
                    SizedBox(height: 32),
                    
                    // Sign Up Link
                    _buildSignUpLink(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### 회원가입 화면 (SignUpPage)

**주요 컴포넌트:**
- AuthTextField (이메일, 패스워드, 패스워드 확인, 닉네임)
- PasswordStrengthIndicator
- ValidationChecklist
- TermsCheckbox
- AuthButton

### 환영 화면 (WelcomePage)

**주요 컴포넌트:**
- HeroSection (로고, 제목, 부제목)
- FeaturesList (기능 소개 목록)
- AuthButton (시작하기)

## 📐 반응형 디자인 가이드

### 브레이크포인트
- Small Mobile: < 360px
- Standard Mobile: 360px - 768px  
- Tablet: 768px - 1024px
- Large Screen: > 1024px

### 적응형 레이아웃

**Small Mobile (< 360px)**
```dart
// 컴포넌트 크기 조정
inputFieldHeight: 48.0,
buttonHeight: 44.0,
fontSize: 14.0,
padding: EdgeInsets.all(16),
```

**Tablet (768px+)**
```dart
// 2컬럼 레이아웃 또는 중앙 정렬
maxWidth: 400.0,
centerAlignment: true,
additionalPadding: EdgeInsets.symmetric(horizontal: 64),
```

### 가로/세로 모드 대응

**세로 모드 (Portrait)**
- 기본 단일 컬럼 레이아웃
- 상하 스크롤 지원

**가로 모드 (Landscape)**
- 좌우 분할 레이아웃 (태블릿)
- 컴포넌트 크기 축소
- 간격 최적화

## ♿ 접근성 구현 가이드

### 1. Semantic Labels
```dart
Semantics(
  label: "이메일 주소 입력",
  hint: "유효한 이메일 주소를 입력하세요",
  child: AuthTextField(...),
)
```

### 2. Screen Reader 지원
```dart
ExcludeSemantics(
  excluding: false,
  child: Text(
    "로그인",
    semanticsLabel: "로그인 버튼을 누르면 계정에 로그인합니다",
  ),
)
```

### 3. 키보드 네비게이션
```dart
Focus(
  autofocus: true,
  child: AuthTextField(...),
)

// Tab order 제어
FocusTraversalOrder(
  order: NumericFocusOrder(1),
  child: EmailField(),
)
```

### 4. 고대비 지원
```dart
// 시스템 접근성 설정 감지
final highContrast = MediaQuery.of(context).highContrast;
final textColor = highContrast ? Colors.black : AppColors.textPrimary;
```

## 🔍 성능 최적화 가이드

### 1. 위젯 재사용
```dart
// 정적 위젯을 const로 선언
static const _logoWidget = const LogoWidget();

// 빌더 함수 최적화  
Widget _buildInputField() => AuthTextField(...);
```

### 2. 상태 관리 최적화
```dart
// ValueNotifier 사용으로 불필요한 리빌드 방지
class _SignInPageState extends State<SignInPage> {
  final ValueNotifier<bool> _isLoadingNotifier = ValueNotifier(false);
  
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<bool>(
      valueListenable: _isLoadingNotifier,
      builder: (context, isLoading, child) {
        return AuthButton(
          isLoading: isLoading,
          // ...
        );
      },
    );
  }
}
```

### 3. 이미지 최적화
```dart
// 적절한 이미지 해상도 사용
Image.asset(
  'assets/logo.png',
  width: 80,
  height: 80,
  cacheWidth: 160, // 2x 해상도
  cacheHeight: 160,
)
```

## 🧪 테스트 가이드

### 1. 위젯 테스트
```dart
testWidgets('AuthTextField shows error message', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      home: AuthTextField(
        placeholder: "이메일",
        errorText: "유효하지 않은 이메일",
      ),
    ),
  );
  
  expect(find.text("유효하지 않은 이메일"), findsOneWidget);
});
```

### 2. 접근성 테스트
```dart
testWidgets('AuthButton has proper semantics', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      home: AuthButton(text: "로그인"),
    ),
  );
  
  final SemanticsNode semantics = tester.getSemantics(find.text("로그인"));
  expect(semantics.hasAction(SemanticsAction.tap), isTrue);
});
```

## 📝 구현 체크리스트

### 필수 구현 사항
- [ ] AuthTextField 컴포넌트 구현
- [ ] AuthButton 컴포넌트 구현  
- [ ] PasswordStrengthIndicator 구현
- [ ] ValidationChecklist 구현
- [ ] ErrorMessage 컴포넌트 구현
- [ ] SignInPage 화면 구현
- [ ] SignUpPage 화면 구현
- [ ] WelcomePage 화면 구현

### 접근성 구현 사항
- [ ] Semantic labels 적용
- [ ] Screen reader 지원
- [ ] 키보드 네비게이션 구현
- [ ] 고대비 모드 대응
- [ ] 색맹 접근성 대응

### 반응형 구현 사항
- [ ] 브레이크포인트별 레이아웃 적용
- [ ] 가로/세로 모드 대응
- [ ] 다양한 화면 크기 테스트
- [ ] 폰트 스케일링 대응

---

**참고 문서:**
- [디자인 토큰 정의서](design-tokens.md)
- [사용자 플로우 가이드](user-flow-authentication.md)
- [Backend API 스펙](api-spec.md)