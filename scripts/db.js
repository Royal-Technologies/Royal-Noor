/**
 * Royal Noor — SQLite Database Engine
 * Brand: Royal Noor — আলোর পথে প্রতিদিন
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dbDir = path.join(rootDir, 'database');
const dbPath = path.join(dbDir, 'royal_noor.sqlite');
const schemaPath = path.join(dbDir, 'schema.sql');
const seedPath = path.join(dbDir, 'seed-data.json');
const itemsJsonPath = path.join(dbDir, 'items.json');

let _dbInstance = null;

function getDb() {
  if (_dbInstance) return _dbInstance;

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Use Node.js built-in DatabaseSync (Node 22+) or better-sqlite3
  try {
    const { DatabaseSync } = require('node:sqlite');
    _dbInstance = new DatabaseSync(dbPath);
  } catch (err) {
    try {
      const Database = require('better-sqlite3');
      _dbInstance = new Database(dbPath);
    } catch (e2) {
      throw new Error('SQLite engine not available. Please ensure Node.js 22+ is used or better-sqlite3 is installed.');
    }
  }

  return _dbInstance;
}

/**
 * Initialize database schema and seed data
 */
function initDatabase() {
  const db = getDb();
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Run schema commands
  const statements = schemaSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const stmt of statements) {
    db.exec(stmt + ';');
  }

  // Check if items already exist
  const countRow = db.prepare('SELECT COUNT(*) as count FROM royal_noor_items').get();
  const count = Number(countRow.count || 0);

  if (count === 0 && fs.existsSync(seedPath)) {
    const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    bulkInsertItems(seedData);
    console.log(`[Database] Initialized with ${seedData.length} curated Islamic cards.`);
  } else {
    console.log(`[Database] Database ready with ${count} existing items.`);
  }

  // Sync database to items.json for frontend web UI
  exportToJson();
}

/**
 * Insert a single item
 */
function insertItem(item) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO royal_noor_items 
    (uid, type, title, reference, arabic_text, bangla_translation, category, event_tag, target_day, target_month, priority, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const uid = item.uid || `RN-${item.type === 'quran' ? 'Q' : 'H'}-${Date.now().toString(36).toUpperCase()}`;
  stmt.run(
    uid,
    item.type || 'quran',
    item.title,
    item.reference,
    item.arabic_text,
    item.bangla_translation,
    item.category || 'সাধারণ',
    item.event_tag || 'general',
    item.target_day || null,
    item.target_month || null,
    item.priority || 1,
    item.is_active !== undefined ? item.is_active : 1
  );

  return uid;
}

/**
 * Bulk insert items
 */
function bulkInsertItems(items) {
  const db = getDb();
  let inserted = 0;
  for (const item of items) {
    insertItem(item);
    inserted++;
  }
  exportToJson();
  return inserted;
}

/**
 * Smart Selection Engine for Today's Card
 * Priority: Event tag > Day of week > Rotation order (least recently used)
 */
function pickTodayItem(options = {}) {
  const db = getDb();
  const { eventTag, targetDay, forceType } = options;

  let query = 'SELECT * FROM royal_noor_items WHERE is_active = 1';
  const params = [];

  if (forceType) {
    query += ' AND type = ?';
    params.push(forceType);
  }

  // 1. If explicit eventTag is given (e.g. ramadan, dhul_hijjah, friday)
  if (eventTag && eventTag !== 'general') {
    const eventQuery = query + ' AND event_tag = ? ORDER BY priority DESC, used_count ASC, (last_used_at IS NOT NULL), last_used_at ASC LIMIT 1';
    const item = db.prepare(eventQuery).get(...params, eventTag);
    if (item) return item;
  }

  // 2. If targetDay matches (e.g. Friday)
  if (targetDay) {
    const dayQuery = query + ' AND (target_day = ? OR event_tag = ?) ORDER BY priority DESC, used_count ASC, (last_used_at IS NOT NULL), last_used_at ASC LIMIT 1';
    const item = db.prepare(dayQuery).get(...params, targetDay, targetDay);
    if (item) return item;
  }

  // 3. Fallback: Pick general items with smart rotation
  const generalQuery = query + " AND (event_tag = 'general' OR event_tag IS NULL) ORDER BY priority DESC, used_count ASC, (last_used_at IS NOT NULL), last_used_at ASC LIMIT 1";
  let item = db.prepare(generalQuery).get(...params);

  // 4. Absolute fallback if nothing matched
  if (!item) {
    item = db.prepare('SELECT * FROM royal_noor_items WHERE is_active = 1 ORDER BY used_count ASC, last_used_at ASC LIMIT 1').get();
  }

  return item;
}

