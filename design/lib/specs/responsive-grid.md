# Responsive Grid System for InsightFlo2

## Overview
InsightFlo2의 반응형 그리드 시스템은 Material Design 3 가이드라인을 기반으로 설계되었습니다.
다양한 화면 크기에서 일관된 사용자 경험을 제공하며, 콘텐츠의 가독성과 접근성을 최우선으로 합니다.

## Breakpoint System

### Device Categories & Breakpoints
| Device | Width Range | Columns | Margins | Gutters |
|--------|-------------|---------|---------|---------|
| **Mobile** | 0-600px | 1 | 16px | - |
| **Tablet** | 600-905px | 2 | 24px | 16px |
| **Desktop** | 905-1240px | 3 | 32px | 20px |
| **Large Desktop** | 1240px+ | 4+ | 40px | 24px |

### Responsive Breakpoints (Flutter)
```dart
class AppBreakpoints {
  static const double mobile = 600;
  static const double tablet = 905;
  static const double desktop = 1240;
  static const double largeDesktop = 1440;
}
```

## Layout Specifications

### Mobile Layout (0-600px)
```
┌─────────────────────────────────────┐
│ [16px margin]                       │
│   ┌─────────────────────────────┐   │
│   │        News Card            │   │
│   │       (Single Column)       │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │        News Card            │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │        News Card            │   │
│   └─────────────────────────────┘   │
│ [16px margin]                       │
└─────────────────────────────────────┘
```

**Specifications**:
- **Columns**: 1
- **Card Width**: Screen width - 32px (16px margins)
- **Minimum Width**: 280px
- **Maximum Width**: 568px (600px - 32px)
- **Vertical Spacing**: 16px between cards
- **Side Margins**: 16px left/right

### Tablet Layout (600-905px)
```
┌───────────────────────────────────────────────────┐
│ [24px margin]                                     │
│   ┌──────────────┐   ┌──────────────┐            │
│   │  News Card   │   │  News Card   │  [16px gap] │
│   │   Column 1   │   │   Column 2   │            │
│   └──────────────┘   └──────────────┘            │
│   ┌──────────────┐   ┌──────────────┐            │
│   │  News Card   │   │  News Card   │            │
│   └──────────────┘   └──────────────┘            │
│ [24px margin]                                     │
└───────────────────────────────────────────────────┘
```

**Specifications**:
- **Columns**: 2
- **Card Width**: (Screen width - 64px) / 2 (24px margins + 16px gutter)
- **Minimum Width**: 280px per card
- **Maximum Width**: 400px per card
- **Horizontal Spacing**: 16px between columns
- **Vertical Spacing**: 16px between rows
- **Side Margins**: 24px left/right

### Desktop Layout (905-1240px)
```
┌─────────────────────────────────────────────────────────────────┐
│ [32px margin]                                                   │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  [20px gaps]       │
│   │News Card │  │News Card │  │News Card │                     │
│   │Column 1  │  │Column 2  │  │Column 3  │                     │
│   └──────────┘  └──────────┘  └──────────┘                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│   │News Card │  │News Card │  │News Card │                     │
│   └──────────┘  └──────────┘  └──────────┘                     │
│ [32px margin]                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications**:
- **Columns**: 3
- **Card Width**: (Screen width - 104px) / 3 (32px margins + 40px gutters)
- **Minimum Width**: 280px per card
- **Maximum Width**: 400px per card
- **Horizontal Spacing**: 20px between columns
- **Vertical Spacing**: 20px between rows
- **Side Margins**: 32px left/right

### Large Desktop Layout (1240px+)
```
┌───────────────────────────────────────────────────────────────────────┐
│ [40px margin]                                                         │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  [24px gaps]      │
│   │News Card│ │News Card│ │News Card│ │News Card│                    │
│   │Column 1 │ │Column 2 │ │Column 3 │ │Column 4 │                    │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘                    │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                    │
│   │News Card│ │News Card│ │News Card│ │News Card│                    │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘                    │
│ [40px margin]                                                         │
└───────────────────────────────────────────────────────────────────────┘
```

**Specifications**:
- **Columns**: 4+
- **Card Width**: Maximum 400px per card
- **Horizontal Spacing**: 24px between columns
- **Vertical Spacing**: 24px between rows
- **Side Margins**: 40px left/right
- **Dynamic Columns**: Add more columns if screen width allows

## Card Sizing Rules

### News Card Dimensions
| Screen Size | Card Width | Card Height | Aspect Ratio |
|-------------|------------|-------------|--------------|
| Mobile | 280-568px | 140px | 2:1 - 4:1 |
| Tablet | 280-400px | 140px | 2:1 - 2.86:1 |
| Desktop | 280-400px | 140px | 2:1 - 2.86:1 |

### Responsive Scaling
- **Fixed Height**: 140px for all screen sizes (consistent visual rhythm)
- **Variable Width**: Adapts to available space within constraints
- **Minimum Width**: 280px (ensures readability)
- **Maximum Width**: 400px (prevents cards from becoming too wide)

## Flutter Implementation

### Responsive Grid Widget
```dart
class ResponsiveNewsGrid extends StatelessWidget {
  final List<NewsCardData> newsItems;
  
