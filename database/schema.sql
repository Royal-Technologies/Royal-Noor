-- ============================================================
-- Royal Noor Database Schema (SQLite)
-- Brand: Royal Noor — আলোর পথে প্রতিদিন
-- Credits: Royal Technologies (https://www.royaltechbd.com/)
-- ============================================================

CREATE TABLE IF NOT EXISTS royal_noor_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT UNIQUE NOT NULL,                          -- Unique slug e.g. RN-Q-001, RN-H-001
    type TEXT NOT NULL CHECK(type IN ('quran', 'hadith')), -- 'quran' or 'hadith'
    title TEXT NOT NULL,                               -- Surah or Hadith book name
    reference TEXT NOT NULL,                           -- e.g. "সূরা আল-বাকারা : ১৮৩", "সহীহ বুখারী : ১৯০৪"
    arabic_text TEXT NOT NULL,                         -- Authentic Arabic with harakat
    bangla_translation TEXT NOT NULL,                  -- Bangla translation
    category TEXT DEFAULT 'সাধারণ',                     -- Topic / theme (e.g. ধৈর্য, সালাত, ক্ষমা, ইত্যাদি)
    event_tag TEXT DEFAULT 'general',                  -- 'general', 'ramadan', 'friday', 'dhul_hijjah', 'ashura', etc.
    target_day TEXT DEFAULT NULL,                      -- e.g. 'friday' for Friday priority
    target_month INTEGER DEFAULT NULL,                 -- Hijri or Gregorian month target (optional)
    priority INTEGER DEFAULT 1,                        -- Higher priority picked first on matching days
    used_count INTEGER DEFAULT 0,                      -- Rotation counter
    last_used_at TEXT DEFAULT NULL,                    -- Last published timestamp (ISO 8601)
    is_active INTEGER DEFAULT 1,                       -- 1 = Active, 0 = Inactive
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS generation_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id TEXT NOT NULL,                             -- e.g. RN-20261105-X7K2
    item_id INTEGER NOT NULL,
    item_uid TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    reference TEXT NOT NULL,
    event_tag TEXT NOT NULL,
    theme TEXT NOT NULL,
    image_path TEXT NOT NULL,
    json_path TEXT NOT NULL,
    caption TEXT NOT NULL,
    generated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(item_id) REFERENCES royal_noor_items(id)
);

CREATE INDEX IF NOT EXISTS idx_items_lookup 
    ON royal_noor_items(is_active, event_tag, target_day, priority);

CREATE INDEX IF NOT EXISTS idx_items_rotation 
    ON royal_noor_items(used_count, last_used_at);
