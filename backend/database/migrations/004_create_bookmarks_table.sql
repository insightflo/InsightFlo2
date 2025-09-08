-- Create bookmarks table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  news_id UUID NOT NULL REFERENCES news(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Additional fields for bookmark management
  notes TEXT, -- User can add personal notes
  tags TEXT[], -- User can add personal tags
  
  -- Ensure unique bookmark per user-news pair
  UNIQUE(user_id, news_id)
);

-- Add indexes for performance
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_news_id ON bookmarks(news_id);
CREATE INDEX idx_bookmarks_created_at ON bookmarks(created_at);
CREATE INDEX idx_bookmarks_tags ON bookmarks USING GIN(tags);