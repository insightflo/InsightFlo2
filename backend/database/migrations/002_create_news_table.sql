-- Create news table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content TEXT,
  summary TEXT,
  sentiment VARCHAR(50), -- positive, negative, neutral
  keywords TEXT[], -- Array of keywords
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Additional fields for news management
  source_url TEXT,
  source_name VARCHAR(100),
  author VARCHAR(100),
  category VARCHAR(50),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Create updated_at trigger for news
CREATE TRIGGER update_news_updated_at 
  BEFORE UPDATE ON news 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_news_published_at ON news(published_at);
CREATE INDEX idx_news_created_at ON news(created_at);
CREATE INDEX idx_news_sentiment ON news(sentiment);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_keywords ON news USING GIN(keywords);
CREATE INDEX idx_news_is_active ON news(is_active);

-- Add sentiment validation constraint
ALTER TABLE news 
ADD CONSTRAINT news_sentiment_check 
CHECK (sentiment IN ('positive', 'negative', 'neutral') OR sentiment IS NULL);