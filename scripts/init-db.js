/**
 * Initialize / Reset Royal Noor SQLite Database
 */
'use strict';

const db = require('./db');

console.log('🕌 Royal Noor — Initializing SQLite Database...');
try {
  db.initDatabase();
  const all = db.getAllItems();
  console.log(`✅ Success! Database holds ${all.length} items ready for daily generation.`);
} catch (err) {
  console.error('❌ Failed to initialize database:', err);
  process.exit(1);
}
