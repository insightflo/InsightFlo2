// Design Tokens for InsightFlo2
// Generated from Material 3 Design System
// Last updated: 2025-09-04

import 'package:flutter/material.dart';

/// Material 3 Color Tokens for InsightFlo2
class AppColors {
  AppColors._(); // Private constructor to prevent instantiation

  // ===========================================================================
  // PRIMARY COLORS
  // ===========================================================================
  
  /// Primary brand color - Blue 600
  /// Usage: Primary buttons, active states, main links
  static const Color primary = Color(0xFF2563EB);
  
  /// Text/icons on primary color surfaces
  static const Color onPrimary = Color(0xFFFFFFFF);
  
  /// Light variant of primary color for containers
  /// Usage: Light backgrounds, selected states
  static const Color primaryContainer = Color(0xFFDBEAFE);
  
  /// Text/icons on primary container surfaces
  static const Color onPrimaryContainer = Color(0xFF1E3A8A);

  // ===========================================================================
  // SECONDARY COLORS  
  // ===========================================================================
  
  /// Secondary color - Slate 500
  /// Usage: Secondary buttons, tabs, chips
  static const Color secondary = Color(0xFF64748B);
  
  /// Text/icons on secondary color surfaces
  static const Color onSecondary = Color(0xFFFFFFFF);
  
  /// Light variant of secondary color for containers
  static const Color secondaryContainer = Color(0xFFF1F5F9);
  
  /// Text/icons on secondary container surfaces
  static const Color onSecondaryContainer = Color(0xFF0F172A);

  // ===========================================================================
  // SURFACE COLORS
  // ===========================================================================
  
  /// Primary surface color - White
  /// Usage: Card backgrounds, main surfaces
  static const Color surface = Color(0xFFFFFFFF);
  
  /// Primary text/icons on surface
  static const Color onSurface = Color(0xFF0F172A);
  
  /// Variant surface color for subtle differentiation
  /// Usage: Dividers, subtle backgrounds
  static const Color surfaceVariant = Color(0xFFF8FAFC);
  
  /// Secondary text/icons on surface variant
  static const Color onSurfaceVariant = Color(0xFF64748B);

  // ===========================================================================
  // ERROR COLORS
  // ===========================================================================
  
  /// Error state color - Red 600
  /// Usage: Error messages, warning icons
  static const Color error = Color(0xFFDC2626);
  
  /// Text/icons on error color surfaces
  static const Color onError = Color(0xFFFFFFFF);
  
  /// Light error color for containers
  static const Color errorContainer = Color(0xFFFEE2E2);
  
  /// Text/icons on error container surfaces
  static const Color onErrorContainer = Color(0xFF7F1D1D);

  // ===========================================================================
  // SEMANTIC COLORS
  // ===========================================================================
  
  /// Success state color - Emerald 600
  /// Usage: Success messages, completion states
  static const Color success = Color(0xFF059669);
  
  /// Success container color
  static const Color successContainer = Color(0xFFECFDF5);
  
  /// Text on success container
  static const Color onSuccessContainer = Color(0xFF064E3B);
  
  /// Warning state color - Amber 600
  /// Usage: Warning messages, attention states
  static const Color warning = Color(0xFFD97706);
  
  /// Warning container color
  static const Color warningContainer = Color(0xFFFEF3C7);
  
  /// Text on warning container
  static const Color onWarningContainer = Color(0xFF92400E);
  
  /// Info state color - Sky 600
  /// Usage: Information messages, guidance states
  static const Color info = Color(0xFF0284C7);
  
  /// Info container color
  static const Color infoContainer = Color(0xFFE0F2FE);
  
  /// Text on info container
  static const Color onInfoContainer = Color(0xFF0C4A6E);

  // ===========================================================================
  // NEWS SENTIMENT COLORS
  // ===========================================================================
  
  /// Positive news sentiment color
  static const Color sentimentPositive = success;
  
  /// Negative news sentiment color
  static const Color sentimentNegative = error;
  
  /// Neutral news sentiment color
  static const Color sentimentNeutral = primary;

  // ===========================================================================
  // OPACITY VALUES
  // ===========================================================================
  
  /// Pressed state opacity
  static const double pressed = 0.12;
  
  /// Hover state opacity
  static const double hover = 0.08;
  
  /// Disabled state opacity
  static const double disabled = 0.38;
  
  /// Divider opacity
  static const double divider = 0.12;
  
  /// Scrim/overlay opacity
  static const double scrim = 0.32;
}

/// Typography Tokens for InsightFlo2
class AppTextStyles {
  AppTextStyles._(); // Private constructor

  /// Font family constant
  static const String fontFamily = 'Inter';

  // ===========================================================================
  // DISPLAY STYLES
  // ===========================================================================
  
