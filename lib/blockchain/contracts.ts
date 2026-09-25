/**
 * BlockLearnX Smart Contract Addresses & ABIs
 * Deployed to Hardhat localhost (chain 31337)
 * Run `npx hardhat run scripts/deploy.ts --network localhost` to refresh
 */

export const CONTRACT_ADDRESSES = {
  MXToken:        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  CertificateNFT: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  CourseRegistry: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
} as const;

export const CHAIN_ID = 31337; // Hardhat localhost
export const RPC_URL   = "http://127.0.0.1:8545";

// ─── MXToken ABI (ERC-20 Reward Token) ────────────────────────────────────────
export const MX_TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transfer(address to, uint256 value) returns (bool)",
  "function approve(address spender, uint256 value) returns (bool)",
  "function transferFrom(address from, address to, uint256 value) returns (bool)",
  "function mint(address to, uint256 amount) returns (bool)",
  "function mintReward(address learner, uint256 amount, string milestone) returns (bool)",
  "function setMinter(address minter, bool authorized)",
  "function authorizedMinters(address) view returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event RewardMinted(address indexed learner, uint256 amount, string milestone)",
] as const;

// ─── CertificateNFT ABI (Soulbound ERC-721) ────────────────────────────────────
export const CERTIFICATE_NFT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function nextTokenId() view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function mintCertificate(address learner, string courseTitle, string learnerName, uint256 score, string metadataURI) returns (uint256)",
  "function getCertificate(uint256 tokenId) view returns (tuple(string courseTitle, string learnerName, uint256 score, uint256 completionTimestamp, string metadataURI))",
  "function getLearnerCertificates(address learner) view returns (uint256[])",
  "event CertificateMinted(uint256 indexed tokenId, address indexed learner, string courseTitle, uint256 score)",
] as const;

// ─── CourseRegistry ABI (Escrow & Publishing) ──────────────────────────────────
export const COURSE_REGISTRY_ABI = [
  "function admin() view returns (address)",
  "function getCourseCount() view returns (uint256)",
  "function courseIds(uint256) view returns (string)",
  "function courses(string courseId) view returns (string courseId, string title, address provider, uint256 price, uint256 rewardPool, uint8 status, uint256 totalEnrollments, uint256 totalRevenue)",
  "function isEnrolled(string courseId, address learner) view returns (bool)",
  "function registerCourse(string courseId, string title, uint256 price, uint256 rewardPool)",
  "function submitForApproval(string courseId)",
  "function approveCourse(string courseId)",
  "function enrollInCourse(string courseId) payable",
  "event CourseRegistered(string indexed courseId, string title, address indexed provider, uint256 price)",
  "event CourseStatusChanged(string indexed courseId, uint8 status)",
  "event CourseEnrolled(string indexed courseId, address indexed learner, uint256 feePaid)",
  "event ProviderPayout(address indexed provider, uint256 amount)",
] as const;

export type CourseStatus = "Draft" | "PendingApproval" | "Published" | "Archived";
export const COURSE_STATUS_MAP: Record<number, CourseStatus> = {
  0: "Draft",
  1: "PendingApproval",
  2: "Published",
  3: "Archived",
};

export const REWARD_CONFIG = {
  lessonCompletion:    5,   // MX tokens
  quizPass:           10,
  assignmentPass:     50,
  courseCompletion:  100,
} as const;
