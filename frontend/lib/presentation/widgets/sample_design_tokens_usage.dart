import 'package:flutter/material.dart';
import 'package:insightflo_design_tokens/design_tokens.dart';

/// Sample widget demonstrating design tokens usage
/// Frontend 팀이 디자인 토큰을 어떻게 사용하는지 보여주는 예시
class SampleDesignTokensUsage extends StatelessWidget {
  const SampleDesignTokensUsage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Design Tokens 사용 예시',
          style: AppTextStyles.headlineMedium.copyWith(
            color: AppColors.onSurface,
          ),
        ),
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.onPrimary,
      ),
      body: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg), // 16.0
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 색상 사용 예시
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(AppSpacing.lg),
              decoration: BoxDecoration(
                color: AppColors.primaryContainer,
                borderRadius: BorderRadius.circular(AppRadius.lg),
              ),
              child: Text(
                '✅ 디자인 토큰이 정상 작동합니다!',
                style: AppTextStyles.titleMedium.copyWith(
                  color: AppColors.onPrimaryContainer,
                ),
              ),
            ),
            
            SizedBox(height: AppSpacing.xxl), // 24.0
            
            // 타이포그래피 사용 예시
            Text(
              '타이포그래피 예시',
              style: AppTextStyles.headlineSmall,
            ),
            SizedBox(height: AppSpacing.md),
            Text(
              'Display Large 스타일',
              style: AppTextStyles.displayLarge,
            ),
            Text(
              'Title Medium 스타일',
              style: AppTextStyles.titleMedium,
            ),
            Text(
              'Body Large 스타일 - 일반 본문 텍스트',
              style: AppTextStyles.bodyLarge,
            ),
            
            SizedBox(height: AppSpacing.xxl),
            
            // 뉴스카드 스타일 예시
            Card(
              elevation: AppElevation.sm,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(AppRadius.lg),
              ),
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.lg),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '뉴스 카드 제목 스타일',
                      style: NewsCardStyles.title,
                    ),
                    SizedBox(height: AppSpacing.sm),
                    Text(
                      '뉴스 카드 요약 스타일 - 3줄까지 표시 가능한 본문 텍스트입니다.',
                      style: NewsCardStyles.summary,
                    ),
                    SizedBox(height: AppSpacing.sm),
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: AppSpacing.md,
                            vertical: AppSpacing.xs,
                          ),
                          decoration: BoxDecoration(
                            color: AppColors.primaryContainer,
                            borderRadius: BorderRadius.circular(AppRadius.xl),
                          ),
                          child: Text(
                            '키워드',
                            style: NewsCardStyles.keyword,
                          ),
                        ),
                        const Spacer(),
                        Text(
                          '2시간 전',
                          style: NewsCardStyles.timestamp,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            
            SizedBox(height: AppSpacing.xxl),
            
            // 감정 분석 색상 예시
            Row(
              children: [
                _buildSentimentChip('긍정', AppColors.sentimentPositive),
                SizedBox(width: AppSpacing.md),
                _buildSentimentChip('부정', AppColors.sentimentNegative),
                SizedBox(width: AppSpacing.md),
                _buildSentimentChip('중립', AppColors.sentimentNeutral),
              ],
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildSentimentChip(String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        border: Border.all(color: color),
        borderRadius: BorderRadius.circular(AppRadius.xl),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
          ),
          SizedBox(width: AppSpacing.xs),
          Text(
            label,
            style: AppTextStyles.labelMedium.copyWith(color: color),
          ),
        ],
      ),
    );
  }
}