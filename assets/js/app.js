/**
 * Royal Noor — Frontend Application
 * Brand: Royal Noor — আলোর পথে প্রতিদিন
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

let allItems = [];
let filteredItems = [];
let currentSource = 'all';          // 'all' | 'quran' | 'hadith'
let selectedCategories = new Set(); // e.g. Set{'faith-tawakkul', 'dua'}
let selectedOccasions = new Set();  // e.g. Set{'jumuah', 'ramadan'}
let currentSearch = '';
let activePreviewItem = null;
let currentPreviewLayout = 'mihrab-arch';
let currentPreviewTheme = 'royal-emerald';

// ── DOM Elements ──
const elements = {
  cardsGrid: document.getElementById('cardsGrid'),
  searchInput: document.getElementById('searchInput'),
  filterSource: document.getElementById('filterSource'),
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
  btnShareToday: document.getElementById('btnShareToday'),
  themeToggle: document.getElementById('themeToggle'),
  addModal: document.getElementById('addModal'),
  previewModal: document.getElementById('previewModal'),
  previewCanvas: document.getElementById('previewCanvas'),
  previewLayoutSelect: document.getElementById('previewLayoutSelect'),
  previewThemeSelect: document.getElementById('previewThemeSelect'),
  btnRandomCombo: document.getElementById('btnRandomCombo'),
  btnDownloadPreview: document.getElementById('btnDownloadPreview'),
  btnSharePreview: document.getElementById('btnSharePreview'),
  shareModal: document.getElementById('shareModal'),
  btnShareCopyImage: document.getElementById('btnShareCopyImage'),
  btnShareWhatsApp: document.getElementById('btnShareWhatsApp'),
  btnShareFacebook: document.getElementById('btnShareFacebook'),
  btnShareTelegram: document.getElementById('btnShareTelegram'),
  btnShareCopyLink: document.getElementById('btnShareCopyLink')
};

// ── Initialize App ──
document.addEventListener('DOMContentLoaded', async () => {
  setupTheme();
  await loadTodayData();
  await loadItemsData();
  setupEventListeners();
  setupMultiSelects();
});

// ── Load Today's Featured Card ──
async function loadTodayData() {
  let data = null;
  try {
    const res = await fetch('cards/today.json?t=' + Date.now());
    if (res.ok) data = await res.json();
  } catch (err) {}

  if (!data && window.ROYAL_NOOR_TODAY) data = window.ROYAL_NOOR_TODAY;
  if (!data) return;

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
      showToast('📋 সোশ্যাল মিডিয়া ক্যাপশন কপি করা হয়েছে!');
    };
  }

  if (elements.btnDownloadToday) {
    elements.btnDownloadToday.href = data.imageUrl || 'cards/today.png';
    elements.btnDownloadToday.download = `RoyalNoor-${data.cardId || 'Today'}.png`;
  }

  if (elements.btnShareToday) {
    elements.btnShareToday.onclick = () => {
      shareCardImage('cards/today.png', `RoyalNoor-${data.cardId || 'Today'}.png`, data.imageUrl);
    };
  }
}

// ── Load All Items ──
async function loadItemsData() {
  if (window.ROYAL_NOOR_DATA && Array.isArray(window.ROYAL_NOOR_DATA) && window.ROYAL_NOOR_DATA.length > 0) {
    allItems = window.ROYAL_NOOR_DATA;
    updateStats();
    renderCards(allItems);
  }

  try {
    const res = await fetch('database/items.json?t=' + Date.now());
    if (res.ok) {
      allItems = await res.json();
      updateStats();
      renderCards(allItems);
    }
  } catch (err) {}
}

// ── Update Live Stats ──
function updateStats() {
  const total = allItems.length;
  const quran = allItems.filter(i => i.type === 'quran').length;
  const hadith = allItems.filter(i => i.type === 'hadith').length;
  const ramadan = allItems.filter(i =>
    (Array.isArray(i.occasion_slugs) && i.occasion_slugs.includes('ramadan')) ||
    i.event_tag === 'ramadan'
  ).length;
  const friday = allItems.filter(i =>
    (Array.isArray(i.occasion_slugs) && i.occasion_slugs.includes('jumuah')) ||
    i.event_tag === 'friday' || i.target_day === 'friday'
  ).length;

  if (elements.statTotal) elements.statTotal.textContent = total;
  if (elements.statQuran) elements.statQuran.textContent = quran;
  if (elements.statHadith) elements.statHadith.textContent = hadith;
  if (elements.statRamadan) elements.statRamadan.textContent = ramadan;
  if (elements.statFriday) elements.statFriday.textContent = friday;

  // Stat cards click to filter
  const statCardTotal = document.getElementById('statCardTotal');
  const statCardQuran = document.getElementById('statCardQuran');
  const statCardHadith = document.getElementById('statCardHadith');
  const statCardRamadan = document.getElementById('statCardRamadan');
  const statCardFriday = document.getElementById('statCardFriday');

  if (statCardTotal) statCardTotal.onclick = () => { currentSource = 'all'; if (elements.filterSource) elements.filterSource.value = 'all'; filterItems(); };
  if (statCardQuran) statCardQuran.onclick = () => { currentSource = 'quran'; if (elements.filterSource) elements.filterSource.value = 'quran'; filterItems(); };
  if (statCardHadith) statCardHadith.onclick = () => { currentSource = 'hadith'; if (elements.filterSource) elements.filterSource.value = 'hadith'; filterItems(); };
  if (statCardRamadan) statCardRamadan.onclick = () => {
    selectedOccasions.clear(); selectedOccasions.add('ramadan');
    resetMultiSelect('occasionDropdown', 'occasionDisplay');
    const cb = document.querySelector('#occasionDropdown input[value="ramadan"]');
    if (cb) { cb.checked = true; updateMultiDisplay('occasionDisplay', 'occasionDropdown'); }
    filterItems();
  };
  if (statCardFriday) statCardFriday.onclick = () => {
    selectedOccasions.clear(); selectedOccasions.add('jumuah');
    resetMultiSelect('occasionDropdown', 'occasionDisplay');
    const cb = document.querySelector('#occasionDropdown input[value="jumuah"]');
    if (cb) { cb.checked = true; updateMultiDisplay('occasionDisplay', 'occasionDropdown'); }
    filterItems();
  };
}

// ── Combined Filter Logic ──
function filterItems() {
  filteredItems = allItems.filter(item => {
    // 1. Source filter
    if (currentSource === 'quran' && item.type !== 'quran') return false;
    if (currentSource === 'hadith' && item.type !== 'hadith') return false;

    // 2. Category multi-filter (item must match ANY selected)
    if (selectedCategories.size > 0) {
      const itemCats = Array.isArray(item.category_slugs) ? item.category_slugs : [];
      if (![...selectedCategories].some(s => itemCats.includes(s))) return false;
    }

    // 3. Occasion multi-filter (item must match ANY selected)
    if (selectedOccasions.size > 0) {
      const itemOccs = Array.isArray(item.occasion_slugs) ? item.occasion_slugs : [];
      // Also check legacy event_tag
      const legacyOccMap = { ramadan: 'ramadan', friday: 'jumuah', dhul_hijjah: 'dhul-hijjah' };
      const legacySlug = legacyOccMap[item.event_tag] || null;
      if (![...selectedOccasions].some(s => itemOccs.includes(s) || s === legacySlug)) return false;
    }

    // 4. Search term
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      return (
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.reference && item.reference.toLowerCase().includes(q)) ||
        (item.arabic_text && item.arabic_text.toLowerCase().includes(q)) ||
        (item.bangla_translation && item.bangla_translation.toLowerCase().includes(q)) ||
        (Array.isArray(item.categories) && item.categories.join(' ').toLowerCase().includes(q)) ||
        (Array.isArray(item.occasions) && item.occasions.join(' ').toLowerCase().includes(q))
      );
    }

    return true;
  });

  renderCards(filteredItems);
  // active chips row removed
}

// ── Multi-Select Dropdown Component ──
function setupMultiSelects() {
  setupMultiSelect('categoryDisplay', 'categoryDropdown', () => {
    selectedCategories = new Set(getCheckedValues('categoryDropdown'));
    filterItems();
  });

  setupMultiSelect('occasionDisplay', 'occasionDropdown', () => {
    selectedOccasions = new Set(getCheckedValues('occasionDropdown'));
    filterItems();
  });
}

function setupMultiSelect(displayId, dropdownId, onChange) {
  const display = document.getElementById(displayId);
  const dropdown = document.getElementById(dropdownId);
  if (!display || !dropdown) return;

  const wrap = display.closest('.multi-select');

  display.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.multi-select.open').forEach(el => {
      if (el !== wrap) el.classList.remove('open');
    });
    wrap.classList.toggle('open');
  });

  dropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      onChange();
      updateMultiDisplay(displayId, dropdownId);
    });
  });

  document.addEventListener('click', (e) => {
    if (wrap && !wrap.contains(e.target)) wrap.classList.remove('open');
  });
}

function getCheckedValues(dropdownId) {
  const el = document.getElementById(dropdownId);
  if (!el) return [];
  return [...el.querySelectorAll('input[type="checkbox"]:checked')].map(cb => cb.value);
}

function updateMultiDisplay(displayId, dropdownId) {
  const display = document.getElementById(displayId);
  if (!display) return;
  const checked = getCheckedValues(dropdownId);
  const placeholder = display.dataset.placeholder || 'সব';
  const arrow = '<span class="multi-arrow">▾</span>';

  if (checked.length === 0) {
    display.innerHTML = `<span class="multi-placeholder" style="color:var(--text-muted); font-size:13.5px;">${placeholder}</span>${arrow}`;
    return;
  }

  const dropdown = document.getElementById(dropdownId);
  const firstVal = checked[0];
  const firstLabelEl = dropdown ? dropdown.querySelector(`input[value="${firstVal}"]`)?.closest('label') : null;
  const firstLabel = firstLabelEl ? firstLabelEl.textContent.trim() : firstVal;

  const firstChip = `<span class="multi-chip" style="max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${firstLabel}">${firstLabel} <span class="multi-chip-remove" data-val="${firstVal}" data-dropdown="${dropdownId}" data-display="${displayId}">✕</span></span>`;

  const extraBadge = checked.length > 1
    ? `<span class="multi-chip" style="font-weight:700; flex-shrink:0;">+${checked.length - 1}</span>`
    : '';

  display.innerHTML = `
    <div style="display:flex; align-items:center; gap:5px; overflow:hidden; flex:1; white-space:nowrap;">
      ${firstChip}
      ${extraBadge}
    </div>
    ${arrow}
  `;

  // Attach chip remove listener
  const removeBtn = display.querySelector('.multi-chip-remove');
  if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cb = document.getElementById(removeBtn.dataset.dropdown)?.querySelector(`input[value="${removeBtn.dataset.val}"]`);
      if (cb) {
        cb.checked = false;
        cb.dispatchEvent(new Event('change'));
      }
    });
  }
}

function resetMultiSelect(dropdownId, displayId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) dropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  updateMultiDisplay(displayId, dropdownId);
}

// ── Active Filter Chips ──
let _activeChipClears = [];
function renderActiveChips() {
  const row = document.getElementById('activeChipsRow');
  if (!row) return;
  _activeChipClears = [];
  const chips = [];

  if (currentSource !== 'all') {
    const labels = { quran: '📖 পবিত্র কোরআন', hadith: '✨ সহীহ হাদিস' };
    chips.push({ label: labels[currentSource] || currentSource, clear: () => {
      currentSource = 'all'; if (elements.filterSource) elements.filterSource.value = 'all'; filterItems();
    }});
  }

  selectedCategories.forEach(slug => {
    const cb = document.querySelector(`#categoryDropdown input[value="${slug}"]`);
    const label = cb?.closest('label')?.textContent?.trim() || slug;
    chips.push({ label: `বিষয়: ${label}`, clear: () => {
      selectedCategories.delete(slug);
      const c = document.querySelector(`#categoryDropdown input[value="${slug}"]`);
      if (c) { c.checked = false; updateMultiDisplay('categoryDisplay', 'categoryDropdown'); }
      filterItems();
    }});
  });

  selectedOccasions.forEach(slug => {
    const cb = document.querySelector(`#occasionDropdown input[value="${slug}"]`);
    const label = cb?.closest('label')?.textContent?.trim() || slug;
    chips.push({ label: `উপলক্ষ: ${label}`, clear: () => {
      selectedOccasions.delete(slug);
      const c = document.querySelector(`#occasionDropdown input[value="${slug}"]`);
      if (c) { c.checked = false; updateMultiDisplay('occasionDisplay', 'occasionDropdown'); }
      filterItems();
    }});
  });

  if (chips.length === 0) { row.style.display = 'none'; return; }

  _activeChipClears = chips.map(c => c.clear);
  row.style.display = 'flex';
  row.innerHTML = '<span style="font-size:12px;color:var(--text-muted);font-weight:600;white-space:nowrap;">সক্রিয় ফিল্টার:</span> ' +
    chips.map((c, i) => `<span class="active-chip">${escapeHtml(c.label)} <button onclick="clearChip(${i})">✕</button></span>`).join('');
}

window.clearChip = function(i) {
  if (_activeChipClears[i]) _activeChipClears[i]();
};

// ── Render Cards to DOM ──
function renderCards(items) {
  if (!elements.cardsGrid) return;

  if (items.length === 0) {
    elements.cardsGrid.innerHTML = `
      <div class="empty-state">
        <span>🔍</span>
        <h3>কোনো তথ্য পাওয়া যায়নি</h3>
        <p>ভিন্ন কোনো শব্দ দিয়ে অনুসন্ধান করুন অথবা ফিল্টার পরিবর্তন করুন।</p>
      </div>
    `;
    return;
  }

  elements.cardsGrid.innerHTML = items.map((item, index) => {
    const isQuran = item.type === 'quran';
    const typeLabel = isQuran ? '📖 পবিত্র কোরআন' : '✨ সহীহ হাদিস';
    const catLabel = Array.isArray(item.categories) && item.categories.length > 0
      ? item.categories[0]
      : (item.category || 'সাধারণ');
    const occLabel = Array.isArray(item.occasions) && item.occasions.length > 0
      ? `<span class="badge badge-gold">${item.occasions[0]}</span>` : '';

    return `
      <div class="item-card" data-id="${item.id || index}">
        <div>
          <div class="card-header-row">
            <div class="card-meta-left">
              <span class="card-num">#${index + 1}</span>
              <span class="badge ${isQuran ? 'badge-teal' : 'badge-gold'}">${typeLabel}</span>
            </div>
            <div class="card-meta-right">
              ${Array.isArray(item.occasions) && item.occasions.length > 0
                ? `<span class="badge badge-gold" style="font-size:11.5px;">🌙 ${escapeHtml(item.occasions[0])}</span>`
                : `<span class="badge" style="background:var(--soft-bg); font-size:11.5px; border:1px solid var(--card-border);">${escapeHtml(catLabel)}</span>`
              }
            </div>
          </div>

          <div class="card-arabic-box">${escapeHtml(item.arabic_text)}</div>
          <div class="card-bangla-box">❝ ${escapeHtml(item.bangla_translation)} ❞</div>
        </div>

        <div class="card-footer-row">
          <div class="card-ref-tag">${escapeHtml(item.reference || item.title)}</div>
          <div class="card-actions-row">
            <button class="btn-icon" title="আরবি কপি করুন" onclick="copyText('${escapeAttr(item.arabic_text)}')">📋</button>
            <button class="btn-icon" title="বাংলা কপি করুন" onclick="copyText('${escapeAttr(item.bangla_translation + ' — [' + item.reference + ']')}')">✍️</button>
            <button class="btn btn-gold" style="padding:4px 12px; font-size:13px;" onclick="openPreviewModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">🖼️ কার্ড বানান</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ── Event Listeners ──
function setupEventListeners() {
  // Search
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      filterItems();
    });
  }

  // Source dropdown
  if (elements.filterSource) {
    elements.filterSource.addEventListener('change', (e) => {
      currentSource = e.target.value;
      filterItems();
    });
  }

  // Apply Filter button
  const btnApply = document.getElementById('btnApplyFilters');
  if (btnApply) btnApply.addEventListener('click', filterItems);

  
  // Scroll to Top Floating Button
  const btnScrollTop = document.getElementById('btnScrollTop');
  if (btnScrollTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnScrollTop.classList.add('visible');
      } else {
        btnScrollTop.classList.remove('visible');
      }
    }, { passive: true });

    btnScrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Reset Filters button
  const btnReset = document.getElementById('btnResetFilters');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      currentSource = 'all';
      selectedCategories.clear();
      selectedOccasions.clear();
      currentSearch = '';
      if (elements.filterSource) elements.filterSource.value = 'all';
      if (elements.searchInput) elements.searchInput.value = '';
      resetMultiSelect('categoryDropdown', 'categoryDisplay');
      resetMultiSelect('occasionDropdown', 'occasionDisplay');
      filterItems();
      showToast('↺ সব ফিল্টার রিসেট হয়েছে!');
    });
  }

  // Theme Toggle
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('rn_theme', isLight ? 'light' : 'dark');
      elements.themeToggle.textContent = isLight ? '🌙 ডার্ক মোড' : '☀️ লাইট মোড';
    });
  }

  // Preview Layout Switcher
  if (elements.previewLayoutSelect) {
    elements.previewLayoutSelect.addEventListener('change', (e) => {
      currentPreviewLayout = e.target.value;
      if (activePreviewItem) renderPreviewCanvas(activePreviewItem, currentPreviewLayout, currentPreviewTheme);
    });
  }

  // Preview Theme Switcher
  if (elements.previewThemeSelect) {
    elements.previewThemeSelect.addEventListener('change', (e) => {
      currentPreviewTheme = e.target.value;
      if (activePreviewItem) renderPreviewCanvas(activePreviewItem, currentPreviewLayout, currentPreviewTheme);
    });
  }

  // Random Combo Button
  if (elements.btnRandomCombo) {
    elements.btnRandomCombo.addEventListener('click', () => {
      if (!window.RoyalCardTemplate) return;
      const layouts = window.RoyalCardTemplate.LAYOUT_KEYS || Object.keys(window.RoyalCardTemplate.LAYOUTS || {});
      const themes = window.RoyalCardTemplate.THEME_KEYS || Object.keys(window.RoyalCardTemplate.THEMES || {});
      currentPreviewLayout = layouts[Math.floor(Math.random() * layouts.length)];
      currentPreviewTheme = themes[Math.floor(Math.random() * themes.length)];
      if (elements.previewLayoutSelect) elements.previewLayoutSelect.value = currentPreviewLayout;
      if (elements.previewThemeSelect) elements.previewThemeSelect.value = currentPreviewTheme;
      if (activePreviewItem) renderPreviewCanvas(activePreviewItem, currentPreviewLayout, currentPreviewTheme);
      showToast('🎲 নতুন র‍্যান্ডম ডিজাইন ও কালার কম্বিনেশন রেন্ডার হয়েছে!');
    });
  }

  // Share Modal Buttons
  if (elements.btnShareCopyImage) {
    elements.btnShareCopyImage.addEventListener('click', async () => {
      if (activeShareBlob && navigator.clipboard && window.ClipboardItem) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': activeShareBlob })]);
          showToast('📋 কার্ড ইমেজটি ক্লিপবোর্ডে কপি হয়েছে!');
          closeShareModal(); return;
        } catch (e) { console.warn(e); }
      }
      showToast('⚠️ ইমেজ কপি করা যায়নি। ডাউনলোড বাটন ব্যবহার করুন।');
    });
  }

  if (elements.btnShareWhatsApp) {
    elements.btnShareWhatsApp.addEventListener('click', () => {
      window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent('Royal Noor — আলোর পথে প্রতিদিন\n' + (activeShareUrl || window.location.href)), '_blank');
      closeShareModal();
    });
  }

  if (elements.btnShareFacebook) {
    elements.btnShareFacebook.addEventListener('click', () => {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(activeShareUrl || window.location.href), '_blank');
      closeShareModal();
    });
  }

  if (elements.btnShareTelegram) {
    elements.btnShareTelegram.addEventListener('click', () => {
      window.open('https://t.me/share/url?url=' + encodeURIComponent(activeShareUrl || window.location.href) + '&text=' + encodeURIComponent('Royal Noor — আলোর পথে প্রতিদিন'), '_blank');
      closeShareModal();
    });
  }

  if (elements.btnShareCopyLink) {
    elements.btnShareCopyLink.addEventListener('click', () => {
      navigator.clipboard.writeText(activeShareUrl || window.location.href);
      showToast('🔗 লিংক কপি করা হয়েছে!');
      closeShareModal();
    });
  }
}

// ── Share Engine ──
let activeShareBlob = null;
let activeShareUrl = '';

async function shareCardImage(source, filename = 'RoyalNoor-Card.png', publicUrl = '') {
  try {
    let blob = null;
    if (source instanceof HTMLCanvasElement) {
      blob = await new Promise(resolve => source.toBlob(resolve, 'image/png'));
    } else if (typeof source === 'string') {
      try { const res = await fetch(source); blob = await res.blob(); } catch (e) {}
    } else if (source instanceof Blob) {
      blob = source;
    }

    activeShareBlob = blob;
    activeShareUrl = publicUrl || window.location.href;

    if (blob && navigator.canShare) {
      const f = new File([blob], filename, { type: 'image/png' });
      if (navigator.canShare({ files: [f] })) {
        try { await navigator.share({ files: [f] }); showToast('✅ কার্ড শেয়ার সম্পন্ন!'); return; }
        catch (err) { if (err.name === 'AbortError') return; }
      }
    }

    if (blob && navigator.clipboard && window.ClipboardItem) {
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        showToast('📋 কার্ড ইমেজ ক্লিপবোর্ডে কপি হয়েছে!');
      } catch (e) {}
    }
    openShareModal();
  } catch (err) { openShareModal(); }
}

function openShareModal() { if (elements.shareModal) elements.shareModal.classList.add('active'); }
function closeShareModal() { if (elements.shareModal) elements.shareModal.classList.remove('active'); }

// ── Canvas Preview Modal ──
function openPreviewModal(item) {
  activePreviewItem = item;
  renderPreviewCanvas(item, currentPreviewLayout, currentPreviewTheme);
  if (elements.previewModal) elements.previewModal.classList.add('active');
}

function closePreviewModal() {
  if (elements.previewModal) elements.previewModal.classList.remove('active');
  activePreviewItem = null;
}

function renderPreviewCanvas(item, layout, theme) {
  if (!elements.previewCanvas || !window.RoyalCardTemplate) return;
  elements.previewCanvas.width = 1080;
  elements.previewCanvas.height = 1080;
  window.RoyalCardTemplate.render(elements.previewCanvas, item, {
    layout: layout || currentPreviewLayout,
    theme: theme || currentPreviewTheme
  });

  if (elements.btnDownloadPreview) {
    elements.btnDownloadPreview.onclick = () => {
      const a = document.createElement('a');
      a.href = elements.previewCanvas.toDataURL('image/png');
      a.download = `RoyalNoor-${item.uid || 'Card'}.png`;
      a.click();
      showToast('📥 কার্ড ডাউনলোড সম্পন্ন!');
    };
  }

  if (elements.btnSharePreview) {
    elements.btnSharePreview.onclick = () => {
      shareCardImage(elements.previewCanvas, `RoyalNoor-${item.uid || 'Card'}.png`);
    };
  }
}

// ── Add New Entry Modal ──
function openAddModal() { if (elements.addModal) elements.addModal.classList.add('active'); }
function closeAddModal() { if (elements.addModal) elements.addModal.classList.remove('active'); }

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
    categories: [form.category.value.trim() || 'সাধারণ'],
    category_slugs: [],
    occasions: [],
    occasion_slugs: [],
    event_tag: form.event_tag.value || 'general',
    target_day: form.event_tag.value === 'friday' ? 'friday' : null,
    priority: parseInt(form.priority.value, 10) || 1,
    used_count: 0,
    created_at: new Date().toISOString()
  };

  const localSaved = JSON.parse(localStorage.getItem('rn_custom_items') || '[]');
  localSaved.unshift(newItem);
  localStorage.setItem('rn_custom_items', JSON.stringify(localSaved));

  allItems.unshift(newItem);
  updateStats();
  filterItems();
  closeAddModal();
  form.reset();
  showToast('✅ নতুন কার্ড সফলভাবে যুক্ত হয়েছে!');
}

function exportCustomJson() {
  const localSaved = JSON.parse(localStorage.getItem('rn_custom_items') || '[]');
  if (localSaved.length === 0) { alert('কোনো নতুন কাস্টম এন্ট্রি পাওয়া যায়নি!'); return; }
  const blob = new Blob([JSON.stringify(localSaved, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'imports.json';
  a.click();
  showToast('📥 imports.json ডাউনলোড সম্পন্ন!');
}

// ── Utilities ──
function setupTheme() {
  const saved = localStorage.getItem('rn_theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    if (elements.themeToggle) elements.themeToggle.textContent = '🌙 ডার্ক মোড';
  }
}

function copyText(text) {
  navigator.clipboard.writeText(text);
  showToast('📋 টেক্সট কপি করা হয়েছে!');
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px;
    background: #0f766e; color: #fff; padding: 12px 22px;
    border-radius: 12px; font-size: 14px; font-weight: 600;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3); z-index: 9999;
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

// Global bindings
window.copyText = copyText;
window.openPreviewModal = openPreviewModal;
window.closePreviewModal = closePreviewModal;
window.openShareModal = openShareModal;
window.closeShareModal = closeShareModal;
window.shareCardImage = shareCardImage;
window.openAddModal = openAddModal;
window.closeAddModal = closeAddModal;
window.saveNewEntry = saveNewEntry;
window.exportCustomJson = exportCustomJson;
