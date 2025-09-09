import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:insightflo_design_tokens/design_tokens.dart';

import 'core/constants/app_constants.dart';
import 'presentation/routes/app_router.dart';

class InsightFloApp extends ConsumerWidget {
  const InsightFloApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(goRouterProvider);
    
    return ScreenUtilInit(
      designSize: const Size(375, 812), // iPhone X design size
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return MaterialApp.router(
          title: AppConstants.appName,
          debugShowCheckedModeBanner: false,
          routerConfig: router,
          theme: AppTheme.lightTheme, // 디자인 토큰에서 정의된 테마 사용
        );
      },
    );
  }
}