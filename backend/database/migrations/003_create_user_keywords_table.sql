-- Create user_keywords table for personalization
CREATE TABLE user_keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  keyword VARCHAR(100) NOT NULL,
  weight INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique keyword per user
  UNIQUE(user_id, keyword)
);

-- Create updated_at trigger for user_keywords
CREATE TRIGGER update_user_keywords_updated_at 
  BEFORE UPDATE ON user_keywords 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_user_keywords_user_id ON user_keywords(user_id);
CREATE INDEX idx_user_keywords_keyword ON user_keywords(keyword);
CREATE INDEX idx_user_keywords_weight ON user_keywords(weight);
CREATE INDEX idx_user_keywords_created_at ON user_keywords(created_at);

-- Add weight validation constraint (1-10 scale)
ALTER TABLE user_keywords 
ADD CONSTRAINT user_keywords_weight_check 
CHECK (weight >= 1 AND weight <= 10);