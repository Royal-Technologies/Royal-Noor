/**
 * Royal Noor — Daily Generation & Publishing Engine
 * Brand: Royal Noor — আলোর পথে প্রতিদিন
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');

const rootDir = path.resolve(__dirname, '..');
const db = require('./db');

// ── 1. Register Embedded Fonts ──
const fontDir = path.join(rootDir, 'assets/fonts');
const fonts = [
  { file: 'Amiri-Regular.ttf', family: 'Amiri' },
  { file: 'Amiri-Bold.ttf', family: 'Amiri' },
  { file: 'HindSiliguri-Regular.ttf', family: 'Hind Siliguri' },
  { file: 'HindSiliguri-Bold.ttf', family: 'Hind Siliguri' }
];

fonts.forEach(f => {
  const fPath = path.join(fontDir, f.file);
  if (fs.existsSync(fPath)) {
    try {
      GlobalFonts.registerFromPath(fPath, f.family);
    } catch (e) {
      console.warn(`[Font] Could not load ${f.file}:`, e.message);
    }
  }
});

// Load Template Engine
const templatePath = path.join(rootDir, 'templates/royal-card.js');
const RoyalCardTemplate = require(templatePath);

// ── 2. Parse CLI Arguments ──
const args = process.argv.slice(2);
function getArg(name, defaultValue = null) {
  const prefix = `--${name}=`;
  const match = args.find(a => a.startsWith(prefix));
  return match ? match.slice(prefix.length) : defaultValue;
}
const isPreview = args.includes('--preview');
const forcedTag = getArg('force-tag', process.env.NOOR_TAG || null);
const forcedType = getArg('force-type', process.env.NOOR_TYPE || null);
const forcedTheme = getArg('theme', process.env.NOOR_THEME || null);
const forcedUid = getArg('uid', null);

// ── 3. Date & Islamic Calendar Intelligence ──
const now = new Date();
const dhakaFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Dhaka',
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
});
const parts = dhakaFormatter.formatToParts(now).reduce((acc, p) => {
  acc[p.type] = p.value;
  return acc;
}, {});

const dayOfWeek = (parts.weekday || '').toLowerCase(); // e.g. 'friday'
const yearStr = parts.year;
const monthStr = parts.month.padStart(2, '0');
const dayStr = parts.day.padStart(2, '0');
const dateKey = `${yearStr}${monthStr}${dayStr}`;

// Detect Islamic Hijri Month
let hijriMonthNumber = null;
let hijriMonthName = '';
try {
  const hijriParts = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
    month: 'numeric',
    day: 'numeric'
  }).formatToParts(now).reduce((acc, p) => {
    acc[p.type] = p.value;
    return acc;
  }, {});
  hijriMonthNumber = parseInt(hijriParts.month, 10);
} catch (e) {
  // Fallback
}

// Determine Event Tag
let detectedEventTag = forcedTag || null;
if (!detectedEventTag) {
  if (hijriMonthNumber === 9) {
    // Ramadan
    detectedEventTag = 'ramadan';
  } else if (hijriMonthNumber === 12) {
    // Dhul-Hijjah
    detectedEventTag = 'dhul_hijjah';
  } else if (hijriMonthNumber === 1) {
    // Muharram
    detectedEventTag = 'ashura';
  } else if (dayOfWeek === 'friday') {
    // Friday
    detectedEventTag = 'friday';
  }
}

console.log(`\n🌙 [Royal Noor] Date: ${dateKey} | Day: ${dayOfWeek} | Hijri Month: ${hijriMonthNumber || 'N/A'}`);
console.log(`🎯 [Royal Noor] Scheduling Target: Event=${detectedEventTag || 'general'} | TargetDay=${dayOfWeek}`);

// ── 4. Pick Item from SQLite ──
db.initDatabase();

let item = null;
if (forcedUid) {
  item = db.getDb().prepare('SELECT * FROM royal_noor_items WHERE uid = ?').get(forcedUid);
} else {
  item = db.pickTodayItem({
    eventTag: detectedEventTag,
    targetDay: dayOfWeek === 'friday' ? 'friday' : null,
    forceType: forcedType
  });
}

if (!item) {
  console.error('❌ No active card found in database!');
  process.exit(1);
}

console.log(`📖 [Selected Item] [${item.uid}] ${item.title} (${item.reference})`);
console.log(`   Type: ${item.type} | Category: ${item.category} | Event: ${item.event_tag} | Used: ${item.used_count} times`);

// ── 5. Select Theme (Serial Rotation across 10 Distinct Royal Designs) ──
const totalGenerations = db.getGenerationCount();
const themeOrder = RoyalCardTemplate.THEME_ORDER || [
  'royal-emerald',
  'midnight-navy',
  'imperial-black',
  'warm-parchment',
  'royal-maroon',
  'ottoman-turquoise',
  'desert-amber',
  'amethyst-violet',
  'andalusian-mihrab',
  'classic-ivory'
];

const serialIndex = totalGenerations % themeOrder.length;
const selectedTheme = forcedTheme || themeOrder[serialIndex];

console.log(`🎨 [Theme] Serial Rotation Step #${totalGenerations + 1}:`);
console.log(`   ► Theme: "${selectedTheme}" (Design ${serialIndex + 1} of ${themeOrder.length})`);

// ── 6. Render 1080x1080 Canvas ──
const canvas = createCanvas(1080, 1080);
RoyalCardTemplate.render(canvas, item, { theme: selectedTheme });

// ── 7. Generate File Paths & Unique ID ──
const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
const cardId = `RN-${dateKey}-${randomHex}`;

const cardsDir = path.join(rootDir, 'cards');
if (!fs.existsSync(cardsDir)) {
  fs.mkdirSync(cardsDir, { recursive: true });
}

const todayPngPath = path.join(cardsDir, 'today.png');
const todayJsonPath = path.join(cardsDir, 'today.json');
const archivePngName = `${cardId}.png`;
const archivePngPath = path.join(cardsDir, archivePngName);

// Save PNG buffer
const pngBuffer = canvas.toBuffer('image/png');
fs.writeFileSync(todayPngPath, pngBuffer);
fs.writeFileSync(archivePngPath, pngBuffer);

// ── 8. Generate Social Media Caption ──
const isQuran = item.type === 'quran';
let eventBanner = '';
if (item.event_tag === 'ramadan') eventBanner = '🌙 মাহে রমজান স্পেশাল\n';
else if (item.event_tag === 'friday' || dayOfWeek === 'friday') eventBanner = '🕌 জুমু\'আ মুবারক\n';

const caption = `${eventBanner}✨ আজকের নূর | Royal Noor — আলোর পথে প্রতিদিন\n\n${item.arabic_text}\n\n❝ ${item.bangla_translation} ❞\n— [ ${item.reference} ]\n\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n🌐 ওয়েবসাইট: https://www.royaltechbd.com/\n🏷️ নিবেদনে: Royal Technologies\n\n#RoyalNoor #AlorPotheProtidin #${isQuran ? 'QuranDaily' : 'HadithOfTheDay'} #IslamicQuotes #DailyAyah #Hadith #RoyalTechnologies #Bangladesh #IslamicReminder`;

// ── 9. Save today.json ──
const repoBaseUrl = 'https://royal-technologies.github.io/Royal-Noor';
const todayJson = {
  cardId: cardId,
  uid: item.uid,
  type: item.type,
  title: item.title,
  reference: item.reference,
  category: item.category,
  eventTag: item.event_tag,
  arabicText: item.arabic_text,
  banglaTranslation: item.bangla_translation,
  theme: selectedTheme,
  caption: caption,
  imageUrl: `${repoBaseUrl}/cards/today.png`,
  archiveUrl: `${repoBaseUrl}/cards/${archivePngName}`,
  website: 'https://www.royaltechbd.com/',
  author: 'Royal Technologies',
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(todayJsonPath, JSON.stringify(todayJson, null, 2), 'utf8');

// ── 10. Update SQLite Database ──
if (!isPreview) {
  db.recordUsage(item.id, {
    cardId: cardId,
    itemUid: item.uid,
    type: item.type,
    title: item.title,
    reference: item.reference,
    eventTag: item.event_tag,
    theme: selectedTheme,
    imagePath: `cards/${archivePngName}`,
    jsonPath: 'cards/today.json',
    caption: caption
  });
  console.log(`✅ [Database] Item ${item.uid} usage recorded and rotation updated.`);
} else {
  console.log('ℹ️ [Preview Mode] Database usage count NOT updated.');
}

console.log(`\n🎉 Success! Daily Islamic card generated:`);
console.log(`   ► Today PNG:    cards/today.png`);
console.log(`   ► Today JSON:   cards/today.json`);
console.log(`   ► Archive PNG:  cards/${archivePngName}`);
console.log(`   ► Card ID:      ${cardId}\n`);
