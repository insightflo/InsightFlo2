// This is a basic Flutter widget test for InsightFlo app.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:insightflo_app/presentation/pages/splash/splash_page.dart';
import 'package:insightflo_app/presentation/pages/auth/login_page.dart';
import 'package:insightflo_app/presentation/pages/home/home_page.dart';

void main() {
  group('InsightFlo Widget Tests', () {
    testWidgets('SplashPage shows correct elements', (WidgetTester tester) async {
      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: SplashPage(),
          ),
        ),
      );

      // Verify that the splash screen elements are present
      expect(find.text('InsightFlo'), findsOneWidget);
      expect(find.byIcon(Icons.insights), findsOneWidget);
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });

    testWidgets('LoginPage shows correct elements', (WidgetTester tester) async {
      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: LoginPage(),
          ),
        ),
      );

      await tester.pump();

      // Verify login page elements
      expect(find.text('로그인'), findsAtLeastNWidgets(1));
      expect(find.text('이메일'), findsOneWidget);
      expect(find.text('비밀번호'), findsOneWidget);
      expect(find.byType(TextFormField), findsNWidgets(2));
    });

    testWidgets('HomePage shows correct elements', (WidgetTester tester) async {
      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: HomePage(),
          ),
        ),
      );

      await tester.pump();

      // Verify home page elements
      expect(find.text('InsightFlo'), findsOneWidget);
      expect(find.byType(BottomNavigationBar), findsOneWidget);
      expect(find.text('대시보드'), findsAtLeastNWidgets(1));
    });
  });
}
