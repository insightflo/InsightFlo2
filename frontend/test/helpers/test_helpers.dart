import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

class TestHelpers {
  static Widget wrapWithProviders(Widget widget) {
    return ProviderScope(child: MaterialApp(home: widget));
  }

  static Future<void> pumpAndSettle(WidgetTester tester, Widget widget) async {
    await tester.pumpWidget(wrapWithProviders(widget));
    await tester.pumpAndSettle();
  }
}

// Mock 클래스들 - mockito 패키지가 설치되면 사용
// class MockApiClient extends Mock implements ApiClient {}
// class MockAuthRepository extends Mock implements AuthRepository {}
