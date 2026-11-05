/**
 * Royal Noor — Bulk Data Import Script (SQLite)
 * Brand: Royal Noor — আলোর পথে প্রতিদিন
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const db = require('./db');

const rootDir = path.resolve(__dirname, '..');
const defaultImportPath = path.join(rootDir, 'database/imports.json');

const targetFile = process.argv[2] ? path.resolve(process.argv[2]) : defaultImportPath;

console.log(`\n📥 [Royal Noor] Data Importer`);
console.log(`   Source file: ${targetFile}`);

if (!fs.existsSync(targetFile)) {
  console.log(`ℹ️ [Info] No import file found at "${targetFile}".`);
  console.log(`   Create "database/imports.json" with an array of items, then run "npm run import".`);
  process.exit(0);
}

try {
  const content = fs.readFileSync(targetFile, 'utf8').trim();
  if (!content) {
    console.log('ℹ️ Import file is empty.');
    process.exit(0);
  }

  const items = JSON.parse(content);
  if (!Array.isArray(items) || items.length === 0) {
    console.log('⚠️ Expected JSON array of objects with fields: { type, title, reference, arabic_text, bangla_translation }');
    process.exit(1);
  }

  db.initDatabase();

  let importedCount = 0;
  for (const item of items) {
    if (!item.title || !item.arabic_text || !item.bangla_translation) {
      console.warn(`⚠️ Skipping item with missing essential fields:`, item);
      continue;
    }
    db.insertItem(item);
    importedCount++;
  }

  // Update exported JSON
  db.exportToJson();

  console.log(`\n🎉 Success! Imported ${importedCount} new items into SQLite database.`);
  console.log(`   Total items in database: ${db.getAllItems().length}\n`);
} catch (err) {
  console.error('❌ Import failed:', err.message);
  process.exit(1);
}
