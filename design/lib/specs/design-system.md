# InsightFlo Design System

**Version**: 1.0  
**Designer**: UI/UX Designer  
**Created**: 2025-01-21  
**Target**: 개인 투자자를 위한 뉴스 앱

---

## 🎨 Design Principles

### Core Values
- **신뢰성**: 금융 정보의 정확성을 시각적으로 표현
- **명확성**: 복잡한 정보를 직관적으로 전달
- **접근성**: 모든 사용자가 쉽게 사용할 수 있는 인터페이스
- **효율성**: 빠른 정보 습득과 의사결정 지원

---

## 🌈 Color System (Material 3 기반)

### Primary Colors
```
Primary: #1565C0 (Deep Blue)
- Light: #42A5F5
- Dark: #0D47A1
- Container: #E3F2FD

Secondary: #37474F (Blue Grey)
- Light: #62727B
- Dark: #102027
- Container: #ECEFF1
```

### Semantic Colors
```
Success (긍정): #2E7D32 (Green)
- Light: #66BB6A
- Dark: #1B5E20
- Container: #E8F5E8

Error (부정): #D32F2F (Red)  
- Light: #EF5350
- Dark: #B71C1C
- Container: #FFEBEE

Warning (주의): #F57C00 (Orange)
- Light: #FFB74D
- Dark: #E65100
- Container: #FFF3E0

Neutral (중립): #616161 (Grey)
- Light: #9E9E9E
- Dark: #424242
- Container: #F5F5F5
```

### Surface Colors
```
Background: #FFFFFF (Light), #121212 (Dark)
Surface: #FFFFFF (Light), #1E1E1E (Dark)
Surface Variant: #F5F5F5 (Light), #2D2D2D (Dark)
Outline: #E0E0E0 (Light), #3D3D3D (Dark)
```

### Text Colors
```
Primary Text: #212121 (Light), #FFFFFF (Dark)
Secondary Text: #757575 (Light), #CCCCCC (Dark)
Disabled Text: #BDBDBD (Light), #666666 (Dark)
```

---

## 📝 Typography

### Font Family
- **Display**: Noto Sans KR (한글), Roboto (영문)
- **Body**: Noto Sans KR (한글), Roboto (영문)  
- **Monospace**: Roboto Mono (숫자, 데이터)

### Type Scale
```
Display Large: 57sp / 64sp line height / Bold
Display Medium: 45sp / 52sp line height / Bold
Display Small: 36sp / 44sp line height / Bold

Headline Large: 32sp / 40sp line height / SemiBold
Headline Medium: 28sp / 36sp line height / SemiBold
Headline Small: 24sp / 32sp line height / SemiBold

Title Large: 22sp / 28sp line height / Medium
Title Medium: 16sp / 24sp line height / Medium
Title Small: 14sp / 20sp line height / Medium

Body Large: 16sp / 24sp line height / Regular
Body Medium: 14sp / 20sp line height / Regular
Body Small: 12sp / 16sp line height / Regular

Label Large: 14sp / 20sp line height / Medium
Label Medium: 12sp / 16sp line height / Medium
Label Small: 11sp / 16sp line height / Medium
```

---

## 📐 Spacing & Layout

### Spacing Scale
```
XS: 4dp
S: 8dp
M: 16dp
L: 24dp
XL: 32dp
XXL: 48dp
XXXL: 64dp
```

### Grid System
```
Columns: 4 (Mobile), 8 (Tablet), 12 (Desktop)
Margins: 16dp (Mobile), 24dp (Tablet)
Gutters: 16dp
```

### Component Sizes
```
Touch Target: 48x48dp (최소)
Button Height: 40dp (Small), 48dp (Medium), 56dp (Large)
Input Height: 56dp
Card Padding: 16dp
```

---

## 🔄 State System

### Interactive States
```
Default: Base color with 100% opacity
Hover: Base color with 8% surface overlay
Focus: Base color with 12% surface overlay
Pressed: Base color with 12% surface overlay
Dragged: Base color with 16% surface overlay
Disabled: 38% opacity
```

### Content States
```
Loading: Skeleton animation with 300ms pulse
Empty: Illustration + descriptive text
Error: Error icon + error message + retry action
Success: Success icon + confirmation message
```

---

## 🎭 Components Library

### Buttons
```
Primary Button:
- Background: Primary color
- Text: On-primary color
- Radius: 20dp
- Padding: 16dp horizontal, 12dp vertical

Secondary Button:
- Background: Transparent
- Border: 1dp primary color
- Text: Primary color
- Radius: 20dp

Text Button:
- Background: Transparent
- Text: Primary color
- Padding: 12dp horizontal, 8dp vertical
```

### Input Fields
```
Filled Input:
- Background: Surface variant
- Border radius: 4dp (top), 0dp (bottom)
- Focus: 2dp primary underline
- Error: 2dp error color underline
- Helper text: Body small, secondary text

Outlined Input:
- Border: 1dp outline color
- Border radius: 4dp
- Focus: 2dp primary border
- Error: 2dp error color border
```

### Cards
```
News Card:
- Background: Surface
- Elevation: 1dp
- Radius: 12dp
- Padding: 16dp
- Shadow: 0 1px 3px rgba(0,0,0,0.12)

Compact Card:
- Background: Surface
- Radius: 8dp
- Padding: 12dp
- Elevation: 0dp (flat design)
```

