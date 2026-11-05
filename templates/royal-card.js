/**
 * Royal Noor — 1080x1080 Islamic Card Template Engine
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

  const THEMES = {
    'royal-emerald': {
      name: 'Royal Emerald',
      bgGrad: ['#021b14', '#062d22', '#0a4232'],
      cardBg: '#05271d',
      innerBg: 'rgba(2, 27, 20, 0.65)',
      primaryGold: '#E6C687',
      secondaryGold: '#BF9546',
      accentGold: '#F7E7C4',
      arabicColor: '#F7E7C4',
      banglaColor: '#FAF6EE',
      metaColor: '#D8BF89',
      borderColor: 'rgba(230, 198, 135, 0.45)',
      cornerColor: '#E6C687',
      subtlePattern: 'rgba(230, 198, 135, 0.035)',
      badgeBg: 'rgba(230, 198, 135, 0.15)',
      badgeBorder: 'rgba(230, 198, 135, 0.35)',
      badgeText: '#F7E7C4',
      isDark: true
    },
    'midnight-navy': {
      name: 'Midnight Navy',
      bgGrad: ['#040c18', '#08182f', '#0d2447'],
      cardBg: '#091b34',
      innerBg: 'rgba(4, 12, 24, 0.65)',
      primaryGold: '#EAC875',
      secondaryGold: '#C59E3F',
      accentGold: '#FBF0C9',
      arabicColor: '#FBF0C9',
      banglaColor: '#F1F5F9',
      metaColor: '#D4B365',
      borderColor: 'rgba(234, 200, 117, 0.45)',
      cornerColor: '#EAC875',
      subtlePattern: 'rgba(234, 200, 117, 0.035)',
      badgeBg: 'rgba(234, 200, 117, 0.15)',
      badgeBorder: 'rgba(234, 200, 117, 0.35)',
      badgeText: '#FBF0C9',
      isDark: true
    },
    'imperial-black': {
      name: 'Imperial Black',
      bgGrad: ['#08090c', '#101217', '#171a22'],
      cardBg: '#0f1117',
      innerBg: 'rgba(8, 9, 12, 0.7)',
      primaryGold: '#F0D289',
      secondaryGold: '#C99E32',
      accentGold: '#FFF0C2',
      arabicColor: '#FFF0C2',
      banglaColor: '#F8FAFC',
      metaColor: '#D9B45C',
      borderColor: 'rgba(240, 210, 137, 0.45)',
      cornerColor: '#F0D289',
      subtlePattern: 'rgba(240, 210, 137, 0.03)',
      badgeBg: 'rgba(240, 210, 137, 0.15)',
      badgeBorder: 'rgba(240, 210, 137, 0.35)',
      badgeText: '#FFF0C2',
      isDark: true
    },
    'warm-parchment': {
      name: 'Warm Parchment',
      bgGrad: ['#221A14', '#362A1F', '#4A3B2C'],
      cardBg: '#F7F2E7',
      innerBg: '#FAF6EE',
      primaryGold: '#8C6721',
      secondaryGold: '#664910',
      accentGold: '#B88B35',
      arabicColor: '#1F1710',
      banglaColor: '#2B2117',
      metaColor: '#5C4421',
      borderColor: 'rgba(140, 103, 33, 0.35)',
      cornerColor: '#8C6721',
      subtlePattern: 'rgba(140, 103, 33, 0.04)',
      badgeBg: 'rgba(140, 103, 33, 0.1)',
      badgeBorder: 'rgba(140, 103, 33, 0.3)',
      badgeText: '#664910',
      isDark: false
    }
  };

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
      // Corner L-lines
      ctx.beginPath();
      ctx.moveTo(c.cx, c.cy + c.dy * size);
      ctx.lineTo(c.cx, c.cy);
      ctx.lineTo(c.cx + c.dx * size, c.cy);
      ctx.stroke();

      // Inner diagonal flourish
      ctx.beginPath();
      ctx.moveTo(c.cx + c.dx * 8, c.cy + c.dy * (size - 6));
      ctx.lineTo(c.cx + c.dx * 8, c.cy + c.dy * 8);
      ctx.lineTo(c.cx + c.dx * (size - 6), c.cy + c.dy * 8);
      ctx.stroke();

      // Small corner diamond
      const dX = c.cx + c.dx * 18;
      const dY = c.cy + c.dy * 18;
      drawIslamicStar(ctx, dX, dY, 5, 2.5, color);
    });

    ctx.restore();
  }

  /**
   * Draw Subtle Geometric Lattice in Background
   */
  function drawBackgroundPattern(ctx, x, y, w, h, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
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

    // 1. Clear Canvas & Draw Outer Background Gradient
    ctx.clearRect(0, 0, W, H);
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, theme.bgGrad[0]);
    bgGrad.addColorStop(0.5, theme.bgGrad[1]);
    bgGrad.addColorStop(1, theme.bgGrad[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Main Card Area
    const cardX = 48;
    const cardY = 48;
    const cardW = W - 96;
    const cardH = H - 96;

    // Card shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 12;

    // Card fill
    drawRoundRect(ctx, cardX, cardY, cardW, cardH, 24);
    ctx.fillStyle = theme.cardBg;
    ctx.fill();
    ctx.restore();

    // Subtle background pattern inside card
    drawBackgroundPattern(ctx, cardX + 20, cardY + 20, cardW - 40, cardH - 40, theme.subtlePattern);

    // Inner Card Border (Outer line + Inner thin line)
    ctx.save();
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 2;
    drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(230, 198, 135, 0.2)';
    ctx.lineWidth = 1;
    drawRoundRect(ctx, cardX + 26, cardY + 26, cardW - 52, cardH - 52, 12);
    ctx.stroke();
    ctx.restore();

    // Draw Corner Ornaments
    drawCornerOrnaments(ctx, cardX + 32, cardY + 32, cardW - 64, cardH - 64, 45, theme.cornerColor);

    // 3. Header Section (Bismillah, Brand & Tag Badge)
    let currentY = cardY + 68;

    // Bismillah Calligraphy
    ctx.save();
    ctx.fillStyle = theme.accentGold;
    ctx.font = 'bold 30px "Amiri", "Traditional Arabic", serif';
    ctx.textAlign = 'center';
    ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', W / 2, currentY);
    ctx.restore();

    currentY += 46;

    // Brand Name: ROYAL NOOR • আলোর পথে প্রতিদিন
    ctx.save();
    ctx.fillStyle = theme.primaryGold;
    ctx.font = 'bold 19px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '1px';
    ctx.fillText('ROYAL NOOR  ✦  আলোর পথে প্রতিদিন', W / 2, currentY);
    ctx.restore();

    currentY += 28;

    // Badge Pill (e.g. 🌙 রমজান স্পেশাল, 🕌 জুমু'আ মুবারক, 📖 পবিত্র কোরআন, ✨ সহীহ হাদিস)
    let badgeText = item.type === 'quran' ? '📖 পবিত্র কোরআন' : '✨ সহীহ হাদিস';
    if (item.event_tag === 'ramadan') {
      badgeText = "🌙 রমজানুল মোবারক স্পেশাল";
    } else if (item.event_tag === 'friday' || item.target_day === 'friday') {
      badgeText = "🕌 জুমু'আ মুবারক স্পেশাল";
    } else if (item.event_tag === 'dhul_hijjah') {
      badgeText = "🕋 জিলহজ্জ ও কুরবানী স্পেশাল";
    } else if (item.category && item.category !== 'সাধারণ') {
      badgeText = `${item.type === 'quran' ? '📖' : '✨'} ${item.category}`;
    }

    ctx.save();
    ctx.font = '600 15px "Hind Siliguri", sans-serif';
    const badgeMetrics = ctx.measureText(badgeText);
    const badgeW = badgeMetrics.width + 36;
    const badgeH = 30;
    const badgeX = (W - badgeW) / 2;

    drawRoundRect(ctx, badgeX, currentY, badgeW, badgeH, 15);
    ctx.fillStyle = theme.badgeBg;
    ctx.fill();
    ctx.strokeStyle = theme.badgeBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = theme.badgeText;
    ctx.textAlign = 'center';
    ctx.fillText(badgeText, W / 2, currentY + 20);
    ctx.restore();

    // 4. Content Area Layout
    const contentMaxW = cardW - 140; // 840px max width for text
    const contentCenterY = 540;      // Midpoint of card

    // Auto-fit Arabic Font Size
    const arText = item.arabic_text || '';
    let arFontSize = 40;
    if (arText.length > 250) arFontSize = 28;
    else if (arText.length > 160) arFontSize = 32;
    else if (arText.length > 90) arFontSize = 36;
    else arFontSize = 42;

    ctx.font = `bold ${arFontSize}px "Amiri", "Traditional Arabic", serif`;
    const arLineHeight = Math.round(arFontSize * 1.85);
    const arLines = wrapText(ctx, arText, contentMaxW);
    const arTotalHeight = arLines.length * arLineHeight;

    // Auto-fit Bangla Font Size
    const bnText = item.bangla_translation || '';
    let bnFontSize = 28;
    if (bnText.length > 300) bnFontSize = 21;
    else if (bnText.length > 180) bnFontSize = 24;
    else if (bnText.length > 110) bnFontSize = 27;
    else bnFontSize = 30;

    ctx.font = `600 ${bnFontSize}px "Hind Siliguri", sans-serif`;
    const bnLineHeight = Math.round(bnFontSize * 1.6);
    const bnLines = wrapText(ctx, `❝ ${bnText} ❞`, contentMaxW);
    const bnTotalHeight = bnLines.length * bnLineHeight;

    // Separator height
    const sepHeight = 60;
    const totalBlockHeight = arTotalHeight + sepHeight + bnTotalHeight;

    // Dynamic starting Y to keep text balanced and vertically centered
    let textStartY = contentCenterY - (totalBlockHeight / 2) + 20;
    if (textStartY < currentY + 60) {
      textStartY = currentY + 60;
    }

    // 5. Draw Arabic Text
    ctx.save();
    ctx.font = `bold ${arFontSize}px "Amiri", "Traditional Arabic", serif`;
    ctx.fillStyle = theme.arabicColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Soft glow for Arabic
    if (theme.isDark) {
      ctx.shadowColor = 'rgba(230, 198, 135, 0.3)';
      ctx.shadowBlur = 10;
    }

    let arY = textStartY;
    for (let i = 0; i < arLines.length; i++) {
      ctx.fillText(arLines[i], W / 2, arY);
      arY += arLineHeight;
    }
    ctx.restore();

    // 6. Draw Elegant Islamic Divider
    const sepY = arY + 8;
    ctx.save();
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;

    // Left line
    ctx.beginPath();
    ctx.moveTo(W / 2 - 190, sepY);
    ctx.lineTo(W / 2 - 40, sepY);
    ctx.stroke();

    // Center star / diamond ornament
    drawIslamicStar(ctx, W / 2, sepY, 9, 4.5, theme.primaryGold);
    drawIslamicStar(ctx, W / 2 - 25, sepY, 4, 2, theme.secondaryGold);
    drawIslamicStar(ctx, W / 2 + 25, sepY, 4, 2, theme.secondaryGold);

    // Right line
    ctx.beginPath();
    ctx.moveTo(W / 2 + 40, sepY);
    ctx.lineTo(W / 2 + 190, sepY);
    ctx.stroke();
    ctx.restore();

    // 7. Draw Bangla Translation
    let bnY = sepY + 42;
    ctx.save();
    ctx.font = `600 ${bnFontSize}px "Hind Siliguri", sans-serif`;
    ctx.fillStyle = theme.banglaColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < bnLines.length; i++) {
      ctx.fillText(bnLines[i], W / 2, bnY);
      bnY += bnLineHeight;
    }
    ctx.restore();

    // 8. Reference Box (e.g. — সূরা আল-বাকারা : ১৮৩)
    const refY = Math.max(bnY + 36, cardY + cardH - 120);
    const refText = `— [ ${item.reference || item.title} ]`;

    ctx.save();
    ctx.font = 'bold 18px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.metaColor;
    ctx.textAlign = 'center';
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

    // Left: Brand
    ctx.fillStyle = theme.primaryGold;
    ctx.font = 'bold 14px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('ROYAL TECHNOLOGIES', cardX + 80, footerY + 4);

    // Right: Website Link as requested by user
    ctx.fillStyle = theme.metaColor;
    ctx.font = '500 13px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('www.royaltechbd.com', cardX + cardW - 80, footerY + 4);

    // Center: Islamic Reminders
    ctx.fillStyle = theme.metaColor;
    ctx.font = '13px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('কোরআন ও সহীহ সুন্নাহর আলো', W / 2, footerY + 4);
    ctx.restore();
  }

  return {
    W: W,
    H: H,
    THEMES: THEMES,
    render: render
  };
});
