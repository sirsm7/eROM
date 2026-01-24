// src/api/supabaseClient.js

// KEMASKINI: Menggunakan JSDelivr (CDN Mesra GovNet/KPM) menggantikan esm.sh
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// KONFIGURASI SUPABASE SELF-HOSTED (BAHARU)
// Menggunakan URL: https://appppdag.cloud
const SUPABASE_URL = "https://appppdag.cloud";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzYzMzczNjQ1LCJleHAiOjIwNzg3MzM2NDV9.vZOedqJzUn01PjwfaQp7VvRzSm4aRMr21QblPDK8AoY";

// Inisialisasi Client
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Wrapper untuk memudahkan panggilan dalam app.js
export const supa = {
  rpc: (fnName, params) => client.rpc(fnName, params),
  from: (tableName) => client.from(tableName)
};