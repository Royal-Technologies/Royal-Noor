/**
 * Royal Noor — 1080x1080 Islamic Card Engine
 * 10 Distinct Layout Architectures × 10 Royal Color Themes = 100 Unique Designs
 * Brand: Royal Noor — আলোর পথে প্রতিদিন
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.RoyalCardTemplate = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  const W = 1080;
  const H = 1080;

  // ═════════════════════════════════════════════════════════════════
  // 1. TEN DISTINCT COLOR PALETTES (১০টি কালার থিম)
  // ═════════════════════════════════════════════════════════════════
  const THEMES = {
    'royal-emerald': {
      key: 'royal-emerald',
      name: 'পান্না সবুজ (Royal Emerald)',
      bgGrad: ['#011710', '#05291E', '#093E2F'],
      cardBg: '#042118',
      primaryGold: '#E5C383',
      secondaryGold: '#BF9546',
      accentGold: '#F9ECCE',
      arabicColor: '#F9ECCE',
      banglaColor: '#FAF6EE',
      metaColor: '#D8BF89',
      borderColor: 'rgba(229, 195, 131, 0.45)',
      subtleLine: 'rgba(229, 195, 131, 0.18)',
      badgeBg: 'rgba(229, 195, 131, 0.15)',
      badgeBorder: 'rgba(229, 195, 131, 0.35)',
      badgeText: '#F9ECCE',
      isDark: true
    },
    'midnight-navy': {
      key: 'midnight-navy',
      name: 'গভীর নীলকান্ত (Midnight Navy)',
      bgGrad: ['#030C1A', '#081A36', '#0E2850'],
      cardBg: '#071830',
      primaryGold: '#EAC875',
      secondaryGold: '#C59E3F',
      accentGold: '#FDF2D4',
      arabicColor: '#FDF2D4',
      banglaColor: '#F1F5F9',
      metaColor: '#D4B365',
      borderColor: 'rgba(234, 200, 117, 0.45)',
      subtleLine: 'rgba(234, 200, 117, 0.18)',
      badgeBg: 'rgba(234, 200, 117, 0.15)',
      badgeBorder: 'rgba(234, 200, 117, 0.35)',
      badgeText: '#FDF2D4',
      isDark: true
    },
    'imperial-black': {
      key: 'imperial-black',
      name: 'কাবার গিলাফ ও সোনা (Imperial Onyx)',
      bgGrad: ['#07080A', '#0F1116', '#171A21'],
      cardBg: '#0C0E13',
      primaryGold: '#F5D77F',
      secondaryGold: '#C99E32',
      accentGold: '#FFF4D6',
      arabicColor: '#FFF4D6',
      banglaColor: '#FAF9F6',
      metaColor: '#D9B45C',
      borderColor: 'rgba(245, 215, 127, 0.5)',
      subtleLine: 'rgba(245, 215, 127, 0.18)',
      badgeBg: 'rgba(245, 215, 127, 0.15)',
      badgeBorder: 'rgba(245, 215, 127, 0.38)',
      badgeText: '#FFF4D6',
      isDark: true
    },
    'warm-parchment': {
      key: 'warm-parchment',
      name: 'মদিনা পাণ্ডুলিপি (Illuminated Parchment)',
      bgGrad: ['#1E1610', '#2E2218', '#3F2F22'],
      cardBg: '#F8F3E6',
      primaryGold: '#946E26',
      secondaryGold: '#6A4A0E',
      accentGold: '#B8892E',
      arabicColor: '#1A120B',
      banglaColor: '#2B1E14',
      metaColor: '#6B4D18',
      borderColor: 'rgba(148, 110, 38, 0.4)',
      subtleLine: 'rgba(148, 110, 38, 0.2)',
      badgeBg: 'rgba(148, 110, 38, 0.1)',
      badgeBorder: 'rgba(148, 110, 38, 0.32)',
      badgeText: '#6A4A0E',
      isDark: false
    },
    'royal-maroon': {
      key: 'royal-maroon',
      name: 'দামেস্ক মেরুন (Damascus Crimson)',
      bgGrad: ['#1A040B', '#2D0A16', '#441223'],
      cardBg: '#22060F',
      primaryGold: '#F2CB75',
      secondaryGold: '#D49D34',
      accentGold: '#FCEECC',
      arabicColor: '#FCEECC',
      banglaColor: '#FDF5EC',
      metaColor: '#DEB059',
      borderColor: 'rgba(242, 203, 117, 0.45)',
      subtleLine: 'rgba(242, 203, 117, 0.18)',
      badgeBg: 'rgba(242, 203, 117, 0.15)',
      badgeBorder: 'rgba(242, 203, 117, 0.35)',
      badgeText: '#FCEECC',
      isDark: true
    },
    'ottoman-turquoise': {
      key: 'ottoman-turquoise',
      name: 'অটোমান ফিরোজা (Ottoman Turquoise)',
      bgGrad: ['#021B21', '#062F38', '#0A4652'],
      cardBg: '#04262E',
      primaryGold: '#62E5D5',
      secondaryGold: '#E5C370',
      accentGold: '#FBF3D4',
      arabicColor: '#FBF3D4',
      banglaColor: '#EFFFFD',
      metaColor: '#52D4C4',
      borderColor: 'rgba(98, 229, 213, 0.42)',
      subtleLine: 'rgba(98, 229, 213, 0.18)',
      badgeBg: 'rgba(98, 229, 213, 0.15)',
      badgeBorder: 'rgba(98, 229, 213, 0.35)',
      badgeText: '#FBF3D4',
      isDark: true
    },
    'desert-amber': {
      key: 'desert-amber',
      name: 'মরু জাফরান ও অ্যাম্বার (Hijaz Amber)',
      bgGrad: ['#1F0E04', '#361808', '#4F260E'],
      cardBg: '#271105',
      primaryGold: '#F7BA45',
      secondaryGold: '#DC8D24',
      accentGold: '#FCE7B8',
      arabicColor: '#FCE7B8',
      banglaColor: '#FAF4EC',
      metaColor: '#DE9837',
      borderColor: 'rgba(247, 186, 69, 0.45)',
      subtleLine: 'rgba(247, 186, 69, 0.18)',
      badgeBg: 'rgba(247, 186, 69, 0.15)',
      badgeBorder: 'rgba(247, 186, 69, 0.35)',
      badgeText: '#FCE7B8',
      isDark: true
    },
    'amethyst-violet': {
      key: 'amethyst-violet',
      name: 'রাজকীয় বেগুনি (Royal Amethyst)',
      bgGrad: ['#12071E', '#200D35', '#32164F'],
      cardBg: '#1A0B2A',
      primaryGold: '#EFD48E',
      secondaryGold: '#CFA64F',
      accentGold: '#F9EED4',
      arabicColor: '#F9EED4',
      banglaColor: '#F8F3FC',
      metaColor: '#D8B568',
      borderColor: 'rgba(239, 212, 142, 0.45)',
      subtleLine: 'rgba(239, 212, 142, 0.18)',
      badgeBg: 'rgba(239, 212, 142, 0.15)',
      badgeBorder: 'rgba(239, 212, 142, 0.35)',
      badgeText: '#F9EED4',
      isDark: true
    },
    'andalusian-olive': {
      key: 'andalusian-olive',
      name: 'আন্দালুসীয় অলিভ (Moorish Olive)',
      bgGrad: ['#071A12', '#0D2B1F', '#164230'],
      cardBg: '#092218',
      primaryGold: '#E7C67E',
      secondaryGold: '#BA943E',
      accentGold: '#F8EED5',
      arabicColor: '#F8EED5',
      banglaColor: '#FAF7F0',
      metaColor: '#D2AD5E',
      borderColor: 'rgba(231, 198, 126, 0.45)',
      subtleLine: 'rgba(231, 198, 126, 0.18)',
      badgeBg: 'rgba(231, 198, 126, 0.15)',
      badgeBorder: 'rgba(231, 198, 126, 0.35)',
      badgeText: '#F8EED5',
      isDark: true
    },
    'classic-ivory': {
      key: 'classic-ivory',
      name: 'শুভ্র মুক্তা আইভরি (Classic Pearl Ivory)',
      bgGrad: ['#161B22', '#21262D', '#30363D'],
      cardBg: '#FCFAF5',
      primaryGold: '#967228',
      secondaryGold: '#705315',
      accentGold: '#BD9645',
      arabicColor: '#0C1B16',
      banglaColor: '#172420',
      metaColor: '#705315',
      borderColor: 'rgba(150, 114, 40, 0.42)',
      subtleLine: 'rgba(150, 114, 40, 0.2)',
      badgeBg: 'rgba(150, 114, 40, 0.1)',
      badgeBorder: 'rgba(150, 114, 40, 0.32)',
      badgeText: '#705315',
      isDark: false
    }
  };

  const THEME_KEYS = Object.keys(THEMES);

  // ═════════════════════════════════════════════════════════════════
  // 2. TEN DISTINCT ARCHITECTURAL LAYOUTS (১০টি সম্পূর্ণ ভিন্ন ডিজাইন)
  // ═════════════════════════════════════════════════════════════════
  const LAYOUTS = {
    'mihrab-arch': {
      key: 'mihrab-arch',
      name: '১. মেহরাব আর্চ (Mihrab Sanctuary Arch)',
      desc: 'মসজিদের মেহরাব ও খিলান অনুপ্রাণিত স্থাপত্য ফ্রেম'
    },
    'royal-minimal': {
      key: 'royal-minimal',
      name: '২. রাজকীয় মিনিমালিজম (Royal Modern Luxury)',
      desc: 'আধুনিক সূক্ষ্ম গোল্ডেন লাইন ও মিনিমাল আর্কিটেকচার'
    },
    'geometric-mandala': {
      key: 'geometric-mandala',
      name: '৩. ইসলামিক রজেট ও মান্ডালা (Sacred Rosette)',
      desc: 'কেন্দ্রীয় ১৬-কোণা ইসলামিক জ্যামিতিক রজেট ও নক্ষত্র'
    },
    'illuminated-manuscript': {
      key: 'illuminated-manuscript',
      name: '৪. মদিনা পাণ্ডুলিপি ফ্রেম (Illuminated Manuscript)',
      desc: 'পবিত্র কোরআনের প্রাচীন পাণ্ডুলিপি ও স্বর্ণালী কারতুশ'
    },
    'iznik-tiles': {
      key: 'iznik-tiles',
      name: '৫. অটোমান ইজনিক টাইলস (Ottoman Iznik Border)',
      desc: 'অটোমান প্রাসাদ ও মসজিদের জ্যামিতিক টাইলস সীমানা'
    },
    'architectural-pillars': {
      key: 'architectural-pillars',
      name: '৬. রাজকীয় স্তম্ভ ও তোরণ (Royal Twin Pillars)',
      desc: 'দুই পাশের মহিমান্বিত স্বর্ণস্তম্ভ ও উপরের রাজতোরণ'
    },
    'celestial-crescent': {
      key: 'celestial-crescent',
      name: '৭. হিলাল ও সেলিস্টিয়াল গ্যালাক্সি (Celestial Crescent)',
      desc: 'উজ্জ্বল স্বর্ণালী অর্ধচন্দ্র ও তারকাময় স্বর্গীয় আবহ'
    },
    'alhambra-palace': {
      key: 'alhambra-palace',
      name: '৮. আন্দালুসীয় আলহামব্রা (Alhambra Arabesque)',
      desc: 'আলহামব্রা প্রাসাদের বহু-খাঁজযুক্ত খিলান ও লতাপাতা'
    },
    'octagram-medallion': {
      key: 'octagram-medallion',
      name: '৯. আটকোণা মেডেলিয়ন (Rub el Hizb Seal)',
      desc: 'আটকোণা চ্যাম্ফার্ড বর্ডার ও পবিত্র রুব-এল-হিজব সিল'
    },
    'kiswah-gold-ribbon': {
      key: 'kiswah-gold-ribbon',
      name: '১০. কাবার গিলাফ স্বর্ণসূত্র ফিতা (Kiswah Silk Ribbon)',
      desc: 'কাবার গিলাফের অনুকরণে প্রশস্ত স্বর্ণলতা ফিতা ফ্রেম'
    }
  };

  const LAYOUT_KEYS = Object.keys(LAYOUTS);

  // ═════════════════════════════════════════════════════════════════
  // 3. VECTOR GEOMETRY PRIMITIVES (জিরো গ্লিফ / পিওর ক্যানভাস)
  // ═════════════════════════════════════════════════════════════════

  function wrapText(ctx, text, maxWidth) {
    if (!text) return [];
    const words = text.trim().split(/\s+/);
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function drawRoundRect(ctx, x, y, w, h, r) {
    r = Math.min(r || 10, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawIslamicStar(ctx, cx, cy, outerRadius, innerRadius, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    const points = 16;
    for (let i = 0; i < points; i++) {
      const radius = (i % 2 === 0) ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / 8 - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawCrescentMoon(ctx, cx, cy, r, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2, false);
    ctx.arc(cx - r * 0.45, cy, r * 0.9, Math.PI / 2, -Math.PI / 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawVectorQuote(ctx, cx, cy, size, color, isClosing) {
    ctx.save();
    ctx.fillStyle = color;
    const gap = size * 0.75;
    const r = size * 0.38;
    const points = [cx - gap / 2, cx + gap / 2];

    for (const px of points) {
      ctx.beginPath();
      ctx.arc(px, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      if (!isClosing) {
        ctx.moveTo(px + r * 0.85, cy);
        ctx.quadraticCurveTo(px + r * 0.9, cy + r * 2.2, px - r * 0.7, cy + r * 2.5);
        ctx.quadraticCurveTo(px + r * 0.1, cy + r * 1.3, px, cy);
      } else {
        ctx.moveTo(px - r * 0.85, cy);
        ctx.quadraticCurveTo(px - r * 0.9, cy - r * 2.2, px + r * 0.7, cy - r * 2.5);
        ctx.quadraticCurveTo(px - r * 0.1, cy - r * 1.3, px, cy);
      }
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  // ═════════════════════════════════════════════════════════════════
  // 4. COMMON BASE RENDERER & TYPOGRAPHY
  // ═════════════════════════════════════════════════════════════════

  function renderCard(canvas, item, options) {
    options = options || {};
    const layoutKey = options.layout || item.layout || 'mihrab-arch';
    const themeKey = options.theme || item.theme || 'royal-emerald';

    const theme = THEMES[themeKey] || THEMES['royal-emerald'];
    const ctx = canvas.getContext('2d');

    // 1. Canvas Dimensions & Outer Gradient
    ctx.clearRect(0, 0, W, H);
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, theme.bgGrad[0]);
    bgGrad.addColorStop(0.5, theme.bgGrad[1]);
    bgGrad.addColorStop(1, theme.bgGrad[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Main Card Bounds
    const cardX = 48;
    const cardY = 48;
    const cardW = W - 96;
    const cardH = H - 96;

    // Card Drop Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 14;

    // Card Background Shape
    if (layoutKey === 'octagram-medallion') {
      // 45-degree chamfered corners for layout 9
      const ch = 28;
      ctx.beginPath();
      ctx.moveTo(cardX + ch, cardY);
      ctx.lineTo(cardX + cardW - ch, cardY);
      ctx.lineTo(cardX + cardW, cardY + ch);
      ctx.lineTo(cardX + cardW, cardY + cardH - ch);
      ctx.lineTo(cardX + cardW - ch, cardY + cardH);
      ctx.lineTo(cardX + ch, cardY + cardH);
      ctx.lineTo(cardX, cardY + cardH - ch);
      ctx.lineTo(cardX, cardY + ch);
      ctx.closePath();
    } else {
      drawRoundRect(ctx, cardX, cardY, cardW, cardH, 24);
    }
    ctx.fillStyle = theme.cardBg;
    ctx.fill();
    ctx.restore();

    // 3. Render Distinct Architectural Layout Framing (Designs 1 to 10)
    renderLayoutFrame(ctx, layoutKey, theme, cardX, cardY, cardW, cardH);

    // 4. Header Bismillah Calligraphy
    let currentY = cardY + 70;
    ctx.save();
    ctx.fillStyle = theme.accentGold;
    ctx.font = 'bold 34px "Amiri", "Traditional Arabic", serif';
    ctx.textAlign = 'center';
    ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', W / 2, currentY);
    ctx.restore();

    currentY += 46;

    // 5. Brand Header: ROYAL NOOR [Vector Star] আলোর পথে প্রতিদিন
    ctx.save();
    ctx.font = 'bold 18px "Hind Siliguri", sans-serif';
    const leftText = 'ROYAL NOOR';
    const rightText = 'আলোর পথে প্রতিদিন';
    const wLeft = ctx.measureText(leftText).width;
    const wRight = ctx.measureText(rightText).width;
    const starGap = 18;
    const totalBrandW = wLeft + starGap * 2 + wRight;
    const startBrandX = (W - totalBrandW) / 2;

    ctx.fillStyle = theme.primaryGold;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(leftText, startBrandX, currentY);

    const starX = startBrandX + wLeft + starGap;
    drawIslamicStar(ctx, starX, currentY - 1, 5, 2.5, theme.secondaryGold);

    ctx.fillText(rightText, starX + starGap, currentY);
    ctx.restore();

    currentY += 30;

    // 6. Category / Event Badge Pill
    let badgeText = item.type === 'quran' ? 'পবিত্র কোরআন' : 'সহীহ হাদিস';
    let badgeIcon = 'star';

    if (item.event_tag === 'ramadan') {
      badgeText = 'পবিত্র মাহে রমজান';
      badgeIcon = 'moon';
    } else if (item.event_tag === 'friday' || item.target_day === 'friday') {
      badgeText = "পবিত্র জুমু'আ মুবারক";
      badgeIcon = 'star';
    } else if (item.event_tag === 'dhul_hijjah') {
      badgeText = 'পবিত্র জিলহজ্জ ও কুরবানী';
      badgeIcon = 'star';
    } else if (item.category && item.category !== 'সাধারণ') {
      const typeLabel = item.type === 'quran' ? 'কোরআন' : 'হাদিস';
      badgeText = `${typeLabel} • ${item.category}`;
    }

    ctx.save();
    ctx.font = '600 15px "Hind Siliguri", sans-serif';
    const badgeTextWidth = ctx.measureText(badgeText).width;
    const iconOffset = 20;
    const badgeW = badgeTextWidth + 46 + iconOffset;
    const badgeH = 32;
    const badgeX = (W - badgeW) / 2;

    drawRoundRect(ctx, badgeX, currentY, badgeW, badgeH, 16);
    ctx.fillStyle = theme.badgeBg;
    ctx.fill();
    ctx.strokeStyle = theme.badgeBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    const iconCenterX = badgeX + 22;
    const iconCenterY = currentY + 16;
    if (badgeIcon === 'moon') {
      drawCrescentMoon(ctx, iconCenterX, iconCenterY, 6, theme.badgeText);
    } else {
      drawIslamicStar(ctx, iconCenterX, iconCenterY, 5, 2.5, theme.badgeText);
    }

    ctx.fillStyle = theme.badgeText;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, badgeX + 36, currentY + 16);
    ctx.restore();

    // 7. Dynamic Typography & Layout Calculations
    const contentMaxW = cardW - 130; // 854px text width
    const contentCenterY = 535;

    // Arabic Font Size (Bigger & Bolder)
    const arText = item.arabic_text || '';
    let arFontSize = 48;
    if (arText.length > 250) arFontSize = 32;
    else if (arText.length > 160) arFontSize = 36;
    else if (arText.length > 100) arFontSize = 42;
    else if (arText.length > 60) arFontSize = 48;
    else arFontSize = 52;

    ctx.font = `bold ${arFontSize}px "Amiri", "Traditional Arabic", serif`;
    const arLineHeight = Math.round(arFontSize * 1.8);
    const arLines = wrapText(ctx, arText, contentMaxW);
    const arTotalHeight = arLines.length * arLineHeight;

    // Bangla Translation Font Size (Bigger & Crisp)
    const bnText = item.bangla_translation || '';
    let bnFontSize = 34;
    if (bnText.length > 300) bnFontSize = 24;
    else if (bnText.length > 180) bnFontSize = 28;
    else if (bnText.length > 110) bnFontSize = 32;
    else if (bnText.length > 60) bnFontSize = 35;
    else bnFontSize = 38;

    ctx.font = `600 ${bnFontSize}px "Hind Siliguri", sans-serif`;
    const bnLineHeight = Math.round(bnFontSize * 1.6);
    const bnLines = wrapText(ctx, bnText, contentMaxW - 50);
    const bnTotalHeight = bnLines.length * bnLineHeight;

    const sepHeight = 65;
    const totalBlockHeight = arTotalHeight + sepHeight + bnTotalHeight;

    let textStartY = contentCenterY - (totalBlockHeight / 2) + 15;
    if (textStartY < currentY + 70) {
      textStartY = currentY + 70;
    }

    // 8. Render Arabic Text
    ctx.save();
    ctx.font = `bold ${arFontSize}px "Amiri", "Traditional Arabic", serif`;
    ctx.fillStyle = theme.arabicColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (theme.isDark) {
      ctx.shadowColor = 'rgba(230, 200, 140, 0.28)';
      ctx.shadowBlur = 10;
    }

    let arY = textStartY;
    for (let i = 0; i < arLines.length; i++) {
      ctx.fillText(arLines[i], W / 2, arY);
      arY += arLineHeight;
    }
    ctx.restore();

    // 9. Render Distinct Islamic Divider Based on Layout
    const sepY = arY + 12;
    renderLayoutDivider(ctx, layoutKey, theme, sepY);

    // 10. Render Bangla Translation with Integrated Quotes
    let bnY = sepY + 46;
    ctx.save();
    ctx.font = `600 ${bnFontSize}px "Hind Siliguri", sans-serif`;
    ctx.fillStyle = theme.banglaColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let maxBnLineWidth = 0;
    for (let i = 0; i < bnLines.length; i++) {
      const w = ctx.measureText(bnLines[i]).width;
      if (w > maxBnLineWidth) maxBnLineWidth = w;
    }

    for (let i = 0; i < bnLines.length; i++) {
      ctx.fillText(bnLines[i], W / 2, bnY);
      bnY += bnLineHeight;
    }
    ctx.restore();

    // Quotes placement
    const quoteSize = 13;
    const quoteMargin = 24;
    const quoteLeftX = Math.max(cardX + 70, (W - maxBnLineWidth) / 2 - quoteMargin);
    const quoteRightX = Math.min(cardX + cardW - 70, (W + maxBnLineWidth) / 2 + quoteMargin);
    const firstLineY = sepY + 46;
    const lastLineY = bnY - bnLineHeight;

    drawVectorQuote(ctx, quoteLeftX, firstLineY - 4, quoteSize, theme.primaryGold, false);
    drawVectorQuote(ctx, quoteRightX, lastLineY + 4, quoteSize, theme.primaryGold, true);

    // 11. Reference Box (— [ সূরা আল-বাকারা : ২০১ ])
    const refY = Math.max(bnY + 36, cardY + cardH - 122);
    const refText = `— [ ${item.reference || item.title} ]`;

    ctx.save();
    ctx.font = 'bold 21px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.metaColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(refText, W / 2, refY);
    ctx.restore();

    // 12. Footer Section (Safe distance from corner ornaments, ZERO overlap!)
    const footerY = cardY + cardH - 52;

    ctx.save();
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(cardX + 90, footerY - 18);
    ctx.lineTo(cardX + cardW - 90, footerY - 18);
    ctx.stroke();

    // Left: ROYAL TECHNOLOGIES
    ctx.font = 'bold 15px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.metaColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('ROYAL TECHNOLOGIES', cardX + 90, footerY);

    // Center: কোরআন ও সহীহ সুন্নাহর আলো
    ctx.font = '500 14px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('কোরআন ও সহীহ সুন্নাহর আলো', W / 2, footerY);

    // Right: www.royaltechbd.com
    ctx.font = 'bold 15px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('www.royaltechbd.com', cardX + cardW - 90, footerY);
    ctx.restore();

    return canvas;
  }

  // ═════════════════════════════════════════════════════════════════
  // 5. TEN DISTINCT LAYOUT FRAMES (১০টি স্বতন্ত্র ডিজাইন ফ্রেম)
  // ═════════════════════════════════════════════════════════════════

  function renderLayoutFrame(ctx, layoutKey, theme, cardX, cardY, cardW, cardH) {
    ctx.save();

    switch (layoutKey) {
      // ── Layout 1: মেহরাব আর্চ (Mihrab Sanctuary Arch) ──
      case 'mihrab-arch': {
        // Double outer frame
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        // Architectural Moorish Arch
        const archL = cardX + 85;
        const archR = cardX + cardW - 85;
        const archBase = cardY + 280;
        const archApex = cardY + 45;
        ctx.beginPath();
        ctx.moveTo(archL, archBase);
        ctx.lineTo(archL, cardY + 150);
        ctx.bezierCurveTo(archL - 10, archApex + 20, W / 2 - 60, archApex - 12, W / 2, archApex - 12);
        ctx.bezierCurveTo(W / 2 + 60, archApex - 12, archR + 10, archApex + 20, archR, cardY + 150);
        ctx.lineTo(archR, archBase);
        ctx.stroke();

        drawIslamicStar(ctx, W / 2, archApex - 12, 7, 3.5, theme.primaryGold);
        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 36, theme.primaryGold);
        break;
      }

      // ── Layout 2: রাজকীয় মিনিমালিজম (Royal Modern Luxury) ──
      case 'royal-minimal': {
        // Clean double borders with fine line offset
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1.8;
        ctx.strokeRect(cardX + 20, cardY + 20, cardW - 40, cardH - 40);

        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1;
        ctx.strokeRect(cardX + 28, cardY + 28, cardW - 56, cardH - 56);

        // Modern geometric square seals in corners
        const corners = [
          [cardX + 24, cardY + 24],
          [cardX + cardW - 24, cardY + 24],
          [cardX + 24, cardY + cardH - 24],
          [cardX + cardW - 24, cardY + cardH - 24]
        ];
        corners.forEach(([cx, cy]) => {
          ctx.fillStyle = theme.primaryGold;
          ctx.fillRect(cx - 3, cy - 3, 6, 6);
        });

        // Left and right vertical gold accent bars
        ctx.fillStyle = theme.primaryGold;
        ctx.fillRect(cardX + 20, cardY + cardH / 2 - 50, 3, 100);
        ctx.fillRect(cardX + cardW - 23, cardY + cardH / 2 - 50, 3, 100);
        break;
      }

      // ── Layout 3: ইসলামিক রজেট ও মান্ডালা (Sacred Rosette) ──
      case 'geometric-mandala': {
        // Outer frame
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        // 16-point geometric rosette behind Bismillah
        ctx.save();
        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1.2;
        for (let angle = 0; angle < Math.PI; angle += Math.PI / 8) {
          ctx.beginPath();
          const r = 58;
          ctx.ellipse(W / 2, cardY + 70, r, r / 3, angle, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        drawIslamicStar(ctx, W / 2, cardY + 70, 10, 5, theme.primaryGold);
        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 38, theme.primaryGold);
        break;
      }

      // ── Layout 4: মদিনা পাণ্ডুলিপি ফ্রেম (Illuminated Manuscript) ──
      case 'illuminated-manuscript': {
        // Double classic manuscript border
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2.5;
        drawRoundRect(ctx, cardX + 14, cardY + 14, cardW - 28, cardH - 28, 14);
        ctx.stroke();

        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1;
        drawRoundRect(ctx, cardX + 22, cardY + 22, cardW - 44, cardH - 44, 10);
        ctx.stroke();

        // Surah header style horizontal decorative cartouche band
        ctx.fillStyle = theme.badgeBg;
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1.2;
        drawRoundRect(ctx, cardX + 80, cardY + 38, cardW - 160, 64, 8);
        ctx.fill();
        ctx.stroke();

        // Cartouche side palmettes
        drawIslamicStar(ctx, cardX + 95, cardY + 70, 7, 3.5, theme.primaryGold);
        drawIslamicStar(ctx, cardX + cardW - 95, cardY + 70, 7, 3.5, theme.primaryGold);
        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 42, theme.primaryGold);
        break;
      }

      // ── Layout 5: অটোমান ইজনিক টাইলস (Ottoman Iznik Border) ──
      case 'iznik-tiles': {
        // Continuous decorative diamond border around the frame
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        // Iznik diamond chain along borders
        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1;
        const step = 60;
        // Top & bottom lines
        for (let x = cardX + 60; x <= cardX + cardW - 60; x += step) {
          drawIslamicStar(ctx, x, cardY + 24, 3, 1.5, theme.primaryGold);
          drawIslamicStar(ctx, x, cardY + cardH - 24, 3, 1.5, theme.primaryGold);
        }
        // Left & right lines
        for (let y = cardY + 60; y <= cardY + cardH - 60; y += step) {
          drawIslamicStar(ctx, cardX + 24, y, 3, 1.5, theme.primaryGold);
          drawIslamicStar(ctx, cardX + cardW - 24, y, 3, 1.5, theme.primaryGold);
        }
        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 36, theme.primaryGold);
        break;
      }

      // ── Layout 6: রাজকীয় স্তম্ভ ও তোরণ (Royal Twin Pillars) ──
      case 'architectural-pillars': {
        // Fluted vertical architectural pillars on left & right
        const pLeft = cardX + 45;
        const pRight = cardX + cardW - 45;
        const pTop = cardY + 35;
        const pBottom = cardY + cardH - 35;

        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;

        // Left pillar (pair of vertical lines + capital & base)
        ctx.strokeRect(pLeft - 8, pTop, 16, pBottom - pTop);
        ctx.strokeRect(pLeft - 14, pTop - 8, 28, 10);
        ctx.strokeRect(pLeft - 14, pBottom - 2, 28, 10);

        // Right pillar
        ctx.strokeRect(pRight - 8, pTop, 16, pBottom - pTop);
        ctx.strokeRect(pRight - 14, pTop - 8, 28, 10);
        ctx.strokeRect(pRight - 14, pBottom - 2, 28, 10);

        // Arch connecting the two capitals across top
        ctx.beginPath();
        ctx.moveTo(pLeft + 14, pTop - 3);
        ctx.bezierCurveTo(pLeft + 100, pTop - 25, pRight - 100, pTop - 25, pRight - 14, pTop - 3);
        ctx.stroke();

        drawIslamicStar(ctx, W / 2, pTop - 18, 7, 3.5, theme.primaryGold);
        break;
      }

      // ── Layout 7: হিলাল ও সেলিস্টিয়াল গ্যালাক্সি (Celestial Crescent) ──
      case 'celestial-crescent': {
        // Inner rounded frame
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        // Starlight dots sprinkled along border
        ctx.fillStyle = theme.primaryGold;
        for (let i = 0; i < 24; i++) {
          const angle = (i * Math.PI) / 12;
          const sx = W / 2 + (cardW / 2 - 35) * Math.cos(angle);
          const sy = H / 2 + (cardH / 2 - 35) * Math.sin(angle);
          drawIslamicStar(ctx, sx, sy, (i % 2 === 0 ? 3.5 : 2), 1, theme.primaryGold);
        }

        // Prominent Golden Crescent Moon at top header
        drawCrescentMoon(ctx, W / 2 - 130, cardY + 68, 12, theme.primaryGold);
        drawIslamicStar(ctx, W / 2 - 118, cardY + 68, 5, 2.5, theme.accentGold);
        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 34, theme.primaryGold);
        break;
      }

      // ── Layout 8: আন্দালুসীয় আলহামব্রা (Alhambra Arabesque) ──
      case 'alhambra-palace': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        // Multi-foil scalloped archway at top (5 lobes)
        const lobeY = cardY + 120;
        ctx.beginPath();
        ctx.moveTo(cardX + 70, lobeY);
        // 5 arcs forming Moorish polylobed arch
        const lobeStep = (cardW - 140) / 5;
        for (let i = 0; i < 5; i++) {
          const lx = cardX + 70 + i * lobeStep;
          ctx.bezierCurveTo(lx + lobeStep * 0.2, lobeY - 35, lx + lobeStep * 0.8, lobeY - 35, lx + lobeStep, lobeY);
        }
        ctx.stroke();

        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 40, theme.primaryGold);
        break;
      }

      // ── Layout 9: আটকোণা মেডেলিয়ন (Rub el Hizb Seal) ──
      case 'octagram-medallion': {
        // Chamfered 45-degree outer border
        const ch = 24;
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cardX + 16 + ch, cardY + 16);
        ctx.lineTo(cardX + cardW - 16 - ch, cardY + 16);
        ctx.lineTo(cardX + cardW - 16, cardY + 16 + ch);
        ctx.lineTo(cardX + cardW - 16, cardY + cardH - 16 - ch);
        ctx.lineTo(cardX + cardW - 16 - ch, cardY + cardH - 16);
        ctx.lineTo(cardX + 16 + ch, cardY + cardH - 16);
        ctx.lineTo(cardX + 16, cardY + cardH - 16 - ch);
        ctx.lineTo(cardX + 16, cardY + 16 + ch);
        ctx.closePath();
        ctx.stroke();

        // Rub el Hizb corner diamond seals
        const cornerSeals = [
          [cardX + 30, cardY + 30],
          [cardX + cardW - 30, cardY + 30],
          [cardX + 30, cardY + cardH - 30],
          [cardX + cardW - 30, cardY + cardH - 30]
        ];
        cornerSeals.forEach(([cx, cy]) => {
          drawIslamicStar(ctx, cx, cy, 6, 3, theme.primaryGold);
        });
        break;
      }

      // ── Layout 10: কাবার গিলাফ স্বর্ণসূত্র ফিতা (Kiswah Silk Ribbon) ──
      case 'kiswah-gold-ribbon':
      default: {
        // Double gold frame
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        // Upper embroidered gold Kiswah banner band
        ctx.save();
        ctx.fillStyle = theme.badgeBg;
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1;
        ctx.fillRect(cardX + 40, cardY + 40, cardW - 80, 56);
        ctx.strokeRect(cardX + 40, cardY + 40, cardW - 80, 56);

        // Lower Kiswah banner band above footer
        ctx.fillRect(cardX + 40, cardY + cardH - 110, cardW - 80, 36);
        ctx.strokeRect(cardX + 40, cardY + cardH - 110, cardW - 80, 36);
        ctx.restore();

        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 42, theme.primaryGold);
        break;
      }
    }

    ctx.restore();
  }

  // Corner Bracket Ornaments Helper (Kept strictly inside bracket, 0 text overlap!)
  function drawCornerBrackets(ctx, x, y, w, h, size, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'square';

    const corners = [
      { cx: x, cy: y, dx: 1, dy: 1 },
      { cx: x + w, cy: y, dx: -1, dy: 1 },
      { cx: x, cy: y + h, dx: 1, dy: -1 },
      { cx: x + w, cy: y + h, dx: -1, dy: -1 }
    ];

    corners.forEach(c => {
      ctx.beginPath();
      ctx.moveTo(c.cx, c.cy + c.dy * size);
      ctx.lineTo(c.cx, c.cy);
      ctx.lineTo(c.cx + c.dx * size, c.cy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(c.cx + c.dx * 8, c.cy + c.dy * (size - 6));
      ctx.lineTo(c.cx + c.dx * 8, c.cy + c.dy * 8);
      ctx.lineTo(c.cx + c.dx * (size - 6), c.cy + c.dy * 8);
      ctx.stroke();

      const dX = c.cx + c.dx * 13;
      const dY = c.cy + c.dy * 13;
      drawIslamicStar(ctx, dX, dY, 4, 2, color);
    });

    ctx.restore();
  }

  // ═════════════════════════════════════════════════════════════════
  // 6. DISTINCT DIVIDERS PER LAYOUT (১০টি আর্কিটেকচারাল ডিভাইডার)
  // ═════════════════════════════════════════════════════════════════

  function renderLayoutDivider(ctx, layoutKey, theme, sepY) {
    ctx.save();
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1.2;

    switch (layoutKey) {
      case 'royal-minimal': {
        // Ultra-minimal single star line
        ctx.beginPath();
        ctx.moveTo(W / 2 - 120, sepY);
        ctx.lineTo(W / 2 - 25, sepY);
        ctx.moveTo(W / 2 + 25, sepY);
        ctx.lineTo(W / 2 + 120, sepY);
        ctx.stroke();
        drawIslamicStar(ctx, W / 2, sepY, 6, 3, theme.primaryGold);
        break;
      }
      case 'geometric-mandala': {
        // Triple star rosette cluster
        ctx.beginPath();
        ctx.moveTo(W / 2 - 200, sepY);
        ctx.lineTo(W / 2 - 45, sepY);
        ctx.moveTo(W / 2 + 45, sepY);
        ctx.lineTo(W / 2 + 200, sepY);
        ctx.stroke();
        drawIslamicStar(ctx, W / 2, sepY, 11, 5.5, theme.primaryGold);
        drawIslamicStar(ctx, W / 2 - 28, sepY, 5, 2.5, theme.secondaryGold);
        drawIslamicStar(ctx, W / 2 + 28, sepY, 5, 2.5, theme.secondaryGold);
        break;
      }
      case 'celestial-crescent': {
        // Twin crescent & star divider
        ctx.beginPath();
        ctx.moveTo(W / 2 - 180, sepY);
        ctx.lineTo(W / 2 - 35, sepY);
        ctx.moveTo(W / 2 + 35, sepY);
        ctx.lineTo(W / 2 + 180, sepY);
        ctx.stroke();
        drawCrescentMoon(ctx, W / 2 - 14, sepY, 7, theme.primaryGold);
        drawIslamicStar(ctx, W / 2 + 14, sepY, 6, 3, theme.accentGold);
        break;
      }
      case 'octagram-medallion': {
        // Diamond chain divider
        ctx.beginPath();
        ctx.moveTo(W / 2 - 160, sepY);
        ctx.lineTo(W / 2 - 40, sepY);
        ctx.moveTo(W / 2 + 40, sepY);
        ctx.lineTo(W / 2 + 160, sepY);
        ctx.stroke();
        drawIslamicStar(ctx, W / 2, sepY, 9, 4.5, theme.primaryGold);
        drawIslamicStar(ctx, W / 2 - 22, sepY, 4, 2, theme.secondaryGold);
        drawIslamicStar(ctx, W / 2 + 22, sepY, 4, 2, theme.secondaryGold);
        break;
      }
      default: {
        // Classical Islamic star divider
        ctx.beginPath();
        ctx.moveTo(W / 2 - 190, sepY);
        ctx.lineTo(W / 2 - 42, sepY);
        ctx.stroke();

        drawIslamicStar(ctx, W / 2, sepY, 9.5, 4.8, theme.primaryGold);
        drawIslamicStar(ctx, W / 2 - 26, sepY, 4.5, 2.2, theme.secondaryGold);
        drawIslamicStar(ctx, W / 2 + 26, sepY, 4.5, 2.2, theme.secondaryGold);

        ctx.beginPath();
        ctx.moveTo(W / 2 + 42, sepY);
        ctx.lineTo(W / 2 + 190, sepY);
        ctx.stroke();
        break;
      }
    }

    ctx.restore();
  }

  return {
    LAYOUTS,
    LAYOUT_KEYS,
    THEMES,
    THEME_KEYS,
    render: renderCard,
    wrapText,
    drawIslamicStar,
    drawCrescentMoon,
    drawVectorQuote
  };
});