/**
 * Record generation history and update rotation timestamp
 */
function recordUsage(itemId, details) {
  const db = getDb();
  const now = new Date().toISOString();

  // Update item rotation counter
  db.prepare('UPDATE royal_noor_items SET used_count = used_count + 1, last_used_at = ? WHERE id = ?')
    .run(now, itemId);

  // Insert into history
  db.prepare(`
    INSERT INTO generation_history 
    (card_id, item_id, item_uid, type, title, reference, event_tag, theme, image_path, json_path, caption, generated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    details.cardId,
    itemId,
    details.itemUid,
    details.type,
    details.title,
    details.reference,
    details.eventTag || 'general',
    details.theme || 'royal-emerald',
    details.imagePath,
    details.jsonPath,
    details.caption,
    now
  );

  exportToJson();
}

/**
 * Get total number of generated cards from history
 */
function getGenerationCount() {
  const db = getDb();
  try {
    const row = db.prepare('SELECT COUNT(*) as count FROM generation_history').get();
    return Number(row?.count || 0);
  } catch (err) {
    return 0;
  }
}

/**
 * Get all items from database
 */
function getAllItems() {
  const db = getDb();
  return db.prepare('SELECT * FROM royal_noor_items ORDER BY id ASC').all();
}

/**
 * Export items to JSON and JS for frontend browser usage
 * (JS export ensures index.html works even when opened via file:/// without web server)
 */
function exportToJson() {
  try {
    const db = getDb();
    let contents = [];

    // Try exporting from normalized contents table with taxonomy relations
    try {
      contents = db.prepare(`
        SELECT c.*, 
               s.name_bn as source_name_bn, s.slug as source_slug,
               h.name_bn as hadith_collection_name_bn, h.slug as hadith_collection_slug
        FROM contents c
        JOIN sources s ON c.source_id = s.id
        LEFT JOIN hadith_collections h ON c.hadith_collection_id = h.id
        WHERE c.is_active = 1
        ORDER BY c.id ASC
      `).all();

      for (const c of contents) {
        const cats = db.prepare(`
          SELECT cat.name_bn, cat.slug 
          FROM content_categories cc
          JOIN categories cat ON cc.category_id = cat.id
          WHERE cc.content_id = ?
        `).all(c.id);
        c.categories = cats.map(x => x.name_bn);
        c.category_slugs = cats.map(x => x.slug);

        const occs = db.prepare(`
          SELECT o.name_bn, o.slug
          FROM content_occasions co
          JOIN occasions o ON co.occasion_id = o.id
          WHERE co.content_id = ?
        `).all(c.id);
        c.occasions = occs.map(x => x.name_bn);
        c.occasion_slugs = occs.map(x => x.slug);

        const duas = db.prepare(`
          SELECT d.name_bn, d.slug
          FROM content_dua_types cd
          JOIN dua_types d ON cd.dua_type_id = d.id
          WHERE cd.content_id = ?
        `).all(c.id);
        c.dua_types = duas.map(x => x.name_bn);
        c.dua_type_slugs = duas.map(x => x.slug);

        const tgs = db.prepare(`
          SELECT t.name, t.slug
          FROM content_tags ct
          JOIN tags t ON ct.tag_id = t.id
          WHERE ct.content_id = ?
        `).all(c.id);
        c.tags = tgs.map(x => x.name);
        c.tag_slugs = tgs.map(x => x.slug);

        c.type = c.source_slug === 'quran' ? 'quran' : 'hadith';
        c.category = c.categories[0] || 'সাধারণ';
        c.event_tag = c.occasion_slugs[0] || 'general';
      }
    } catch (eRel) {
      contents = db.prepare('SELECT * FROM royal_noor_items WHERE is_active = 1 ORDER BY id ASC').all();
    }

    fs.writeFileSync(itemsJsonPath, JSON.stringify(contents, null, 2), 'utf8');

    const itemsJsPath = path.join(dbDir, 'items-data.js');
    const jsContent = `/** Royal Noor — Offline Database Cache */\nwindow.ROYAL_NOOR_DATA = ${JSON.stringify(contents, null, 2)};\n`;
    fs.writeFileSync(itemsJsPath, jsContent, 'utf8');
  } catch (err) {
    console.error('[Database] Export JSON error:', err.message);
  }
}

module.exports = {
  getDb,
  initDatabase,
  insertItem,
  bulkInsertItems,
  pickTodayItem,
  recordUsage,
  getGenerationCount,
  getAllItems,
  exportToJson
};
