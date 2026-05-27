import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env.local");

function loadEnv() {
  const env = {};
  try {
    readFileSync(envPath, "utf8")
      .split("\n")
      .forEach((line) => {
        const m = line.match(/^([^#=]+)=(.*)$/);
        if (m) env[m[1].trim()] = m[2].trim();
      });
  } catch {
    console.error("Missing .env.local — copy env.example to .env.local first.");
    process.exit(1);
  }
  return env;
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);
const { data, error } = await supabase.from("movies").select("id, title").limit(5);

if (error) {
  console.log("\n❌ Supabase NOT fully connected yet\n");
  console.log("   Error:", error.message);
  if (error.code === "PGRST205") {
    console.log("\n   → Run supabase/setup.sql in your Supabase SQL Editor:");
    console.log("     https://supabase.com/dashboard/project/euqluysfqrakddmyfcqz/sql/new\n");
  }
  process.exit(1);
}

console.log("\n✅ Supabase connected successfully!\n");
console.log(`   ${data.length} movie(s) loaded from database:\n`);
data.forEach((m) => console.log(`   • [${m.id}] ${m.title}`));
console.log("\n   Restart dev server: npm.cmd run dev\n");