  /// Display Large - 64px/72px Bold
  /// Usage: Landing page headlines, hero text
  static const TextStyle displayLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 64,
    height: 1.125, // 72/64
    fontWeight: FontWeight.w700,
    letterSpacing: -1.28, // -0.02em
  );
  
  /// Display Medium - 48px/56px Bold
  /// Usage: Section titles, large headers
  static const TextStyle displayMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 48,
    height: 1.167, // 56/48
    fontWeight: FontWeight.w700,
    letterSpacing: -0.96,
  );
  
  /// Display Small - 36px/44px Bold
  /// Usage: Page titles, modal headers
  static const TextStyle displaySmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 36,
    height: 1.222, // 44/36
    fontWeight: FontWeight.w700,
    letterSpacing: -0.72,
  );

  // ===========================================================================
  // HEADLINE STYLES
  // ===========================================================================
  
  /// Headline Large - 32px/40px SemiBold
  /// Usage: Page headers, main sections
  static const TextStyle headlineLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 32,
    height: 1.25, // 40/32
    fontWeight: FontWeight.w600,
    letterSpacing: -0.64,
  );
  
  /// Headline Medium - 28px/36px SemiBold
  /// Usage: Card headers, dialog titles
  static const TextStyle headlineMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 28,
    height: 1.286, // 36/28
    fontWeight: FontWeight.w600,
    letterSpacing: -0.56,
  );
  
  /// Headline Small - 24px/32px SemiBold
  /// Usage: Section headers, list titles
  static const TextStyle headlineSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 24,
    height: 1.333, // 32/24
    fontWeight: FontWeight.w600,
    letterSpacing: -0.48,
  );

  // ===========================================================================
  // TITLE STYLES
  // ===========================================================================
  
  /// Title Large - 22px/28px Medium
  /// Usage: Dialog titles, prominent labels
  static const TextStyle titleLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 22,
    height: 1.273, // 28/22
    fontWeight: FontWeight.w500,
    letterSpacing: 0,
  );
  
  /// Title Medium - 18px/24px SemiBold
  /// Usage: List headers, card titles, NEWS CARD TITLES
  static const TextStyle titleMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 18,
    height: 1.333, // 24/18
    fontWeight: FontWeight.w600, // SemiBold for better hierarchy
    letterSpacing: 0,
  );
  
  /// Title Small - 16px/20px Medium
  /// Usage: Sub headers, secondary titles
  static const TextStyle titleSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 1.25, // 20/16
    fontWeight: FontWeight.w500,
    letterSpacing: 0,
  );

  // ===========================================================================
  // BODY STYLES
  // ===========================================================================
  
  /// Body Large - 16px/24px Regular
  /// Usage: Primary body text, descriptions
  static const TextStyle bodyLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 1.5, // 24/16
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
  );
  
  /// Body Medium - 14px/20px Regular
  /// Usage: Secondary body text, NEWS CARD SUMMARIES
  static const TextStyle bodyMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.429, // 20/14
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
  );
  
  /// Body Small - 12px/16px Regular
  /// Usage: Captions, hints, metadata
  static const TextStyle bodySmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    height: 1.333, // 16/12
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
  );

  // ===========================================================================
  // LABEL STYLES
  // ===========================================================================
  
  /// Label Large - 14px/20px Medium
  /// Usage: Button text, prominent labels
  static const TextStyle labelLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.429, // 20/14
    fontWeight: FontWeight.w500,
    letterSpacing: 0.28, // 0.02em
  );
  
  /// Label Medium - 12px/16px Medium
  /// Usage: Tabs, chips, KEYWORD CHIPS
  static const TextStyle labelMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    height: 1.333, // 16/12
    fontWeight: FontWeight.w500,
    letterSpacing: 0.24,
  );
  
  /// Label Small - 11px/16px Medium
  /// Usage: Badges, tags, timestamps
  static const TextStyle labelSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 11,
    height: 1.455, // 16/11
    fontWeight: FontWeight.w500,
    letterSpacing: 0.22,
  );
}

/// News Card Text Styles - Use these for NewsCard components
class NewsCardStyles {
  NewsCardStyles._(); // Private constructor
  
  /// News card title style - optimized for 2 lines max
  static TextStyle get title => AppTextStyles.titleMedium.copyWith(
    color: AppColors.onSurface,
  );
  
  /// News card summary style - optimized for 3 lines max
  static TextStyle get summary => AppTextStyles.bodyMedium.copyWith(
    color: AppColors.onSurfaceVariant,
  );
  
  /// News card timestamp style
  static TextStyle get timestamp => AppTextStyles.bodySmall.copyWith(
    color: AppColors.onSurfaceVariant,
  );
  
  /// News card keyword chip style
  static TextStyle get keyword => AppTextStyles.labelMedium.copyWith(
    color: AppColors.primary,
  );
}

/// Spacing Tokens for InsightFlo2
class AppSpacing {
  AppSpacing._(); // Private constructor