### Navigation
```
Bottom Navigation:
- Height: 80dp
- Background: Surface
- Icons: 24dp
- Labels: Label medium
- Indicator: Primary container

Top App Bar:
- Height: 64dp
- Background: Primary
- Title: Title large
- Icons: 24dp, on-primary color
```

---

## 🎨 Icon System

### Icon Categories
```
Navigation: home, search, bookmark, profile, settings
Actions: add, edit, delete, share, filter, sort
Content: news, trend-up, trend-down, neutral, time
Status: success, warning, error, info, loading
```

### Icon Specifications
```
Size: 24dp (default), 20dp (small), 32dp (large)
Style: Material Symbols (Outlined)
Weight: 400 (Regular)
Stroke: 1.5dp
```

---

## 📱 Screen Layouts

### News Feed Layout
```
Structure:
- Top App Bar (64dp)
- Search Bar (56dp + 8dp margin)
- Filter Chips (32dp + 16dp margin)
- News List (Infinite scroll)
- Bottom Navigation (80dp)

News Card Content:
- Sentiment indicator (8dp circle)
- Title (Title medium, 2 lines max)
- Summary (Body medium, 3 lines max)
- Keywords (Chips, max 3 visible)
- Metadata (Time, source)
- Actions (Bookmark, share)
```

### News Detail Layout
```
Structure:
- Top App Bar with back navigation
- Hero image (16:9 ratio)
- Article content
- Related news section
- Floating action button (Bookmark)

Content spacing:
- Margin: 16dp
- Paragraph spacing: 16dp
- Line height: 1.5x font size
```

---

## ♿ Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Color Contrast
```
Normal text: 4.5:1 minimum
Large text (18sp+): 3:1 minimum
UI components: 3:1 minimum
Focus indicators: 3:1 minimum
```

#### Touch Targets
```
Minimum size: 48x48dp
Spacing between targets: 8dp minimum
Button padding: 12dp minimum
```

#### Text Accessibility
```
Minimum font size: 14sp
Maximum line length: 70 characters
Line spacing: 1.5x font size minimum
```

#### Screen Reader Support
```
Content descriptions for all interactive elements
Semantic headings (H1, H2, H3)
Focus management for navigation
Live regions for dynamic content
```

---

## 🎬 Motion & Animation

### Animation Principles
```
Duration: 200-300ms (micro), 300-500ms (macro)
Easing: Cubic bezier (0.4, 0.0, 0.2, 1)
Enter: Fade in + slide up (100dp)
Exit: Fade out + slide down (50dp)
Emphasis: Scale (1.0 → 1.05 → 1.0)
```

### Transition Types
```
Page transitions: Slide horizontal (300ms)
Modal transitions: Fade + scale (250ms)
List item: Fade + slide (200ms)
Button press: Scale down (100ms)
Loading: Rotate 360° (1000ms, linear)
```

---

## 🌙 Dark Theme

### Color Adjustments
```
Background: #121212
Surface: #1E1E1E
Primary: #BB86FC (Purple)
Secondary: #03DAC6 (Teal)
On-surface: #FFFFFF
```

### Elevation System
```
Level 0: #121212 (Background)
Level 1: #1E1E1E (Surface)
Level 2: #232323
Level 3: #252525
Level 4: #272727
Level 6: #2C2C2C
```

---

## 📊 Design Tokens (JSON Format)

### Color Tokens
```json
{
  "color": {
    "primary": {
      "main": "#1565C0",
      "light": "#42A5F5",
      "dark": "#0D47A1",
      "container": "#E3F2FD"
    },
    "semantic": {
      "success": "#2E7D32",
      "error": "#D32F2F",
      "warning": "#F57C00",
      "neutral": "#616161"
    },
    "surface": {
      "background": "#FFFFFF",
      "surface": "#FFFFFF",
      "variant": "#F5F5F5",
      "outline": "#E0E0E0"
    }
  }
}
```

### Typography Tokens
```json
{
  "typography": {
    "fontFamily": {
      "display": "Noto Sans KR",
      "body": "Noto Sans KR",
      "monospace": "Roboto Mono"
    },
    "fontSize": {
      "display-large": "57sp",
      "headline-large": "32sp",
      "title-large": "22sp",
      "body-large": "16sp",
      "body-medium": "14sp",
      "label-medium": "12sp"
    }
  }
}
```

### Spacing Tokens
```json
{
  "spacing": {
    "xs": "4dp",
    "s": "8dp",
    "m": "16dp",
    "l": "24dp",
    "xl": "32dp",
    "xxl": "48dp"
  }
}
```

---

## 📋 Usage Guidelines

### Do's
- Use consistent spacing from the scale
- Follow color contrast guidelines
- Implement proper touch targets
- Use semantic colors for meaning
- Provide loading and error states
- Support both light and dark themes

### Don'ts
- Don't use colors outside the palette
- Don't create custom spacing values
- Don't use text smaller than 14sp
- Don't rely solely on color for meaning
- Don't create touch targets smaller than 48dp
- Don't use more than 3 levels of hierarchy

---

**Design System Version**: 1.0  
**Last Updated**: 2025-01-21  
**UI/UX Designer**: InsightFlo Design Team