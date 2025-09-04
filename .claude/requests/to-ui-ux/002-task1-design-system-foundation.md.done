# 요청: Material 3 디자인 시스템 기반 설정

**요청자**: PM (Project Manager)  
**요청일**: 2025-01-21  
**우선순위**: HIGH  
**Task ID**: Task 1 - 프로젝트 초기 설정 및 디렉토리 구조 생성

## 📋 요청 사항

UI/UX Designer님께서 다음 작업을 수행해 주시기 바랍니다:

### 1. Material 3 컬러 시스템 정의

#### 컬러 팔레트 정의서 생성
```
design/specs/color-system.md

Primary Colors:
- Primary: #2563EB (Blue 600)
- On Primary: #FFFFFF
- Primary Container: #DBEAFE
- On Primary Container: #1E3A8A

Secondary Colors:
- Secondary: #64748B (Slate 500)  
- On Secondary: #FFFFFF
- Secondary Container: #F1F5F9
- On Secondary Container: #0F172A

Surface Colors:
- Surface: #FFFFFF
- On Surface: #0F172A
- Surface Variant: #F8FAFC
- On Surface Variant: #64748B

Error Colors:
- Error: #DC2626 (Red 600)
- On Error: #FFFFFF
- Error Container: #FEE2E2
- On Error Container: #7F1D1D

Semantic Colors:
- Success: #059669 (Emerald 600)
- Warning: #D97706 (Amber 600)
- Info: #0284C7 (Sky 600)
```

### 2. Typography 시스템 설계

```
design/specs/typography.md

Font Family: Inter (Google Fonts)

Display Styles:
- Display Large: 64px / Line 72px / Bold
- Display Medium: 48px / Line 56px / Bold  
- Display Small: 36px / Line 44px / Bold

Headline Styles:
- Headline Large: 32px / Line 40px / SemiBold
- Headline Medium: 28px / Line 36px / SemiBold
- Headline Small: 24px / Line 32px / SemiBold

Title Styles:
- Title Large: 22px / Line 28px / Medium
- Title Medium: 18px / Line 24px / Medium
- Title Small: 16px / Line 20px / Medium

Body Styles:
- Body Large: 16px / Line 24px / Regular
- Body Medium: 14px / Line 20px / Regular
- Body Small: 12px / Line 16px / Regular

Label Styles:
- Label Large: 14px / Line 20px / Medium
- Label Medium: 12px / Line 16px / Medium
- Label Small: 11px / Line 16px / Medium
```

### 3. 뉴스 카드 컴포넌트 디자인

#### NewsCard 디자인 스펙 작성
```
design/specs/news-card-component.md

Component: NewsCard
Size: 335x140 (mobile)

Layout:
┌─────────────────────────────────────┐
│ [Icon] Title (2 lines max)          │
│                              [Time] │
│ Summary text (3 lines max)          │
│ [Keyword Chips]              [Menu] │
└─────────────────────────────────────┘

Spacing:
- Padding: 16px
- Title-Summary gap: 8px
- Summary-Chips gap: 12px
- Inter-chip gap: 8px

Sentiment Icons:
- Positive: 📈 (Green #059669)
- Negative: 📉 (Red #DC2626)
- Neutral: ⚡ (Blue #2563EB)

States:
- Default: Elevation 1, Border Radius 12px
- Pressed: Elevation 0, Scale 0.98
- Loading: Shimmer effect
```

### 4. 디자인 토큰 파일 생성

```dart
// design/specs/design_tokens.dart
class AppColors {
  // Primary
  static const Color primary = Color(0xFF2563EB);
  static const Color onPrimary = Color(0xFFFFFFFF);
  static const Color primaryContainer = Color(0xFFDBEAFE);
  static const Color onPrimaryContainer = Color(0xFF1E3A8A);
  
  // Secondary
  static const Color secondary = Color(0xFF64748B);
  static const Color onSecondary = Color(0xFFFFFFFF);
  static const Color secondaryContainer = Color(0xFFF1F5F9);
  static const Color onSecondaryContainer = Color(0xFF0F172A);
  
  // Surface
  static const Color surface = Color(0xFFFFFFFF);
  static const Color onSurface = Color(0xFF0F172A);
  static const Color surfaceVariant = Color(0xFFF8FAFC);
  static const Color onSurfaceVariant = Color(0xFF64748B);
  
  // Semantic
  static const Color success = Color(0xFF059669);
  static const Color warning = Color(0xFFD97706);
  static const Color error = Color(0xFFDC2626);
  static const Color info = Color(0xFF0284C7);
}

class AppTextStyles {
  static const TextStyle displayLarge = TextStyle(
    fontFamily: 'Inter',
    fontSize: 64,
    height: 1.125,
    fontWeight: FontWeight.w700,
  );
  
  static const TextStyle headlineMedium = TextStyle(
    fontFamily: 'Inter',
    fontSize: 28,
    height: 1.286,
    fontWeight: FontWeight.w600,
  );
  
  static const TextStyle bodyMedium = TextStyle(
    fontFamily: 'Inter',
    fontSize: 14,
    height: 1.429,
    fontWeight: FontWeight.w400,
  );
  
  // ... 추가 텍스트 스타일
}
```

### 5. 아이콘 시스템 정의

```
design/specs/icon-system.md

Icon Style: Material Icons (Outlined)
Size: 24px standard, 20px small, 28px large

Navigation Icons:
- Home: home_outlined
- Search: search_outlined  
- Bookmark: bookmark_outline
- Settings: settings_outlined
- Profile: person_outline

Action Icons:  
- Share: share_outlined
- More: more_vert_outlined
- Filter: filter_list_outlined
- Notification: notifications_outlined
- Back: arrow_back_ios_outlined

Status Icons:
- Check: check_circle_outline
- Error: error_outline  
- Warning: warning_amber_outlined
- Info: info_outline
```

### 6. 반응형 그리드 시스템

```
design/specs/responsive-grid.md

Breakpoints:
- Mobile: 0-600px (1 column)
- Tablet: 600-905px (2 columns)
- Desktop: 905px+ (3+ columns)

Layout Margins:
- Mobile: 16px
- Tablet: 24px
- Desktop: 32px

Card Spacing:
- Gap: 16px
- Max width: 400px
- Min width: 280px
```

## 🎯 완료 기준
- [ ] Material 3 컬러 시스템 정의 완료
- [ ] Typography 시스템 문서화
- [ ] NewsCard 컴포넌트 디자인 스펙 완료
- [ ] 디자인 토큰 Dart 파일 생성
- [ ] 아이콘 시스템 정의
- [ ] 반응형 그리드 시스템 설계
- [ ] Figma 디자인 파일 생성 (선택사항)

## 📅 기한
- **목표 완료일**: 2025-01-22
- **블로킹 이슈**: 없음

## 🔗 연관 작업
- Frontend 팀의 Flutter 테마 설정과 연동
- 향후 Material 3 ThemeData 적용

## 📞 문의
질문이나 이슈가 있으시면 PM에게 응답 파일로 알려주세요.

---
*이 요청은 Task Master Task 1의 일부입니다.*