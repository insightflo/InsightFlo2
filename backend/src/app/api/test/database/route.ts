import { NextRequest, NextResponse } from 'next/server';
import { runAllDatabaseTests } from '@/lib/db-test';

/**
 * GET /api/test/database
 * 
 * Run comprehensive database tests including:
 * - Connection test
 * - RLS policies test  
 * - CRUD operations test
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Starting database test endpoint...');
    
    // Run all database tests
    const testResults = await runAllDatabaseTests();
    
    return NextResponse.json({
      success: testResults,
      message: testResults 
        ? 'All database tests passed successfully' 
        : 'Some database tests failed',
      timestamp: new Date().toISOString(),
      endpoint: '/api/test/database'
    }, { 
      status: testResults ? 200 : 500 
    });
    
  } catch (error) {
    console.error('❌ Database test endpoint error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Database test endpoint failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      endpoint: '/api/test/database'
    }, { 
      status: 500 
    });
  }
}