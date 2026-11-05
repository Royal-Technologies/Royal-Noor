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
    },
    // ═════════════════════════════════════════════════════════════════
    // 🌄 TEN MUSLIMPRO-STYLE SCENIC BACKGROUNDS (১০টি সিনিক ব্যাকগ্রাউন্ড)
    // ═════════════════════════════════════════════════════════════════
    'scenic-mountain-twilight': {
      key: 'scenic-mountain-twilight',
      name: '১১. গোধূলি বেলার পাহাড় (Mountain Twilight)',
      desc: 'গোলাপী ও বেগুনি গোধূলি আকাশের নিচে দূর পাহাড়ের স্তরীভূত ছায়া'
    },
    'scenic-kaaba-parchment': {
      key: 'scenic-kaaba-parchment',
      name: '১২. ভিন্টেজ কাবা পাণ্ডুলিপি (Kaaba Vintage Sketch)',
      desc: 'প্রাচীন পাণ্ডুলিপির ওপর পবিত্র কাবা শরীফ ও মিনারের শৈল্পিক স্কেচ'
    },
    'scenic-rehal-quran': {
      key: 'scenic-rehal-quran',
      name: '১৩. কাঠের রেহাল ও কোরআন (Rehal & Quran Studio)',
      desc: 'কাঠের রেহালে উন্মুক্ত পবিত্র কোরআন ও আধুনিক মিনিমালিস্ট ফ্রেম'
    },
    'scenic-desert-stars': {
      key: 'scenic-desert-stars',
      name: '১৪. তারকাময় মরুভূমি (Desert Dunes & Stars)',
      desc: 'গভীর রাতের তারকাময় আকাশ ও আলোকিত মরু বালিয়াড়ি'
    },
    'scenic-golden-clouds': {
      key: 'scenic-golden-clouds',
      name: '১৫. সোনালী সূর্যাস্ত মেঘমালা (Golden Sunset Clouds)',
      desc: 'গোধূলির সোনালী সূর্যরশ্মি ও মোহময় মেঘমালার আবহ'
    },
    'scenic-mosque-dusk': {
      key: 'scenic-mosque-dusk',
      name: '১৬. গোধূলি মসজিদ গম্বুজ (Mosque Dome at Dusk)',
      desc: 'গভীর নীল গোধূলি আকাশে মহিমান্বিত মসজিদ গম্বুজ ও মিনারের অবয়ব'
    },
    'scenic-medina-sanctuary': {
      key: 'scenic-medina-sanctuary',
      name: '১৭. মদিনার শ্যামলিম প্রাঙ্গণ (Medina Emerald Sanctuary)',
      desc: 'মদিনার শ্যামলিম আবহ, সোনালী নূর ও পবিত্র জ্যামিতিক আভা'
    },
    'scenic-alabaster-gold': {
      key: 'scenic-alabaster-gold',
      name: '১৮. শুভ্র আইভরি ও সোনা (Alabaster Minimal Gold)',
      desc: 'শুভ্র শ্বেতশুভ্র ব্যাকগ্রাউন্ড ও সূক্ষ্ম ২৪ ক্যারেট স্বর্ণালী কারুকাজ'
    },
    'scenic-crimson-horizon': {
      key: 'scenic-crimson-horizon',
      name: '১৯. রক্তিম দামেস্ক দিগন্ত (Crimson Dusk Horizon)',
      desc: 'গোধূলির রক্তিম দিগন্ত ও দূর খেজুরবাগানের ছায়াময় দৃশ্য'
    },
    'scenic-kiswah-night': {
      key: 'scenic-kiswah-night',
      name: '২০. কাবার কালো রেশম (Kiswah Midnight Silk)',
      desc: 'কাবার গিলাফের খাঁটি কালো রেশম ও সোনালী হরফের এমব্রয়ডারি'
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

    let theme = THEMES[themeKey] || THEMES['royal-emerald'];
    if (layoutKey === 'scenic-kaaba-parchment') {
      theme = Object.assign({}, theme, {
        arabicColor: '#2B1A0E',
        banglaColor: '#3D2817',
        accentGold: '#6D4C27',
        primaryGold: '#8B6538',
        metaColor: '#6D4C27',
        badgeBg: 'rgba(109, 76, 39, 0.12)',
        badgeBorder: 'rgba(109, 76, 39, 0.35)',
        badgeText: '#4A3219',
        isDark: false
      });
    } else if (layoutKey === 'scenic-alabaster-gold') {
      theme = Object.assign({}, theme, {
        arabicColor: '#064E3B',
        banglaColor: '#0F172A',
        accentGold: '#B45309',
        primaryGold: '#D97706',
        metaColor: '#047857',
        badgeBg: 'rgba(217, 119, 6, 0.12)',
        badgeBorder: 'rgba(217, 119, 6, 0.35)',
        badgeText: '#92400E',
        isDark: false
      });
    } else if (layoutKey.startsWith('scenic-')) {
      theme = Object.assign({}, theme, {
        arabicColor: '#FFF8E7',
        banglaColor: '#FFFFFF',
        accentGold: '#FDE68A',
        primaryGold: '#F59E0B',
        metaColor: '#FBBF24',
        badgeBg: 'rgba(255, 255, 255, 0.16)',
        badgeBorder: 'rgba(255, 255, 255, 0.35)',
        badgeText: '#FFFBEB',
        isDark: true
      });
    }
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
    if (layoutKey.startsWith('scenic-')) {
      renderScenicBackground(ctx, layoutKey, cardX, cardY, cardW, cardH);
    } else {
      ctx.fillStyle = theme.cardBg;
      ctx.fill();
    }
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

  
  // ═════════════════════════════════════════════════════════════════
  // 🌄 DRAW MUSLIMPRO-STYLE SCENIC BACKGROUNDS & ARTWORK
  // ═════════════════════════════════════════════════════════════════

  function renderScenicBackground(ctx, layoutKey, cardX, cardY, cardW, cardH) {
    ctx.save();
    // Clip inside rounded card
    drawRoundRect(ctx, cardX, cardY, cardW, cardH, 24);
    ctx.clip();

    switch (layoutKey) {
      // 11. Mountain Twilight
      case 'scenic-mountain-twilight': {
        const sky = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        sky.addColorStop(0, '#E76F51');   // Rose peach
        sky.addColorStop(0.25, '#C7517E'); // Magenta twilight
        sky.addColorStop(0.55, '#56357A'); // Violet dusk
        sky.addColorStop(0.85, '#1B1A47'); // Deep navy
        sky.addColorStop(1, '#0C0C24');    // Dark indigo
        ctx.fillStyle = sky;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Distant Mountain Ridge
        ctx.fillStyle = 'rgba(40, 24, 75, 0.6)';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH - 140);
        ctx.bezierCurveTo(cardX + 200, cardY + cardH - 260, cardX + 450, cardY + cardH - 160, cardX + 650, cardY + cardH - 240);
        ctx.bezierCurveTo(cardX + 800, cardY + cardH - 290, cardX + 900, cardY + cardH - 180, cardX + cardW, cardY + cardH - 210);
        ctx.lineTo(cardX + cardW, cardY + cardH);
        ctx.lineTo(cardX, cardY + cardH);
        ctx.fill();

        // Mid Mountain Ridge
        ctx.fillStyle = 'rgba(24, 15, 48, 0.85)';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH - 80);
        ctx.bezierCurveTo(cardX + 280, cardY + cardH - 170, cardX + 500, cardY + cardH - 100, cardX + 750, cardY + cardH - 180);
        ctx.bezierCurveTo(cardX + 880, cardY + cardH - 220, cardX + 940, cardY + cardH - 130, cardX + cardW, cardY + cardH - 140);
        ctx.lineTo(cardX + cardW, cardY + cardH);
        ctx.lineTo(cardX, cardY + cardH);
        ctx.fill();

        // Foreground Mountain Ridge
        ctx.fillStyle = '#0B0818';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH);
        ctx.lineTo(cardX, cardY + cardH - 40);
        ctx.bezierCurveTo(cardX + 300, cardY + cardH - 90, cardX + 600, cardY + cardH - 50, cardX + cardW, cardY + cardH - 85);
        ctx.lineTo(cardX + cardW, cardY + cardH);
        ctx.fill();

        // Center reading vignette
        const vig = ctx.createRadialGradient(W/2, H/2 + 20, 100, W/2, H/2 + 20, 480);
        vig.addColorStop(0, 'rgba(10, 8, 26, 0.2)');
        vig.addColorStop(1, 'rgba(10, 8, 26, 0.65)');
        ctx.fillStyle = vig;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 12. Kaaba Vintage Parchment
      case 'scenic-kaaba-parchment': {
        const bg = ctx.createRadialGradient(W/2, H/2, 120, W/2, H/2, 540);
        bg.addColorStop(0, '#FAF5EC');
        bg.addColorStop(0.6, '#F2E8D7');
        bg.addColorStop(1, '#E2D1B8');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Delicate Kaaba Vector Sketch at Top
        ctx.save();
        ctx.strokeStyle = 'rgba(109, 76, 39, 0.55)';
        ctx.fillStyle = 'rgba(109, 76, 39, 0.12)';
        ctx.lineWidth = 1.6;

        // Kaaba Cube (Isometric)
        const kX = W / 2;
        const kY = cardY + 115;
        // Front face
        ctx.beginPath();
        ctx.moveTo(kX, kY + 36);
        ctx.lineTo(kX - 38, kY + 16);
        ctx.lineTo(kX - 38, kY - 26);
        ctx.lineTo(kX, kY - 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Side face
        ctx.beginPath();
        ctx.moveTo(kX, kY + 36);
        ctx.lineTo(kX + 38, kY + 16);
        ctx.lineTo(kX + 38, kY - 26);
        ctx.lineTo(kX, kY - 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Top face
        ctx.beginPath();
        ctx.moveTo(kX, kY - 8);
        ctx.lineTo(kX - 38, kY - 26);
        ctx.lineTo(kX, kY - 44);
        ctx.lineTo(kX + 38, kY - 26);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Golden Hizam band on Kaaba
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(kX - 38, kY - 14);
        ctx.lineTo(kX, kY + 4);
        ctx.lineTo(kX + 38, kY - 14);
        ctx.stroke();

        // Minarets
        ctx.strokeStyle = 'rgba(109, 76, 39, 0.45)';
        ctx.lineWidth = 1.4;
        // Left minaret
        ctx.strokeRect(kX - 85, kY - 55, 8, 85);
        ctx.beginPath();
        ctx.moveTo(kX - 85, kY - 55); ctx.lineTo(kX - 81, kY - 72); ctx.lineTo(kX - 77, kY - 55);
        ctx.stroke();
        // Right minaret
        ctx.strokeRect(kX + 77, kY - 55, 8, 85);
        ctx.beginPath();
        ctx.moveTo(kX + 77, kY - 55); ctx.lineTo(kX + 81, kY - 72); ctx.lineTo(kX + 85, kY - 55);
        ctx.stroke();

        // Colonnade arches
        for (let i = -6; i <= 6; i++) {
          if (Math.abs(i) < 3) continue;
          const aX = kX + i * 24;
          ctx.beginPath();
          ctx.arc(aX, kY + 28, 9, Math.PI, 0);
          ctx.stroke();
        }
        ctx.restore();
        break;
      }

      // 13. Rehal & Quran Studio
      case 'scenic-rehal-quran': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#383236');
        bg.addColorStop(0.5, '#252023');
        bg.addColorStop(1, '#151214');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Open Quran & Rehal Vector Art at Top
        ctx.save();
        const rX = W / 2;
        const rY = cardY + 115;
        ctx.strokeStyle = '#D4AF37';
        ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
        ctx.lineWidth = 2;

        // Open Quran Pages
        // Left page
        ctx.beginPath();
        ctx.moveTo(rX, rY + 8);
        ctx.bezierCurveTo(rX - 30, rY - 14, rX - 60, rY - 8, rX - 68, rY - 26);
        ctx.lineTo(rX - 68, rY - 48);
        ctx.bezierCurveTo(rX - 60, rY - 32, rX - 30, rY - 36, rX, rY - 16);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right page
        ctx.beginPath();
        ctx.moveTo(rX, rY + 8);
        ctx.bezierCurveTo(rX + 30, rY - 14, rX + 60, rY - 8, rX + 68, rY - 26);
        ctx.lineTo(rX + 68, rY - 48);
        ctx.bezierCurveTo(rX + 60, rY - 32, rX + 30, rY - 36, rX, rY - 16);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Wooden Rehal Cross Stand
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(rX - 45, rY + 36); ctx.lineTo(rX + 45, rY + 2);
        ctx.moveTo(rX + 45, rY + 36); ctx.lineTo(rX - 45, rY + 2);
        ctx.stroke();

        ctx.restore();
        break;
      }

      // 14. Desert Dunes & Starfield
      case 'scenic-desert-stars': {
        const sky = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        sky.addColorStop(0, '#060A18');
        sky.addColorStop(0.4, '#0F1838');
        sky.addColorStop(0.7, '#1E234D');
        sky.addColorStop(1, '#0C0A14');
        ctx.fillStyle = sky;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Starfield dots
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        const stars = [
          [120, 100, 1.8], [240, 140, 1.2], [380, 80, 2.2], [520, 130, 1.4], [700, 95, 2.0], [850, 120, 1.5],
          [180, 220, 1.4], [310, 280, 1.8], [490, 240, 1.2], [660, 270, 2.4], [820, 230, 1.3], [930, 260, 1.9],
          [150, 360, 1.5], [400, 390, 1.2], [760, 380, 1.6], [880, 350, 2.0], [250, 480, 1.1], [810, 470, 1.3]
        ];
        stars.forEach(([sx, sy, sr]) => {
          ctx.beginPath();
          ctx.arc(cardX + sx * (cardW / 1000), cardY + sy * (cardH / 1000), sr, 0, Math.PI * 2);
          ctx.fill();
        });

        // Golden Crescent Moon
        drawCrescentMoon(ctx, cardX + cardW - 120, cardY + 110, 22, '#F5D77F');
        ctx.restore();

        // Sand Dunes
        ctx.fillStyle = 'rgba(38, 24, 16, 0.9)';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH - 120);
        ctx.bezierCurveTo(cardX + 240, cardY + cardH - 190, cardX + 500, cardY + cardH - 130, cardX + 720, cardY + cardH - 180);
        ctx.bezierCurveTo(cardX + 860, cardY + cardH - 210, cardX + 930, cardY + cardH - 150, cardX + cardW, cardY + cardH - 160);
        ctx.lineTo(cardX + cardW, cardY + cardH);
        ctx.lineTo(cardX, cardY + cardH);
        ctx.fill();

        ctx.fillStyle = '#140D09';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH);
        ctx.lineTo(cardX, cardY + cardH - 70);
        ctx.bezierCurveTo(cardX + 320, cardY + cardH - 120, cardX + 640, cardY + cardH - 60, cardX + cardW, cardY + cardH - 110);
        ctx.lineTo(cardX + cardW, cardY + cardH);
        ctx.fill();
        break;
      }

      // 15. Golden Sunset Clouds
      case 'scenic-golden-clouds': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#F59E0B');  // Amber
        bg.addColorStop(0.35, '#EA580C'); // Orange
        bg.addColorStop(0.65, '#991B1B'); // Crimson dusk
        bg.addColorStop(0.9, '#450A0A');  // Deep maroon
        bg.addColorStop(1, '#1C0608');    // Midnight horizon
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Radiant Sunburst Glow
        const sun = ctx.createRadialGradient(W / 2, cardY + cardH - 160, 20, W / 2, cardY + cardH - 160, 360);
        sun.addColorStop(0, 'rgba(254, 243, 199, 0.55)');
        sun.addColorStop(0.4, 'rgba(245, 158, 11, 0.35)');
        sun.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = sun;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Soft cloud silhouettes
        ctx.fillStyle = 'rgba(30, 10, 14, 0.65)';
        ctx.beginPath();
        ctx.arc(cardX + 200, cardY + cardH - 90, 90, 0, Math.PI * 2);
        ctx.arc(cardX + 320, cardY + cardH - 110, 120, 0, Math.PI * 2);
        ctx.arc(cardX + 500, cardY + cardH - 95, 110, 0, Math.PI * 2);
        ctx.arc(cardX + 680, cardY + cardH - 120, 130, 0, Math.PI * 2);
        ctx.arc(cardX + 840, cardY + cardH - 85, 100, 0, Math.PI * 2);
        ctx.fill();

        // Dark Vignette for crisp text contrast
        const vig = ctx.createRadialGradient(W/2, H/2 + 20, 80, W/2, H/2 + 20, 480);
        vig.addColorStop(0, 'rgba(20, 8, 10, 0.25)');
        vig.addColorStop(1, 'rgba(20, 8, 10, 0.7)');
        ctx.fillStyle = vig;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 16. Mosque Dome at Dusk
      case 'scenic-mosque-dusk': {
        const sky = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        sky.addColorStop(0, '#0A1128');
        sky.addColorStop(0.4, '#1C2541');
        sky.addColorStop(0.7, '#3A506B');
        sky.addColorStop(1, '#0B132B');
        ctx.fillStyle = sky;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Silhouette of Mosque Dome & Minarets
        ctx.save();
        ctx.fillStyle = '#060B18';
        const mX = W / 2;
        const mY = cardY + cardH;

        // Central Dome
        ctx.beginPath();
        ctx.arc(mX, mY - 60, 130, Math.PI, 0);
        ctx.lineTo(mX + 130, mY);
        ctx.lineTo(mX - 130, mY);
        ctx.fill();

        // Dome Spire & Crescent
        ctx.strokeStyle = '#F5D77F';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(mX, mY - 190); ctx.lineTo(mX, mY - 220);
        ctx.stroke();
        drawCrescentMoon(ctx, mX, mY - 228, 9, '#F5D77F');

        // Left Minaret
        ctx.fillStyle = '#060B18';
        ctx.fillRect(mX - 280, mY - 260, 24, 260);
        ctx.beginPath();
        ctx.moveTo(mX - 280, mY - 260); ctx.lineTo(mX - 268, mY - 295); ctx.lineTo(mX - 256, mY - 260);
        ctx.fill();

        // Right Minaret
        ctx.fillRect(mX + 256, mY - 260, 24, 260);
        ctx.beginPath();
        ctx.moveTo(mX + 256, mY - 260); ctx.lineTo(mX + 268, mY - 295); ctx.lineTo(mX + 280, mY - 260);
        ctx.fill();

        // Moon in sky
        drawCrescentMoon(ctx, cardX + 130, cardY + 120, 20, '#F5D77F');
        ctx.restore();
        break;
      }

      // 17. Medina Emerald Sanctuary
      case 'scenic-medina-sanctuary': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#011F16');
        bg.addColorStop(0.5, '#053E2C');
        bg.addColorStop(1, '#021811');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Radiant emerald halo
        const halo = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, 450);
        halo.addColorStop(0, 'rgba(46, 213, 115, 0.12)');
        halo.addColorStop(0.5, 'rgba(212, 175, 55, 0.08)');
        halo.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
        ctx.fillStyle = halo;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Central rosette watermark
        ctx.save();
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.arc(W / 2, H / 2, 110 + i * 28, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
        break;
      }

      // 18. Alabaster Minimal Gold
      case 'scenic-alabaster-gold': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#FFFFFF');
        bg.addColorStop(0.5, '#F8FAFC');
        bg.addColorStop(1, '#F1F5F9');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 19. Crimson Dusk Horizon
      case 'scenic-crimson-horizon': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#38060E');
        bg.addColorStop(0.4, '#7F1D1D');
        bg.addColorStop(0.7, '#991B1B');
        bg.addColorStop(0.9, '#450A0A');
        bg.addColorStop(1, '#1A0407');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Distant Palm Silhouettes
        ctx.save();
        ctx.fillStyle = '#120204';
        const pY = cardY + cardH;
        // Ground line
        ctx.fillRect(cardX, pY - 35, cardW, 35);
        // Palms
        const palmPositions = [cardX + 110, cardX + 160, cardX + cardW - 140];
        palmPositions.forEach(px => {
          ctx.fillRect(px, pY - 110, 6, 80);
          ctx.beginPath();
          ctx.arc(px + 3, pY - 110, 24, 0, Math.PI);
          ctx.fill();
        });
        ctx.restore();
        break;
      }

      // 20. Kiswah Midnight Silk
      case 'scenic-kiswah-night': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#07080A');
        bg.addColorStop(0.5, '#12141A');
        bg.addColorStop(1, '#08090C');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Gold-Thread Kiswah Embroidery Band
        ctx.save();
        const bandY = cardY + 110;
        const bandH = 46;
        ctx.fillStyle = 'rgba(212, 175, 55, 0.16)';
        ctx.fillRect(cardX + 24, bandY, cardW - 48, bandH);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 2;
        ctx.strokeRect(cardX + 24, bandY, cardW - 48, bandH);

        // Decorative Chevron stitches inside band
        ctx.strokeStyle = 'rgba(245, 215, 127, 0.6)';
        ctx.lineWidth = 1.4;
        const step = 28;
        for (let x = cardX + 35; x < cardX + cardW - 40; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, bandY + bandH / 2);
          ctx.lineTo(x + step / 2, bandY + 8);
          ctx.lineTo(x + step, bandY + bandH / 2);
          ctx.lineTo(x + step / 2, bandY + bandH - 8);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
        break;
      }
    }

    ctx.restore();
  }

  function renderLayoutFrame(ctx, layoutKey, theme, cardX, cardY, cardW, cardH) {
    ctx.save();

    // Scenic Photo Frames
    if (layoutKey.startsWith('scenic-')) {
      if (layoutKey === 'scenic-kaaba-parchment' || layoutKey === 'scenic-alabaster-gold') {
        // Double hairline border for light parchment / alabaster
        ctx.strokeStyle = layoutKey === 'scenic-alabaster-gold' ? 'rgba(212, 175, 55, 0.65)' : 'rgba(109, 76, 39, 0.45)';
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();
        drawRoundRect(ctx, cardX + 22, cardY + 22, cardW - 44, cardH - 44, 12);
        ctx.stroke();
        drawCornerBrackets(ctx, cardX + 28, cardY + 28, cardW - 56, cardH - 56, 26, '#D4AF37');
      } else {
        // MuslimPro-style signature crisp white hairline photo frame
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
        ctx.lineWidth = 1.4;
        ctx.strokeRect(cardX + 20, cardY + 20, cardW - 40, cardH - 40);
        // Corner tick accents
        const cL = 22;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 2.4;
        // Top-left
        ctx.beginPath(); ctx.moveTo(cardX + 14, cardY + 20 + cL); ctx.lineTo(cardX + 20, cardY + 20); ctx.lineTo(cardX + 20 + cL, cardY + 14); ctx.stroke();
        // Top-right
        ctx.beginPath(); ctx.moveTo(cardX + cardW - 20 - cL, cardY + 14); ctx.lineTo(cardX + cardW - 20, cardY + 20); ctx.lineTo(cardX + cardW - 14, cardY + 20 + cL); ctx.stroke();
        // Bottom-left
        ctx.beginPath(); ctx.moveTo(cardX + 14, cardY + cardH - 20 - cL); ctx.lineTo(cardX + 20, cardY + cardH - 20); ctx.lineTo(cardX + 20 + cL, cardY + cardH - 14); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(cardX + cardW - 20 - cL, cardY + cardH - 14); ctx.lineTo(cardX + cardW - 20, cardY + cardH - 20); ctx.lineTo(cardX + cardW - 14, cardY + cardH - 20 - cL); ctx.stroke();
      }
      ctx.restore();
      return;
    }

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
