# Icon System for InsightFlo2

## Overview
InsightFlo2의 아이콘 시스템은 Material Design Icons를 기반으로 하며, 일관성과 사용성을 중심으로 설계되었습니다.
모든 아이콘은 Outlined 스타일을 기본으로 사용하여 깔끔하고 현대적인 외관을 제공합니다.

## Icon Style Guidelines

### Primary Style: Material Icons Outlined
- **Library**: Material Design Icons (Outlined)
- **Fallback**: Material Design Icons (Filled)
- **Format**: Vector (SVG/Icon Font)
- **Licensing**: Apache License 2.0

### Size System
| Size | Dimension | Usage |
|------|-----------|--------|
| **Small** | 20×20px | Inline icons, chips, badges |
| **Standard** | 24×24px | Default UI elements, buttons, tabs |
| **Large** | 28×28px | Prominent actions, headers |
| **Extra Large** | 32×32px | App icons, feature illustrations |

### Color Usage
- **Primary**: On Surface (#0F172A) - Default icon color
- **Secondary**: On Surface Variant (#64748B) - Less important icons
- **Interactive**: Primary (#2563EB) - Active/selected states
- **Semantic**: Success, Warning, Error colors for status icons

## Icon Categories

### 1. Navigation Icons
앱의 주요 네비게이션에 사용되는 아이콘들

| Icon | Material Name | Usage | Size |
|------|---------------|-------|------|
| 🏠 | `home_outlined` | Home tab, main screen | 24px |
| 🔍 | `search_outlined` | Search tab, search functionality | 24px |
| 📱 | `article_outlined` | News feed, articles | 24px |
| 🔖 | `bookmark_outline` | Bookmarks tab, saved articles | 24px |
| ⚙️ | `settings_outlined` | Settings tab, preferences | 24px |
| 👤 | `person_outline` | Profile tab, user account | 24px |

### 2. Action Icons
사용자 인터랙션과 액션에 사용되는 아이콘들

| Icon | Material Name | Usage | Size |
|------|---------------|-------|------|
| ↗️ | `share_outlined` | Share article, social sharing | 24px |
| ⋮ | `more_vert_outlined` | More options menu | 24px |
| 🔧 | `filter_list_outlined` | Filter options, sorting | 24px |
| 🔔 | `notifications_outlined` | Notifications, alerts | 24px |
| ← | `arrow_back_ios_outlined` | Back navigation | 24px |
| → | `arrow_forward_ios_outlined` | Forward navigation | 24px |
| ↻ | `refresh_outlined` | Refresh content, reload | 24px |
| + | `add_outlined` | Add item, create new | 24px |
| × | `close_outlined` | Close dialog, dismiss | 24px |
| ✓ | `done_outlined` | Complete action, confirm | 24px |

### 3. Content Icons
콘텐츠와 관련된 기능 아이콘들

| Icon | Material Name | Usage | Size |
|------|---------------|-------|------|
| 📖 | `menu_book_outlined` | Read article, open content | 20px |
| 💬 | `comment_outlined` | Comments, discussions | 20px |
| 👍 | `thumb_up_outlined` | Like, upvote | 20px |
| 👎 | `thumb_down_outlined` | Dislike, downvote | 20px |
| 🔗 | `link_outlined` | External link, URL | 20px |
| 📎 | `attach_file_outlined` | Attachment, file | 20px |
| 🎯 | `flag_outlined` | Important, featured | 20px |
| 🏷️ | `label_outlined` | Tag, category | 20px |

### 4. Status Icons
상태와 피드백을 나타내는 아이콘들

| Icon | Material Name | Usage | Size | Color |
|------|---------------|-------|------|-------|
| ✅ | `check_circle_outline` | Success, completed | 24px | Success (#059669) |
| ❌ | `error_outline` | Error, failed | 24px | Error (#DC2626) |
| ⚠️ | `warning_amber_outlined` | Warning, caution | 24px | Warning (#D97706) |
| ℹ️ | `info_outline` | Information, help | 24px | Info (#0284C7) |
| ⏳ | `schedule_outlined` | Pending, in progress | 24px | On Surface Variant |
| 🌐 | `public_outlined` | Online, connected | 20px | Success |
| 📶 | `signal_wifi_off_outlined` | Offline, disconnected | 20px | Error |

### 5. News Sentiment Icons
뉴스 감성 분석 결과 표시용 특별 아이콘들

| Icon | Material Name | Meaning | Size | Color |
|------|---------------|---------|------|-------|
| 📈 | `trending_up` | Positive sentiment | 20px | Success (#059669) |
| 📉 | `trending_down` | Negative sentiment | 20px | Error (#DC2626) |
| ⚡ | `flash_on_outlined` | Neutral sentiment | 20px | Primary (#2563EB) |

#### Alternative Sentiment Icons
| Icon | Material Name | Meaning | Usage |
|------|---------------|---------|--------|
| ↗️ | `keyboard_arrow_up` | Positive | Minimal style preference |
| ↘️ | `keyboard_arrow_down` | Negative | Minimal style preference |
| — | `horizontal_rule` | Neutral | Minimal style preference |

### 6. Media Icons
미디어 콘텐츠 관련 아이콘들

| Icon | Material Name | Usage | Size |
|------|---------------|-------|------|
| 🎬 | `play_circle_outline` | Video content, play media | 24px |
| ⏸️ | `pause_circle_outline` | Pause media | 24px |
| 🖼️ | `image_outlined` | Image content, photo | 20px |
| 🎵 | `audiotrack_outlined` | Audio content, podcast | 20px |
| 📺 | `tv_outlined` | Video news, broadcast | 20px |
| 📻 | `radio_outlined` | Live content, streaming | 20px |

## Usage Guidelines

### Sizing Rules
- **Touch Targets**: Minimum 48×48dp for interactive icons
- **Visual Size**: Icon itself can be smaller within touch target
- **Consistency**: Use same size for icons in the same context
- **Spacing**: Maintain 8dp minimum space around icons

### Color Guidelines
- **Default State**: On Surface (#0F172A)
- **Inactive State**: On Surface Variant (#64748B)
- **Active State**: Primary (#2563EB)
- **Disabled State**: On Surface with 38% opacity
- **Error State**: Error (#DC2626)

### Accessibility
- **Alt Text**: Provide meaningful descriptions
- **Color Independence**: Don't rely solely on color to convey meaning
- **Size**: Ensure icons are large enough to be recognizable
- **Context**: Use consistent icons for the same actions

## Implementation

### Flutter Integration
```dart
// Using Material Icons
Icon(
  Icons.home_outlined,
  size: 24,
  color: AppColors.onSurface,
)

// Custom icon widget
class AppIcon extends StatelessWidget {
  final IconData icon;
  final double? size;
  final Color? color;
  
  const AppIcon(
    this.icon, {
    this.size = 24,
    this.color,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Icon(
      icon,
      size: size,
      color: color ?? Theme.of(context).colorScheme.onSurface,
    );
  }
}
```

### Icon Button Implementation
```dart
IconButton(
  onPressed: onPressed,
  icon: AppIcon(Icons.more_vert_outlined),
  tooltip: 'More options',
  constraints: BoxConstraints.tightFor(width: 48, height: 48),
)
```

## Icon Mapping Reference

### Common Actions
```dart
class AppIcons {
  // Navigation
  static const IconData home = Icons.home_outlined;
  static const IconData search = Icons.search_outlined;
  static const IconData bookmarks = Icons.bookmark_outline;
  static const IconData settings = Icons.settings_outlined;
  static const IconData profile = Icons.person_outline;
  
  // Actions
  static const IconData share = Icons.share_outlined;
  static const IconData more = Icons.more_vert_outlined;
  static const IconData filter = Icons.filter_list_outlined;
  static const IconData back = Icons.arrow_back_ios_outlined;
  static const IconData close = Icons.close_outlined;
  
  // Status
  static const IconData success = Icons.check_circle_outline;
  static const IconData error = Icons.error_outline;
  static const IconData warning = Icons.warning_amber_outlined;
  static const IconData info = Icons.info_outline;
  
  // News Sentiment
  static const IconData sentimentPositive = Icons.trending_up;
  static const IconData sentimentNegative = Icons.trending_down;
  static const IconData sentimentNeutral = Icons.flash_on_outlined;
}
```

## Responsive Icon Behavior

### Mobile (0-600px)
- Standard size: 24px
- Touch target: 48×48dp minimum
- Spacing: 16dp between icons

### Tablet (600-905px)
- Standard size: 24px
- Touch target: 52×52dp (slightly larger)
- Spacing: 20dp between icons

### Desktop (905px+)
- Standard size: 24px
- Hover states: Show background on hover
- Cursor: Pointer for interactive icons

## Custom Icon Guidelines

### When to Create Custom Icons
- Brand-specific functionality not covered by Material Icons
- Complex concepts requiring specific representation
- Icons that need to match exact brand guidelines

### Custom Icon Standards
- **Style**: Match Material Design Outlined aesthetic
- **Grid**: Design on 24×24dp grid system
- **Stroke**: 2dp stroke weight
- **Corners**: 2dp radius for rounded corners
- **Format**: SVG for scalability

### Custom Icon Process
1. Design on Material Design icon grid
2. Export as SVG with proper viewBox
3. Test at different sizes (20px, 24px, 28px)
4. Ensure accessibility compliance
5. Add to design system documentation

## Do's and Don'ts

### Do's
- ✅ Use outlined style consistently
- ✅ Maintain proper touch targets (48dp minimum)
- ✅ Use semantic colors appropriately
- ✅ Provide alternative text for screen readers
- ✅ Test icons at different sizes

### Don'ts
- ❌ Mix outlined and filled icon styles
- ❌ Use icons smaller than 20px for UI elements
- ❌ Rely only on color to convey meaning
- ❌ Use decorative icons for functional elements
- ❌ Create custom icons without following guidelines

---
*Last updated: 2025-01-21*
*Version: 1.0.0*
*Icon Library: Material Design Icons*
*Style: Outlined*