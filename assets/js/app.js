/**
 * Royal Noor — Frontend Application
 * Brand: Royal Noor — আলোর পথে প্রতিদিন
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

let allItems = [];
let filteredItems = [];
let currentFilter = 'all';
let currentSearch = '';
let activePreviewItem = null;
let currentPreviewTheme = 'royal-emerald';

// ── DOM Elements ──
const elements = {
  cardsGrid: document.getElementById('cardsGrid'),
  searchInput: document.getElementById('searchInput'),
  filterPills: document.getElementById('filterPills'),
  statTotal: document.getElementById('statTotal'),
  statQuran: document.getElementById('statQuran'),
  statHadith: document.getElementById('statHadith'),
  statRamadan: document.getElementById('statRamadan'),
  statFriday: document.getElementById('statFriday'),
  todayImg: document.getElementById('todayImg'),
  todayTitle: document.getElementById('todayTitle'),
  todayArabic: document.getElementById('todayArabic'),
  todayBangla: document.getElementById('todayBangla'),
  todayRef: document.getElementById('todayRef'),
  todayBadge: document.getElementById('todayBadge'),
  btnCopyCaption: document.getElementById('btnCopyCaption'),
  btnDownloadToday: document.getElementById('btnDownloadToday'),
  themeToggle: document.getElementById('themeToggle'),
  addModal: document.getElementById('addModal'),
  previewModal: document.getElementById('previewModal'),
  previewCanvas: document.getElementById('previewCanvas'),
  previewThemeSelect: document.getElementById('previewThemeSelect'),
  btnDownloadPreview: document.getElementById('btnDownloadPreview')
};

// ── Initialize App ──
document.addEventListener('DOMContentLoaded', async () => {
  setupTheme();
  await loadTodayData();
  await loadItemsData();
  setupEventListeners();
});

// ── Load Today's Featured Card ──
async function loadTodayData() {
  try {
    const res = await fetch('cards/today.json?t=' + Date.now());
    if (!res.ok) throw new Error('Today card not found');
    const data = await res.json();

    if (elements.todayImg) elements.todayImg.src = data.imageUrl || 'cards/today.png';
    if (elements.todayTitle) elements.todayTitle.textContent = data.title || 'আজকের নূর';
    if (elements.todayArabic) elements.todayArabic.textContent = data.arabicText || '';
    if (elements.todayBangla) elements.todayBangla.textContent = `❝ ${data.banglaTranslation || ''} ❞`;
    if (elements.todayRef) elements.todayRef.textContent = `— [ ${data.reference || ''} ]`;

    if (elements.todayBadge) {
      if (data.eventTag === 'ramadan') elements.todayBadge.textContent = '🌙 মাহে রমজান স্পেশাল';
      else if (data.eventTag === 'friday') elements.todayBadge.textContent = '🕌 জুমু\'আ মুবারক স্পেশাল';
      else elements.todayBadge.textContent = data.type === 'quran' ? '📖 পবিত্র কোরআন' : '✨ সহীহ হাদিস';
    }

    if (elements.btnCopyCaption) {
      elements.btnCopyCaption.onclick = () => {
        navigator.clipboard.writeText(data.caption);
        showToast('📋 সোশ্যাল মিডিয়া ক্যাপশন কপি করা হয়েছে!');
      };
    }

    if (elements.btnDownloadToday) {
      elements.btnDownloadToday.href = data.imageUrl || 'cards/today.png';
      elements.btnDownloadToday.download = `RoyalNoor-${data.cardId || 'Today'}.png`;
    }
  } catch (err) {
    console.warn('Today data fallback:', err);
  }
}

// ── Load All Items from JSON ──
async function loadItemsData() {
  try {
    let res = await fetch('database/items.json?t=' + Date.now());
    if (!res.ok) {
      res = await fetch('database/seed-data.json?t=' + Date.now());
    }
    allItems = await res.json();

    // Check localStorage for any newly added items
    const localSaved = JSON.parse(localStorage.getItem('rn_custom_items') || '[]');
    if (localSaved.length > 0) {
      allItems = [...localSaved, ...allItems];
    }

    updateStats();
    renderCards(allItems);
  } catch (err) {
    console.error('Failed to load items:', err);
    if (elements.cardsGrid) {
      elements.cardsGrid.innerHTML = `
        <div class="empty-state">
          <span>⚠️</span>
          <h3>তথ্য লোড হতে সমস্যা হয়েছে</h3>
          <p>অনুগ্রহ করে সার্ভার রানিং রাখুন অথবা ফাইল চেক করুন।</p>
        </div>
      `;
    }
  }
}

// ── Update Live Stats ──
function updateStats() {
  const total = allItems.length;
  const quran = allItems.filter(i => i.type === 'quran').length;
  const hadith = allItems.filter(i => i.type === 'hadith').length;
  const ramadan = allItems.filter(i => i.event_tag === 'ramadan').length;
  const friday = allItems.filter(i => i.event_tag === 'friday' || i.target_day === 'friday').length;

  if (elements.statTotal) elements.statTotal.textContent = total;
  if (elements.statQuran) elements.statQuran.textContent = quran;
  if (elements.statHadith) elements.statHadith.textContent = hadith;
  if (elements.statRamadan) elements.statRamadan.textContent = ramadan;
  if (elements.statFriday) elements.statFriday.textContent = friday;
}

// ── Filter and Search Logic ──
function filterItems() {
  filteredItems = allItems.filter(item => {
    // 1. Tag / Category filter
    let matchesCategory = true;
    if (currentFilter === 'quran') matchesCategory = item.type === 'quran';
    else if (currentFilter === 'hadith') matchesCategory = item.type === 'hadith';
    else if (currentFilter === 'ramadan') matchesCategory = item.event_tag === 'ramadan';
    else if (currentFilter === 'friday') matchesCategory = item.event_tag === 'friday' || item.target_day === 'friday';
    else if (currentFilter === 'dhul_hijjah') matchesCategory = item.event_tag === 'dhul_hijjah';
    else if (currentFilter !== 'all') matchesCategory = item.category === currentFilter;

    // 2. Search term
    let matchesSearch = true;
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      matchesSearch =
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.reference && item.reference.toLowerCase().includes(q)) ||
        (item.arabic_text && item.arabic_text.toLowerCase().includes(q)) ||
        (item.bangla_translation && item.bangla_translation.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.event_tag && item.event_tag.toLowerCase().includes(q));
    }

    return matchesCategory && matchesSearch;
  });

  renderCards(filteredItems);
}

// ── Render Cards to DOM ──
function renderCards(items) {
  if (!elements.cardsGrid) return;

  if (items.length === 0) {
    elements.cardsGrid.innerHTML = `
      <div class="empty-state">
        <span>🔍</span>
        <h3>কোনো তথ্য পাওয়া যায়নি</h3>
        <p>ভিন্ন কোনো শব্দ দিয়ে অনুসন্ধান করুন অথবা ফিল্টার পরিবর্তন করুন।</p>
      </div>
    `;
    return;
  }

  elements.cardsGrid.innerHTML = items.map((item, index) => {
    const isQuran = item.type === 'quran';
    const typeLabel = isQuran ? '📖 পবিত্র কোরআন' : '✨ সহীহ হাদিস';
    let eventBadge = '';
    if (item.event_tag === 'ramadan') {
      eventBadge = '<span class="badge badge-gold">🌙 রমজান</span>';
    } else if (item.event_tag === 'friday' || item.target_day === 'friday') {
      eventBadge = '<span class="badge badge-teal">🕌 জুমু\'আ</span>';
    }

    return `
      <div class="item-card" data-id="${item.id || index}">
        <div>
          <div class="card-header-row">
            <div class="card-meta-left">
              <span class="card-num">#${index + 1}</span>
              <span class="badge ${isQuran ? 'badge-teal' : 'badge-gold'}">${typeLabel}</span>
              ${eventBadge}
            </div>
            <span class="badge" style="background:var(--soft-bg);">${item.category || 'সাধারণ'}</span>
          </div>

          <div class="card-arabic-box">${escapeHtml(item.arabic_text)}</div>
          <div class="card-bangla-box">❝ ${escapeHtml(item.bangla_translation)} ❞</div>
        </div>

        <div class="card-footer-row">
          <div class="card-ref-tag">${escapeHtml(item.reference || item.title)}</div>
          <div class="card-actions-row">
            <button class="btn-icon" title="আরবি কপি করুন" onclick="copyText('${escapeAttr(item.arabic_text)}')">
              📋
            </button>
            <button class="btn-icon" title="বাংলা কপি করুন" onclick="copyText('${escapeAttr(item.bangla_translation + ' — [' + item.reference + ']')}')">
              ✍️
            </button>
            <button class="btn btn-gold" style="padding:4px 12px; font-size:13px;" onclick="openPreviewModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
              🖼️ কার্ড বানান
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ── Event Listeners ──
function setupEventListeners() {
  // Search Input
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      filterItems();
    });
  }

  // Filter Pills
  if (elements.filterPills) {
    elements.filterPills.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        elements.filterPills.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter') || 'all';
        filterItems();
      }
    });
  }

  // Theme Toggle (Dark / Light)
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('rn_theme', isLight ? 'light' : 'dark');
      elements.themeToggle.textContent = isLight ? '🌙 ডার্ক মোড' : '☀️ লাইট মোড';
    });
  }

  // Preview Theme Switcher
  if (elements.previewThemeSelect) {
    elements.previewThemeSelect.addEventListener('change', (e) => {
      currentPreviewTheme = e.target.value;
      if (activePreviewItem) {
        renderPreviewCanvas(activePreviewItem, currentPreviewTheme);
      }
    });
  }
}

// ── Canvas Preview Modal ──
function openPreviewModal(item) {
  activePreviewItem = item;
  renderPreviewCanvas(item, currentPreviewTheme);
  if (elements.previewModal) elements.previewModal.classList.add('active');
}

function closePreviewModal() {
  if (elements.previewModal) elements.previewModal.classList.remove('active');
  activePreviewItem = null;
}

function renderPreviewCanvas(item, theme) {
  if (!elements.previewCanvas || !window.RoyalCardTemplate) return;
  elements.previewCanvas.width = 1080;
  elements.previewCanvas.height = 1080;

  window.RoyalCardTemplate.render(elements.previewCanvas, item, { theme: theme });

  if (elements.btnDownloadPreview) {
    elements.btnDownloadPreview.onclick = () => {
      const dataUrl = elements.previewCanvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `RoyalNoor-${item.uid || 'Card'}.png`;
      a.click();
      showToast('📥 কার্ড ডাউনলোড সম্পন্ন হয়েছে!');
    };
  }
}

// ── Add New Entry Modal ──
function openAddModal() {
  if (elements.addModal) elements.addModal.classList.add('active');
}

function closeAddModal() {
  if (elements.addModal) elements.addModal.classList.remove('active');
}

function saveNewEntry(event) {
  event.preventDefault();
  const form = event.target;
  const newItem = {
    uid: `RN-USER-${Date.now().toString(36).toUpperCase()}`,
    type: form.type.value,
    title: form.title.value.trim(),
    reference: form.reference.value.trim(),
    arabic_text: form.arabic_text.value.trim(),
    bangla_translation: form.bangla_translation.value.trim(),
    category: form.category.value.trim() || 'সাধারণ',
    event_tag: form.event_tag.value || 'general',
    target_day: form.event_tag.value === 'friday' ? 'friday' : null,
    priority: parseInt(form.priority.value, 10) || 1,
    used_count: 0,
    created_at: new Date().toISOString()
  };

  // Save to LocalStorage
  const localSaved = JSON.parse(localStorage.getItem('rn_custom_items') || '[]');
  localSaved.unshift(newItem);
  localStorage.setItem('rn_custom_items', JSON.stringify(localSaved));

  allItems.unshift(newItem);
  updateStats();
  filterItems();
  closeAddModal();
  form.reset();

  showToast('✅ নতুন কার্ড সফলভাবে যুক্ত হয়েছে!');
}

function exportCustomJson() {
  const localSaved = JSON.parse(localStorage.getItem('rn_custom_items') || '[]');
  if (localSaved.length === 0) {
    alert('কোনো নতুন কাস্টম এন্ট্রি পাওয়া যায়নি!');
    return;
  }
  const blob = new Blob([JSON.stringify(localSaved, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'imports.json';
  a.click();
  showToast('📥 imports.json ডাউনলোড সম্পন্ন! আপনি এটি database/imports.json-এ রেখে npm run import চালাতে পারেন।');
}

// ── Helper Utilities ──
function setupTheme() {
  const saved = localStorage.getItem('rn_theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    if (elements.themeToggle) elements.themeToggle.textContent = '🌙 ডার্ক মোড';
  }
}

function copyText(text) {
  navigator.clipboard.writeText(text);
  showToast('📋 টেক্সট কপি করা হয়েছে!');
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #0f766e;
    color: #fff;
    padding: 12px 22px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    z-index: 9999;
    animation: fadeIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, ' ');
}

// Expose functions globally for HTML inline handlers
window.copyText = copyText;
window.openPreviewModal = openPreviewModal;
window.closePreviewModal = closePreviewModal;
window.openAddModal = openAddModal;
window.closeAddModal = closeAddModal;
window.saveNewEntry = saveNewEntry;
window.exportCustomJson = exportCustomJson;
