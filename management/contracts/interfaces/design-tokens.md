# InsightFlo 디자인 토큰 정의서

**버전**: 1.0  
**작성일**: 2025-09-09  
**작성자**: UI/UX Designer  
**관련 작업**: Design System & Authentication UI

## 📋 개요

InsightFlo 앱의 일관된 디자인 시스템을 위한 디자인 토큰 정의 문서입니다. 모든 UI 컴포넌트는 이 토큰들을 기반으로 구현되어야 합니다.

## 🎨 색상 시스템 (Color Tokens)

### Primary Colors - 주요 색상
```json
{
  "color": {
    "primary": {
      "50": "#EFF6FF",
      "100": "#DBEAFE", 
      "200": "#BFDBFE",
      "300": "#93C5FD",
      "400": "#60A5FA",
      "500": "#2563EB",  // Main Primary
      "600": "#1D4ED8",
      "700": "#1E40AF",
      "800": "#1E3A8A",
      "900": "#1E293B"
    }
  }
}
```

**Flutter 구현:**
```dart
class AppColors {
  // Primary Colors
  static const Color primary50 = Color(0xFFEFF6FF);
  static const Color primary100 = Color(0xFFDBEAFE);
  static const Color primary200 = Color(0xFFBFDBFE);
  static const Color primary300 = Color(0xFF93C5FD);
  static const Color primary400 = Color(0xFF60A5FA);
  static const Color primary500 = Color(0xFF2563EB);  // Main
  static const Color primary600 = Color(0xFF1D4ED8);
  static const Color primary700 = Color(0xFF1E40AF);
  static const Color primary800 = Color(0xFF1E3A8A);
  static const Color primary900 = Color(0xFF1E293B);
  
  // Semantic alias
  static const Color primary = primary500;
  static const Color primaryHover = primary600;
  static const Color primaryDisabled = primary200;
}
```

### Semantic Colors - 의미 색상
```json
{
  "color": {
    "semantic": {
      "success": {
        "light": "#D1FAE5",
        "main": "#10B981",
        "dark": "#065F46"
      },
      "error": {
        "light": "#FEE2E2", 
        "main": "#EF4444",
        "dark": "#991B1B"
      },
      "warning": {
        "light": "#FEF3C7",
        "main": "#F59E0B", 
        "dark": "#92400E"
      },
      "info": {
        "light": "#DBEAFE",
        "main": "#3B82F6",
        "dark": "#1E40AF"
      }
    }
  }
}
```

**Flutter 구현:**
```dart
class AppColors {
  // Success Colors
  static const Color successLight = Color(0xFFD1FAE5);
  static const Color success = Color(0xFF10B981);
  static const Color successDark = Color(0xFF065F46);
  
  // Error Colors  
  static const Color errorLight = Color(0xFFFEE2E2);
  static const Color error = Color(0xFFEF4444);
  static const Color errorDark = Color(0xFF991B1B);
  
  // Warning Colors
  static const Color warningLight = Color(0xFFFEF3C7);
  static const Color warning = Color(0xFFF59E0B);
  static const Color warningDark = Color(0xFF92400E);
  
  // Info Colors
  static const Color infoLight = Color(0xFFDBEAFE);
  static const Color info = Color(0xFF3B82F6);
  static const Color infoDark = Color(0xFF1E40AF);
}
```

### Neutral Colors - 중성 색상
```json
{
  "color": {
    "neutral": {
      "50": "#F9FAFB",
      "100": "#F3F4F6", 
      "200": "#E5E7EB",
      "300": "#D1D5DB",
      "400": "#9CA3AF",
      "500": "#6B7280",
      "600": "#4B5563",
      "700": "#374151",
      "800": "#1F2937", 
      "900": "#111827"
    }
  }
}
```

