import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 시드 데이터 생성 시작...');

  // 테스트 사용자 생성
  const testUser = await prisma.user.upsert({
    where: { email: 'test@insightflo.com' },
    update: {},
    create: {
      email: 'test@insightflo.com',
      passwordHash: await hashPassword('password123'),
      nickname: 'TestUser',
      userKeywords: {
        create: [
          { keyword: 'AI', weight: 5 },
          { keyword: '인공지능', weight: 5 },
          { keyword: '기술', weight: 4 },
          { keyword: 'IT', weight: 4 },
          { keyword: '스타트업', weight: 3 }
        ]
      }
    }
  });

  console.log('👤 테스트 사용자 생성:', testUser.email);

  // 샘플 뉴스 데이터 생성
  const sampleNews = [
    {
      title: 'AI 기술의 새로운 돌파구, GPT-5 출시 임박',
      content: '인공지능 기술이 또 다른 혁신을 맞이하고 있습니다. OpenAI에서 개발 중인 GPT-5가 기존 모델보다 훨씬 향상된 성능을 보여주고 있다고 발표했습니다...',
      summary: 'GPT-5의 출시가 임박하며 AI 기술의 새로운 돌파구를 마련할 것으로 예상됩니다.',
      sentiment: 'POSITIVE' as const,
      keywords: ['AI', 'GPT-5', '인공지능', '기술', 'OpenAI'],
      publishedAt: new Date('2025-01-20'),
      sourceUrl: 'https://example.com/news/1'
    },
    {
      title: '국내 IT 스타트업, 해외 진출 가속화',
      content: '국내 IT 스타트업들이 글로벌 시장 진출을 위한 투자를 확대하고 있습니다. 특히 AI와 블록체인 분야의 기술력을 바탕으로...',
      summary: '국내 IT 스타트업들이 AI와 블록체인 기술을 바탕으로 해외 진출을 가속화하고 있습니다.',
      sentiment: 'POSITIVE' as const,
      keywords: ['IT', '스타트업', '해외진출', 'AI', '블록체인'],
      publishedAt: new Date('2025-01-19'),
      sourceUrl: 'https://example.com/news/2'
    },
    {
      title: '경제 전문가들, 2025년 경기 전망 엇갈려',
      content: '2025년 경제 전망에 대해 전문가들의 의견이 분분합니다. 일부는 긍정적 성장을 예측하는 반면, 다른 전문가들은...',
      summary: '2025년 경제 전망에 대해 전문가들의 의견이 엇갈리고 있습니다.',
      sentiment: 'NEUTRAL' as const,
      keywords: ['경제', '전망', '2025년', '성장'],
      publishedAt: new Date('2025-01-18'),
      sourceUrl: 'https://example.com/news/3'
    },
    {
      title: '새로운 보안 취약점 발견으로 인한 IT 업계 비상',
      content: '최근 발견된 새로운 보안 취약점으로 인해 IT 업계가 비상사태에 돌입했습니다. 이 취약점은 주요 운영체제와...',
      summary: '새로운 보안 취약점 발견으로 IT 업계가 비상사태에 돌입했습니다.',
      sentiment: 'NEGATIVE' as const,
      keywords: ['보안', '취약점', 'IT', '비상사태'],
      publishedAt: new Date('2025-01-17'),
      sourceUrl: 'https://example.com/news/4'
    }
  ];

  console.log('📰 뉴스 데이터 생성 중...');

  for (const newsData of sampleNews) {
    await prisma.news.upsert({
      where: { sourceUrl: newsData.sourceUrl },
      update: {},
      create: newsData
    });
  }

  // 사용자-뉴스 연관성 점수 생성
  const allNews = await prisma.news.findMany();
  
  for (const news of allNews) {
    // 키워드 매칭에 따른 연관성 점수 계산
    const userKeywords = await prisma.userKeyword.findMany({
      where: { userId: testUser.id }
    });

    let relevanceScore = 0.3; // 기본 점수

    if (news.keywords) {
      const newsKeywords = news.keywords as string[];
      for (const userKeyword of userKeywords) {
        if (newsKeywords.includes(userKeyword.keyword)) {
          relevanceScore += (userKeyword.weight * 0.1);
        }
      }
    }

    relevanceScore = Math.min(1.0, relevanceScore);

    await prisma.userNewsScore.upsert({
      where: {
        userId_newsId: {
          userId: testUser.id,
          newsId: news.id
        }
      },
      update: { relevanceScore },
      create: {
        userId: testUser.id,
        newsId: news.id,
        relevanceScore
      }
    });
  }

  // 테스트용 북마크 생성
  const firstNews = allNews[0];
  if (firstNews) {
    await prisma.bookmark.upsert({
      where: {
        userId_newsId: {
          userId: testUser.id,
          newsId: firstNews.id
        }
      },
      update: {},
      create: {
        userId: testUser.id,
        newsId: firstNews.id
      }
    });
  }

  console.log('✅ 시드 데이터 생성 완료!');
  console.log(`📊 생성된 데이터:`);
  console.log(`   - 사용자: 1명`);
  console.log(`   - 뉴스: ${sampleNews.length}개`);
  console.log(`   - 사용자 키워드: 5개`);
  console.log(`   - 연관성 점수: ${allNews.length}개`);
  console.log(`   - 북마크: 1개`);
}

main()
  .catch((e) => {
    console.error('❌ 시드 데이터 생성 실패:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });