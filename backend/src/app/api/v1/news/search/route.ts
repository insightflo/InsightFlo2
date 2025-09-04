import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, createPaginationMeta } from '@/lib/response';
import { ErrorCodes } from '@/types/api';
import type { NewsResponse, NewsSearchRequest } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const sentiment = searchParams.get('sentiment') as 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | null;
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const userId = request.headers.get('x-user-id'); // 선택적 인증

    // 검색어 필수 검증
    if (!query || query.trim().length === 0) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        '검색어는 필수입니다.',
        { field: 'query' }
      );
    }

    const offset = (page - 1) * limit;
    const searchQuery = query.trim();

    // 검색 조건 구성
    let whereClause: any = {
      OR: [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { content: { contains: searchQuery, mode: 'insensitive' } },
        { summary: { contains: searchQuery, mode: 'insensitive' } }
      ]
    };

    // 감정 필터
    if (sentiment) {
      whereClause.sentiment = sentiment;
    }

    // 날짜 범위 필터
    if (dateFrom || dateTo) {
      whereClause.publishedAt = {};
      
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        if (!isNaN(fromDate.getTime())) {
          whereClause.publishedAt.gte = fromDate;
        }
      }
      
      if (dateTo) {
        const toDate = new Date(dateTo);
        if (!isNaN(toDate.getTime())) {
          // 해당 날짜의 끝까지 포함
          toDate.setHours(23, 59, 59, 999);
          whereClause.publishedAt.lte = toDate;
        }
      }
    }

    // 뉴스 검색 실행
    const [newsList, totalCount] = await Promise.all([
      prisma.news.findMany({
        where: whereClause,
        include: userId ? {
          bookmarks: { where: { userId } },
          userNewsScores: { where: { userId } }
        } : {},
        orderBy: [
          { publishedAt: 'desc' }
        ],
        skip: offset,
        take: limit
      }),
      prisma.news.count({ where: whereClause })
    ]);

    // 응답 데이터 변환
    const newsResponse: NewsResponse[] = newsList.map(news => ({
      id: news.id,
      title: news.title,
      content: news.content,
      summary: news.summary,
      sentiment: news.sentiment,
      keywords: news.keywords as string[] | null,
      publishedAt: news.publishedAt.toISOString(),
      sourceUrl: news.sourceUrl,
      createdAt: news.createdAt.toISOString(),
      ...(userId && {
        isBookmarked: news.bookmarks && news.bookmarks.length > 0,
        relevanceScore: news.userNewsScores && news.userNewsScores.length > 0 
          ? news.userNewsScores[0].relevanceScore 
          : undefined
      })
    }));

    // 페이지네이션 메타데이터
    const meta = createPaginationMeta(page, limit, totalCount);

    return successResponse(newsResponse, meta);

  } catch (error) {
    console.error('News search error:', error);
    
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      '뉴스 검색 중 오류가 발생했습니다.',
      undefined,
      500
    );
  }
}