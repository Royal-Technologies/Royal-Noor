/**
 * Royal Noor — Dataset Compiler & Seeder
 * Compiles 200 Quranic Verses + 200 Sahih Hadiths = 400 Curated Cards
 * Brand: Royal Noor — আলোর পথে প্রতিদিন
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const quranPart1 = require('../database/data/quran_part1');
const quranPart2 = require('../database/data/quran_part2');
const hadithPart1 = require('../database/data/hadith_part1');
const hadithPart2 = require('../database/data/hadith_part2');

console.log('🕌 [Royal Noor] Compiling 200 Quran Verses & 200 Sahih Hadiths...');

// Combine and format Quran
const allQuran = [...quranPart1, ...quranPart2].map((item, idx) => {
  const num = (idx + 1).toString().padStart(3, '0');
  return {
    ...item,
    uid: `RN-Q-${num}`,
    type: 'quran'
  };
});

// Combine and format Hadiths
const allHadith = [...hadithPart1, ...hadithPart2].map((item, idx) => {
  const num = (idx + 1).toString().padStart(3, '0');
  return {
    ...item,
    uid: `RN-H-${num}`,
    type: 'hadith'
  };
});

const totalItems = [...allQuran, ...allHadith];

console.log(`✔ Quran Verses compiled: ${allQuran.length}`);
console.log(`✔ Sahih Hadiths compiled: ${allHadith.length}`);
console.log(`✔ Total Dataset: ${totalItems.length} items`);

// 1. Save to seed-data.json
const seedPath = path.join(rootDir, 'database/seed-data.json');
fs.writeFileSync(seedPath, JSON.stringify(totalItems, null, 2), 'utf8');
console.log(`✔ Saved to database/seed-data.json`);

// 2. Insert into SQLite Database
const db = require('./db');
const dbInstance = db.getDb();

// Clear existing items and reset
dbInstance.exec('DELETE FROM generation_history;');
dbInstance.exec('DELETE FROM royal_noor_items;');
dbInstance.exec("DELETE FROM sqlite_sequence WHERE name='royal_noor_items' OR name='generation_history';");

console.log('⏳ Inserting 400 items into SQLite database...');
const insertStmt = dbInstance.prepare(`
  INSERT INTO royal_noor_items 
  (uid, type, title, reference, arabic_text, bangla_translation, category, event_tag, target_day, target_month, priority, is_active)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
`);

dbInstance.exec('BEGIN TRANSACTION;');
for (const item of totalItems) {
  insertStmt.run(
    item.uid,
    item.type,
    item.title,
    item.reference,
    item.arabic_text,
    item.bangla_translation,
    item.category || 'সাধারণ',
    item.event_tag || 'general',
    item.target_day || (item.event_tag === 'friday' ? 'friday' : null),
    item.target_month || (item.event_tag === 'ramadan' ? 9 : (item.event_tag === 'dhul_hijjah' ? 12 : null)),
    item.priority || 1
  );
}
dbInstance.exec('COMMIT;');

// 3. Export to items.json for frontend web UI
db.exportToJson();

const finalCount = dbInstance.prepare("SELECT COUNT(*) as count FROM royal_noor_items").get().count;
const qCount = dbInstance.prepare("SELECT COUNT(*) as count FROM royal_noor_items WHERE type = 'quran'").get().count;
const hCount = dbInstance.prepare("SELECT COUNT(*) as count FROM royal_noor_items WHERE type = 'hadith'").get().count;
const rCount = dbInstance.prepare("SELECT COUNT(*) as count FROM royal_noor_items WHERE event_tag = 'ramadan'").get().count;
const fCount = dbInstance.prepare("SELECT COUNT(*) as count FROM royal_noor_items WHERE event_tag = 'friday' OR target_day = 'friday'").get().count;

console.log(`\n🎉 Success! SQLite Database updated:`);
console.log(`   ► Total Items:     ${finalCount}`);
console.log(`   ► Quran Verses:    ${qCount}`);
console.log(`   ► Sahih Hadiths:   ${hCount}`);
console.log(`   ► Ramadan Special: ${rCount}`);
console.log(`   ► Friday Special:  ${fCount}`);
console.log(`   ► database/items.json synced for Web UI.`);
