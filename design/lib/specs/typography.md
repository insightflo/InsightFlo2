# Typography System for InsightFlo2

## Overview
InsightFlo2의 타이포그래피 시스템은 가독성과 일관성을 중심으로 설계되었습니다.
Material Design 3 Type Scale을 기반으로 하며, Inter 폰트 패밀리를 사용합니다.

## Font Family

### Primary Font: Inter
- **Source**: Google Fonts
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Language Support**: Latin, Latin Extended, Cyrillic, Greek
- **Variable Font**: Yes (Weight 100-900)

## Type Scale

### Display Styles
큰 화면의 헤드라인과 히어로 텍스트에 사용

| Style | Size | Line Height | Weight | Usage |
|-------|------|-------------|---------|--------|
| **Display Large** | 64px | 72px | Bold (700) | 랜딩 페이지 헤드라인 |
| **Display Medium** | 48px | 56px | Bold (700) | 섹션 타이틀 |
| **Display Small** | 36px | 44px | Bold (700) | 페이지 타이틀 |

### Headline Styles
주요 콘텐츠 헤딩에 사용

| Style | Size | Line Height | Weight | Usage |
|-------|------|-------------|---------|--------|
| **Headline Large** | 32px | 40px | SemiBold (600) | 페이지 헤더 |
| **Headline Medium** | 28px | 36px | SemiBold (600) | 카드 헤더 |
| **Headline Small** | 24px | 32px | SemiBold (600) | 섹션 헤더 |

### Title Styles
보조 헤딩과 리스트 타이틀에 사용

| Style | Size | Line Height | Weight | Usage |
|-------|------|-------------|---------|--------|
| **Title Large** | 22px | 28px | Medium (500) | 다이얼로그 타이틀 |
| **Title Medium** | 18px | 24px | Medium (500) | 리스트 헤더 |
| **Title Small** | 16px | 20px | Medium (500) | 서브 헤더 |

### Body Styles
본문 텍스트에 사용

| Style | Size | Line Height | Weight | Usage |
|-------|------|-------------|---------|--------|
| **Body Large** | 16px | 24px | Regular (400) | 기본 본문 |
| **Body Medium** | 14px | 20px | Regular (400) | 보조 본문 |
| **Body Small** | 12px | 16px | Regular (400) | 캡션, 힌트 |

### Label Styles
버튼, 탭, 칩 등 UI 컴포넌트에 사용

| Style | Size | Line Height | Weight | Usage |
|-------|------|-------------|---------|--------|
| **Label Large** | 14px | 20px | Medium (500) | 버튼 텍스트 |
| **Label Medium** | 12px | 16px | Medium (500) | 탭, 칩 텍스트 |
| **Label Small** | 11px | 16px | Medium (500) | 배지, 태그 |

## Text Styles for News Content

### News Title
```
Font: Inter SemiBold
Size: 18px
Line Height: 24px
Max Lines: 2
Overflow: Ellipsis
Color: On Surface (#0F172A)
```

### News Summary
```
Font: Inter Regular
Size: 14px
Line Height: 20px
Max Lines: 3
Overflow: Ellipsis
Color: On Surface Variant (#64748B)
```

### News Metadata
```
Font: Inter Regular
Size: 12px
Line Height: 16px
Color: On Surface Variant (#64748B)
Letter Spacing: 0.4px
```

### Keyword Chip
```
Font: Inter Medium
Size: 12px
Line Height: 16px
Color: Primary (#2563EB)
Background: Primary Container (#DBEAFE)
Padding: 4px 8px
Border Radius: 16px
```

## Responsive Typography

### Mobile (0-600px)
- Display styles → Headline styles
- Headline Large → 28px
- Body Large → 15px

### Tablet (600-905px)
- Display Small → 32px
- Headline styles unchanged
- Body styles unchanged

### Desktop (905px+)
- All styles as defined

## Font Weights

| Weight | Name | Usage |
|--------|------|--------|
| 400 | Regular | Body text, descriptions |
| 500 | Medium | Labels, buttons |
| 600 | SemiBold | Headlines, emphasis |
| 700 | Bold | Display text |

## Letter Spacing

| Category | Spacing | Usage |
|----------|---------|--------|
| Headlines | -0.02em | Tighter for impact |
| Body | 0 | Natural spacing |
| Labels | 0.02em | Improved readability |
| Caps | 0.04em | All caps text |

## Line Length
- **Optimal**: 50-75 characters per line
- **Mobile**: 35-50 characters per line
- **Maximum**: 90 characters per line

## Accessibility Guidelines

### Minimum Sizes
- Body text: 14px minimum
- Interactive elements: 14px minimum
- Caption/hint: 12px minimum (use sparingly)

### Line Height
- Minimum 1.4x font size for body text
- Minimum 1.2x for headlines
- Consider 1.5x for improved readability

### Contrast
- Normal text (14px): 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Always test with color blindness simulators

## Implementation Example

```dart
// Flutter TextTheme implementation
TextTheme(
  displayLarge: TextStyle(
    fontFamily: 'Inter',
    fontSize: 64,
    height: 1.125, // 72/64
    fontWeight: FontWeight.w700,
    letterSpacing: -1.28, // -0.02em
  ),
  headlineMedium: TextStyle(
    fontFamily: 'Inter',
    fontSize: 28,
    height: 1.286, // 36/28
    fontWeight: FontWeight.w600,
    letterSpacing: -0.56,
  ),
  bodyMedium: TextStyle(
    fontFamily: 'Inter',
    fontSize: 14,
    height: 1.429, // 20/14
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
  ),
  labelLarge: TextStyle(
    fontFamily: 'Inter',
    fontSize: 14,
    height: 1.429,
    fontWeight: FontWeight.w500,
    letterSpacing: 0.28, // 0.02em
  ),
)
```

## Usage Guidelines

### Do's
- ✅ Use consistent type scale throughout the app
- ✅ Maintain hierarchy with size and weight
- ✅ Ensure adequate line spacing for readability

### Don'ts
- ❌ Mix different font families in the same context
- ❌ Use more than 3 font sizes in one component
- ❌ Use light weights (<400) for body text

---
*Last updated: 2025-01-21*
*Version: 1.0.0*
*Design System: Material 3*