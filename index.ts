// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ==========================================
// 1. KONFIGURASI & PEMBOLEHUBAH PERSEKITARAN
// ==========================================
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const CHANNEL_ID = Deno.env.get("EROM_CHANNEL_ID") ?? ""; 
const APP_URL = "https://erom.tech4ag.my";
const CH_URL = Deno.env.get("EROM_CHANNEL_URL") ?? "";

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Senarai bilik mestilah SAMA SEBIJI dengan yang ada di laman web
const ROOM_OPTIONS = [
  "PKG Ganun - Bilik Kursus (30 orang)",
  "PKG Melekek - Bilik Kuliah (25 orang)",      
  "PKG Melekek - Bilik Mesyuarat (25 orang)",   
  "PKG Masjid Tanah - Bilik Seri Cempaka (24 orang)",
  "PKG Masjid Tanah - Bilik Seri Melur (18 orang)",
  "PKG Masjid Tanah - Bilik Pendidikan Digital (12 orang)",
  "Bilik Mesyuarat PPDAG di SK Alor Gajah 1 (40 orang)",
  "Bilik Mesyuarat Utama PPDAG (73 orang)",
  "Bilik Mesyuarat Kecil PPDAG (15 orang)",
  "Makmal Komputer PPDAG (31 orang)",
  "Bilik Seminar PPDAG (22 orang)",
  "Bilik Temuduga PPDAG (4 orang)",
  "Bilik Runding Cara PPDAG (4 orang)",
  "Kafeteria PPDAG (30 orang)"
];

