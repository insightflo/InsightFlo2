import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';
import { ErrorCodes } from '@/types/api';
import type { NewsResponse } from '@/types/api';

interface RouteContext {
  params: { id: string };
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = context.params;
    const userId = request.headers.get('x-user-id');

    // UUID 형식 검증
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        '올바르지 않은 뉴스 ID 형식입니다.',
        { field: 'id' }
      );
    }

    // 뉴스 상세 조회
    let newsQuery: any = {
      where: { id },
      include: {
        bookmarks: userId ? { where: { userId } } : false,
        userNewsScores: userId ? { where: { userId } } : false
      }
    };

    const news = await prisma.news.findUnique(newsQuery);

    if (!news) {
      return errorResponse(
        ErrorCodes.RESOURCE_NOT_FOUND,
        '뉴스를 찾을 수 없습니다.',
        { newsId: id },
        404
      );
    }

    // 응답 데이터 구성
    const newsResponse: NewsResponse = {
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
    };

    return successResponse(newsResponse);

  } catch (error) {
    console.error('News detail error:', error);
    
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      '뉴스 상세 조회 중 오류가 발생했습니다.',
      undefined,
      500
    );
  }
}