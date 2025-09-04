# Material 3 Color System for InsightFlo2

## Overview
InsightFlo2의 컬러 시스템은 Google Material Design 3 가이드라인을 기반으로 설계되었습니다.
일관된 시각적 계층구조와 브랜드 아이덴티티를 제공하며, 접근성 기준(WCAG 2.1 AA)을 충족합니다.

## Color Palette

### Primary Colors
기본 브랜드 색상으로 주요 인터페이스 요소와 강조 표시에 사용됩니다.

- **Primary**: `#2563EB` (Blue 600)
  - 주요 버튼, 활성 상태, 주요 링크
- **On Primary**: `#FFFFFF`
  - Primary 색상 위의 텍스트/아이콘
- **Primary Container**: `#DBEAFE` 
  - Primary의 밝은 변형, 배경색
- **On Primary Container**: `#1E3A8A`
  - Primary Container 위의 텍스트/아이콘

### Secondary Colors
보조 인터페이스 요소와 덜 강조된 액션에 사용됩니다.

- **Secondary**: `#64748B` (Slate 500)
  - 보조 버튼, 탭, 칩
- **On Secondary**: `#FFFFFF`
  - Secondary 색상 위의 텍스트/아이콘
- **Secondary Container**: `#F1F5F9`
  - Secondary의 밝은 변형, 배경색
- **On Secondary Container**: `#0F172A`
  - Secondary Container 위의 텍스트/아이콘

### Surface Colors
배경과 카드, 시트 등 표면 요소에 사용됩니다.

- **Surface**: `#FFFFFF`
  - 기본 배경색
- **On Surface**: `#0F172A`
  - Surface 위의 기본 텍스트/아이콘
- **Surface Variant**: `#F8FAFC`
  - 약간 어두운 배경, 구분선
- **On Surface Variant**: `#64748B`
  - Surface Variant 위의 보조 텍스트

### Error Colors
에러 상태와 경고 메시지에 사용됩니다.

- **Error**: `#DC2626` (Red 600)
  - 에러 메시지, 경고 아이콘
- **On Error**: `#FFFFFF`
  - Error 색상 위의 텍스트
- **Error Container**: `#FEE2E2`
  - 에러 배경색
- **On Error Container**: `#7F1D1D`
  - Error Container 위의 텍스트

### Semantic Colors
특정 의미를 전달하는 시맨틱 색상입니다.

- **Success**: `#059669` (Emerald 600)
  - 성공 메시지, 완료 상태
- **Warning**: `#D97706` (Amber 600)
  - 경고 메시지, 주의 상태
- **Info**: `#0284C7` (Sky 600)
  - 정보 메시지, 안내 상태

## News Sentiment Colors
뉴스 감성 분석 결과 표시용 색상입니다.

- **Positive Sentiment**: `#059669` (Success Green)
  - 긍정적 뉴스 표시
- **Negative Sentiment**: `#DC2626` (Error Red)
  - 부정적 뉴스 표시
- **Neutral Sentiment**: `#2563EB` (Primary Blue)
  - 중립적 뉴스 표시

## Dark Mode Colors (Future Consideration)
다크 모드 지원을 위한 색상 정의 (Phase 2)

```
Primary Dark: #1E40AF
Surface Dark: #0F172A
On Surface Dark: #F8FAFC
```

## Opacity Values
투명도 레벨 정의

- **Pressed**: 0.12
- **Hover**: 0.08
- **Disabled**: 0.38
- **Divider**: 0.12
- **Scrim**: 0.32

## Usage Guidelines

### Do's
- ✅ Primary 색상은 주요 CTA(Call-to-Action)에만 사용
- ✅ 텍스트와 배경 간 충분한 대비 유지 (4.5:1 이상)
- ✅ 시맨틱 색상은 일관된 의미로만 사용

### Don'ts
- ❌ 한 화면에 너무 많은 Primary 색상 사용 금지
- ❌ 시맨틱 색상을 장식 목적으로 사용 금지
- ❌ 지정되지 않은 색상 조합 사용 금지

## Accessibility Notes
- 모든 텍스트/배경 조합은 WCAG 2.1 AA 기준 충족
- 최소 대비율: 일반 텍스트 4.5:1, 큰 텍스트 3:1
- 색맹 사용자를 위해 색상만으로 정보를 전달하지 않음

## Implementation
```dart
// Flutter implementation example
MaterialColor(
  0xFF2563EB,
  <int, Color>{
    50: Color(0xFFEFF6FF),
    100: Color(0xFFDBEAFE),
    200: Color(0xFFBFDBFE),
    300: Color(0xFF93C5FD),
    400: Color(0xFF60A5FA),
    500: Color(0xFF3B82F6),
    600: Color(0xFF2563EB),
    700: Color(0xFF1D4ED8),
    800: Color(0xFF1E40AF),
    900: Color(0xFF1E3A8A),
  },
)
```

---
*Last updated: 2025-01-21*
*Version: 1.0.0*
*Design System: Material 3*