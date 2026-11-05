<?php
/**
 * Royal Noor — Localhost Admin PHP API
 * Brand: Royal Noor — আলোর পথে প্রতিদিন
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */

header('Content-Type: application/json; charset=utf-8');

// ── Security Check: STRICTLY LOCALHOST ONLY ──
$remoteIp = $_SERVER['REMOTE_ADDR'] ?? '';
$isLocal = ($remoteIp === '127.0.0.1' || $remoteIp === '::1' || $remoteIp === 'localhost');

if (!$isLocal) {
    http_response_code(403);
    echo json_encode([
        'error' => 'নিরাপত্তা সতর্কতা: অ্যাডমিন এপিআই শুধুমাত্র লোকালহোস্টে কার্যকর।'
    ]);
    exit;
}

$dbPath = __DIR__ . '/../database/royal_noor.sqlite';
$itemsJsonPath = __DIR__ . '/../database/items.json';

try {
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'ডাটাবেজ সংযোগে সমস্যা: ' . $e->getMessage()]);
    exit;
}

function syncItemsJson($pdo, $jsonPath) {
    $stmt = $pdo->query("SELECT * FROM royal_noor_items WHERE is_active = 1 ORDER BY id ASC");
    $items = $stmt->fetchAll();
    file_put_contents($jsonPath, json_encode($items, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$method = $_SERVER['REQUEST_METHOD'];

// ── 1. GET: Fetch all items ──
if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM royal_noor_items ORDER BY id DESC");
    echo json_encode($stmt->fetchAll());
    exit;
}

// ── 2. POST: Add new item ──
if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (empty($data['title']) || empty($data['arabic_text']) || empty($data['bangla_translation'])) {
        http_response_code(400);
        echo json_encode(['error' => 'আবশ্যকীয় তথ্যগুলো পূরণ করুন (Title, Arabic, Bangla)।']);
        exit;
    }

    $type = $data['type'] ?? 'quran';
    $prefix = $type === 'quran' ? 'Q' : 'H';
    $uid = $data['uid'] ?? ('RN-' . $prefix . '-' . strtoupper(base_convert(time(), 10, 36)));

    $sql = "INSERT INTO royal_noor_items 
            (uid, type, title, reference, arabic_text, bangla_translation, category, event_tag, target_day, priority, is_active)
            VALUES (:uid, :type, :title, :reference, :arabic_text, :bangla_translation, :category, :event_tag, :target_day, :priority, 1)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':uid' => $uid,
        ':type' => $type,
        ':title' => $data['title'],
        ':reference' => $data['reference'] ?? $data['title'],
        ':arabic_text' => $data['arabic_text'],
        ':bangla_translation' => $data['bangla_translation'],
        ':category' => $data['category'] ?? 'সাধারণ',
        ':event_tag' => $data['event_tag'] ?? 'general',
        ':target_day' => ($data['event_tag'] === 'friday') ? 'friday' : null,
        ':priority' => intval($data['priority'] ?? 1)
    ]);

    syncItemsJson($pdo, $itemsJsonPath);

    echo json_encode(['success' => true, 'message' => 'সফলভাবে ডাটাবেজে যুক্ত হয়েছে!', 'uid' => $uid]);
    exit;
}

// ── 3. DELETE: Delete an item ──
if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'সঠিক আইডি দিন।']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM royal_noor_items WHERE id = :id");
    $stmt->execute([':id' => $id]);

    syncItemsJson($pdo, $itemsJsonPath);

    echo json_encode(['success' => true, 'message' => 'আইটেম মুছে ফেলা হয়েছে।']);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method Not Allowed']);