**Flutter 구현:**
```dart
class AppColors {
  // Neutral Colors
  static const Color neutral50 = Color(0xFFF9FAFB);
  static const Color neutral100 = Color(0xFFF3F4F6);
  static const Color neutral200 = Color(0xFFE5E7EB);
  static const Color neutral300 = Color(0xFFD1D5DB);
  static const Color neutral400 = Color(0xFF9CA3AF);
  static const Color neutral500 = Color(0xFF6B7280);
  static const Color neutral600 = Color(0xFF4B5563);
  static const Color neutral700 = Color(0xFF374151);
  static const Color neutral800 = Color(0xFF1F2937);
  static const Color neutral900 = Color(0xFF111827);
  
  // Text Colors (Semantic aliases)
  static const Color textPrimary = neutral800;
  static const Color textSecondary = neutral500;
  static const Color textTertiary = neutral400;
  static const Color textDisabled = neutral300;
  
  // Background Colors
  static const Color background = Color(0xFFFFFFFF);
  static const Color backgroundSecondary = neutral50;
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceSecondary = neutral100;
  
  // Border Colors
  static const Color border = neutral300;
  static const Color borderSecondary = neutral200;
}
```

### 투자/금융 특화 색상
```json
{
  "color": {
    "financial": {
      "positive": "#10B981",  // 상승/긍정 (녹색)
      "negative": "#EF4444",  // 하락/부정 (적색)
      "neutral": "#6B7280",   // 중립/보합 (회색)
      "gold": "#F59E0B",      // 골드/프리미엄
      "crypto": "#8B5CF6"     // 암호화폐 (보라색)
    }
  }
}
```

## 📝 타이포그래피 시스템 (Typography Tokens)

### Font Family
```json
{
  "font": {
    "family": {
      "primary": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      "monospace": "'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace"
    }
  }
}
```

**Flutter 구현:**
```dart
class AppTypography {
  static const String fontFamily = 'NotoSansKR'; // 또는 시스템 기본값
  static const String monospaceFontFamily = 'RobotoMono';
}
```

### Font Scale
```json
{
  "fontSize": {
    "xs": "12px",
    "sm": "14px", 
    "base": "16px",
    "lg": "18px",
    "xl": "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "32px"
  }
}
```

**Flutter 구현:**
```dart
class AppFontSizes {
  static const double xs = 12.0;
  static const double sm = 14.0;
  static const double base = 16.0;
  static const double lg = 18.0;
  static const double xl = 20.0;
  static const double xxl = 24.0;
  static const double xxxl = 28.0;
  static const double xxxxl = 32.0;
}
```

### Font Weight
```json
{
  "fontWeight": {
    "regular": 400,
    "medium": 500,
    "semibold": 600,
    "bold": 700
  }
}
```

**Flutter 구현:**
```dart
class AppFontWeights {
  static const FontWeight regular = FontWeight.w400;
  static const FontWeight medium = FontWeight.w500;
  static const FontWeight semibold = FontWeight.w600;
  static const FontWeight bold = FontWeight.w700;
}
```

### Line Height
```json
{
  "lineHeight": {
    "tight": 1.2,
    "normal": 1.4,
    "relaxed": 1.5,
    "loose": 1.6
  }
}
```

### Text Styles (조합된 스타일)
```dart
class AppTextStyles {
  // Display Styles
  static const TextStyle displayLarge = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.w700,
    height: 1.2,
    letterSpacing: -0.5,
  );
  
  static const TextStyle displayMedium = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.w700,
    height: 1.2,
    letterSpacing: -0.25,
  );
  
  // Headline Styles
  static const TextStyle headlineLarge = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w700,
    height: 1.2,
  );
  
  static const TextStyle headlineMedium = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );
  
  static const TextStyle headlineSmall = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );
  
  // Title Styles
  static const TextStyle titleLarge = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w500,
    height: 1.3,
  );
  
  static const TextStyle titleMedium = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w500,
    height: 1.4,
  );
  
  static const TextStyle titleSmall = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w500,
    height: 1.4,
  );
  
  // Body Styles
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
  
  static const TextStyle bodySmall = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w400,
    height: 1.3,
  );
  
  // Label Styles
  static const TextStyle labelLarge = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );
  
  static const TextStyle labelMedium = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );
  
  static const TextStyle labelSmall = TextStyle(
    fontSize: 10,
    fontWeight: FontWeight.w600,
    height: 1.2,
  );
  
  // Special Styles
  static const TextStyle monospace = TextStyle(
    fontSize: 14,
    fontFamily: 'RobotoMono',
    fontWeight: FontWeight.w400,
    height: 1.4,
  );
}
```

