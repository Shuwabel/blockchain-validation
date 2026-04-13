# 🔗 Blockchain Integration Setup Guide

## ✅ What's Been Done

1. ✅ Smart contracts deployed to Polygon mainnet
2. ✅ Server-side blockchain service created
3. ✅ API routes updated to create blockchain transactions
4. ✅ Contract addresses configured

## 📋 Setup Steps

### 1. Add Private Key to Environment Variables

**IMPORTANT:** Your private key is sensitive. Never commit it to git!

Add this to your `.env.local` file:

```bash
# Add your private key (the one you provided)
BLOCKCHAIN_PRIVATE_KEY=3b70c91c044f5f12fbcd57f502526e9c833cfff4b047cdb6e3f1a5c8bf7cc397

# Contract addresses (already set in env.example)
NEXT_PUBLIC_BUDGET_CONTRACT_ADDRESS=0x33b1Ff27Ba5bD2Ed1461a71AF27bC58E4be56E74
NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS=0x9F63a500e67B315E57e504c879837619BAD0DA76
```

### 2. Verify Wallet Has MATIC

Your wallet needs MATIC tokens for gas fees. Check balance:

```bash
# The wallet address derived from your private key
# You can check it on Polygonscan: https://polygonscan.com/address/YOUR_WALLET_ADDRESS
```

**Minimum recommended:** 0.1 MATIC for testing

### 3. Test the Integration

1. **Create a Budget Allocation:**
   - Go to `/admin/budget`
   - Create a new allocation
   - Check the response for `blockchain.transactionHash`
   - Verify on Polygonscan

2. **Create a Disbursement:**
   - Make sure contractor has `blockchain_address` set
   - Create a disbursement
   - Check for blockchain transaction hash

### 4. Verify Transactions

All blockchain transactions will be visible on:
- **Polygonscan:** https://polygonscan.com
- Search by transaction hash from the API response

## 🔒 Security Notes

1. **Private Key Security:**
   - ✅ `.env.local` is in `.gitignore` (won't be committed)
   - ⚠️ Never share your private key
   - ⚠️ Never commit it to version control
   - ⚠️ Use environment variables in production (Vercel, etc.)

2. **Wallet Security:**
   - This wallet will sign ALL blockchain transactions
   - Keep it secure
   - Consider using a hardware wallet for production
   - Or use a dedicated service account wallet

## 🐛 Troubleshooting

### Error: "BLOCKCHAIN_PRIVATE_KEY is not set"
- Make sure `.env.local` exists and has the private key
- Restart your dev server after adding it

### Error: "Insufficient funds"
- Your wallet needs MATIC for gas fees
- Get MATIC from: https://wallet.polygon.technology/gas-swap/

### Error: "Contract not initialized"
- Check contract addresses in `.env.local`
- Verify contracts are deployed on Polygon

### Transactions Failing
- Check wallet balance
- Verify contract addresses are correct
- Check RPC endpoint is working
- Review contract function parameters

## 📊 What Happens Now

When you create a budget allocation or disbursement:

1. **Database:** Record is saved to Supabase ✅
2. **Blockchain:** Transaction is created on Polygon ✅
3. **Database Update:** Transaction hash is saved to the record ✅
4. **Response:** API returns blockchain transaction hash ✅

## 🎯 Next Steps

1. ✅ Add private key to `.env.local`
2. ✅ Restart dev server
3. ✅ Test creating a budget allocation
4. ✅ Verify transaction on Polygonscan
5. ✅ Test creating a disbursement
6. ✅ Test verification endpoint

## 💡 Production Considerations

For production deployment:

1. **Use Environment Variables:**
   - Set `BLOCKCHAIN_PRIVATE_KEY` in Vercel/your hosting platform
   - Never hardcode it

2. **Wallet Management:**
   - Consider using a multi-sig wallet
   - Implement transaction approval workflow
   - Add rate limiting

3. **Monitoring:**
   - Monitor wallet balance
   - Set up alerts for low balance
   - Track failed transactions

4. **Backup:**
   - Securely backup private key
   - Use hardware wallet for production

---

**Your blockchain integration is now ready!** 🚀

Just add the private key to `.env.local` and restart your server.


