#!/bin/bash
echo "Starting InsightFlo Development Environment..."

# .env 파일 체크
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file from template"
fi

# Docker 컨테이너 시작
docker-compose -f infrastructure/docker/docker-compose.yml up -d

# 데이터베이스 마이그레이션 실행
echo "Waiting for database to be ready..."
sleep 5
cd backend && npx prisma migrate dev

echo "Development environment is ready!"
echo "Backend: http://localhost:3000"
echo "Database: postgresql://localhost:5432/insightflo_dev"