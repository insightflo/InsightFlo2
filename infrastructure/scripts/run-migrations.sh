#!/bin/bash

# 데이터베이스 마이그레이션 실행 스크립트
# InsightFlo Supabase 마이그레이션 자동화

set -e

echo "📦 InsightFlo 데이터베이스 마이그레이션"
echo "===================================="

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# 프로젝트 루트에서 실행되는지 확인
if [[ ! -d "backend/database/migrations" ]]; then
    echo -e "${RED}오류: backend/database/migrations 디렉토리를 찾을 수 없습니다.${NC}"
    echo "프로젝트 루트에서 실행해주세요."
    exit 1
fi

# 마이그레이션 파일 목록
MIGRATIONS=(
    "001_create_users_table.sql"
    "002_create_news_table.sql" 
    "003_create_user_keywords_table.sql"
    "004_create_bookmarks_table.sql"
    "005_create_rls_policies.sql"
)

echo -e "\n${YELLOW}📋 마이그레이션 파일 확인${NC}"
echo "----------------------------------------"

# 모든 마이그레이션 파일이 존재하는지 확인
for migration in "${MIGRATIONS[@]}"; do
    file_path="backend/database/migrations/$migration"
    if [[ -f "$file_path" ]]; then
        echo -e "${GREEN}✅${NC} $migration"
    else
        echo -e "${RED}❌${NC} $migration - 파일을 찾을 수 없습니다"
        exit 1
    fi
done

echo -e "\n${BLUE}💡 마이그레이션 실행 방법${NC}"
echo "----------------------------------------"
echo "이 스크립트는 마이그레이션 파일의 내용을 순서대로 출력합니다."
echo "Supabase Dashboard의 SQL Editor에서 각 SQL을 복사하여 실행하세요."
echo ""

read -p "계속하시겠습니까? (y/n): " continue_migration

if [[ $continue_migration != "y" ]]; then
    echo "마이그레이션을 취소했습니다."
    exit 0
fi

echo -e "\n${YELLOW}🚀 마이그레이션 실행 가이드${NC}"
echo "========================================="

for i in "${!MIGRATIONS[@]}"; do
    migration=${MIGRATIONS[$i]}
    step_num=$((i+1))
    
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}Step $step_num: $migration${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}📄 SQL 내용 (복사하여 Supabase SQL Editor에서 실행):${NC}"
    echo ""
    
    # 파일 내용 출력 (구분을 위해 박스로 감싸기)
    echo "╭─────────────────────────────────────────────────────────────────╮"
    cat "backend/database/migrations/$migration" | sed 's/^/│ /'
    echo "╰─────────────────────────────────────────────────────────────────╯"
    echo ""
    
    if [[ $step_num -lt ${#MIGRATIONS[@]} ]]; then
        read -p "Step $step_num 완료 후 Enter를 눌러 다음 단계로 진행하세요..."
        echo ""
    fi
done

echo -e "\n${GREEN}🎉 모든 마이그레이션 SQL이 준비되었습니다!${NC}"
echo ""
echo -e "${YELLOW}✅ 완료 후 확인사항:${NC}"
echo "1. Supabase Dashboard → Table Editor에서 테이블 확인"
echo "2. Authentication → Policies에서 RLS 정책 확인" 
echo "3. Database → Indexes에서 인덱스 확인"
echo ""
echo -e "${BLUE}🔍 다음 단계:${NC}"
echo "환경변수 설정: ./infrastructure/scripts/setup-env-variables.sh"
echo "데이터베이스 테스트: ./infrastructure/scripts/verify-database.sh"
echo ""

# 마이그레이션 기록 파일 생성
echo "# Migration History - $(date)" >> infrastructure/logs/migration_history.log
echo "Migrations prepared: ${MIGRATIONS[*]}" >> infrastructure/logs/migration_history.log
echo "Status: Ready for execution" >> infrastructure/logs/migration_history.log
echo "" >> infrastructure/logs/migration_history.log

echo -e "${GREEN}📝 마이그레이션 기록이 infrastructure/logs/migration_history.log에 저장되었습니다.${NC}"