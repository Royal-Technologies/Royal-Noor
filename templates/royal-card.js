/**
 * Royal Noor — 1080x1080 Islamic Card Template Engine
 * 10 Distinct Royal Themes & Serial Rotation
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

  // 10 Distinct Royal Islamic Themes
  const THEMES = {
    'royal-emerald': {
      key: 'royal-emerald',
      name: 'পান্না সবুজ (Royal Emerald)',
      bgGrad: ['#011710', '#05291E', '#093E2F'],
      cardBg: '#042118',
      innerBg: 'rgba(2, 25, 18, 0.7)',
      primaryGold: '#E5C383',
      secondaryGold: '#BF9546',
      accentGold: '#F9ECCE',
      arabicColor: '#F9ECCE',
      banglaColor: '#FAF6EE',
      metaColor: '#D8BF89',
      borderColor: 'rgba(229, 195, 131, 0.45)',
      cornerColor: '#E5C383',
      patternColor: 'rgba(229, 195, 131, 0.035)',
      patternType: 'lattice',
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
      innerBg: 'rgba(4, 14, 28, 0.7)',
      primaryGold: '#EAC875',
      secondaryGold: '#C59E3F',
      accentGold: '#FDF2D4',
      arabicColor: '#FDF2D4',
      banglaColor: '#F1F5F9',
      metaColor: '#D4B365',
      borderColor: 'rgba(234, 200, 117, 0.45)',
      cornerColor: '#EAC875',
      patternColor: 'rgba(234, 200, 117, 0.035)',
      patternType: 'stars',
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
      innerBg: 'rgba(8, 9, 12, 0.75)',
      primaryGold: '#F5D77F',
      secondaryGold: '#C99E32',
      accentGold: '#FFF4D6',
      arabicColor: '#FFF4D6',
      banglaColor: '#FAF9F6',
      metaColor: '#D9B45C',
      borderColor: 'rgba(245, 215, 127, 0.5)',
      cornerColor: '#F5D77F',
      patternColor: 'rgba(245, 215, 127, 0.03)',
      patternType: 'diamonds',
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
      innerBg: '#F3ECE0',
      primaryGold: '#946E26',
      secondaryGold: '#6A4A0E',
      accentGold: '#B8892E',
      arabicColor: '#1A120B',
      banglaColor: '#2B1E14',
      metaColor: '#6B4D18',
      borderColor: 'rgba(148, 110, 38, 0.38)',
      cornerColor: '#946E26',
      patternColor: 'rgba(148, 110, 38, 0.04)',
      patternType: 'manuscript',
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
      innerBg: 'rgba(24, 4, 11, 0.72)',
      primaryGold: '#F2CB75',
      secondaryGold: '#D49D34',
      accentGold: '#FCEECC',
      arabicColor: '#FCEECC',
      banglaColor: '#FDF5EC',
      metaColor: '#DEB059',
      borderColor: 'rgba(242, 203, 117, 0.45)',
      cornerColor: '#F2CB75',
      patternColor: 'rgba(242, 203, 117, 0.035)',
      patternType: 'lattice',
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
      innerBg: 'rgba(2, 25, 30, 0.72)',
      primaryGold: '#62E5D5',
      secondaryGold: '#E5C370',
      accentGold: '#FBF3D4',
      arabicColor: '#FBF3D4',
      banglaColor: '#EFFFFD',
      metaColor: '#52D4C4',
      borderColor: 'rgba(98, 229, 213, 0.42)',
      cornerColor: '#E5C370',
      patternColor: 'rgba(98, 229, 213, 0.035)',
      patternType: 'diamonds',
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
      innerBg: 'rgba(28, 12, 3, 0.72)',
      primaryGold: '#F7BA45',
      secondaryGold: '#DC8D24',
      accentGold: '#FCE7B8',
      arabicColor: '#FCE7B8',
      banglaColor: '#FAF4EC',
      metaColor: '#DE9837',
      borderColor: 'rgba(247, 186, 69, 0.45)',
      cornerColor: '#F7BA45',
      patternColor: 'rgba(247, 186, 69, 0.035)',
      patternType: 'stars',
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
      innerBg: 'rgba(18, 7, 30, 0.72)',
      primaryGold: '#EFD48E',
      secondaryGold: '#CFA64F',
      accentGold: '#F9EED4',
      arabicColor: '#F9EED4',
      banglaColor: '#F8F3FC',
      metaColor: '#D8B568',
      borderColor: 'rgba(239, 212, 142, 0.45)',
      cornerColor: '#EFD48E',
      patternColor: 'rgba(239, 212, 142, 0.035)',
      patternType: 'lattice',
      badgeBg: 'rgba(239, 212, 142, 0.15)',
      badgeBorder: 'rgba(239, 212, 142, 0.35)',
      badgeText: '#F9EED4',
      isDark: true
    },
    'andalusian-mihrab': {
      key: 'andalusian-mihrab',
      name: 'আন্দালুসীয় মেহরাব (Andalusian Mihrab)',
      bgGrad: ['#071A12', '#0D2B1F', '#164230'],
      cardBg: '#092218',
      innerBg: 'rgba(7, 24, 17, 0.75)',
      primaryGold: '#E7C67E',
      secondaryGold: '#BA943E',
      accentGold: '#F8EED5',
      arabicColor: '#F8EED5',
      banglaColor: '#FAF7F0',
      metaColor: '#D2AD5E',
      borderColor: 'rgba(231, 198, 126, 0.45)',
      cornerColor: '#E7C67E',
      patternColor: 'rgba(231, 198, 126, 0.035)',
      patternType: 'mihrab',
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
      innerBg: '#F6F3EC',
      primaryGold: '#967228',
      secondaryGold: '#705315',
      accentGold: '#BD9645',
      arabicColor: '#0C1B16',
      banglaColor: '#172420',
      metaColor: '#705315',
      borderColor: 'rgba(150, 114, 40, 0.4)',
      cornerColor: '#967228',
      patternColor: 'rgba(150, 114, 40, 0.04)',
      patternType: 'manuscript',
      badgeBg: 'rgba(150, 114, 40, 0.1)',
      badgeBorder: 'rgba(150, 114, 40, 0.32)',
      badgeText: '#705315',
      isDark: false
    }
  };

  const THEME_ORDER = [
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

  /**
   * Helper: Wrap text into lines fitting max width
   */
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
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  }

  /**
   * Draw rounded rectangle
   */
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

  /**
   * Draw Islamic 8-Point Star at (cx, cy)
   */
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

  /**
   * Draw Vector Crescent Moon
   */
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

  /**
   * Draw Vector Quotation Marks (Double Teardrop)
   */
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

  /**
   * Draw Ornamental Islamic Corner Brackets
   */
  function drawCornerOrnaments(ctx, x, y, w, h, size, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'square';

    const corners = [
      { cx: x, cy: y, dx: 1, dy: 1 },                 // Top-Left
      { cx: x + w, cy: y, dx: -1, dy: 1 },            // Top-Right
      { cx: x, cy: y + h, dx: 1, dy: -1 },           // Bottom-Left
      { cx: x + w, cy: y + h, dx: -1, dy: -1 }       // Bottom-Right
    ];

    corners.forEach(c => {
      // Outer L-bracket
      ctx.beginPath();
      ctx.moveTo(c.cx, c.cy + c.dy * size);
      ctx.lineTo(c.cx, c.cy);
      ctx.lineTo(c.cx + c.dx * size, c.cy);
      ctx.stroke();

      // Inner flourish
      ctx.beginPath();
      ctx.moveTo(c.cx + c.dx * 8, c.cy + c.dy * (size - 6));
      ctx.lineTo(c.cx + c.dx * 8, c.cy + c.dy * 8);
      ctx.lineTo(c.cx + c.dx * (size - 6), c.cy + c.dy * 8);
      ctx.stroke();

      // Corner diamond star
      const dX = c.cx + c.dx * 18;
      const dY = c.cy + c.dy * 18;
      drawIslamicStar(ctx, dX, dY, 5, 2.5, color);
    });

    ctx.restore();
  }

  /**
   * Draw Background Patterns according to theme
   */
  function drawPattern(ctx, x, y, w, h, theme) {
    ctx.save();
    ctx.strokeStyle = theme.patternColor;
    ctx.fillStyle = theme.patternColor;
    ctx.lineWidth = 1;

    const pType = theme.patternType || 'lattice';

    if (pType === 'stars') {
      const step = 90;
      for (let px = x + 30; px <= x + w - 30; px += step) {
        for (let py = y + 30; py <= y + h - 30; py += step) {
          drawIslamicStar(ctx, px, py, 4, 2, theme.patternColor);
        }
      }
    } else if (pType === 'diamonds') {
      const step = 70;
      ctx.beginPath();
      for (let px = x; px <= x + w; px += step) {
        for (let py = y; py <= y + h; py += step) {
          ctx.moveTo(px, py - 10);
          ctx.lineTo(px + 10, py);
          ctx.lineTo(px, py + 10);
          ctx.lineTo(px - 10, py);
          ctx.closePath();
        }
      }
      ctx.stroke();
    } else if (pType === 'manuscript') {
      // Double clean manuscript inner borders
      ctx.beginPath();
      drawRoundRect(ctx, x + 10, y + 10, w - 20, h - 20, 8);
      ctx.stroke();
    } else {
      // Default geometric lattice
      const step = 80;
      ctx.beginPath();
      for (let px = x; px <= x + w; px += step) {
        for (let py = y; py <= y + h; py += step) {
          ctx.moveTo(px, py - 12);
          ctx.lineTo(px + 12, py);
          ctx.lineTo(px, py + 12);
          ctx.lineTo(px - 12, py);
          ctx.closePath();
        }
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Draw Andalusian Mihrab Arch (Theme 9 Special Feature)
   */
  function drawMihrabArch(ctx, cardX, cardY, cardW, theme) {
    ctx.save();
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1.8;

    const archLeft = cardX + 90;
    const archRight = cardX + cardW - 90;
    const archBottom = cardY + 280;
    const archSpring = cardY + 160;
    const archApex = cardY + 45;

    ctx.beginPath();
    // Left column
    ctx.moveTo(archLeft, archBottom);
    ctx.lineTo(archLeft, archSpring);

    // Horseshoe curve to apex
    ctx.bezierCurveTo(archLeft - 10, archApex + 20, W / 2 - 60, archApex - 12, W / 2, archApex - 12);
    ctx.bezierCurveTo(W / 2 + 60, archApex - 12, archRight + 10, archApex + 20, archRight, archSpring);

    // Right column
    ctx.lineTo(archRight, archBottom);
    ctx.stroke();

    // Mihrab keystone ornament
    drawIslamicStar(ctx, W / 2, archApex - 12, 7, 3.5, theme.primaryGold);

    ctx.restore();
  }

  /**
   * Main Render Function
   */
  function render(canvas, item, options) {
    options = options || {};
    const themeKey = options.theme || item.theme || 'royal-emerald';
    const theme = THEMES[themeKey] || THEMES['royal-emerald'];
    const ctx = canvas.getContext('2d');

    // 1. Outer Background Gradient
    ctx.clearRect(0, 0, W, H);
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, theme.bgGrad[0]);
    bgGrad.addColorStop(0.5, theme.bgGrad[1]);
    bgGrad.addColorStop(1, theme.bgGrad[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Main Card Body
    const cardX = 48;
    const cardY = 48;
    const cardW = W - 96;
    const cardH = H - 96;

    // Outer card drop shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 12;

    drawRoundRect(ctx, cardX, cardY, cardW, cardH, 24);
    ctx.fillStyle = theme.cardBg;
    ctx.fill();
    ctx.restore();

    // Background Pattern inside card
    drawPattern(ctx, cardX + 24, cardY + 24, cardW - 48, cardH - 48, theme);

    // Special Mihrab Arch for Theme 9
    if (theme.patternType === 'mihrab') {
      drawMihrabArch(ctx, cardX, cardY, cardW, theme);
    }

    // Card Borders (Double Royal Frame)
    ctx.save();
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 2;
    drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
    ctx.stroke();

    ctx.strokeStyle = theme.isDark ? 'rgba(230, 200, 140, 0.2)' : 'rgba(148, 110, 38, 0.2)';
    ctx.lineWidth = 1;
    drawRoundRect(ctx, cardX + 26, cardY + 26, cardW - 52, cardH - 52, 12);
    ctx.stroke();
    ctx.restore();

    // Corner Ornaments
    drawCornerOrnaments(ctx, cardX + 32, cardY + 32, cardW - 64, cardH - 64, 45, theme.cornerColor);

    // 3. Header Section (Bismillah, Brand & Badge)
    let currentY = cardY + 66;

    // Bismillah Calligraphy (Using authentic Arabic font)
    ctx.save();
    ctx.fillStyle = theme.accentGold;
    ctx.font = 'bold 30px "Amiri", "Traditional Arabic", serif';
    ctx.textAlign = 'center';
    ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', W / 2, currentY);
    ctx.restore();

    currentY += 46;

    // Brand Name: ROYAL NOOR [Vector Star] আলোর পথে প্রতিদিন
    ctx.save();
    ctx.font = 'bold 18px "Hind Siliguri", sans-serif';
    const leftText = 'ROYAL NOOR';
    const rightText = 'আলোর পথে প্রতিদিন';
    const wLeft = ctx.measureText(leftText).width;
    const wRight = ctx.measureText(rightText).width;
    const starGap = 20;
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

    currentY += 28;

    // Badge Pill with Pure Bengali Text & Canvas Vector Icon (No Unicode Tofu Boxes!)
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
    const iconOffset = 22;
    const badgeW = badgeTextWidth + 48 + iconOffset;
    const badgeH = 32;
    const badgeX = (W - badgeW) / 2;

    drawRoundRect(ctx, badgeX, currentY, badgeW, badgeH, 16);
    ctx.fillStyle = theme.badgeBg;
    ctx.fill();
    ctx.strokeStyle = theme.badgeBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw Vector Icon inside badge
    const iconCenterX = badgeX + 24;
    const iconCenterY = currentY + 16;
    if (badgeIcon === 'moon') {
      drawCrescentMoon(ctx, iconCenterX, iconCenterY, 6, theme.badgeText);
    } else {
      drawIslamicStar(ctx, iconCenterX, iconCenterY, 5, 2.5, theme.badgeText);
    }

    ctx.fillStyle = theme.badgeText;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, badgeX + 38, currentY + 16);
    ctx.restore();

    // 4. Dynamic Typography & Layout Calculation
    const contentMaxW = cardW - 140; // 844px text width
    const contentCenterY = 540;

    // Arabic Font Size Auto-Fitting
    const arText = item.arabic_text || '';
    let arFontSize = 38;
    if (arText.length > 250) arFontSize = 26;
    else if (arText.length > 160) arFontSize = 30;
    else if (arText.length > 90) arFontSize = 34;
    else arFontSize = 40;

    ctx.font = `bold ${arFontSize}px "Amiri", "Traditional Arabic", serif`;
    const arLineHeight = Math.round(arFontSize * 1.85);
    const arLines = wrapText(ctx, arText, contentMaxW);
    const arTotalHeight = arLines.length * arLineHeight;

    // Bangla Translation Font Size Auto-Fitting (Pure Text, No unicode quote glyphs!)
    const bnText = item.bangla_translation || '';
    let bnFontSize = 27;
    if (bnText.length > 300) bnFontSize = 20;
    else if (bnText.length > 180) bnFontSize = 23;
    else if (bnText.length > 110) bnFontSize = 26;
    else bnFontSize = 29;

    ctx.font = `600 ${bnFontSize}px "Hind Siliguri", sans-serif`;
    const bnLineHeight = Math.round(bnFontSize * 1.6);
    const bnLines = wrapText(ctx, bnText, contentMaxW - 60);
    const bnTotalHeight = bnLines.length * bnLineHeight;

    const sepHeight = 60;
    const totalBlockHeight = arTotalHeight + sepHeight + bnTotalHeight;

    let textStartY = contentCenterY - (totalBlockHeight / 2) + 15;
    if (textStartY < currentY + 65) {
      textStartY = currentY + 65;
    }

    // 5. Render Arabic Text
    ctx.save();
    ctx.font = `bold ${arFontSize}px "Amiri", "Traditional Arabic", serif`;
    ctx.fillStyle = theme.arabicColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (theme.isDark) {
      ctx.shadowColor = 'rgba(230, 200, 140, 0.25)';
      ctx.shadowBlur = 8;
    }

    let arY = textStartY;
    for (let i = 0; i < arLines.length; i++) {
      ctx.fillText(arLines[i], W / 2, arY);
      arY += arLineHeight;
    }
    ctx.restore();

    // 6. Islamic Ornamental Divider
    const sepY = arY + 8;
    ctx.save();
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;

    // Left line
    ctx.beginPath();
    ctx.moveTo(W / 2 - 180, sepY);
    ctx.lineTo(W / 2 - 40, sepY);
    ctx.stroke();

    // Center star ornaments
    drawIslamicStar(ctx, W / 2, sepY, 9, 4.5, theme.primaryGold);
    drawIslamicStar(ctx, W / 2 - 25, sepY, 4, 2, theme.secondaryGold);
    drawIslamicStar(ctx, W / 2 + 25, sepY, 4, 2, theme.secondaryGold);

    // Right line
    ctx.beginPath();
    ctx.moveTo(W / 2 + 40, sepY);
    ctx.lineTo(W / 2 + 180, sepY);
    ctx.stroke();
    ctx.restore();

    // 7. Render Bangla Translation with Elegant Vector Quotes
    let bnY = sepY + 42;
    ctx.save();
    ctx.font = `600 ${bnFontSize}px "Hind Siliguri", sans-serif`;
    ctx.fillStyle = theme.banglaColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Render Bangla text lines
    for (let i = 0; i < bnLines.length; i++) {
      ctx.fillText(bnLines[i], W / 2, bnY);
      bnY += bnLineHeight;
    }
    ctx.restore();

    // Draw Vector Quote marks framing the Bangla translation block
    const firstLineY = sepY + 42;
    const lastLineY = bnY - bnLineHeight;
    const quoteLeftX = cardX + 58;
    const quoteRightX = cardX + cardW - 58;

    drawVectorQuote(ctx, quoteLeftX, firstLineY - 4, 14, theme.primaryGold, false);
    drawVectorQuote(ctx, quoteRightX, lastLineY + 6, 14, theme.primaryGold, true);

    // 8. Reference Box (e.g. [ সূরা আল-বাকারা : ১৫৩ ])
    const refY = Math.max(bnY + 34, cardY + cardH - 120);
    const refText = `— [ ${item.reference || item.title} ]`;

    ctx.save();
    ctx.font = 'bold 18px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.metaColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(refText, W / 2, refY);
    ctx.restore();

    // 9. Footer Section (Royal Technologies Branding & Website)
    const footerY = cardY + cardH - 52;

    ctx.save();
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(cardX + 80, footerY - 18);
    ctx.lineTo(cardX + cardW - 80, footerY - 18);
    ctx.stroke();

    // Left: ROYAL TECHNOLOGIES
    ctx.font = 'bold 14px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.metaColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('ROYAL TECHNOLOGIES', cardX + 45, footerY);

    // Center: কোরআন ও সহীহ সুন্নাহর আলো
    ctx.font = '500 13px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('কোরআন ও সহীহ সুন্নাহর আলো', W / 2, footerY);

    // Right: www.royaltechbd.com
    ctx.font = 'bold 14px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('www.royaltechbd.com', cardX + cardW - 45, footerY);
    ctx.restore();

    return canvas;
  }

  return {
    THEMES,
    THEME_ORDER,
    render,
    wrapText,
    drawIslamicStar,
    drawCrescentMoon,
    drawVectorQuote
  };
});
