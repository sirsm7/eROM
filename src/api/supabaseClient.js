// src/api/supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://mepsoyfewvrtwuvrhivu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcHNveWZld3ZydHd1dnJoaXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDE1MDQsImV4cCI6MjA3ODE3NzUwNH0.kIz4kQiXAcHC3Tuf1Flq1EcYuy0xmJ4fLCSTbP-u8DU";

const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const supa = {
  rpc: (fnName, params) => client.rpc(fnName, params),
  from: (tableName) => client.from(tableName)
};