## 📏 간격 시스템 (Spacing Tokens)

### Base Spacing Scale
```json
{
  "spacing": {
    "0": "0px",
    "1": "4px",
    "2": "8px", 
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px",
    "20": "80px"
  }
}
```

**Flutter 구현:**
```dart
class AppSpacing {
  static const double none = 0.0;
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 12.0;
  static const double lg = 16.0;
  static const double xl = 20.0;
  static const double xxl = 24.0;
  static const double xxxl = 32.0;
  static const double xxxxl = 40.0;
  static const double xxxxxl = 48.0;
  static const double xxxxxxl = 64.0;
  static const double xxxxxxxl = 80.0;
}
```

### Component Spacing (컴포넌트별 간격)
```dart
class AppComponentSpacing {
  // Input Field
  static const double inputPadding = 16.0;
  static const double inputHeight = 56.0;
  static const double inputSpacing = 16.0;
  
  // Button
  static const double buttonHeight = 48.0;
  static const double buttonHeightLarge = 56.0;
  static const double buttonPaddingHorizontal = 24.0;
  static const double buttonPaddingVertical = 12.0;
  
  // Screen Padding
  static const double screenPadding = 24.0;
  static const double screenPaddingSmall = 16.0;
  static const double screenPaddingLarge = 32.0;
  
  // Component Gap
  static const double componentGap = 16.0;
  static const double componentGapLarge = 24.0;
  static const double componentGapSmall = 12.0;
}
```

## 🔘 Border Radius System

### Radius Scale
```json
{
  "borderRadius": {
    "none": "0px",
    "sm": "4px",
    "md": "8px",
    "lg": "12px", 
    "xl": "16px",
    "2xl": "20px",
    "full": "999px"
  }
}
```

**Flutter 구현:**
```dart
class AppBorderRadius {
  static const double none = 0.0;
  static const double sm = 4.0;
  static const double md = 8.0;
  static const double lg = 12.0;
  static const double xl = 16.0;
  static const double xxl = 20.0;
  static const double full = 999.0;
  
  // Component specific
  static const double button = md;
  static const double input = md;
  static const double card = lg;
  static const double dialog = xl;
}
```

## 🌫️ Shadow System (그림자 시스템)

### Elevation Scale
```json
{
  "boxShadow": {
    "sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px rgba(0, 0, 0, 0.07)", 
    "lg": "0 10px 15px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px rgba(0, 0, 0, 0.15)",
    "2xl": "0 25px 50px rgba(0, 0, 0, 0.25)"
  }
}
```

**Flutter 구현:**
```dart
class AppShadows {
  static const List<BoxShadow> sm = [
    BoxShadow(
      color: Color.fromRGBO(0, 0, 0, 0.05),
      offset: Offset(0, 1),
      blurRadius: 2,
    ),
  ];
  
  static const List<BoxShadow> md = [
    BoxShadow(
      color: Color.fromRGBO(0, 0, 0, 0.07),
      offset: Offset(0, 4),
      blurRadius: 6,
    ),
  ];
  
  static const List<BoxShadow> lg = [
    BoxShadow(
      color: Color.fromRGBO(0, 0, 0, 0.1),
      offset: Offset(0, 10),
      blurRadius: 15,
    ),
  ];
  
  static const List<BoxShadow> xl = [
    BoxShadow(
      color: Color.fromRGBO(0, 0, 0, 0.15),
      offset: Offset(0, 20),
      blurRadius: 25,
    ),
  ];
  
  // Focus Shadow
  static List<BoxShadow> focus(Color color) => [
    BoxShadow(
      color: color.withOpacity(0.2),
      offset: Offset(0, 0),
      blurRadius: 4,
      spreadRadius: 3,
    ),
  ];
}
```

## 📱 Size System (크기 시스템)

