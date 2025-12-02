const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://sfxfgaxpsocgrirfrmtw.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY; // À ajouter dans .env

if (!supabaseKey) {
  console.error('❌ SUPABASE_ANON_KEY manquant dans .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;