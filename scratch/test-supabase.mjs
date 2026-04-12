import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

async function testConnection() {
  if (!supabaseUrl || !supabaseKey) {
    console.log("❌ Variables d'environnement manquantes dans .env");
    return;
  }
  
  console.log("Tentative de connexion à:", supabaseUrl);
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  const { data, error } = await supabase.storage.listBuckets()
  
  if (error) {
    console.error("❌ ÉCHEC DE CONNEXION SUPABASE:", error.message);
  } else {
    console.log("✅ CONNEXION RÉUSSIE ! Buckets trouvés:", data.map(b => b.name).join(', '));
  }
}

testConnection()
