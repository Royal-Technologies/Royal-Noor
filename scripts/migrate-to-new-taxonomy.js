/**
 * Royal Noor — Migration to Final Content Taxonomy & Relational Schema
 * Brand: Royal Noor — আলোর পথে প্রতিদিন
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const dbHelper = require('./db');
const db = dbHelper.getDb();

console.log('[Migration] Starting migration to Final Content Taxonomy...');

// 1. Run Schema to ensure all new tables exist
const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');
const statements = schemaSql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0);

for (const stmt of statements) {
  try {
    db.exec(stmt + ';');
  } catch (err) {
    // Ignore existing tables/indexes
  }
}
console.log('[Migration] Schema verified and all tables created.');

// 2. Seed Sources (Exactly 2)
const sourcesData = [
  { name_bn: 'পবিত্র কোরআন', name_en: 'Holy Quran', slug: 'quran' },
  { name_bn: 'সহিহ হাদিস', name_en: 'Sahih Hadith', slug: 'sahih-hadith' }
];

const insertSource = db.prepare('INSERT OR IGNORE INTO sources (name_bn, name_en, slug) VALUES (?, ?, ?)');
sourcesData.forEach(s => insertSource.run(s.name_bn, s.name_en, s.slug));

// 3. Seed Categories (Exactly 15)
const categoriesData = [
  { sort_order: 1, name_bn: 'ঈমান ও আল্লাহর ওপর ভরসা', name_en: 'Faith & Tawakkul', slug: 'faith-tawakkul' },
  { sort_order: 2, name_bn: 'নামাজ ও ইবাদত', name_en: 'Prayer & Worship', slug: 'prayer-worship' },
  { sort_order: 3, name_bn: 'দোয়া ও মুনাজাত', name_en: 'Dua & Supplication', slug: 'dua' },
  { sort_order: 4, name_bn: 'জিকির ও ইস্তিগফার', name_en: 'Dhikr & Istighfar', slug: 'dhikr-istighfar' },
  { sort_order: 5, name_bn: 'ধৈর্য ও কৃতজ্ঞতা', name_en: 'Patience & Gratitude', slug: 'patience-gratitude' },
  { sort_order: 6, name_bn: 'তওবা ও ক্ষমা', name_en: 'Repentance & Forgiveness', slug: 'repentance-forgiveness' },
  { sort_order: 7, name_bn: 'উত্তম চরিত্র ও আদব', name_en: 'Good Character & Manners', slug: 'good-character' },
  { sort_order: 8, name_bn: 'হালাল রিজিক ও বরকত', name_en: 'Halal Provision & Blessings', slug: 'halal-rizq' },
  { sort_order: 9, name_bn: 'বাবা-মা ও পরিবারের অধিকার', name_en: 'Parents & Family', slug: 'parents-family' },
  { sort_order: 10, name_bn: 'মানুষের অধিকার ও সামাজিক জীবন', name_en: 'Human Rights & Society', slug: 'human-rights' },
  { sort_order: 11, name_bn: 'গুনাহ থেকে বেঁচে থাকা', name_en: 'Avoiding Sins', slug: 'avoid-sins' },
  { sort_order: 12, name_bn: 'বিপদ-আপদ ও দুশ্চিন্তা', name_en: 'Hardship & Anxiety', slug: 'hardship-anxiety' },
  { sort_order: 13, name_bn: 'সুন্নাহ ও দৈনন্দিন আমল', name_en: 'Sunnah & Daily Practice', slug: 'sunnah-daily-amal' },
  { sort_order: 14, name_bn: 'মৃত্যু ও আখিরাত', name_en: 'Death & Hereafter', slug: 'death-afterlife' },
  { sort_order: 15, name_bn: 'জান্নাত ও জাহান্নাম', name_en: 'Paradise & Hellfire', slug: 'jannah-jahannam' }
];

const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (name_bn, name_en, slug, sort_order) VALUES (?, ?, ?, ?)');
categoriesData.forEach(c => insertCategory.run(c.name_bn, c.name_en, c.slug, c.sort_order));

// 4. Seed Occasions (Exactly 12)
const occasionsData = [
  { sort_order: 1, name_bn: 'জুমুআ', slug: 'jumuah' },
  { sort_order: 2, name_bn: 'রমজান', slug: 'ramadan' },
  { sort_order: 3, name_bn: 'শবে কদর', slug: 'laylatul-qadr' },
  { sort_order: 4, name_bn: 'ঈদুল ফিতর', slug: 'eid-ul-fitr' },
  { sort_order: 5, name_bn: 'ঈদুল আজহা', slug: 'eid-ul-adha' },
  { sort_order: 6, name_bn: 'জিলহজ', slug: 'dhul-hijjah' },
  { sort_order: 7, name_bn: 'আরাফার দিন', slug: 'day-of-arafah' },
  { sort_order: 8, name_bn: 'আশুরা', slug: 'ashura' },
  { sort_order: 9, name_bn: 'মহররম', slug: 'muharram' },
  { sort_order: 10, name_bn: 'হজ ও উমরাহ', slug: 'hajj-umrah' },
  { sort_order: 11, name_bn: 'সোমবার ও বৃহস্পতিবার', slug: 'monday-thursday' },
  { sort_order: 12, name_bn: 'নতুন হিজরি বছর', slug: 'hijri-new-year' }
];

const insertOccasion = db.prepare('INSERT OR IGNORE INTO occasions (name_bn, slug, sort_order) VALUES (?, ?, ?)');
occasionsData.forEach(o => insertOccasion.run(o.name_bn, o.slug, o.sort_order));

// 5. Seed Dua Types (Exactly 12)
const duaTypesData = [
  { sort_order: 1, name_bn: 'সকাল-সন্ধ্যার দোয়া', slug: 'morning-evening' },
  { sort_order: 2, name_bn: 'ঘুম ও জাগরণের দোয়া', slug: 'sleep-waking' },
  { sort_order: 3, name_bn: 'খাবার ও পানীয়ের দোয়া', slug: 'food-drink' },
  { sort_order: 4, name_bn: 'ঘরে প্রবেশ ও বের হওয়ার দোয়া', slug: 'entering-leaving-home' },
  { sort_order: 5, name_bn: 'মসজিদ ও নামাজের দোয়া', slug: 'mosque-prayer' },
  { sort_order: 6, name_bn: 'সফরের দোয়া', slug: 'travel' },
  { sort_order: 7, name_bn: 'অসুস্থতা ও রোগমুক্তির দোয়া', slug: 'illness-healing' },
  { sort_order: 8, name_bn: 'বিপদ-আপদ ও দুশ্চিন্তার দোয়া', slug: 'hardship-anxiety' },
  { sort_order: 9, name_bn: 'রিজিক ও ঋণমুক্তির দোয়া', slug: 'rizq-debt' },
  { sort_order: 10, name_bn: 'বাবা-মা ও সন্তানের জন্য দোয়া', slug: 'parents-children' },
  { sort_order: 11, name_bn: 'ক্ষমা ও তওবার দোয়া', slug: 'forgiveness-repentance' },
  { sort_order: 12, name_bn: 'জান্নাত ও জাহান্নাম থেকে আশ্রয়ের দোয়া', slug: 'jannah-jahannam' }
];

const insertDuaType = db.prepare('INSERT OR IGNORE INTO dua_types (name_bn, slug, sort_order) VALUES (?, ?, ?)');
duaTypesData.forEach(d => insertDuaType.run(d.name_bn, d.slug, d.sort_order));

// 6. Seed Hadith Collections (10 Collections)
const hadithCollectionsData = [
  { sort_order: 1, name_bn: 'সহিহ বুখারি', name_en: 'Sahih al-Bukhari', slug: 'sahih-bukhari' },
  { sort_order: 2, name_bn: 'সহিহ মুসলিম', name_en: 'Sahih Muslim', slug: 'sahih-muslim' },
  { sort_order: 3, name_bn: 'সুনানে আবু দাউদ', name_en: 'Sunan Abi Dawud', slug: 'sunan-abu-dawud' },
  { sort_order: 4, name_bn: 'জামে আত-তিরমিজি', name_en: "Jami' at-Tirmidhi", slug: 'jami-tirmidhi' },
  { sort_order: 5, name_bn: 'সুনানে আন-নাসাঈ', name_en: "Sunan an-Nasa'i", slug: 'sunan-nasai' },
  { sort_order: 6, name_bn: 'সুনানে ইবনে মাজাহ', name_en: 'Sunan Ibn Majah', slug: 'sunan-ibn-majah' },
  { sort_order: 7, name_bn: 'মুয়াত্তা ইমাম মালিক', name_en: 'Muwatta Malik', slug: 'muwatta-malik' },
  { sort_order: 8, name_bn: 'মুসনাদে আহমাদ', name_en: 'Musnad Ahmad', slug: 'musnad-ahmad' },
  { sort_order: 9, name_bn: 'সুনানে দারিমি', name_en: 'Sunan al-Darimi', slug: 'sunan-darimi' },
  { sort_order: 10, name_bn: 'অন্যান্য হাদিস গ্রন্থ', name_en: 'Other Collections', slug: 'other-collections' }
];

const insertHadithCollection = db.prepare('INSERT OR IGNORE INTO hadith_collections (name_bn, name_en, slug, sort_order) VALUES (?, ?, ?, ?)');
hadithCollectionsData.forEach(h => insertHadithCollection.run(h.name_bn, h.name_en, h.slug, h.sort_order));

// 7. Seed Initial Tags
const initialTags = [
  'আল্লাহ', 'রাসুলুল্লাহ', 'ঈমান', 'তাওহিদ', 'তাকওয়া', 'সবর', 'শোকর', 'রহমত', 'মাগফিরাত', 
  'দুনিয়া', 'আখিরাত', 'জান্নাত', 'জাহান্নাম', 'আমল', 'নেকি', 'গুনাহ', 'হেদায়েত', 'রিজিক', 
  'বরকত', 'ক্ষমা', 'ভালোবাসা', 'পরিবার', 'দোয়া', 'তওবা', 'ইখলাস', 'নিয়ত', 'সুন্নাহ', 
  'নামাজ', 'রোজা', 'সদকা', 'ইলম', 'আদব', 'আখলাক', 'মৃত্যু', 'কবর', 'কিয়ামত', 'আত্মশুদ্ধি', 
  'মানবতা', 'ইনসাফ'
];

const insertTag = db.prepare('INSERT OR IGNORE INTO tags (name, slug) VALUES (?, ?)');
initialTags.forEach(t => {
  const slug = t.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, '-');
  insertTag.run(t, slug);
});

console.log('[Migration] All taxonomy reference data seeded successfully.');

// Helper lookups
const sourceMap = {};
db.prepare('SELECT id, slug FROM sources').all().forEach(r => sourceMap[r.slug] = r.id);

const categoryMap = {};
db.prepare('SELECT id, slug FROM categories').all().forEach(r => categoryMap[r.slug] = r.id);

const occasionMap = {};
db.prepare('SELECT id, slug FROM occasions').all().forEach(r => occasionMap[r.slug] = r.id);

const duaTypeMap = {};
db.prepare('SELECT id, slug FROM dua_types').all().forEach(r => duaTypeMap[r.slug] = r.id);

const hadithCollectionMap = {};
db.prepare('SELECT id, slug, name_bn FROM hadith_collections').all().forEach(r => {
  hadithCollectionMap[r.slug] = r.id;
  hadithCollectionMap[r.name_bn] = r.id;
});

const tagMap = {};
db.prepare('SELECT id, name FROM tags').all().forEach(r => tagMap[r.name] = r.id);

// 8. Classify and Migrate Existing 460 Items into `contents`
const existingItems = db.prepare('SELECT * FROM royal_noor_items ORDER BY id ASC').all();
console.log(`[Migration] Migrating ${existingItems.length} items from royal_noor_items to contents...`);

const insertContent = db.prepare(`
  INSERT OR REPLACE INTO contents (
    uid, source_id, hadith_collection_id, title, reference,
    arabic_text, bangla_translation, english_translation,
    status, verification_status, priority, used_count, last_used_at, is_active
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertContentCategory = db.prepare('INSERT OR IGNORE INTO content_categories (content_id, category_id) VALUES (?, ?)');
const insertContentOccasion = db.prepare('INSERT OR IGNORE INTO content_occasions (content_id, occasion_id) VALUES (?, ?)');
const insertContentDuaType = db.prepare('INSERT OR IGNORE INTO content_dua_types (content_id, dua_type_id) VALUES (?, ?)');
const insertContentTag = db.prepare('INSERT OR IGNORE INTO content_tags (content_id, tag_id) VALUES (?, ?)');

let migratedCount = 0;

for (const item of existingItems) {
  const isQuran = item.type === 'quran';
  const sourceId = isQuran ? sourceMap['quran'] : sourceMap['sahih-hadith'];

  // Detect Hadith Collection
  let hadithCollectionId = null;
  if (!isQuran) {
    const ref = (item.reference || '') + ' ' + (item.title || '');
    if (ref.includes('বুখারী') || ref.includes('বুখারি') || ref.includes('Bukhari')) hadithCollectionId = hadithCollectionMap['sahih-bukhari'];
    else if (ref.includes('মুসলিম') || ref.includes('Muslim')) hadithCollectionId = hadithCollectionMap['sahih-muslim'];
    else if (ref.includes('আবু দাউদ') || ref.includes('Abu Dawud')) hadithCollectionId = hadithCollectionMap['sunan-abu-dawud'];
    else if (ref.includes('তিরমিযী') || ref.includes('তিরমিজি') || ref.includes('Tirmidhi')) hadithCollectionId = hadithCollectionMap['jami-tirmidhi'];
    else if (ref.includes('নাসায়ী') || ref.includes('নাসাঈ') || ref.includes("Nasa'i")) hadithCollectionId = hadithCollectionMap['sunan-nasai'];
    else if (ref.includes('ইবনে মাজাহ') || ref.includes('Ibn Majah')) hadithCollectionId = hadithCollectionMap['sunan-ibn-majah'];
    else if (ref.includes('মালিক') || ref.includes('Malik')) hadithCollectionId = hadithCollectionMap['muwatta-malik'];
    else if (ref.includes('আহমাদ') || ref.includes('Ahmad')) hadithCollectionId = hadithCollectionMap['musnad-ahmad'];
    else if (ref.includes('দারিমি') || ref.includes('Darimi')) hadithCollectionId = hadithCollectionMap['sunan-darimi'];
    else hadithCollectionId = hadithCollectionMap['other-collections'];
  }

  // Insert into contents
  const res = insertContent.run(
    item.uid,
    sourceId,
    hadithCollectionId,
    item.title,
    item.reference,
    item.arabic_text,
    item.bangla_translation,
    null, // english_translation (optional)
    'approved',
    'verified',
    item.priority || 1,
    item.used_count || 0,
    item.last_used_at || null,
    item.is_active !== undefined ? item.is_active : 1
  );

  const contentId = res.lastInsertRowid;
  migratedCount++;

  // Map to 15 Categories (can belong to multiple)
  const origCat = item.category || '';
  const text = (item.title + ' ' + item.reference + ' ' + item.bangla_translation + ' ' + origCat).toLowerCase();
  const matchedCategories = new Set();

  // 1. faith-tawakkul (ঈমান ও আল্লাহর ওপর ভরসা)
  if (/ঈমান|তাওহীদ|তাওয়াক্কুল|ভরসা|আল্লাহর সন্তুষ্টি|একত্ববাদ|মুমিন|মু'মিন|মু’মিন|হেদায়েত|হেদায়াত|আল্লাহর মহিমা|আল্লাহর হেফাজত/.test(origCat) ||
      /আল্লাহর ওপর ভরসা|তাওয়াক্কুল|ঈমান এনেছে|তাওহীদ|হেদায়েত দান|আল্লাহর প্রতি ঈমান|মুমিনদের বৈশিষ্ট্য/.test(text)) {
    matchedCategories.add('faith-tawakkul');
  }

  // 2. prayer-worship (নামাজ ও ইবাদত)
  if (/সালাত|নামাজ|সিজদা|ইবাদত|মসজিদ|রুকু|তাহাজ্জুদ|জুমুআ|তারাবীহ/.test(origCat) ||
      /সালাত কায়েম|নামাজ আদায়|সিজদায়|ইবাদত কর|মসজিদে|সালাতের গুরুত্ব|নামাজের সময়/.test(text)) {
    matchedCategories.add('prayer-worship');
  }

  // 3. dua (দোয়া ও মুনাজাত)
  if (/দোয়া|দো’আ|মুনাজাত|প্রার্থনা|রব্বানা|রাব্বানা/.test(origCat) ||
      /দোয়া কর|দোয়া কবুল|প্রার্থনা কর|রব্বানা|রাব্বানা|হে আমাদের রব|আল্লাহুম্মা/.test(text)) {
    matchedCategories.add('dua');
  }

  // 4. dhikr-istighfar (জিকির ও ইস্তিগফার)
  if (/জিকির|যিকির|ইস্তিগফার|তাসবীহ|হামদ|শুকরিয়া|সুবহানাল্লাহ|আলহামদুলিল্লাহ|লা ইলাহা/.test(origCat) ||
      /জিকির|ইস্তিগফার|তাসবীহ পাঠ|সুবহানাল্লাহ|আলহামদুলিল্লাহ|আল্লাহু আকবার|লা হাওলা/.test(text)) {
    matchedCategories.add('dhikr-istighfar');
  }

  // 5. patience-gratitude (ধৈর্য ও কৃতজ্ঞতা)
  if (/ধৈর্য|সবর|কৃতজ্ঞতা|শোকর|শুকরিয়া/.test(origCat) ||
      /ধৈর্য ধারণ|সবর কর|কৃতজ্ঞতা প্রকাশ|শোকর আদায়|ধৈর্যশীলদের|বিপদে সবর/.test(text)) {
    matchedCategories.add('patience-gratitude');
  }

  // 6. repentance-forgiveness (তওবা ও ক্ষমা)
  if (/তওবা|ক্ষমা|অনুশোচনা|মাগফিরাত|পাপ মোচন/.test(origCat) ||
      /তওবা কর|ক্ষমা প্রার্থনা|ক্ষমা করে দাও|পাপ ক্ষমা|ক্ষমাশীল ও দয়ালু/.test(text)) {
    matchedCategories.add('repentance-forgiveness');
  }

  // 7. good-character (উত্তম চরিত্র ও আদব)
  if (/চরিত্র|আদব|আখলাক|বিনয়|নম্রতা|সদাচরণ|লজ্জাশীলতা|মিষ্টি কথা|হাসিমুখ|সৌন্দর্য/.test(origCat) ||
      /উত্তম চরিত্র|সদাচরণ|নম্র ব্যবহার|বিনয়ী আচরণ|লজ্জাশীলতা|হাসিমুখে কথা/.test(text)) {
    matchedCategories.add('good-character');
  }

  // 8. halal-rizq (হালাল রিজিক ও বরকত)
  if (/রিজিক|হালাল|সদকা|দান|বরকত|ব্যবসা|উপার্জন|শ্রম/.test(origCat) ||
      /হালাল রিজিক|সদকা কর|দান-সদকা|উপার্জন|বরকত দান|ব্যবসার সততা/.test(text)) {
    matchedCategories.add('halal-rizq');
  }

  // 9. parents-family (বাবা-মা ও পরিবারের অধিকার)
  if (/পিতামাতা|মাতা-পিতা|মা-বাবা|পিতা|মাতা|পরিবার|সন্তান|স্ত্রী|আত্মীয়|আত্মীয়/.test(origCat) ||
      /পিতামাতা|পিতা-মাতা|মা-বাবা|মায়ের অধিকার|বাবার অধিকার|মায়ের সেবা|সন্তানের লালন|নেক সন্তান|স্ত্রী ও সন্তান|পরিবারের হক|আত্মীয়তার বন্ধন|পিতামাতার/.test(text)) {
    matchedCategories.add('parents-family');
  }

  // 10. human-rights (মানুষের অধিকার ও সামাজিক জীবন)
  if (/হক|ইনসাফ|ন্যায়বিচার|আমানত|মানবতা|সমাজ|প্রতিবেশী|ভ্রাতৃত্ব|সালাম|সহযোগিতা|এতিম|মিসকিন/.test(origCat) ||
      /মানুষের অধিকার|প্রতিবেশীর হক|ন্যায়বিচার|ইনসাফ|ভ্রাতৃত্ববোধ|সালাম দাও|আমানত রক্ষা|এতিমের অধিকার/.test(text)) {
    matchedCategories.add('human-rights');
  }

  // 11. avoid-sins (গুনাহ থেকে বেঁচে থাকা)
  if (/সুদ|ঘুষ|মিথ্যা|যুলুম|জুলুম|গুনাহ|পাপ|অহংকার|শিরক|ধোঁকা|গীবত|অপবাদ|হিংসা|রাগ/.test(origCat) ||
      /সুদ খাওয়া|ঘুষ গ্রহণ|মিথ্যা বলা|জুলুম কর|গুনাহ থেকে|শিরক কর|অহংকার কর|গীবত কর|হিংসা কর|বর্জন কর/.test(text)) {
    matchedCategories.add('avoid-sins');
  }

  // 12. hardship-anxiety (বিপদ-আপদ ও দুশ্চিন্তা)
  if (/বিপদ|দুশ্চিন্তা|কষ্ট|অসুস্থতা|রোগ|ঋণ|ভয়|আশ্রয়/.test(origCat) ||
      /বিপদ-আপদ|দুশ্চিন্তা দূর|কষ্ট লাঘব|রোগমুক্তি|ঋণমুক্তি|ভয় থেকে মুক্তি|আশ্রয় প্রার্থনা/.test(text)) {
    matchedCategories.add('hardship-anxiety');
  }

  // 13. sunnah-daily-amal (সুন্নাহ ও দৈনন্দিন আমল)
  if (/সুন্নাহ|সুন্নত|আমল|ইলম|জ্ঞান|ঘুম|খাবার|পোশাক|ওজু|মেসওয়াক|শিষ্টাচার/.test(origCat) ||
      /সুন্নাত অনুসরণ|নেক আমল|ইলম অর্জন|দৈনন্দিন আমল|সুন্নাত ত্বরিকা/.test(text)) {
    matchedCategories.add('sunnah-daily-amal');
  }

  // 14. death-afterlife (মৃত্যু ও আখিরাত)
  if (/মৃত্যু|আখিরাত|কবর|হাশর|কিয়ামত|মউত|আখেরাত/.test(origCat) ||
      /মৃত্যুর স্মরণ|আখিরাতের সম্বল|কবরের আজাব|কিয়ামতের দিন|হাশরের ময়দান/.test(text)) {
    matchedCategories.add('death-afterlife');
  }

  // 15. jannah-jahannam (জান্নাত ও জাহান্নাম)
  if (/জান্নাত|জাহান্নাম|দোজখ|হুর|আগুন|শাস্তি|নাজাত/.test(origCat) ||
      /জান্নাত লাভ|জাহান্নাম থেকে|জান্নাতুল ফেরদাউস|জাহান্নামের আগুন|শাস্তি থেকে/.test(text)) {
    matchedCategories.add('jannah-jahannam');
  }
  // Fallback category if none matched
  if (matchedCategories.size === 0) {
    matchedCategories.add('good-character');
  }

  matchedCategories.forEach(slug => {
    if (categoryMap[slug]) {
      insertContentCategory.run(contentId, categoryMap[slug]);
    }
  });

  // Map to Occasions
  if (item.event_tag === 'ramadan' || text.includes('রমজান') || text.includes('রোজা') || text.includes('সিয়াম') || text.includes('ইফতার')) {
    insertContentOccasion.run(contentId, occasionMap['ramadan']);
  }
  if (item.event_tag === 'friday' || item.target_day === 'friday' || text.includes('জুমুআ') || text.includes('জুমু\'আ') || text.includes('দরুদ')) {
    insertContentOccasion.run(contentId, occasionMap['jumuah']);
  }
  if (item.event_tag === 'dhul_hijjah' || text.includes('জিলহজ') || text.includes('হজ') || text.includes('কুরবানী')) {
    insertContentOccasion.run(contentId, occasionMap['dhul-hijjah']);
    if (text.includes('হজ')) insertContentOccasion.run(contentId, occasionMap['hajj-umrah']);
  }
  if (text.includes('কদর') || text.includes('লাইলাতুল কদর')) {
    insertContentOccasion.run(contentId, occasionMap['laylatul-qadr']);
  }
  if (text.includes('আশুরা') || text.includes('মহররম')) {
    insertContentOccasion.run(contentId, occasionMap['ashura']);
    insertContentOccasion.run(contentId, occasionMap['muharram']);
  }
  if (text.includes('সোমবার') || text.includes('বৃহস্পতিবার')) {
    insertContentOccasion.run(contentId, occasionMap['monday-thursday']);
  }

  // Map to Dua Types
  if (text.includes('সকাল') || text.includes('সন্ধ্যা') || text.includes('ফজর') || text.includes('মাগরিব')) {
    insertContentDuaType.run(contentId, duaTypeMap['morning-evening']);
  }
  if (text.includes('ঘুম') || text.includes('জাগ্রত') || text.includes('বিছানা')) {
    insertContentDuaType.run(contentId, duaTypeMap['sleep-waking']);
  }
  if (text.includes('খাবার') || text.includes('পানাহার')) {
    insertContentDuaType.run(contentId, duaTypeMap['food-drink']);
  }
  if (text.includes('মসজিদ') || text.includes('সালাত') || text.includes('নামাজ')) {
    insertContentDuaType.run(contentId, duaTypeMap['mosque-prayer']);
  }
  if (text.includes('সফর') || text.includes('যানবাহন')) {
    insertContentDuaType.run(contentId, duaTypeMap['travel']);
  }
  if (text.includes('রোগ') || text.includes('শেফা') || text.includes('আরোগ্য') || text.includes('অসুস্থ')) {
    insertContentDuaType.run(contentId, duaTypeMap['illness-healing']);
  }
  if (text.includes('বিপদ') || text.includes('দুশ্চিন্তা') || text.includes('মুসিবত') || text.includes('কারব')) {
    insertContentDuaType.run(contentId, duaTypeMap['hardship-anxiety']);
  }
  if (text.includes('ঋণ') || text.includes('রিজিক')) {
    insertContentDuaType.run(contentId, duaTypeMap['rizq-debt']);
  }
  if (text.includes('পিতামাতা') || text.includes('মা-বাবা') || text.includes('সন্তান')) {
    insertContentDuaType.run(contentId, duaTypeMap['parents-children']);
  }
  if (text.includes('ক্ষমা') || text.includes('তওবা') || text.includes('মাগফিরাত')) {
    insertContentDuaType.run(contentId, duaTypeMap['forgiveness-repentance']);
  }
  if (text.includes('জান্নাত') || text.includes('জাহান্নাম') || text.includes('জাহান্নাম থেকে মুক্তি')) {
    insertContentDuaType.run(contentId, duaTypeMap['jannah-jahannam']);
  }

  // Map to Tags
  initialTags.forEach(tag => {
    if (text.includes(tag)) {
      insertContentTag.run(contentId, tagMap[tag]);
    }
  });
}

console.log(`[Migration] Successfully migrated ${migratedCount} contents into relational tables!`);

// 9. Export Comprehensive JSON with full taxonomy for the web UI
function exportFullTaxonomyJson() {
  const contents = db.prepare(`
    SELECT c.*, 
           s.name_bn as source_name_bn, s.slug as source_slug,
           h.name_bn as hadith_collection_name_bn, h.slug as hadith_collection_slug
    FROM contents c
    JOIN sources s ON c.source_id = s.id
    LEFT JOIN hadith_collections h ON c.hadith_collection_id = h.id
    WHERE c.is_active = 1
    ORDER BY c.id ASC
  `).all();

  // Populate categories, occasions, dua_types, tags for each content
  for (const c of contents) {
    // Categories
    const cats = db.prepare(`
      SELECT cat.name_bn, cat.slug 
      FROM content_categories cc
      JOIN categories cat ON cc.category_id = cat.id
      WHERE cc.content_id = ?
    `).all(c.id);
    c.categories = cats.map(x => x.name_bn);
    c.category_slugs = cats.map(x => x.slug);

    // Occasions
    const occs = db.prepare(`
      SELECT o.name_bn, o.slug
      FROM content_occasions co
      JOIN occasions o ON co.occasion_id = o.id
      WHERE co.content_id = ?
    `).all(c.id);
    c.occasions = occs.map(x => x.name_bn);
    c.occasion_slugs = occs.map(x => x.slug);

    // Dua Types
    const duas = db.prepare(`
      SELECT d.name_bn, d.slug
      FROM content_dua_types cd
      JOIN dua_types d ON cd.dua_type_id = d.id
      WHERE cd.content_id = ?
    `).all(c.id);
    c.dua_types = duas.map(x => x.name_bn);
    c.dua_type_slugs = duas.map(x => x.slug);

    // Tags
    const tgs = db.prepare(`
      SELECT t.name, t.slug
      FROM content_tags ct
      JOIN tags t ON ct.tag_id = t.id
      WHERE ct.content_id = ?
    `).all(c.id);
    c.tags = tgs.map(x => x.name);
    c.tag_slugs = tgs.map(x => x.slug);

    // Compatibility aliases for existing card rendering engine
    c.type = c.source_slug === 'quran' ? 'quran' : 'hadith';
    c.category = c.categories[0] || 'সাধারণ';
    c.event_tag = c.occasion_slugs[0] || 'general';
  }

  // Full Taxonomy Definition
  const fullPayload = {
    taxonomy: {
      sources: db.prepare('SELECT id, name_bn, name_en, slug FROM sources WHERE is_active = 1 ORDER BY id ASC').all(),
      categories: db.prepare('SELECT id, name_bn, name_en, slug, sort_order FROM categories WHERE is_active = 1 ORDER BY sort_order ASC').all(),
      occasions: db.prepare('SELECT id, name_bn, slug, sort_order FROM occasions WHERE is_active = 1 ORDER BY sort_order ASC').all(),
      dua_types: db.prepare('SELECT id, name_bn, slug, sort_order FROM dua_types WHERE is_active = 1 ORDER BY sort_order ASC').all(),
      hadith_collections: db.prepare('SELECT id, name_bn, name_en, slug, sort_order FROM hadith_collections WHERE is_active = 1 ORDER BY sort_order ASC').all(),
      tags: db.prepare('SELECT id, name, slug FROM tags ORDER BY id ASC').all()
    },
    items: contents
  };

  const dbDir = path.join(__dirname, '..', 'database');
  const itemsJsonPath = path.join(dbDir, 'items.json');
  const itemsJsPath = path.join(dbDir, 'items-data.js');

  fs.writeFileSync(itemsJsonPath, JSON.stringify(fullPayload.items, null, 2), 'utf8');

  const jsContent = `/** Royal Noor — Offline Database Cache with Taxonomy */\n` +
    `window.ROYAL_NOOR_TAXONOMY = ${JSON.stringify(fullPayload.taxonomy, null, 2)};\n` +
    `window.ROYAL_NOOR_DATA = ${JSON.stringify(fullPayload.items, null, 2)};\n`;

  fs.writeFileSync(itemsJsPath, jsContent, 'utf8');
  console.log('[Migration] Exported items.json and items-data.js with full taxonomy!');
}

exportFullTaxonomyJson();
console.log('[Migration] Migration completed 100% successfully!');
