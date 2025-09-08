#!/bin/bash

# 환경변수 설정 스크립트
# InsightFlo Supabase 환경변수 설정

set -e

echo "🔧 InsightFlo 환경변수 설정"
echo "============================"

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 프로젝트 루트 디렉토리 확인
if [[ ! -f "CLAUDE.md" ]]; then
    echo -e "${RED}오류: 프로젝트 루트 디렉토리에서 실행해주세요.${NC}"
    exit 1
fi

echo -e "\n${YELLOW}Supabase 환경변수 입력${NC}"
echo "----------------------------------------"

# 환경변수 입력받기
read -p "NEXT_PUBLIC_SUPABASE_URL (프로젝트 URL): " SUPABASE_URL
read -p "NEXT_PUBLIC_SUPABASE_ANON_KEY (anon public key): " SUPABASE_ANON_KEY
read -s -p "SUPABASE_SERVICE_ROLE_KEY (service_role secret key): " SUPABASE_SERVICE_KEY
echo ""

# 입력 검증
if [[ -z "$SUPABASE_URL" || -z "$SUPABASE_ANON_KEY" || -z "$SUPABASE_SERVICE_KEY" ]]; then
    echo -e "${RED}오류: 모든 환경변수를 입력해주세요.${NC}"
    exit 1
fi

# URL 형식 검증
if [[ ! $SUPABASE_URL =~ ^https://.*\.supabase\.co$ ]]; then
    echo -e "${RED}오류: Supabase URL 형식이 올바르지 않습니다.${NC}"
    echo "올바른 형식: https://your-project-id.supabase.co"
    exit 1
fi

echo -e "\n${YELLOW}환경변수 파일 생성${NC}"
echo "----------------------------------------"

# Backend .env 파일 생성
cat > backend/.env << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_KEY

# Database URL (for Prisma)
DATABASE_URL=postgresql://postgres:[your-password]@db.${SUPABASE_URL#https://}/postgres?schema=public

# JWT Configuration
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRES_IN=7d

# Application Configuration
NODE_ENV=development
PORT=3000

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
EOF

# Frontend .env 파일 생성 (공개 변수만)
cat > frontend/.env << EOF
# Supabase Configuration (Public keys only)
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY

# API Configuration
API_BASE_URL=http://localhost:3000
EOF

# .env.example 파일 생성 (템플릿)
cat > .env.example << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database URL
DATABASE_URL=postgresql://postgres:password@db.your-project-id.supabase.co/postgres?schema=public

# JWT Configuration
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# Application Configuration
NODE_ENV=development
PORT=3000

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
EOF

echo -e "${GREEN}✅ 환경변수 파일 생성 완료!${NC}"
echo ""
echo "생성된 파일:"
echo "- backend/.env (서버사이드 환경변수)"
echo "- frontend/.env (클라이언트사이드 환경변수)"
echo "- .env.example (환경변수 템플릿)"
echo ""

echo -e "${YELLOW}⚠️  보안 주의사항${NC}"
echo "----------------------------------------"
echo "1. .env 파일들이 .gitignore에 포함되어 있는지 확인하세요"
echo "2. SERVICE_ROLE_KEY는 절대 클라이언트에서 사용하지 마세요"
echo "3. 프로덕션 환경에서는 별도의 환경변수를 사용하세요"
echo ""

# .gitignore 확인 및 업데이트
if [[ -f ".gitignore" ]]; then
    if ! grep -q ".env" .gitignore; then
        echo "" >> .gitignore
        echo "# Environment Variables" >> .gitignore
        echo ".env" >> .gitignore
        echo ".env.local" >> .gitignore
        echo ".env.*.local" >> .gitignore
        echo -e "${GREEN}✅ .gitignore에 .env 파일 제외 규칙 추가됨${NC}"
    else
        echo -e "${GREEN}✅ .gitignore에 이미 .env 파일 제외 규칙이 있습니다${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  .gitignore 파일이 없습니다. 환경변수 파일이 실수로 커밋되지 않도록 주의하세요.${NC}"
fi

echo ""
echo -e "${GREEN}🎉 환경변수 설정이 완료되었습니다!${NC}"
echo ""
echo "다음 단계: 데이터베이스 연결 테스트"
echo "cd backend && npm run dev"