// ==========================================
// 2. FUNGSI PEMBANTU TELEGRAM (API HELPERS)
// ==========================================
async function tgCall(method, payload) {
  try {
    const res = await fetch(`${TELEGRAM_API}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (e) {
    console.error("Telegram API Error:", e);
  }
}

async function sendMessage(chatId, text, extra = {}) {
  await tgCall("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...extra
  });
}

async function answerCallback(id, text = "") {
  await tgCall("answerCallbackQuery", { callback_query_id: id, text });
}

async function editMarkup(chatId, messageId) {
  await tgCall("editMessageReplyMarkup", {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: { inline_keyboard: [] }
  });
}

// ==========================================
// 3. KEYBOARDS (BUTANG)
// ==========================================
function startKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Pengguna (Info)", callback_data: "role:user" }],
      [{ text: "PIC Bilik (Daftar)", callback_data: "role:pic" }]
    ]
  };
}

function closeKeyboard() {
  return {
    inline_keyboard: [[{ text: "Tutup", callback_data: "close" }]]
  };
}

function roomsKeyboard(rooms) {
  const rows = rooms.map(r => [{ text: r, callback_data: `pick:${r.substring(0, 50)}` }]);
  rows.push([{ text: "Tutup", callback_data: "close" }]);
  return { inline_keyboard: rows };
}

// ==========================================
// 4. LOGIK DATABASE (erom_pic)
// ==========================================
async function getTakenRooms() {
  // Kolum table erom_pic ialah 'bilik'
  const { data, error } = await supabase.from("erom_pic").select("bilik");
  if (error || !data) return new Set();
  return new Set(data.map(r => r.bilik));
}

async function assignRoom(telegramId, username, roomPart) {
  const fullRoomName = ROOM_OPTIONS.find(r => r.startsWith(roomPart));
  if (!fullRoomName) return { ok: false, reason: "Bilik tidak ditemui dalam sistem." };

  const { data: existing, error: errExist } = await supabase
    .from("erom_pic")
    .select("bilik")
    .eq("bilik", fullRoomName)
    .limit(1);

  if (errExist) return { ok: false, reason: errExist.message };
  if (existing && existing.length > 0) return { ok: false, reason: "Maaf, bilik ini sudah mempunyai PIC." };

  const { error } = await supabase.from("erom_pic").insert([{
    telegram_id: telegramId,
    telegram_username: username ?? null,
    bilik: fullRoomName,
    is_pic: true
  }]);

  if (error) return { ok: false, reason: error.message };
  return { ok: true, roomName: fullRoomName };
}

async function listMyRooms(telegramId) {
  const { data, error } = await supabase
    .from("erom_pic")
    .select("bilik")
    .eq("telegram_id", telegramId);
  
  if (error || !data) return [];
  return data.map(r => r.bilik);
}

// ==========================================
// 5. SISTEM PENGUMPULAN WEBHOOK (DEBOUNCE)
// ==========================================
const BM_MONTHS = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
const webhookBuffer = new Map();

function parseTarikh(ymd) {
  const [y, m, d] = ymd.split('-');
  return { year: parseInt(y), month: parseInt(m) - 1, day: parseInt(d) };
}

function formatTarikhBM(tarikhArray) {
  if (!tarikhArray || tarikhArray.length === 0) return "Tiada Tarikh";
  if (tarikhArray.length === 1) {
    const t = parseTarikh(tarikhArray[0]);
    return `${t.day} ${BM_MONTHS[t.month]} ${t.year}`;
  }

  // Isih tarikh untuk kepastian urutan mula hingga akhir
  tarikhArray.sort((a, b) => a.localeCompare(b));

  const first = parseTarikh(tarikhArray[0]);
  const last = parseTarikh(tarikhArray[tarikhArray.length - 1]);

  if (first.year !== last.year) {
    // Tahun Berbeza (Cth: 31 Disember 2026 - 2 Januari 2027)
    return `${first.day} ${BM_MONTHS[first.month]} ${first.year} - ${last.day} ${BM_MONTHS[last.month]} ${last.year}`;
  } else if (first.month !== last.month) {
    // Bulan Berbeza (Cth: 30 April - 2 Mei 2026)
    return `${first.day} ${BM_MONTHS[first.month]} - ${last.day} ${BM_MONTHS[last.month]} ${first.year}`;
  } else {
    // Bulan & Tahun Sama (Cth: 15 - 17 April 2026)
    return `${first.day} - ${last.day} ${BM_MONTHS[first.month]} ${first.year}`;
  }
}

function processWebhookToBuffer(payload) {
  const record = payload.record;
  const type = payload.type;

  // Kenalpasti jenis webhook (Insert = Baru, Update + Dibatalkan = Batal Pukal/Biasa)
  const isInsert = type === 'INSERT';
  const isCancel = type === 'UPDATE' && record.status === 'DIBATALKAN';

  // Kemaskini biasa (Tukar masa, tujuan dll) tidak perlu digumpal. Hantar terus.
  if (!isInsert && !isCancel) {
    sendBookingNotification([record], type, false);
    return;
  }

  // Kunci pengumpulan (Grouping Key)
  const actionPrefix = isCancel ? 'CANCEL' : 'NEW';
  // Gabungkan ciri-ciri yang sama untuk pastikan ini adalah kumpulan tempahan yang sama
  const groupKey = `${actionPrefix}|${record.bilik}|${record.masa_mula}|${record.masa_tamat}|${record.tujuan}|${record.nama_penempah}`;

  if (webhookBuffer.has(groupKey)) {
    const buffered = webhookBuffer.get(groupKey);
    buffered.records.push(record);
    // Kosongkan dan set semula pemasa (debounce) setiap kali webhook baharu masuk
    clearTimeout(buffered.timerId);
    buffered.timerId = setTimeout(() => flushBuffer(groupKey), 2500); // Tahan 2.5 saat
  } else {
    const timerId = setTimeout(() => flushBuffer(groupKey), 2500);
    webhookBuffer.set(groupKey, { type, records: [record], timerId });
  }
}

async function flushBuffer(groupKey) {
  const buffered = webhookBuffer.get(groupKey);
  if (!buffered) return;
  webhookBuffer.delete(groupKey); // Kosongkan buffer untuk kumpulan ini

  // Pastikan rekod disusun mengikut tarikh sebelum diproses untuk notifikasi
  buffered.records.sort((a, b) => a.tarikh.localeCompare(b.tarikh));
  
  // Hantar dengan parameter isGrouped = true jika lebih daripada 1
  await sendBookingNotification(buffered.records, buffered.type, buffered.records.length > 1);
}

// ==========================================
// 6. SISTEM NOTIFIKASI (CHANNEL & DM)
// ==========================================
async function sendBookingNotification(records, eventType, isGrouped) {
  if (!CHANNEL_ID || !records || records.length === 0) return;

  // Ambil sampel data rekod (sebab bilik, tujuan dll adalah sama dalam kumpulan)
  const record = records[0]; 
  
  let title = "📢 TEMPAHAN BARU";
  let statusEmoji = "🟢";
  
  if (eventType === 'UPDATE') {
    if (record.status === 'DIBATALKAN') {
      title = "❌ TEMPAHAN DIBATALKAN";
      statusEmoji = "🔴";
    } else {
      title = "✏️ TEMPAHAN DIKEMASKINI";
      statusEmoji = "🟡";
    }
  }

  // Ubah tajuk jika ia adalah tempahan/pembatalan pukal berturut
  if (isGrouped && eventType === 'INSERT') title = "📢 TEMPAHAN BERTURUT";
  if (isGrouped && record.status === 'DIBATALKAN') title = "❌ PEMBATALAN PUKAL";

  let picUsername = "Tiada PIC";
  let picId = null;

  const { data: picData } = await supabase
    .from("erom_pic")
    .select("telegram_username, telegram_id")
    .eq("bilik", record.bilik)
    .single();

  if (picData) {
    if (picData.telegram_username) picUsername = `@${picData.telegram_username}`;
    if (picData.telegram_id) picId = picData.telegram_id;
  }

  // Format tarikh baharu
  const arrTarikh = records.map(r => r.tarikh);
  const strTarikh = formatTarikhBM(arrTarikh);
  const hariBekerjaText = isGrouped ? ` <i>(${records.length} hari bekerja)</i>` : '';

  const msg = `
<b>${title}</b> ${statusEmoji}

🏛 <b>Bilik:</b> ${record.bilik}
📅 <b>Tarikh:</b> ${strTarikh}${hariBekerjaText}
⏰ <b>Masa:</b> ${record.masa_mula.slice(0,5)} - ${record.masa_tamat.slice(0,5)}
📝 <b>Tujuan:</b> ${record.tujuan}
👤 <b>Penempah:</b> ${record.nama_penempah}
🏢 <b>Sektor:</b> ${record.sektor}
👮 <b>PIC Bilik:</b> ${picUsername}

<i>Sila layari <a href="${APP_URL}">eROM Web</a> untuk maklumat lanjut.</i>
`;

  await sendMessage(CHANNEL_ID, msg);

  if (picId) {
    const privateMsg = `🔔 <b>Notifikasi PIC</b>\n\nSatu aktiviti telah berlaku pada bilik jagaan anda:\n${msg}\n\n<i>Sila pantau tempahan ini.</i>`;
    await sendMessage(picId, privateMsg);
  }
}

// ==========================================
// 7. PENGENDALI ARAHAN (HANDLERS)
// ==========================================
async function handleStart(chatId) {
  await sendMessage(chatId, "<b>eROM@AG Bot</b>\nSelamat datang. Sila pilih peranan anda:", {
    reply_markup: startKeyboard()
  });
}

async function handleUserInfo(chatId) {
  const text = `ℹ️ <b>Info Sistem</b>\n\n• Aplikasi Web: ${APP_URL}\n• Saluran Notifikasi: ${CH_URL}`;
  await sendMessage(chatId, text, {
    reply_markup: closeKeyboard()
  });
}

async function handleAvailableRooms(chatId) {
  const taken = await getTakenRooms();
  const available = ROOM_OPTIONS.filter(r => !taken.has(r));

  if (available.length === 0) {
    await sendMessage(chatId, "Semua bilik sudah mempunyai PIC.", {
      reply_markup: closeKeyboard()
    });
  } else {
    await sendMessage(chatId, "Sila pilih bilik untuk didaftarkan sebagai PIC:", {
      reply_markup: roomsKeyboard(available)
    });
  }
}

async function handlePickRoom(cb) {
  const chatId = cb.message.chat.id;
  const messageId = cb.message.message_id;
  const user = cb.from;
  const roomPart = cb.data.slice("pick:".length);

  const res = await assignRoom(user.id, user.username, roomPart);

  if (res.ok) {
    await answerCallback(cb.id, "Berjaya didaftarkan!");
    await editMarkup(chatId, messageId);
    
    const mine = await listMyRooms(user.id);
    const text = `✅ <b>Pendaftaran Berjaya</b>\n\nAnda kini PIC untuk:\n<b>${res.roomName}</b>\n\nSenarai bilik anda:\n${mine.map(x => `• ${x}`).join("\n")}`;
    
    await sendMessage(chatId, text, { reply_markup: closeKeyboard() });
  } else {
    await answerCallback(cb.id, res.reason ?? "Gagal.");
  }
}

async function handleStatus(msg) {
  const chatId = msg.chat.id;
  const mine = await listMyRooms(msg.from.id);
  
  if (mine.length === 0) {
    await sendMessage(chatId, "Anda belum mendaftar sebagai PIC mana-mana bilik.", {
      reply_markup: closeKeyboard()
    });
  } else {
    const text = "📋 <b>Status PIC</b>\n\nBilik di bawah kendalian anda:\n" + mine.map(x => `• ${x}`).join("\n");
    await sendMessage(chatId, text, {
      reply_markup: closeKeyboard()
    });
  }
}

// ==========================================
// 8. SERVER UTAMA (DENO ENTRY POINT)
// ==========================================
Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Bot Active (Root)");

  try {
    const payload = await req.json();

    // --- SENARIO A: ISYARAT DARI SUPABASE (WEBHOOK) ---
    if ((payload.type === 'INSERT' || payload.type === 'UPDATE') && payload.table === 'erom_bookings') {
      console.log(`Menerima Webhook Supabase: ${payload.type}`);
      // Proses melalui sistem penimbal (buffer/debounce)
      processWebhookToBuffer(payload);
      return new Response("Notified - Buffer processing started");
    }

    // --- SENARIO B: ISYARAT DARI TELEGRAM (USER) ---
    if (payload.message) {
      const msg = payload.message;
      const chatId = msg.chat.id;
      const text = msg.text ?? "";

      if (text.startsWith("/start")) {
        await handleStart(chatId);
      } else if (text.startsWith("/bilik")) {
        await handleAvailableRooms(chatId);
      } else if (text.startsWith("/status")) {
        await handleStatus(msg);
      } else {
        await handleStart(chatId);
      }
      return new Response("OK");
    }
    
    if (payload.callback_query) {
      const cb = payload.callback_query;
      const data = cb.data ?? "";
      const chatId = cb.message.chat.id;

      if (data === "role:user") {
        await answerCallback(cb.id);
        await handleUserInfo(chatId);
      } else if (data === "role:pic") {
        await answerCallback(cb.id);
        await handleAvailableRooms(chatId);
      } else if (data.startsWith("pick:")) {
        await handlePickRoom(cb);
      } else if (data === "close") {
        await answerCallback(cb.id, "Ditutup");
        await editMarkup(chatId, cb.message.message_id);
      }
      return new Response("OK");
    }

  } catch (e) {
    console.error("Server Error:", e);
  }

  return new Response("OK");
});