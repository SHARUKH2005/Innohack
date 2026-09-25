<div align="center">

# 🎓 BlockLearnX

### *Next-Generation Web3 Learning Management System & Decentralized Credential Platform*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Hardhat](https://img.shields.io/badge/Hardhat-Web3-FFF100?style=for-the-badge&logo=hardhat&logoColor=black)](https://hardhat.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/)
[![Build Status](https://img.shields.io/badge/TypeScript-Passing-brightgreen?style=for-the-badge)](https://www.typescriptlang.org/)

<br/>

> **BlockLearnX** is a full-stack, Web3-enabled Learning Management System (LMS) designed for verifiable education, tokenized rewards, and decentralized credentials.  
> Powered by Next.js 14, Node.js Express Backend, PostgreSQL, and Ethereum Smart Contracts (ERC-20 & ERC-721 NFT Certificates/Avatars).

</div>

---

## 📌 Current Situation & Development Stage (As of September 2026)

BlockLearnX is actively in **Production Readiness / Feature Expansion Stage**. The full stack has been integrated, audited, and verified for compilation, security, and type safety.

### 🟢 Platform Status Summary

| Subsystem | Current Stage | Health / Build Status | Key Highlights |
|-----------|---------------|-----------------------|----------------|
| **Frontend UI (Next.js 14)** | Active & Feature-Complete | `npx tsc --noEmit` ✅ 0 Errors | Responsive App Router, Clerk Auth, Dashboard, NFT Collection Inspector, Progress Tracker |
| **Backend Service (Express Node.js)** | Active & Built | `npm run build` ✅ Clean Build | Modular REST API (Auth, Courses, Assessments, Certificates, Enrollments, Marketplace) |
| **Smart Contracts (Solidity / Hardhat)** | Deployed / Tested | Hardhat Suite Ready | `MXToken` (ERC-20), `CertificateNFT` (ERC-721), `AvatarNFT` (ERC-721), `NFTMarketplace` |
| **Database & Schema** | Configured | PostgreSQL & Prisma ORM | Relational Schema (`database/schema.sql`) for users, progress, courses & web3 transaction hashes |
| **Decentralized Storage (IPFS)** | Integrated | Active | Storing certificate metadata, proof of achievement & NFT asset hashes |
| **Security & CI/CD** | Production-Ready | GitHub Workflows Configured | Separate frontend/backend security audits, automated build & lint checks |

---

## 📸 Platform Showcase

### 🏠 Landing Page
![Landing Page](assets/images/img-landing.png)
> The entry point to BlockLearnX — designed with dark-mode aesthetic, feature breakdown, and call-to-action cards.

---

### 🎨 NFT Collection & Credentials (`/collection`)
![NFT Collection](assets/images/img-browse-courses.png)
> Interactive NFT Collection portal allowing learners to inspect, filter, and verify earned Certificate NFTs and Avatar badges on-chain.

---

### 🔐 Sign-Up & Authentication
![Sign-Up Page](assets/images/img-sign-up.png)
> Frictionless onboarding powered by **Clerk** — supporting email/password, OAuth, and multi-factor security.

---

### 📊 User Dashboard
![Dashboard](assets/images/img-dashboard.png)
> Learner command center displaying active enrollments, course completion rates, quick resume triggers, and token metrics.

---

### 📚 Browse Courses
![Browse Courses](assets/images/img-browse-courses.png)
> Filterable catalog with search, category tags, skill levels, ratings, and price sorting.

---

### 👥 Community Hub
![Community Page](assets/images/img-community.png)
> Learner forums, peer Q&A threads, and shared resources for collaborative learning.

---

### 📈 Progress & Analytics Tracker
![Progress Page](assets/images/img-progress.png)
> Visual monthly calendar, weekly timeline views, study hour metrics, and unlocked achievement badges.

---

## ✨ Features Overview

### 🎓 Core LMS & Learning Experience
- **Course Catalog & Filtering**: Search by keyword, category, difficulty level, and cost.
- **Progress Tracking & Analytics**: Interactive weekly/monthly calendars and completion metrics.
- **Achievement System**: Unlockable milestone badges (Early Bird, Night Owl, Consistent, Marathon Learner).
- **Interactive Modals**: Dynamic achievement popups, active goal setters, and course modal previews.

### ⛓️ Web3 & Decentralized Credentials
- **ERC-20 Reward Token (`MXToken`)**: Earn tokens upon completing modules, assessments, and streaks.
- **On-Chain NFT Certificates (`CertificateNFT`)**: Verifiable ERC-721 certificates minted directly to the learner's wallet.
- **Custom Learner Avatars (`AvatarNFT`)**: Collectible, upgradable avatar NFTs awarded for platform achievements.
- **Decentralized NFT Marketplace (`NFTMarketplace`)**: Show off and trade earned platform collectibles.
- **IPFS Storage (`ipfs/`)**: Immutable storage of certificate metadata, hashes, and achievement badges.

### 🔒 Enterprise Security & Auth
- **Clerk Authentication**: Passwordless, OAuth, session management, and 2FA.
- **Security Audit Pipeline**: Custom ESLint security rules and separate frontend/backend audit steps.
- **Role-Based Protection**: Protected route middleware verifying active auth tokens and administrative roles.

---

## 🛠️ Architecture & Tech Stack

```
BlockLearnX Root
├── 🌐 Frontend (Next.js 14 App Router)
│   ├── React 18, TypeScript 5, Tailwind CSS 3.4
│   ├── shadcn/ui component library & Lucide icons
│   ├── Clerk Auth Provider
│   └── Routes: /, /dashboard, /browse, /collection, /community, /courses, /progress
│
├── ⚙️ Backend (Node.js & Express)
│   ├── TypeScript REST API service
│   ├── Routes: Auth, Courses, Assessments, Certificates, Enrollments, Progress, Marketplace
│   └── Database Client: Prisma ORM & PostgreSQL
│
├── 📜 Blockchain (Hardhat Smart Contract Suite)
│   ├── MXToken.sol (ERC-20 Utility & Reward Token)
│   ├── CertificateNFT.sol (ERC-721 Verifiable Certificate)
│   ├── AvatarNFT.sol (ERC-721 Learner Avatars)
│   └── NFTMarketplace.sol (On-Chain Collectible Marketplace)
│
├── 📦 Storage & Database
│   ├── PostgreSQL relational database (database/schema.sql)
│   └── IPFS storage nodes for metadata pin services
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0`
- **PostgreSQL** instance
- **Clerk Account** for Auth credentials ([clerk.com](https://clerk.com))

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/BlockLearnX.git
cd BlockLearnX
```

---

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Install blockchain dependencies
cd blockchain && npm install && cd ..
```

---

### 3. Environment Setup

Create `.env.local` in root:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database Connection
DATABASE_URL=postgresql://user:password@localhost:5432/blocklearnx?schema=public

# IPFS Configuration
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
```

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/blocklearnx?schema=public
JWT_SECRET=your_jwt_secret_key
```

---

### 4. Database Setup
```bash
# Run Prisma Migrations
npx prisma migrate dev

# Seed Initial Course & Category Data
npm run prisma:seed
```

---

### 5. Smart Contract Setup & Compile (Hardhat)
```bash
cd blockchain
npx hardhat compile
# Run contract unit tests
npx hardhat test
cd ..
```

---

### 6. Run the Application

#### Start Frontend:
```bash
npm run dev
```
Frontend live at: **`http://localhost:3000`**

#### Start Backend Service:
```bash
cd backend
npm run dev
```
Backend REST API live at: **`http://localhost:5000`**

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Launch Next.js dev server with hot reload |
| `npm run build` | Build production bundle for Next.js app |
| `npm run type-check` | Run full TypeScript type check across frontend |
| `npm run lint` | Run ESLint check |
| `npm run security:check` | Run full security audit & security linting |
| `cd backend && npm run build` | Compile backend Express server with `tsc` |
| `cd blockchain && npx hardhat test` | Execute Hardhat smart contract tests |

---

## 🤝 Contributing & Standards

1. Fork the repo and create a feature branch (`git checkout -b feature/my-feature`).
2. Run `npm run type-check` and ensure clean output (0 TypeScript errors).
3. Run `npm run security:check` before pushing.
4. Submit a detailed Pull Request.

---

## 📄 License
Licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

<div align="center">
**Built with ❤️ for Web3 Education by the BlockLearnX Engineering Team**
</div>