### Component Sizes
```dart
class AppSizes {
  // Touch Target Minimum
  static const double minTouchTarget = 44.0;
  
  // Icon Sizes
  static const double iconXs = 12.0;
  static const double iconSm = 16.0;
  static const double iconMd = 20.0;
  static const double iconLg = 24.0;
  static const double iconXl = 32.0;
  
  // Avatar Sizes
  static const double avatarSm = 24.0;
  static const double avatarMd = 32.0;
  static const double avatarLg = 48.0;
  static const double avatarXl = 64.0;
  
  // Logo Sizes
  static const double logoSm = 32.0;
  static const double logoMd = 48.0;
  static const double logoLg = 64.0;
  static const double logoXl = 80.0;
}
```

## 🎭 Animation Tokens

### Duration
```json
{
  "duration": {
    "fast": "150ms",
    "normal": "250ms", 
    "slow": "350ms",
    "slower": "500ms"
  }
}
```

**Flutter 구현:**
```dart
class AppAnimations {
  // Duration
  static const Duration fast = Duration(milliseconds: 150);
  static const Duration normal = Duration(milliseconds: 250);
  static const Duration slow = Duration(milliseconds: 350);
  static const Duration slower = Duration(milliseconds: 500);
  
  // Curves
  static const Curve easeIn = Curves.easeIn;
  static const Curve easeOut = Curves.easeOut;
  static const Curve easeInOut = Curves.easeInOut;
  static const Curve bounceOut = Curves.bounceOut;
  
  // Common Transitions
  static const Curve buttonPress = Curves.easeInOut;
  static const Curve dialogSlide = Curves.easeOut;
  static const Curve pageTransition = Curves.easeInOut;
}
```

## 🌍 다크 모드 토큰

```dart
class AppColorsDark {
  // Primary Colors (동일)
  static const Color primary = Color(0xFF60A5FA); // 조금 더 밝게
  
  // Background Colors
  static const Color background = Color(0xFF111827);
  static const Color backgroundSecondary = Color(0xFF1F2937);
  static const Color surface = Color(0xFF1F2937);
  static const Color surfaceSecondary = Color(0xFF374151);
  
  // Text Colors
  static const Color textPrimary = Color(0xFFF9FAFB);
  static const Color textSecondary = Color(0xFFD1D5DB);
  static const Color textTertiary = Color(0xFF9CA3AF);
  
  // Border Colors
  static const Color border = Color(0xFF4B5563);
  static const Color borderSecondary = Color(0xFF374151);
}
```

## 🎯 사용 예시

### ThemeData 구성
```dart
class AppTheme {
  static ThemeData get lightTheme => ThemeData(
    primarySwatch: MaterialColor(0xFF2563EB, {
      50: AppColors.primary50.value,
      100: AppColors.primary100.value,
      200: AppColors.primary200.value,
      300: AppColors.primary300.value,
      400: AppColors.primary400.value,
      500: AppColors.primary500.value,
      600: AppColors.primary600.value,
      700: AppColors.primary700.value,
      800: AppColors.primary800.value,
      900: AppColors.primary900.value,
    }),
    scaffoldBackgroundColor: AppColors.background,
    textTheme: TextTheme(
      displayLarge: AppTextStyles.displayLarge,
      displayMedium: AppTextStyles.displayMedium,
      headlineLarge: AppTextStyles.headlineLarge,
      // ... 기타 스타일들
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        minimumSize: Size(double.infinity, AppComponentSpacing.buttonHeight),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppBorderRadius.button),
        ),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      contentPadding: EdgeInsets.all(AppComponentSpacing.inputPadding),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(AppBorderRadius.input),
        borderSide: BorderSide(color: AppColors.border),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(AppBorderRadius.input),
        borderSide: BorderSide(color: AppColors.primary, width: 2),
      ),
    ),
  );
}
```

---

**주의사항:**
- 모든 하드코딩된 색상/크기 값은 이 토큰들로 교체해야 합니다
- 새로운 색상이나 크기가 필요한 경우, 기존 토큰을 우선 검토한 후 추가합니다
- 일관성을 위해 임의의 값 사용을 지양합니다

**관련 문서:**
- [인증 UI 컴포넌트 스펙](authentication-ui-components.md)
- [사용자 플로우 가이드](user-flow-authentication.md)