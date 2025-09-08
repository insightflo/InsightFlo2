#!/bin/bash

# Supabase 프로젝트 설정 가이드 스크립트
# InsightFlo 프로젝트용

set -e  # 에러 시 스크립트 종료

echo "🚀 InsightFlo Supabase 프로젝트 설정 가이드"
echo "============================================="

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "\n${YELLOW}1. Supabase 프로젝트 생성 단계${NC}"
echo "----------------------------------------"
echo "1. Supabase Dashboard 접속: https://supabase.com/dashboard"
echo "2. 'New project' 버튼 클릭"
echo "3. 프로젝트 설정:"
echo "   - Name: insightflo-db"
echo "   - Database Password: [강력한 패스워드 입력]"
echo "   - Region: Northeast Asia (Seoul 또는 Tokyo)"
echo "4. 'Create new project' 클릭"
echo ""

read -p "프로젝트 생성이 완료되었습니까? (y/n): " project_created

if [[ $project_created != "y" ]]; then
    echo -e "${RED}프로젝트 생성을 완료한 후 다시 실행해주세요.${NC}"
    exit 1
fi

echo -e "\n${YELLOW}2. 데이터베이스 마이그레이션 실행${NC}"
echo "----------------------------------------"
echo "Supabase Dashboard → SQL Editor에서 다음 순서로 실행:"
echo ""

MIGRATIONS=(
    "001_create_users_table.sql"
    "002_create_news_table.sql" 
    "003_create_user_keywords_table.sql"
    "004_create_bookmarks_table.sql"
    "005_create_rls_policies.sql"
)

for i in "${!MIGRATIONS[@]}"; do
    migration=${MIGRATIONS[$i]}
    echo "Step $((i+1)): $migration"
    echo "파일 경로: backend/database/migrations/$migration"
    echo ""
done

echo -e "${GREEN}마이그레이션 파일들이 backend/database/migrations/ 디렉토리에 준비되어 있습니다.${NC}"
echo ""

read -p "모든 마이그레이션 실행이 완료되었습니까? (y/n): " migrations_done

if [[ $migrations_done != "y" ]]; then
    echo -e "${RED}마이그레이션을 완료한 후 다시 실행해주세요.${NC}"
    exit 1
fi

echo -e "\n${YELLOW}3. 환경변수 설정${NC}"
echo "----------------------------------------"
echo "Supabase Dashboard → Settings → API에서 다음 정보를 복사하세요:"
echo ""
echo "📝 필요한 환경변수:"
echo "- NEXT_PUBLIC_SUPABASE_URL (Project URL)"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY (anon public key)"  
echo "- SUPABASE_SERVICE_ROLE_KEY (service_role secret key)"
echo ""

echo "환경변수 설정 스크립트를 실행하시겠습니까?"
read -p "(y/n): " setup_env

if [[ $setup_env == "y" ]]; then
    echo "환경변수 설정 스크립트를 실행합니다..."
    bash ./setup-env-variables.sh
fi

echo -e "\n${YELLOW}4. 데이터베이스 검증${NC}"
echo "----------------------------------------"
echo "다음 명령어로 데이터베이스 연결을 테스트하세요:"
echo ""
echo "cd backend && npm run dev"
echo "curl http://localhost:3000/api/test/database"
echo ""

echo -e "\n${GREEN}✅ Supabase 설정 가이드 완료!${NC}"
echo ""
echo "🔍 확인사항:"
echo "- [ ] 프로젝트 생성됨"
echo "- [ ] 4개 테이블 모두 생성됨" 
echo "- [ ] RLS 정책 활성화됨"
echo "- [ ] 환경변수 설정됨"
echo "- [ ] 데이터베이스 테스트 통과"
echo ""
echo "📚 문제 발생 시 참고 문서:"
echo "- Backend README: backend/database/README.md"
echo "- 스키마 문서: .claude/contracts/interfaces/database-schema-v1.md"