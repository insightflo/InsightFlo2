import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, createPaginationMeta } from '@/lib/response';
import { ErrorCodes } from '@/types/api';
import type { NewsResponse, PersonalizedFeedRequest } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    // 미들웨어에서 설정한 사용자 정보 추출
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return errorResponse(
        ErrorCodes.AUTHENTICATION_REQUIRED,
        '인증이 필요합니다.',
        undefined,
        401
      );
    }

    // 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const keywords = searchParams.get('keywords')?.split(',').filter(Boolean) || [];

    const offset = (page - 1) * limit;

    // 사용자의 키워드 가중치 조회
    const userKeywords = await prisma.userKeyword.findMany({
      where: { userId },
      orderBy: { weight: 'desc' }
    });

    // 개인화 뉴스 조회 쿼리
    let whereClause: any = {};

    // 키워드 필터링이 있는 경우
    if (keywords.length > 0) {
      whereClause.keywords = {
        array_contains: keywords
      };
    } else if (userKeywords.length > 0) {
      // 사용자 키워드 기반 필터링
      const userKeywordList = userKeywords.map(uk => uk.keyword);
      whereClause.keywords = {
        array_overlaps: userKeywordList
      };
    }

    // 뉴스 목록 조회 (개인화 점수와 함께)
    const [newsList, totalCount] = await Promise.all([
      prisma.$queryRaw`
        SELECT 
          n.*,
          CASE 
            WHEN b.id IS NOT NULL THEN true 
            ELSE false 
          END as is_bookmarked,
          COALESCE(uns.relevance_score, 0.5) as relevance_score
        FROM news n
        LEFT JOIN bookmarks b ON n.id = b.news_id AND b.user_id = ${userId}
        LEFT JOIN user_news_scores uns ON n.id = uns.news_id AND uns.user_id = ${userId}
        WHERE 
          ${keywords.length > 0 ? 
            prisma.$queryRaw`n.keywords ?| ${keywords}` : 
            userKeywords.length > 0 ? 
              prisma.$queryRaw`n.keywords ?| ${userKeywords.map(uk => uk.keyword)}` :
              prisma.$queryRaw`TRUE`
          }
        ORDER BY 
          COALESCE(uns.relevance_score, 0.5) DESC,
          n.published_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `,
      prisma.news.count({ where: whereClause })
    ]);

    // 응답 데이터 변환
    const newsResponse: NewsResponse[] = (newsList as any[]).map(news => ({
      id: news.id,
      title: news.title,
      content: news.content,
      summary: news.summary,
      sentiment: news.sentiment,
      keywords: news.keywords,
      publishedAt: news.published_at.toISOString(),
      sourceUrl: news.source_url,
      createdAt: news.created_at.toISOString(),
      isBookmarked: news.is_bookmarked,
      relevanceScore: parseFloat(news.relevance_score)
    }));

    // 페이지네이션 메타데이터
    const meta = createPaginationMeta(page, limit, totalCount);

    return successResponse(newsResponse, meta);

  } catch (error) {
    console.error('Personalized feed error:', error);
    
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      '개인화 피드 조회 중 오류가 발생했습니다.',
      undefined,
      500
    );
  }
}