  const ResponsiveNewsGrid({
    required this.newsItems,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final screenWidth = constraints.maxWidth;
        final gridConfig = _getGridConfiguration(screenWidth);
        
        return Padding(
          padding: EdgeInsets.symmetric(horizontal: gridConfig.margin),
          child: GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: gridConfig.columns,
              mainAxisSpacing: gridConfig.verticalSpacing,
              crossAxisSpacing: gridConfig.horizontalSpacing,
              childAspectRatio: gridConfig.aspectRatio,
            ),
            itemCount: newsItems.length,
            itemBuilder: (context, index) {
              return NewsCard(data: newsItems[index]);
            },
          ),
        );
      },
    );
  }
  
  GridConfiguration _getGridConfiguration(double screenWidth) {
    if (screenWidth < AppBreakpoints.mobile) {
      // Mobile
      return GridConfiguration(
        columns: 1,
        margin: 16.0,
        horizontalSpacing: 0.0,
        verticalSpacing: 16.0,
        aspectRatio: (screenWidth - 32) / 140, // Dynamic aspect ratio
      );
    } else if (screenWidth < AppBreakpoints.tablet) {
      // Tablet
      final cardWidth = (screenWidth - 64) / 2; // 24px margins + 16px gutter
      return GridConfiguration(
        columns: 2,
        margin: 24.0,
        horizontalSpacing: 16.0,
        verticalSpacing: 16.0,
        aspectRatio: cardWidth / 140,
      );
    } else if (screenWidth < AppBreakpoints.desktop) {
      // Desktop
      final cardWidth = (screenWidth - 104) / 3; // 32px margins + 40px gutters
      return GridConfiguration(
        columns: 3,
        margin: 32.0,
        horizontalSpacing: 20.0,
        verticalSpacing: 20.0,
        aspectRatio: cardWidth / 140,
      );
    } else {
      // Large Desktop
      final maxColumns = ((screenWidth - 80) / 424).floor(); // 400px + 24px gap
      final actualColumns = maxColumns.clamp(3, 6); // Maximum 6 columns
      final cardWidth = (screenWidth - 80 - (actualColumns - 1) * 24) / actualColumns;
      
      return GridConfiguration(
        columns: actualColumns,
        margin: 40.0,
        horizontalSpacing: 24.0,
        verticalSpacing: 24.0,
        aspectRatio: cardWidth / 140,
      );
    }
  }
}

class GridConfiguration {
  final int columns;
  final double margin;
  final double horizontalSpacing;
  final double verticalSpacing;
  final double aspectRatio;
  
  GridConfiguration({
    required this.columns,
    required this.margin,
    required this.horizontalSpacing,
    required this.verticalSpacing,
    required this.aspectRatio,
  });
}
```

### Responsive Layout Utilities
```dart
class ResponsiveUtils {
  static bool isMobile(BuildContext context) {
    return MediaQuery.of(context).size.width < AppBreakpoints.mobile;
  }
  
