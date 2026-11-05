/**
 * Royal Noor — Localhost Admin Server
 * Brand: Royal Noor — আলোর পথে প্রতিদিন
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 * 
 * Runs ONLY on localhost (127.0.0.1)
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { exec } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const db = require('./db');

const PORT = process.env.PORT || 3300;
const HOST = '127.0.0.1'; // Strictly localhost only

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml'
};

// Ensure database is initialized
db.initDatabase();

const server = http.createServer((req, res) => {
  // Security Check: Only allow local machine
  const clientIp = req.socket.remoteAddress;
  if (clientIp !== '127.0.0.1' && clientIp !== '::1' && clientIp !== '::ffff:127.0.0.1') {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Access denied. Admin server is strictly localhost only.' }));
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // ── API: Get All Items ──
  if (req.method === 'GET' && pathname === '/api/items') {
    const items = db.getAllItems();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(items));
    return;
  }

  // ── API: Add New Item ──
  if (req.method === 'POST' && pathname === '/api/items') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (!data.title || !data.arabic_text || !data.bangla_translation) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'আবশ্যকীয় ফিল্ডসমূহ পূরণ করুন (Title, Arabic, Bangla).' }));
          return;
        }

        const uid = db.insertItem(data);
        db.exportToJson();

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'সফলভাবে ডাটাবেজে যুক্ত হয়েছে!', uid }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // ── API: Delete Item ──
  if (req.method === 'DELETE' && pathname.startsWith('/api/items/')) {
    const id = parseInt(pathname.split('/').pop(), 10);
    try {
      db.getDb().prepare('DELETE FROM royal_noor_items WHERE id = ?').run(id);
      db.exportToJson();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'সফলভাবে মুছে ফেলা হয়েছে!' }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── API: Trigger Daily Card Generation ──
  if (req.method === 'POST' && pathname === '/api/generate') {
    exec(`node "${path.join(__dirname, 'generate-noor.js')}"`, (err, stdout, stderr) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: stderr || err.message }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, log: stdout }));
      }
    });
    return;
  }

  // ── Static Files Serving ──
  let filePath = path.join(rootDir, pathname === '/' ? 'index.html' : pathname);
  
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('৪MD: ফাইল পাওয়া যায়নি');
    return;
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`\n╔═══════════════════════════════════════════════════════╗`);
  console.log(`║   🕌 Royal Noor — Localhost Admin Server             ║`);
  console.log(`║   নিরাপদ লোকাল অ্যাডমিন শুধুমাত্র আপনার পিসিতে রানিং   ║`);
  console.log(`╠═══════════════════════════════════════════════════════╣`);
  console.log(`║   ► Admin Dashboard: http://localhost:${PORT}/admin.html   ║`);
  console.log(`║   ► Public Website:  http://localhost:${PORT}/index.html   ║`);
  console.log(`╚═══════════════════════════════════════════════════════╝\n`);

  // Open browser automatically
  const startCmd = process.platform === 'win32' ? 'start' : 'open';
  exec(`${startCmd} http://localhost:${PORT}/admin.html`);
});
