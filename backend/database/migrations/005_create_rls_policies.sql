-- Enable Row Level Security (RLS) on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can only view and update their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- News table policies
-- All authenticated users can read news
CREATE POLICY "Anyone can view active news" ON news
  FOR SELECT USING (is_active = true);

-- Only service role can manage news content
CREATE POLICY "Service role can manage news" ON news
  FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- User_keywords table policies
-- Users can only manage their own keywords
CREATE POLICY "Users can view own keywords" ON user_keywords
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own keywords" ON user_keywords
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own keywords" ON user_keywords
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own keywords" ON user_keywords
  FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks table policies
-- Users can only manage their own bookmarks
CREATE POLICY "Users can view own bookmarks" ON bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarks" ON bookmarks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);