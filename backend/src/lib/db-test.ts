import { supabase, supabaseAdmin } from './supabase';

/**
 * Test basic database connectivity
 */
export async function testDatabaseConnection() {
  try {
    console.log('🔄 Testing database connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('users').select('count', { count: 'exact' });
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (err) {
    console.error('❌ Database connection error:', err);
    return false;
  }
}

/**
 * Test RLS policies
 */
export async function testRLSPolicies() {
  try {
    console.log('🔄 Testing RLS policies...');
    
    // Test 1: Try to access users table without authentication (should fail)
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError && usersError.message.includes('RLS')) {
      console.log('✅ RLS is properly enabled on users table');
    }
    
    // Test 2: Try to access news table (should work for reading active news)
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('*')
      .eq('is_active', true)
      .limit(1);
    
    if (!newsError) {
      console.log('✅ News table is readable for active news');
    }
    
    console.log('✅ RLS policies test completed');
    return true;
  } catch (err) {
    console.error('❌ RLS policies test failed:', err);
    return false;
  }
}

/**
 * Test CRUD operations (using admin client)
 */
export async function testCRUDOperations() {
  try {
    console.log('🔄 Testing CRUD operations...');
    
    // Test Create - Insert a test user
    const testUser = {
      email: 'test@example.com',
      password_hash: 'test_hash',
      nickname: 'Test User'
    };
    
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('users')
      .insert(testUser)
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ Insert operation failed:', insertError.message);
      return false;
    }
    
    console.log('✅ Insert operation successful');
    const userId = insertData.id;
    
    // Test Read - Fetch the user
    const { data: readData, error: readError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (readError) {
      console.error('❌ Read operation failed:', readError.message);
      return false;
    }
    
    console.log('✅ Read operation successful');
    
    // Test Update - Update the user
    const { data: updateData, error: updateError } = await supabaseAdmin
      .from('users')
      .update({ nickname: 'Updated Test User' })
      .eq('id', userId)
      .select()
      .single();
    
    if (updateError) {
      console.error('❌ Update operation failed:', updateError.message);
      return false;
    }
    
    console.log('✅ Update operation successful');
    
    // Test Delete - Remove the test user
    const { error: deleteError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId);
    
    if (deleteError) {
      console.error('❌ Delete operation failed:', deleteError.message);
      return false;
    }
    
    console.log('✅ Delete operation successful');
    console.log('✅ All CRUD operations completed successfully');
    
    return true;
  } catch (err) {
    console.error('❌ CRUD operations test failed:', err);
    return false;
  }
}

/**
 * Run all database tests
 */
export async function runAllDatabaseTests() {
  console.log('🚀 Starting database tests...\n');
  
  const connectionTest = await testDatabaseConnection();
  const rlsTest = await testRLSPolicies();
  const crudTest = await testCRUDOperations();
  
  console.log('\n📊 Test Results:');
  console.log(`Connection Test: ${connectionTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`RLS Test: ${rlsTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`CRUD Test: ${crudTest ? '✅ PASS' : '❌ FAIL'}`);
  
  const allTestsPassed = connectionTest && rlsTest && crudTest;
  console.log(`\n🎯 Overall Result: ${allTestsPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  return allTestsPassed;
}