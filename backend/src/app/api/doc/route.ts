import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

// Swagger 정의 설정
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InsightFlo API',
      version: '1.0.0',
      description: 'InsightFlo 백엔드 API 문서',
    },
    servers: [
      {
        url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
        description: '개발 서버',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    security: [{
      ApiKeyAuth: [],
    }],
  },
  apis: ['./src/app/api/**/*.ts'], // API 파일들의 경로
});

// GET /api/doc - Swagger JSON 스팩 반환
export async function GET() {
  return NextResponse.json(swaggerSpec, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}