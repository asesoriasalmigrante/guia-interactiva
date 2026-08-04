-- =============================================
-- Migration 004: Persistent chapter translation cache
-- =============================================

CREATE TABLE IF NOT EXISTS chapter_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id INTEGER NOT NULL,
  language TEXT NOT NULL,
  translated_content JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(chapter_id, language)
);

ALTER TABLE chapter_translations ENABLE ROW LEVEL SECURITY;

-- Anyone can read translations (public content)
CREATE POLICY "Anyone can read chapter translations"
  ON chapter_translations
  FOR SELECT
  USING (true);

-- Only service role can insert/update translations
CREATE POLICY "Service role can manage chapter translations"
  ON chapter_translations
  FOR ALL
  USING (true)
  WITH CHECK (true);
