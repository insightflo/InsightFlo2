import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/response';
import { ErrorCodes } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    // 클라이언트 측에서 토큰을 삭제하도록 안내
    // 실제 토큰 블랙리스트 관리는 추후 Redis 도입 시 구현
    
    return successResponse(
      { message: '로그아웃되었습니다.' }
    );

  } catch (error) {
    console.error('Signout error:', error);
    
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      '로그아웃 처리 중 오류가 발생했습니다.',
      undefined,
      500
    );
  }
}