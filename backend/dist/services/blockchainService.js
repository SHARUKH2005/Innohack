"use strict";
/**
 * BlockLearnX Backend Blockchain Service
 * Server-side ethers.js integration for BlockLearnX smart contracts.
 * Uses JSON-RPC provider (no MetaMask) and admin private key for write ops.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.REWARD_CONFIG = exports.blockchainBackend = void 0;
const ethers_1 = require("ethers");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// ─── Contract ABIs (minimal) ──────────────────────────────────────────────────
const MX_TOKEN_ABI = [
    "function balanceOf(address) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function mintReward(address learner, uint256 amount, string milestone) returns (bool)",
    "function setMinter(address minter, bool authorized)",
];
const CERTIFICATE_NFT_ABI = [
    "function mintCertificate(address learner, string courseTitle, string learnerName, uint256 score, string metadataURI) returns (uint256)",
    "function getLearnerCertificates(address learner) view returns (uint256[])",
    "function getCertificate(uint256 tokenId) view returns (tuple(string,string,uint256,uint256,string))",
];
const COURSE_REGISTRY_ABI = [
    "function registerCourse(string courseId, string title, uint256 price, uint256 rewardPool)",
    "function submitForApproval(string courseId)",
    "function approveCourse(string courseId)",
    "function courses(string courseId) view returns (string,string,address,uint256,uint256,uint8,uint256,uint256)",
    "function getCourseCount() view returns (uint256)",
    "function isEnrolled(string courseId, address learner) view returns (bool)",
];
// ─── Load deployed addresses ───────────────────────────────────────────────────
function loadContractAddresses() {
    const deploymentPath = path.join(__dirname, "../../../blockchain/deployments/deployed-contracts.json");
    if (fs.existsSync(deploymentPath)) {
        const data = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
        return {
            MXToken: data.contracts.MXToken.address,
            CertificateNFT: data.contracts.CertificateNFT.address,
            CourseRegistry: data.contracts.CourseRegistry.address,
        };
    }
    // Fallback hardcoded addresses (from last deployment)
    return {
        MXToken: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        CertificateNFT: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        CourseRegistry: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    };
}
// ─── Provider & Signer ────────────────────────────────────────────────────────
const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:8545";
// Hardhat default deployer key (account #0) – replace with env var in production
const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY ||
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const REWARD_CONFIG = {
    lessonCompletion: 5,
    quizPass: 10,
    assignmentPass: 50,
    courseCompletion: 100,
};
exports.REWARD_CONFIG = REWARD_CONFIG;
class BlockchainBackendService {
    constructor() {
        this.provider = new ethers_1.ethers.JsonRpcProvider(RPC_URL);
        this.adminWallet = new ethers_1.ethers.Wallet(ADMIN_PRIVATE_KEY, this.provider);
        this.addresses = loadContractAddresses();
        console.log(`[Blockchain] Provider: ${RPC_URL}`);
        console.log(`[Blockchain] Admin:    ${this.adminWallet.address}`);
        console.log(`[Blockchain] MXToken:  ${this.addresses.MXToken}`);
    }
    getMXToken(writable = false) {
        const signer = writable ? this.adminWallet : this.provider;
        return new ethers_1.ethers.Contract(this.addresses.MXToken, MX_TOKEN_ABI, signer);
    }
    getCertNFT(writable = false) {
        const signer = writable ? this.adminWallet : this.provider;
        return new ethers_1.ethers.Contract(this.addresses.CertificateNFT, CERTIFICATE_NFT_ABI, signer);
    }
    getRegistry(writable = false) {
        const signer = writable ? this.adminWallet : this.provider;
        return new ethers_1.ethers.Contract(this.addresses.CourseRegistry, COURSE_REGISTRY_ABI, signer);
    }
    // ── MX Token ──────────────────────────────────────────────────────────────
    async getMXBalance(address) {
        const contract = this.getMXToken();
        const raw = (await contract.balanceOf(address));
        return ethers_1.ethers.formatUnits(raw, 18);
    }
    async mintReward(learnerAddress, milestone) {
        const contract = this.getMXToken(true);
        const amount = REWARD_CONFIG[milestone];
        const label = milestone.replace(/([A-Z])/g, " $1").trim();
        const tx = (await contract.mintReward(learnerAddress, amount, label));
        const receipt = await tx.wait();
        console.log(`[Blockchain] Minted ${amount} MX to ${learnerAddress} for ${label}`);
        return receipt?.hash ?? "";
    }
    // ── Certificates ──────────────────────────────────────────────────────────
    async mintCertificate(learnerAddress, courseTitle, learnerName, score) {
        const contract = this.getCertNFT(true);
        const metadataURI = `ipfs://blocklearnx/${courseTitle.replace(/\s+/g, "-").toLowerCase()}`;
        const tx = (await contract.mintCertificate(learnerAddress, courseTitle, learnerName, score, metadataURI));
        const receipt = await tx.wait();
        const iface = new ethers_1.ethers.Interface(CERTIFICATE_NFT_ABI);
        let tokenId = "0";
        for (const log of receipt?.logs ?? []) {
            try {
                const parsed = iface.parseLog(log);
                if (parsed?.name === "CertificateMinted") {
                    tokenId = parsed.args[0].toString();
                    break;
                }
            }
            catch { /* skip */ }
        }
        console.log(`[Blockchain] Certificate #${tokenId} minted for ${learnerAddress}`);
        return { tokenId, txHash: receipt?.hash ?? "" };
    }
    async getLearnerCertificates(address) {
        const contract = this.getCertNFT();
        const ids = (await contract.getLearnerCertificates(address));
        return ids.map(id => Number(id));
    }
    // ── Course Registry ────────────────────────────────────────────────────────
    async approveCourse(courseId) {
        const contract = this.getRegistry(true);
        const tx = (await contract.approveCourse(courseId));
        const receipt = await tx.wait();
        console.log(`[Blockchain] Course "${courseId}" approved`);
        return receipt?.hash ?? "";
    }
    async registerCourse(courseId, title, priceEth = "0.01", rewardPoolMX = 500) {
        const contract = this.getRegistry(true);
        const priceWei = ethers_1.ethers.parseEther(priceEth);
        const tx = (await contract.registerCourse(courseId, title, priceWei, rewardPoolMX));
        const receipt = await tx.wait();
        return receipt?.hash ?? "";
    }
    async getCourseOnChain(courseId) {
        const contract = this.getRegistry();
        const raw = (await contract.courses(courseId));
        const statusMap = {
            0: "Draft", 1: "PendingApproval", 2: "Published", 3: "Archived",
        };
        return {
            courseId: raw[0],
            title: raw[1],
            provider: raw[2],
            price: ethers_1.ethers.formatEther(raw[3]),
            rewardPool: Number(raw[4]),
            status: statusMap[raw[5]] ?? "Draft",
            totalEnrollments: Number(raw[6]),
            totalRevenue: ethers_1.ethers.formatEther(raw[7]),
        };
    }
    async isEnrolled(courseId, address) {
        const contract = this.getRegistry();
        return (await contract.isEnrolled(courseId, address));
    }
    get addresses_() {
        return this.addresses;
    }
}
// Singleton instance
exports.blockchainBackend = new BlockchainBackendService();
exports.default = exports.blockchainBackend;
