import 'package:flutter/material.dart';
import 'package:insightflo_design_tokens/design_tokens.dart';

/// 간단한 컴포넌트 쇼케이스 - Storybook 대안
/// 필요한 컴포넌트들의 다양한 상태를 한눈에 확인 가능
class ComponentShowcasePage extends StatelessWidget {
  const ComponentShowcasePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('컴포넌트 쇼케이스', style: AppTextStyles.headlineMedium),
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.onPrimary,
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          _buildSection('버튼 컴포넌트', _buildButtons()),
          _buildSection('입력 필드 컴포넌트', _buildTextFields()),
          _buildSection('카드 컴포넌트', _buildCards()),
          _buildSection('칩 컴포넌트', _buildChips()),
        ],
      ),
    );
  }

  Widget _buildSection(String title, Widget content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: AppSpacing.lg),
          child: Text(title, style: AppTextStyles.titleLarge),
        ),
        content,
        const SizedBox(height: AppSpacing.xxxl),
      ],
    );
  }

  Widget _buildButtons() {
    return Column(
      children: [
        // Primary Buttons
        Row(
          children: [
            Expanded(child: ElevatedButton(onPressed: () {}, child: const Text('기본'))),
            const SizedBox(width: AppSpacing.md),
            Expanded(child: ElevatedButton(onPressed: null, child: const Text('비활성'))),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        // 로딩 상태는 실제 구현에서 추가
      ],
    );
  }

  Widget _buildTextFields() {
    return Column(
      children: [
        TextField(
          decoration: InputDecoration(
            labelText: '일반 상태',
            hintText: '텍스트를 입력하세요',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(AppRadius.md)),
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        TextField(
          decoration: InputDecoration(
            labelText: '에러 상태',
            hintText: '잘못된 입력',
            errorText: '올바르지 않은 형식입니다',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(AppRadius.md)),
          ),
        ),
      ],
    );
  }

  Widget _buildCards() {
    return Card(
      elevation: AppElevation.sm,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadius.lg)),
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('뉴스 카드 예시', style: NewsCardStyles.title),
            const SizedBox(height: AppSpacing.sm),
            Text('카드 내용 텍스트...', style: NewsCardStyles.summary),
          ],
        ),
      ),
    );
  }

  Widget _buildChips() {
    return Wrap(
      spacing: AppSpacing.md,
      children: [
        Chip(
          label: Text('기본 칩', style: AppTextStyles.labelMedium),
          backgroundColor: AppColors.primaryContainer,
        ),
        Chip(
          label: Text('긍정', style: AppTextStyles.labelMedium),
          backgroundColor: AppColors.sentimentPositive.withValues(alpha: 0.1),
        ),
        Chip(
          label: Text('부정', style: AppTextStyles.labelMedium), 
          backgroundColor: AppColors.sentimentNegative.withValues(alpha: 0.1),
        ),
      ],
    );
  }
}