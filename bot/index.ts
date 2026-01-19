// index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// === KONFIGURASI ENV (Deno Deploy) ===
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const APP_URL = "https://erom.tech4ag.my"; // Tukar jika guna domain lain
const CH_URL = Deno.env.get("EROM_CHANNEL_URL") ?? "";

// URL API Telegram
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Inisialisasi Supabase (Guna Service Role untuk Admin Access)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// === SENARAI BILIK (Sama dengan Web) ===
const ROOM_OPTIONS = [
  "PKG Ganun - Bilik Kursus (30 orang)",
  "PKG Melekek - Bilik Kuliah 1 (20 orang)",
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

// === FUNGSI UTILITI TELEGRAM ===
async function tgCall(method: string, payload: any) {
  const res = await fetch(`${TELEGRAM_API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

async function sendMessage(chatId: number, text: string, extra = {}) {
  await tgCall("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...extra
  });
}

async function answerCallback(id: string, text = "") {
  await tgCall("answerCallbackQuery", { callback_query_id: id, text });
}

async function editMarkup(chatId: number, messageId: number) {
  await tgCall("editMessageReplyMarkup", {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: { inline_keyboard: [] }
  });
}

// === KEYBOARDS ===
function startKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Pengguna", callback_data: "role:user" }],
      [{ text: "PIC Bilik", callback_data: "role:pic" }]
    ]
  };
}

function closeKeyboard() {
  return {
    inline_keyboard: [[{ text: "Tutup", callback_data: "close" }]]
  };
}

function roomsKeyboard(rooms: string[]) {
  // Pecahkan kepada 2 kolum jika panjang, atau 1 kolum
  const rows = rooms.map(r => [{ text: r, callback_data: `pick:${r.substring(0, 50)}` }]); // Limit callback data length
  rows.push([{ text: "Tutup", callback_data: "close" }]);
  return { inline_keyboard: rows };
}

// === LOGIK DATABASE (erom_pic) ===
async function getTakenRooms() {
  const { data, error } = await supabase.from("erom_pic").select("bilik");
  if (error || !data) return new Set();
  return new Set(data.map((r: any) => r.bilik));
}

async function assignRoom(telegramId: number, username: string | undefined, roomPart: string) {
  // Cari nama penuh bilik berdasarkan substring (sebab callback data limit 64 bytes)
  const fullRoomName = ROOM_OPTIONS.find(r => r.startsWith(roomPart));
  if (!fullRoomName) return { ok: false, reason: "Bilik tidak ditemui." };

  // Semak jika bilik dah ada PIC
  const { data: existing, error: errExist } = await supabase
    .from("erom_pic")
    .select("bilik")
    .eq("bilik", fullRoomName)
    .limit(1);

  if (errExist) return { ok: false, reason: errExist.message };
  if (existing && existing.length > 0) return { ok: false, reason: "Bilik ini telah ada PIC." };

  // Daftar PIC baru
  const { error } = await supabase.from("erom_pic").insert([{
    telegram_id: telegramId,
    telegram_username: username ?? null,
    bilik: fullRoomName,
    is_pic: true
  }]);

  if (error) return { ok: false, reason: error.message };
  return { ok: true, roomName: fullRoomName };
}

async function listMyRooms(telegramId: number) {
  const { data, error } = await supabase
    .from("erom_pic")
    .select("bilik")
    .eq("telegram_id", telegramId);
  
  if (error || !data) return [];
  return data.map((r: any) => r.bilik);
}

// === HANDLERS ===
async function handleStart(chatId: number) {
  await sendMessage(chatId, "<b>eROM@AG Bot</b>\nSelamat datang. Sila pilih peranan anda:", {
    reply_markup: startKeyboard()
  });
}

async function handleUserInfo(chatId: number) {
  const text = `ℹ️ <b>Info Sistem</b>\n\n• Aplikasi Web: ${APP_URL}\n• Saluran Notifikasi: ${CH_URL}`;
  await sendMessage(chatId, text, { reply_markup: closeKeyboard() });
}

async function handleAvailableRooms(chatId: number) {
  const taken = await getTakenRooms();
  const available = ROOM_OPTIONS.filter(r => !taken.has(r));

  if (available.length === 0) {
    await sendMessage(chatId, "Semua bilik sudah mempunyai PIC.", { reply_markup: closeKeyboard() });
  } else {
    await sendMessage(chatId, "Sila pilih bilik untuk didaftarkan sebagai PIC:", {
      reply_markup: roomsKeyboard(available)
    });
  }
}

async function handlePickRoom(cb: any) {
  const chatId = cb.message.chat.id;
  const messageId = cb.message.message_id;
  const user = cb.from;
  const roomPart = cb.data.slice("pick:".length);

  const res = await assignRoom(user.id, user.username, roomPart);

  if (res.ok) {
    await answerCallback(cb.id, "Berjaya didaftarkan!");
    await editMarkup(chatId, messageId); // Buang keyboard lama
    
    const mine = await listMyRooms(user.id);
    const text = `✅ <b>Pendaftaran Berjaya</b>\n\nAnda kini PIC untuk:\n<b>${res.roomName}</b>\n\nSenarai bilik anda:\n${mine.map((x: string) => `• ${x}`).join("\n")}`;
    
    await sendMessage(chatId, text, { reply_markup: closeKeyboard() });
  } else {
    await answerCallback(cb.id, res.reason ?? "Gagal.");
  }
}

async function handleStatus(msg: any) {
  const chatId = msg.chat.id;
  const mine = await listMyRooms(msg.from.id);
  
  if (mine.length === 0) {
    await sendMessage(chatId, "Anda belum mendaftar sebagai PIC mana-mana bilik.", { reply_markup: closeKeyboard() });
  } else {
    const text = "📋 <b>Status PIC</b>\n\nBilik di bawah kendalian anda:\n" + mine.map((x: string) => `• ${x}`).join("\n");
    await sendMessage(chatId, text, { reply_markup: closeKeyboard() });
  }
}

// === SERVER UTAMA (DENO) ===
Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("eROM Bot Active");

  try {
    const update = await req.json();

    // 1. Handle Message (Teks)
    if (update.message) {
      const msg = update.message;
      const chatId = msg.chat.id;
      const text = msg.text ?? "";

      if (text.startsWith("/start")) await handleStart(chatId);
      else if (text.startsWith("/bilik")) await handleAvailableRooms(chatId);
      else if (text.startsWith("/status")) await handleStatus(msg);
      else await handleStart(chatId);
    }
    
    // 2. Handle Callback (Butang)
    else if (update.callback_query) {
      const cb = update.callback_query;
      const data = cb.data ?? "";
      const chatId = cb.message.chat.id;

      if (data === "role:user") {
        await answerCallback(cb.id);
        await handleUserInfo(chatId);
      } 
      else if (data === "role:pic") {
        await answerCallback(cb.id);
        await handleAvailableRooms(chatId);
      } 
      else if (data.startsWith("pick:")) {
        await handlePickRoom(cb);
      } 
      else if (data === "close") {
        await answerCallback(cb.id, "Ditutup");
        await editMarkup(chatId, cb.message.message_id);
      }
    }
  } catch (e) {
    console.error("Bot Error:", e);
  }

  return new Response("OK");
});