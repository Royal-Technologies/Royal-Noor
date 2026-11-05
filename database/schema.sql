-- ============================================================
-- Royal Noor Database Schema (SQLite)
-- Brand: Royal Noor — আলোর পথে প্রতিদিন
-- Credits: Royal Technologies (https://www.royaltechbd.com/)
-- Final Content Taxonomy & Relational Specification
-- ============================================================

-- 1. SOURCES (উৎস: পবিত্র কোরআন, সহিহ হাদিস)
CREATE TABLE IF NOT EXISTS sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_bn TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    is_active INTEGER DEFAULT 1
);

-- 2. CATEGORIES (বিষয়ভিত্তিক ক্যাটাগরি - Exactly 15 Initial Categories)
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_bn TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1
);

-- 3. OCCASIONS (বিশেষ উপলক্ষ - Exactly 12 Initial Occasions)
CREATE TABLE IF NOT EXISTS occasions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_bn TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1
);

-- 4. DUA TYPES (দোয়ার ধরন - Exactly 12 Initial Dua Types)
CREATE TABLE IF NOT EXISTS dua_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_bn TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1
);

-- 5. HADITH COLLECTIONS (হাদিসের গ্রন্থ - 10 Standard Collections)
CREATE TABLE IF NOT EXISTS hadith_collections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_bn TEXT NOT NULL,
    name_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1
);

-- 6. TAGS (অতিরিক্ত ট্যাগ)
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

-- 7. CONTENTS (মূল কনটেন্ট ভাণ্ডার)
CREATE TABLE IF NOT EXISTS contents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT UNIQUE NOT NULL,
    source_id INTEGER NOT NULL,
    hadith_collection_id INTEGER DEFAULT NULL,
    title TEXT NOT NULL,
    reference TEXT NOT NULL,
    surah_name TEXT DEFAULT NULL,
    surah_number INTEGER DEFAULT NULL,
    ayah_number INTEGER DEFAULT NULL,
    hadith_number TEXT DEFAULT NULL,
    book_chapter TEXT DEFAULT NULL,
    hadith_grade TEXT DEFAULT NULL,
    grading_reference TEXT DEFAULT NULL,
    arabic_text TEXT NOT NULL,
    bangla_translation TEXT NOT NULL,
    english_translation TEXT DEFAULT NULL,
    translation_source TEXT DEFAULT NULL,
    status TEXT DEFAULT 'approved' CHECK(status IN ('draft', 'pending', 'verified', 'approved', 'scheduled', 'published', 'archived')),
    verification_status TEXT DEFAULT 'verified',
    priority INTEGER DEFAULT 1,
    used_count INTEGER DEFAULT 0,
    last_used_at TEXT DEFAULT NULL,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(source_id) REFERENCES sources(id),
    FOREIGN KEY(hadith_collection_id) REFERENCES hadith_collections(id)
);

-- Many-to-Many Relationships
CREATE TABLE IF NOT EXISTS content_categories (
    content_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY(content_id, category_id),
    FOREIGN KEY(content_id) REFERENCES contents(id) ON DELETE CASCADE,
    FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS content_occasions (
    content_id INTEGER NOT NULL,
    occasion_id INTEGER NOT NULL,
    PRIMARY KEY(content_id, occasion_id),
    FOREIGN KEY(content_id) REFERENCES contents(id) ON DELETE CASCADE,
    FOREIGN KEY(occasion_id) REFERENCES occasions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS content_dua_types (
    content_id INTEGER NOT NULL,
    dua_type_id INTEGER NOT NULL,
    PRIMARY KEY(content_id, dua_type_id),
    FOREIGN KEY(content_id) REFERENCES contents(id) ON DELETE CASCADE,
    FOREIGN KEY(dua_type_id) REFERENCES dua_types(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS content_tags (
    content_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY(content_id, tag_id),
    FOREIGN KEY(content_id) REFERENCES contents(id) ON DELETE CASCADE,
    FOREIGN KEY(tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- 8. PUBLICATION HISTORY
CREATE TABLE IF NOT EXISTS publication_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_id INTEGER NOT NULL,
    card_id TEXT NOT NULL,
    published_at TEXT DEFAULT CURRENT_TIMESTAMP,
    platform TEXT DEFAULT 'facebook',
    template_id TEXT NOT NULL,
    image_path TEXT NOT NULL,
    json_path TEXT NOT NULL,
    caption TEXT NOT NULL,
    post_id TEXT DEFAULT NULL,
    status TEXT DEFAULT 'published',
    FOREIGN KEY(content_id) REFERENCES contents(id)
);

-- Indexes for blazing fast querying
CREATE INDEX IF NOT EXISTS idx_contents_source ON contents(source_id, is_active, status);
CREATE INDEX IF NOT EXISTS idx_contents_rotation ON contents(used_count, last_used_at);

-- Legacy Compatibility Table (preserved for backwards-compatible scripts)
CREATE TABLE IF NOT EXISTS royal_noor_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('quran', 'hadith')),
    title TEXT NOT NULL,
    reference TEXT NOT NULL,
    arabic_text TEXT NOT NULL,
    bangla_translation TEXT NOT NULL,
    category TEXT DEFAULT 'সাধারণ',
    event_tag TEXT DEFAULT 'general',
    target_day TEXT DEFAULT NULL,
    target_month INTEGER DEFAULT NULL,
    priority INTEGER DEFAULT 1,
    used_count INTEGER DEFAULT 0,
    last_used_at TEXT DEFAULT NULL,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS generation_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id TEXT NOT NULL,
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
    generated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
