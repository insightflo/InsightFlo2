import { NextResponse } from 'next/server';
import { ApiResponse, ApiError, ApiMeta } from '@/types/api';

/**
 * 성공 응답 생성
 */
export function successResponse<T>(
  data: T,
  meta?: ApiMeta,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(meta && { meta })
    },
    { status }
  );
}

/**
 * 에러 응답 생성
 */
export function errorResponse(
  code: string,
  message: string,
  details?: Record<string, any>,
  status: number = 400
): NextResponse<ApiResponse> {
  const error: ApiError = {
    code,
    message,
    ...(details && { details })
  };

  return NextResponse.json(
    {
      success: false,
      error
    },
    { status }
  );
}

/**
 * 페이지네이션 메타데이터 생성
 */
export function createPaginationMeta(
  page: number,
  limit: number,
  total: number
): ApiMeta {
  const totalPages = Math.ceil(total / limit);
  
  return {
    page,
    limit,
    total,
    totalPages
  };
}