# 요청: Docker 및 개발 인프라 초기 설정

**요청자**: PM (Project Manager)  
**요청일**: 2025-01-21  
**우선순위**: HIGH  
**Task ID**: Task 1 - 프로젝트 초기 설정 및 디렉토리 구조 생성

## 📋 요청 사항

DevOps/Operator님께서 다음 작업을 수행해 주시기 바랍니다:

### 1. Docker 컨테이너 설정

#### Docker Compose 파일 생성
```yaml
# infrastructure/docker/docker-compose.yml
version: '3.8'

services:
  # PostgreSQL Database (Local Development)
  postgres:
    image: postgres:15-alpine
    container_name: insightflo_db
    environment:
      POSTGRES_USER: ${DB_USER:-insightflo}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-insightflo123}
      POSTGRES_DB: ${DB_NAME:-insightflo_dev}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - insightflo_network

  # Next.js Backend
  backend:
    build:
      context: ../../backend
      dockerfile: ../infrastructure/docker/backend.Dockerfile
    container_name: insightflo_backend
    environment:
      DATABASE_URL: postgresql://${DB_USER:-insightflo}:${DB_PASSWORD:-insightflo123}@postgres:5432/${DB_NAME:-insightflo_dev}
      NODE_ENV: development
    ports:
      - "3000:3000"
    volumes:
      - ../../backend:/app
      - /app/node_modules
    depends_on:
      - postgres
    networks:
      - insightflo_network
    command: npm run dev

  # Redis Cache (Optional for future)
  redis:
    image: redis:7-alpine
    container_name: insightflo_cache
    ports:
      - "6379:6379"
    networks:
      - insightflo_network

volumes:
  postgres_data:

networks:
  insightflo_network:
    driver: bridge
```

### 2. Dockerfile 생성

#### Backend Dockerfile
```dockerfile
# infrastructure/docker/backend.Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Prisma 설정
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### 3. 개발 환경 스크립트

#### 시작 스크립트
```bash
# infrastructure/scripts/start-dev.sh
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
```

#### 정지 스크립트
```bash
# infrastructure/scripts/stop-dev.sh
#!/bin/bash
echo "Stopping InsightFlo Development Environment..."
docker-compose -f infrastructure/docker/docker-compose.yml down
echo "Environment stopped."
```

### 4. GitHub Actions 워크플로우 초기 설정

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: |
          cd backend
          npm ci
          
      - name: Run linter
        run: |
          cd backend
          npm run lint
          
      - name: Run tests
        run: |
          cd backend
          npm test

  flutter-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.0'
          
      - name: Install dependencies
        run: |
          cd frontend
          flutter pub get
          
      - name: Run analyzer
        run: |
          cd frontend
          flutter analyze
          
      - name: Run tests
        run: |
          cd frontend
          flutter test
```

### 5. 환경 변수 템플릿

```env
# .env.example
# Database
DB_USER=insightflo
DB_PASSWORD=insightflo123
DB_NAME=insightflo_dev
DATABASE_URL=postgresql://insightflo:insightflo123@localhost:5432/insightflo_dev

# Backend
NODE_ENV=development
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Supabase (Production)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# Redis
REDIS_URL=redis://localhost:6379
```

### 6. VSCode Workspace 설정 업데이트

```json
// InsightFlo2.code-workspace에 추가
{
  "folders": [
    {
      "path": ".",
      "name": "Root"
    },
    {
      "path": "backend",
      "name": "Backend"
    },
    {
      "path": "frontend",
      "name": "Frontend"
    },
    {
      "path": "infrastructure",
      "name": "Infrastructure"
    }
  ],
  "settings": {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "extensions": {
    "recommendations": [
      "dbaeumer.vscode-eslint",
      "esbenp.prettier-vscode",
      "Dart-Code.flutter",
      "Dart-Code.dart-code",
      "ms-azuretools.vscode-docker",
      "Prisma.prisma"
    ]
  }
}
```

## 🎯 완료 기준
- [ ] Docker Compose 설정 완료
- [ ] Dockerfile 작성 완료
- [ ] 개발 환경 시작/정지 스크립트 작성
- [ ] GitHub Actions CI 파이프라인 설정
- [ ] 환경 변수 템플릿 생성
- [ ] 모든 서비스 정상 구동 확인

## 📅 기한
- **목표 완료일**: 2025-01-22
- **블로킹 이슈**: 없음

## 🔗 연관 작업
- Backend/Frontend 프로젝트 생성 후 통합 테스트
- QA 팀과 CI/CD 파이프라인 조율

## 📞 문의
질문이나 이슈가 있으시면 PM에게 응답 파일로 알려주세요.

---
*이 요청은 Task Master Task 1의 일부입니다.*