# Hedera Next.js DApp Template 🚀

Boilerplate for building decentralized applications on **Hedera** using **Next.js**.

## 📦 Features
- Multiple Wallet connection with Hedera using an interface
- Zustand state management
- TailwindCSS for styling
- Fully modular structure

## 🚀 Getting Started

**Configure env variables**
Important Note: When defining the environment variable for the network you wish to use, always use a capital letter for the first letter to ensure that the entire configuration works correctly. For example: "Testnet".

```bash
touch .env.local
echo "NEXT_PUBLIC_WC_PROJECT_ID=YOUR WC PROJECT ID"
echo "NEXT_PUBLIC_HEDERA_NETWORK=Testnet"
```

**Deploy**

```bash
git clone https://github.com/Maximiliano-Santana/hedera-nextjs-dapp-template.git
cd hedera-nextjs-dapp-template
npm install
npm run dev
