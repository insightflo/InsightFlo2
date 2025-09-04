# NewsCard Component Design Specification

## Overview
NewsCard는 InsightFlo2 앱의 핵심 컴포넌트로, 뉴스 기사 정보를 사용자에게 효율적으로 제공합니다.
Material Design 3 원칙을 따르며, 터치 친화적이고 접근성을 고려한 디자인입니다.

## Component Specifications

### Dimensions
- **Mobile**: 335×140px (16px margin 기준)
- **Tablet**: 355×140px (24px margin 기준)
- **Desktop**: 400×140px (32px margin 기준)
- **Minimum Width**: 280px
- **Maximum Width**: 500px

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ [📈] Breaking: New AI breakthrough changes...      [2시간 전] │
│                                                             │
│ 인공지능 기술이 의료진단 분야에서 혁신적인 성과를              │
│ 거두며 정확도를 90% 이상 향상시켰다고 발표했습니다.            │
│                                                             │
│ [#AI] [#의료] [#혁신]                              [⋮]      │
└─────────────────────────────────────────────────────────────┘
```

### Content Areas

#### 1. Header Area (높이: 24px)
- **Sentiment Icon** (20×20px)
  - 위치: 왼쪽 상단
  - 여백: 좌측 16px, 상단 16px
- **Title** (최대 2줄)
  - Typography: Title Medium (18px/24px, SemiBold)
  - Color: On Surface (#0F172A)
  - 왼쪽 여백: 아이콘에서 8px
  - 오른쪽 여백: 시간 표시에서 12px
- **Time Stamp**
  - Typography: Label Medium (12px/16px, Regular)
  - Color: On Surface Variant (#64748B)
  - 위치: 오른쪽 상단
  - 여백: 우측 16px, 상단 16px

#### 2. Content Area (높이: 60px)
- **Summary Text** (최대 3줄)
  - Typography: Body Medium (14px/20px, Regular)
  - Color: On Surface Variant (#64748B)
  - 여백: 좌우 16px, 제목에서 8px 간격
  - Line clamp: 3줄 초과 시 "..." 표시

#### 3. Footer Area (높이: 32px)
- **Keyword Chips**
  - Typography: Label Medium (12px/16px, Medium)
  - Color: Primary (#2563EB)
  - Background: Primary Container (#DBEAFE)
  - Padding: 4px 8px
  - Border Radius: 16px
  - Gap: 8px between chips
  - 최대 3개 표시
- **More Actions Menu**
  - Icon: more_vert (24×24px)
  - Color: On Surface Variant (#64748B)
  - 위치: 오른쪽 하단
  - Touch Target: 48×48px

### Spacing System
```
Padding: 16px (all sides)
Title-Summary Gap: 8px
Summary-Footer Gap: 12px
Inter-chip Gap: 8px
Icon-Text Gap: 8px
```

## Sentiment Icons & Colors

### Icons & Meanings
- **Positive**: `📈` (Trending Up)
  - Icon Color: Success (#059669)
  - Background: Success Container (#ECFDF5)
- **Negative**: `📉` (Trending Down)
  - Icon Color: Error (#DC2626)
  - Background: Error Container (#FEE2E2)
- **Neutral**: `⚡` (Flash/Neutral)
  - Icon Color: Primary (#2563EB)
  - Background: Primary Container (#DBEAFE)

### Alternative Icon Set (Material Icons)
- **Positive**: `trending_up` or `keyboard_arrow_up`
- **Negative**: `trending_down` or `keyboard_arrow_down`
- **Neutral**: `remove` or `horizontal_rule`

## Interactive States

### Default State
- **Background**: Surface (#FFFFFF)
- **Elevation**: 1 (2dp shadow)
- **Border**: None
- **Border Radius**: 12px
- **Scale**: 1.0

### Pressed State
- **Background**: Surface (#FFFFFF)
- **Elevation**: 0 (no shadow)
- **Scale**: 0.98
- **Duration**: 150ms ease-out
- **Overlay**: On Surface with 0.12 opacity

### Hover State (Desktop/Web)
- **Background**: Surface (#FFFFFF)
- **Elevation**: 2 (4dp shadow)
- **Scale**: 1.0
- **Overlay**: On Surface with 0.08 opacity
- **Duration**: 200ms ease-in-out

### Loading State
- **Shimmer Effect**: Animated gradient
- **Skeleton**: Title (2 lines), Summary (3 lines), Chips (3 blocks)
- **Animation**: 1.5s infinite linear shimmer

### Error State
- **Border**: 1px Error (#DC2626)
- **Background**: Error Container with 0.05 opacity
- **Icon**: Error icon in top-right corner

### Selected State (Multi-select mode)
- **Background**: Primary Container (#DBEAFE)
- **Border**: 2px Primary (#2563EB)
- **Check Icon**: Top-right corner

## Accessibility

### Touch Targets
- **Minimum**: 48×48dp for all interactive elements
- **Card**: Entire card is tappable
- **More Menu**: 48×48dp touch area
- **Chips**: Individual tap targets when interactive

### Screen Reader Support
- **Card**: "뉴스 카드, [제목], [요약], [감성], [시간], [키워드]"
- **Sentiment**: "긍정적 뉴스" / "부정적 뉴스" / "중립적 뉴스"
- **Time**: "2시간 전 게시됨"
- **More Actions**: "추가 옵션 메뉴"

### Color Contrast
- Title vs Background: 12.6:1 (AAA)
- Summary vs Background: 4.8:1 (AA)
- Time vs Background: 4.8:1 (AA)
- Chip text vs Container: 4.7:1 (AA)

## Responsive Behavior

### Mobile (0-600px)
- Width: Fill container with 16px margins
- Font sizes: As specified
- Touch targets: Minimum 48dp

### Tablet (600-905px)
- Width: Fill container with 24px margins
- Max 2 columns in grid
- Increased touch targets: 52dp

### Desktop (905px+)
- Width: 400px maximum
- 3+ columns in grid
- Hover states active
- Mouse cursor: pointer on interactive elements

## Animation Specifications

### Card Entrance
```css
@keyframes cardEntrance {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
duration: 300ms
easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Press Animation
```css
@keyframes cardPress {
  0% { transform: scale(1); }
  50% { transform: scale(0.98); }
  100% { transform: scale(1); }
}
duration: 150ms
easing: ease-out
```

### Shimmer Loading
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
duration: 1.5s
easing: linear
iteration: infinite
```

## Data Structure

### NewsCard Data Model
```dart
class NewsCardData {
  final String id;
  final String title;
  final String summary;
  final SentimentType sentiment;
  final DateTime publishedAt;
  final List<String> keywords;
  final String? imageUrl;
  final bool isBookmarked;
}

enum SentimentType { positive, negative, neutral }
```

## Usage Guidelines

### Do's
- ✅ Keep title under 2 lines
- ✅ Limit summary to 3 lines
- ✅ Show maximum 3 keyword chips
- ✅ Use appropriate sentiment colors consistently

### Don'ts
- ❌ Don't exceed specified dimensions
- ❌ Don't use different border radius values
- ❌ Don't stack more than 3 keyword chips
- ❌ Don't change sentiment icon meanings

## Implementation Notes

### Flutter Widget Structure
```dart
Card(
  elevation: 1,
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
  child: InkWell(
    borderRadius: BorderRadius.circular(12),
    onTap: onTap,
    child: Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        children: [
          // Header: Icon + Title + Time
          Row(...),
          SizedBox(height: 8),
          // Summary
          Text(...),
          SizedBox(height: 12),
          // Footer: Chips + More Menu
          Row(...),
        ],
      ),
    ),
  ),
)
```

---
*Last updated: 2025-01-21*
*Version: 1.0.0*
*Component Type: Card*
*Platform: Flutter Mobile*