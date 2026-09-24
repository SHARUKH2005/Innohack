export interface CourseItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Blockchain" | "Web3" | "AI & ML" | "Smart Contracts" | "Development";
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  price: string;
  reward: string;
  instructor: string;
  partner: string;
  partnerLogo: string;
  rating: number;
  ratingCount: string;
  thumbnailGradient: string;
  imageUrl: string;
  icon: string;
  skills: string[];
  modulesCount: number;
  summary: string;
}

export const COURSE_CATEGORIES = [
  "All",
  "Blockchain",
  "Web3",
  "AI & ML",
  "Smart Contracts",
  "Development",
] as const;

export type CourseCategory = typeof COURSE_CATEGORIES[number];

export const EXPLORE_COURSES: CourseItem[] = [
  {
    id: "solidity-fundamentals",
    slug: "solidity-fundamentals",
    title: "Solidity Fundamentals",
    description: "Learn Solidity from zero to smart contract basics with hands-on labs and automated AI tests.",
    category: "Blockchain",
    level: "Beginner",
    duration: "6 hours",
    price: "250 MX",
    reward: "+100 MX",
    instructor: "Dr. Elena Rostova",
    partner: "Stanford Online",
    partnerLogo: "🌲",
    rating: 4.9,
    ratingCount: "14,820",
    thumbnailGradient: "from-blue-600 via-indigo-600 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=340&fit=crop&auto=format",
    icon: "⚡",
    skills: ["Solidity", "EVM Basics", "Remix IDE", "ERC-20"],
    modulesCount: 5,
    summary: "This comprehensive course teaches the core syntax, data types, function modifiers, and inheritance patterns in Solidity 0.8.x."
  },
  {
    id: "smart-contract-security",
    slug: "smart-contract-security",
    title: "Smart Contract Security & Auditing",
    description: "Detect reentrancy, integer bugs, and frontrunning vulnerabilities using automated AI tools.",
    category: "Smart Contracts",
    level: "Intermediate",
    duration: "8 hours",
    price: "320 MX",
    reward: "+150 MX",
    instructor: "Marcus Vance",
    partner: "Ethereum Foundation Lab",
    partnerLogo: "💎",
    rating: 4.95,
    ratingCount: "9,420",
    thumbnailGradient: "from-purple-600 via-indigo-700 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=340&fit=crop&auto=format",
    icon: "🛡️",
    skills: ["Slither", "Foundry", "Reentrancy Defense", "Gas Profiling"],
    modulesCount: 6,
    summary: "Master defensive smart contract programming, exploit simulations, and automated unit test auditing."
  },
  {
    id: "autonomous-web3-ai-agents",
    slug: "autonomous-web3-ai-agents",
    title: "Autonomous Web3 AI Agents",
    description: "Build autonomous LLM agents that execute on-chain transactions, arbitrage trades, and oracle feeds.",
    category: "AI & ML",
    level: "Intermediate",
    duration: "10 hours",
    price: "380 MX",
    reward: "+180 MX",
    instructor: "Dr. Kenji Tanaka",
    partner: "DeepLearning.AI",
    partnerLogo: "🤖",
    rating: 4.92,
    ratingCount: "11,200",
    thumbnailGradient: "from-amber-600 via-rose-600 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=340&fit=crop&auto=format",
    icon: "🧠",
    skills: ["LangChain", "Autonomous Agents", "Chainlink Oracles", "Python"],
    modulesCount: 7,
    summary: "Explore decentralized artificial intelligence, autonomous agent wallets, and cryptographic prompt proofs."
  },
  {
    id: "zero-knowledge-cryptography",
    slug: "zero-knowledge-cryptography",
    title: "Zero-Knowledge Proofs with Circom",
    description: "Design zk-SNARK circuits from mathematical foundations to production verification on Ethereum.",
    category: "Web3",
    level: "Advanced",
    duration: "14 hours",
    price: "450 MX",
    reward: "+220 MX",
    instructor: "Prof. Sarah Sterling",
    partner: "MIT Cryptography Lab",
    partnerLogo: "🏛️",
    rating: 4.98,
    ratingCount: "6,840",
    thumbnailGradient: "from-emerald-600 via-teal-700 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=340&fit=crop&auto=format",
    icon: "🔐",
    skills: ["Circom", "SnarkJS", "zk-SNARKs", "Groth16"],
    modulesCount: 8,
    summary: "Understand polynomial commitments, R1CS arithmetic circuits, and zero-knowledge privacy shields."
  },
  {
    id: "full-stack-web3-development",
    slug: "full-stack-web3-development",
    title: "Full-Stack Web3 dApp Development",
    description: "Connect Next.js, Wagmi, Viem, and Tailwind with decentralized smart contracts and IPFS.",
    category: "Development",
    level: "Intermediate",
    duration: "12 hours",
    price: "300 MX",
    reward: "+140 MX",
    instructor: "Alex Rivera",
    partner: "BlockLearnX Academy",
    partnerLogo: "🌐",
    rating: 4.88,
    ratingCount: "18,310",
    thumbnailGradient: "from-cyan-600 via-blue-600 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=340&fit=crop&auto=format",
    icon: "💻",
    skills: ["Next.js 14", "Wagmi", "Viem", "RainbowKit", "Ethers.js"],
    modulesCount: 6,
    summary: "Step-by-step dApp engineering from user wallet connection to indexing on-chain events."
  },
  {
    id: "rust-solana-engineering",
    slug: "rust-solana-engineering",
    title: "Rust & High-Performance Solana Programs",
    description: "Architect high-speed, parallelized programs on the Solana blockchain using Anchor framework.",
    category: "Development",
    level: "Advanced",
    duration: "16 hours",
    price: "420 MX",
    reward: "+200 MX",
    instructor: "Vikram Sethi",
    partner: "Solana Foundation",
    partnerLogo: "⚡",
    rating: 4.91,
    ratingCount: "8,950",
    thumbnailGradient: "from-fuchsia-600 via-purple-700 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=340&fit=crop&auto=format",
    icon: "🦀",
    skills: ["Rust", "Anchor Framework", "Solana CLI", "PDA Accounts"],
    modulesCount: 9,
    summary: "Dive into Solana memory models, account serialization, parallel compute units, and Sealevel engine."
  },
  {
    id: "defi-amm-architecture",
    slug: "defi-amm-architecture",
    title: "DeFi Automated Market Makers (AMM)",
    description: "Master constant product formulas, concentrated liquidity, and flash loans inspired by Uniswap v3 & v4.",
    category: "Smart Contracts",
    level: "Advanced",
    duration: "11 hours",
    price: "400 MX",
    reward: "+190 MX",
    instructor: "Dr. Claire Dupont",
    partner: "Uniswap Foundation",
    partnerLogo: "🦄",
    rating: 4.94,
    ratingCount: "13,100",
    thumbnailGradient: "from-pink-600 via-rose-700 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=340&fit=crop&auto=format",
    icon: "📊",
    skills: ["AMM Math", "Liquidity Pools", "Flash Loans", "v4 Hooks"],
    modulesCount: 7,
    summary: "Deconstruct decentralized exchanges, price oracles, impermanent loss hedging, and liquidity mining."
  },
  {
    id: "decentralized-identity-nfts",
    slug: "decentralized-identity-nfts",
    title: "Decentralized Identity & Soulbound NFTs",
    description: "Implement ERC-5192 non-transferable Soulbound tokens, DID specifications, and verifiable credentials.",
    category: "Web3",
    level: "Beginner",
    duration: "5 hours",
    price: "200 MX",
    reward: "+90 MX",
    instructor: "Tariq Mansour",
    partner: "Polygon Labs",
    partnerLogo: "🟣",
    rating: 4.86,
    ratingCount: "7,620",
    thumbnailGradient: "from-violet-600 via-indigo-600 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=600&h=340&fit=crop&auto=format",
    icon: "🪪",
    skills: ["ERC-5192", "Soulbound SBTs", "DID Standards", "IPFS Metadata"],
    modulesCount: 4,
    summary: "Learn how cryptographic credentials verify student credentials without revealing private personal data."
  },
  {
    id: "machine-learning-on-chain-analytics",
    slug: "machine-learning-on-chain-analytics",
    title: "On-Chain Analytics with Python & ML",
    description: "Extract blockchain ledger data, train predictive models on whale wallets, and track MEV patterns.",
    category: "AI & ML",
    level: "Beginner",
    duration: "7 hours",
    price: "260 MX",
    reward: "+110 MX",
    instructor: "Rachel Green",
    partner: "Chainlink Labs",
    partnerLogo: "🔗",
    rating: 4.89,
    ratingCount: "10,400",
    thumbnailGradient: "from-blue-700 via-teal-600 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop&auto=format",
    icon: "📈",
    skills: ["Python", "Dune Analytics", "Scikit-Learn", "Whale Tracking"],
    modulesCount: 5,
    summary: "Query raw EVM transaction logs, build machine learning classification models for wallet risk scoring."
  }
];