  static bool isTablet(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return width >= AppBreakpoints.mobile && width < AppBreakpoints.tablet;
  }
  
  static bool isDesktop(BuildContext context) {
    return MediaQuery.of(context).size.width >= AppBreakpoints.tablet;
  }
  
  static int getOptimalColumns(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    
    if (screenWidth < AppBreakpoints.mobile) return 1;
    if (screenWidth < AppBreakpoints.tablet) return 2;
    if (screenWidth < AppBreakpoints.desktop) return 3;
    
    // Calculate dynamic columns for large screens
    return ((screenWidth - 80) / 424).floor().clamp(3, 6);
  }
  
  static EdgeInsets getResponsiveMargin(BuildContext context) {
    if (isMobile(context)) return EdgeInsets.all(16);
    if (isTablet(context)) return EdgeInsets.all(24);
    return EdgeInsets.all(32);
  }
}
```

## Accessibility Considerations

### Focus Management
- **Keyboard Navigation**: Cards should be focusable in reading order
- **Screen Reader**: Proper semantic ordering maintained
- **Touch Targets**: Minimum 48dp for interactive elements

### Content Scaling
- **Text Scaling**: Support system font size preferences
- **Layout Adaptation**: Maintain readability at different scales
- **Responsive Images**: Scale appropriately with container

### Contrast & Readability
- **Color Contrast**: Maintained across all screen sizes
- **Text Size**: Never smaller than minimum readable sizes
- **Spacing**: Adequate white space for cognitive comfort

## Performance Optimizations

### Lazy Loading
```dart
// For large lists, implement lazy loading
ListView.builder(
  itemCount: newsItems.length,
  itemBuilder: (context, index) {
    // Only build visible items
    return NewsCard(data: newsItems[index]);
  },
)
```

### Memory Management
- **Image Caching**: Efficient image loading for thumbnails
- **Widget Recycling**: Reuse widgets in scrollable lists
- **Conditional Rendering**: Load content based on viewport

## Testing Guidelines

### Responsive Testing Checklist
- [ ] Test on actual devices (phone, tablet, desktop)
- [ ] Test orientation changes (portrait/landscape)
- [ ] Test different screen densities
- [ ] Test with system font scaling enabled
- [ ] Test keyboard navigation flow
- [ ] Test screen reader announcements

### Breakpoint Testing
- [ ] Test at exact breakpoint values (600px, 905px, 1240px)
- [ ] Test slightly below and above breakpoints
- [ ] Test edge cases (very narrow or very wide screens)
- [ ] Test with DevTools device emulation

## Design Tokens for Grid

```dart
class GridTokens {
  // Breakpoints
  static const double mobileBreakpoint = 600;
  static const double tabletBreakpoint = 905;
  static const double desktopBreakpoint = 1240;
  
  // Margins
  static const double mobilemargin = 16;
  static const double tabletMargin = 24;
  static const double desktopMargin = 32;
  static const double largeDesktopMargin = 40;
  
  // Gutters
  static const double mobileGutter = 0;
  static const double tabletGutter = 16;
  static const double desktopGutter = 20;
  static const double largeDesktopGutter = 24;
  
  // Card constraints
  static const double minCardWidth = 280;
  static const double maxCardWidth = 400;
  static const double cardHeight = 140;
  static const int maxColumns = 6;
}
```

## Usage Guidelines

### Do's
- ✅ Maintain consistent card heights across breakpoints
- ✅ Use appropriate margins for each screen size
- ✅ Test on actual devices, not just browser resizing
- ✅ Consider touch targets for mobile interactions

### Don'ts
- ❌ Don't exceed maximum card width of 400px
- ❌ Don't use fixed pixel layouts for responsive design
- ❌ Don't ignore accessibility requirements
- ❌ Don't forget to test orientation changes

### Best Practices
- **Progressive Enhancement**: Start with mobile, enhance for larger screens
- **Content First**: Ensure content is readable at all sizes
- **Performance**: Optimize for the constraints of each device type
- **Flexibility**: Allow for future screen sizes and form factors

---
*Last updated: 2025-01-21*
*Version: 1.0.0*
*Framework: Flutter*
*Design System: Material 3*