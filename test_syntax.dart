// Test file to verify syntax without Flutter imports
class TestColors {
  TestColors._();
  
  static const int primary = 0xFF2563EB;
  static const int onPrimary = 0xFFFFFFFF;
}

class TestTextStyles {
  TestTextStyles._();
  
  static const String fontFamily = 'Inter';
  
  static const Map<String, Object> titleMedium = {
    'fontFamily': fontFamily,
    'fontSize': 18,
    'height': 1.333,
    'fontWeight': 600,
    'letterSpacing': 0,
  };
}

class TestNewsCardStyles {
  TestNewsCardStyles._();
  
  static Map<String, Object> get title => {
    ...TestTextStyles.titleMedium,
    'color': TestColors.primary,
  };
}