  // ===========================================================================
  // SPACING SCALE (4px base unit)
  // ===========================================================================
  
  static const double xs = 4.0;   // Extra small spacing
  static const double sm = 8.0;   // Small spacing
  static const double md = 12.0;  // Medium spacing
  static const double lg = 16.0;  // Large spacing (base)
  static const double xl = 20.0;  // Extra large spacing
  static const double xxl = 24.0; // 2X large spacing
  static const double xxxl = 32.0; // 3X large spacing

  // ===========================================================================
  // SEMANTIC SPACING
  // ===========================================================================
  
  /// Component internal padding
  static const double componentPadding = lg; // 16px
  
  /// Gap between elements
  static const double elementGap = sm; // 8px
  
  /// Gap between sections
  static const double sectionGap = md; // 12px
  
  /// Page margins
  static const double pageMargin = lg; // 16px
  
  /// Card padding
  static const double cardPadding = lg; // 16px
}

/// Border Radius Tokens for InsightFlo2
class AppRadius {
  AppRadius._(); // Private constructor

  static const double none = 0.0;
  static const double sm = 4.0;
  static const double md = 8.0;
  static const double lg = 12.0;  // Card border radius
  static const double xl = 16.0;  // Chip border radius
  static const double xxl = 24.0;
  static const double full = 999.0; // Fully rounded
}

/// Elevation Tokens for InsightFlo2
class AppElevation {
  AppElevation._(); // Private constructor

  static const double none = 0.0;
  static const double sm = 1.0;   // Cards default
  static const double md = 2.0;   // Cards hover
  static const double lg = 4.0;   // Modal, drawer
  static const double xl = 8.0;   // App bar
  static const double xxl = 16.0; // FAB
}

/// Animation Duration Tokens
class AppDuration {
  AppDuration._(); // Private constructor

  static const Duration fast = Duration(milliseconds: 150);   // Press, tap
  static const Duration normal = Duration(milliseconds: 300); // Standard transitions
  static const Duration slow = Duration(milliseconds: 500);   // Page transitions
}

/// Utility class for creating Material Theme from tokens
class AppTheme {
  AppTheme._(); // Private constructor

  /// Generate Material 3 ColorScheme from app colors
  static ColorScheme get colorScheme => const ColorScheme(
    brightness: Brightness.light,
    primary: AppColors.primary,
    onPrimary: AppColors.onPrimary,
    primaryContainer: AppColors.primaryContainer,
    onPrimaryContainer: AppColors.onPrimaryContainer,
    secondary: AppColors.secondary,
    onSecondary: AppColors.onSecondary,
    secondaryContainer: AppColors.secondaryContainer,
    onSecondaryContainer: AppColors.onSecondaryContainer,
    surface: AppColors.surface,
    onSurface: AppColors.onSurface,
    surfaceVariant: AppColors.surfaceVariant,
    onSurfaceVariant: AppColors.onSurfaceVariant,
    error: AppColors.error,
    onError: AppColors.onError,
    errorContainer: AppColors.errorContainer,
    onErrorContainer: AppColors.onErrorContainer,
  );

  /// Generate Material 3 TextTheme from app text styles
  static TextTheme get textTheme => const TextTheme(
    displayLarge: AppTextStyles.displayLarge,
    displayMedium: AppTextStyles.displayMedium,
    displaySmall: AppTextStyles.displaySmall,
    headlineLarge: AppTextStyles.headlineLarge,
    headlineMedium: AppTextStyles.headlineMedium,
    headlineSmall: AppTextStyles.headlineSmall,
    titleLarge: AppTextStyles.titleLarge,
    titleMedium: AppTextStyles.titleMedium,
    titleSmall: AppTextStyles.titleSmall,
    bodyLarge: AppTextStyles.bodyLarge,
    bodyMedium: AppTextStyles.bodyMedium,
    bodySmall: AppTextStyles.bodySmall,
    labelLarge: AppTextStyles.labelLarge,
    labelMedium: AppTextStyles.labelMedium,
    labelSmall: AppTextStyles.labelSmall,
  );
  
  /// Generate complete ThemeData
  static ThemeData get lightTheme => ThemeData(
    colorScheme: colorScheme,
    textTheme: textTheme,
    fontFamily: AppTextStyles.fontFamily,
    useMaterial3: true,
    // Card theme
    cardTheme: CardTheme(
      elevation: AppElevation.sm,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadius.lg),
      ),
    ),
    // ElevatedButton theme
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        elevation: AppElevation.sm,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.lg),
        ),
        textStyle: AppTextStyles.labelLarge,
      ),
    ),
    // Chip theme
    chipTheme: ChipThemeData(
      backgroundColor: AppColors.primaryContainer,
      labelStyle: AppTextStyles.labelMedium,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadius.xl),
      ),
    ),
  );
}