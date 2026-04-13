/**
 * Script to update all existing contractors with wallet addresses
 * Run this once to backfill wallet addresses for existing contractors
 */

import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://esqpdszhupkzgrbxsmby.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzcXBkc3podXBremdyYnhzbWJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTE0Mjk4OSwiZXhwIjoyMDc2NzE4OTg5fQ.wEEXF33IHs6mg53dmtsQQr-0t-TvTfZyiLhs8s7dDpY";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function updateContractorsWallets() {
  console.log('🔄 Updating contractors with wallet addresses...\n');

  try {
    // Fetch all contractors without blockchain addresses
    const { data: contractors, error: fetchError } = await supabase
      .from('contractors')
      .select('id, name, email, blockchain_address')
      .is('blockchain_address', null);

    if (fetchError) {
      console.error('Error fetching contractors:', fetchError);
      return;
    }

    if (!contractors || contractors.length === 0) {
      console.log('✅ All contractors already have wallet addresses!');
      return;
    }

    console.log(`Found ${contractors.length} contractors without wallet addresses\n`);

    // Update each contractor with a new wallet address
    for (const contractor of contractors) {
      const randomWallet = ethers.Wallet.createRandom();
      const walletAddress = randomWallet.address;

      const { error: updateError } = await supabase
        .from('contractors')
        .update({ blockchain_address: walletAddress })
        .eq('id', contractor.id);

      if (updateError) {
        console.error(`❌ Failed to update ${contractor.name}:`, updateError.message);
      } else {
        console.log(`✅ ${contractor.name} (${contractor.email})`);
        console.log(`   Wallet: ${walletAddress}\n`);
      }
    }

    console.log(`\n✅ Successfully updated ${contractors.length} contractors with wallet addresses!`);
  } catch (error: any) {
    console.error('Error updating contractors:', error);
  }
}

// Run the script
updateContractorsWallets()
  .then(() => {
    console.log('\n✨ Script completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });

