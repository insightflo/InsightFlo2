import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, extractTokenFromHeader } from '@/lib/auth';

// 인증이 필요한 경로 설정
const protectedPaths = [
  '/api/v1/news/personalized',
  '/api/v1/user',
  '/api/v1/bookmarks'
];

// 인증이 필요하지 않은 경로
const publicPaths = [
  '/api/v1/auth/signin',
  '/api/v1/auth/signup',
  '/api/v1/auth/refresh',
  '/api/v1/news/search'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 경로가 아니면 패스
  if (!pathname.startsWith('/api/v1/')) {
    return NextResponse.next();
  }

  // 퍼블릭 경로는 인증 불필요
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 보호된 경로 확인
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Authorization 헤더 확인
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTHENTICATION_REQUIRED',
          message: '인증이 필요합니다.'
        }
      },
      { status: 401 }
    );
  }

  try {
    // 토큰 추출 및 검증
    const token = extractTokenFromHeader(authHeader);
    const payload = verifyAccessToken(token);

    // 사용자 정보를 헤더에 추가
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-email', payload.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTHENTICATION_REQUIRED',
          message: '유효하지 않은 토큰입니다.'
        }
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: '/api/v1/:path*'
};