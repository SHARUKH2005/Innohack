/**
 * BlockLearnX Blockchain Service
 * Provides typed methods for interacting with deployed smart contracts
 * using ethers.js v6. Works in both browser (MetaMask) and server-side contexts.
 */

import {
  CONTRACT_ADDRESSES,
  MX_TOKEN_ABI,
  CERTIFICATE_NFT_ABI,
  COURSE_REGISTRY_ABI,
  CHAIN_ID,
  RPC_URL,
  COURSE_STATUS_MAP,
  REWARD_CONFIG,
  type CourseStatus,
} from "./contracts";

// ─── Type Definitions ─────────────────────────────────────────────────────────

export interface CourseOnChain {
  courseId: string;
  title: string;
  provider: string;
  price: bigint;
  rewardPool: bigint;
  status: CourseStatus;
  totalEnrollments: bigint;
  totalRevenue: bigint;
}

export interface CertificateData {
  courseTitle: string;
  learnerName: string;
  score: bigint;
  completionTimestamp: bigint;
  metadataURI: string;
}

export interface RewardMilestone {
  type: "lesson" | "quiz" | "assignment" | "course";
  label: string;
  tokens: number;
}

// ─── Provider Helpers ─────────────────────────────────────────────────────────

/**
 * Get ethers browser provider (MetaMask). Call only in browser environment.
 */
/**
 * Get ethers browser provider (MetaMask or injected Web3).
 */
async function getBrowserProvider() {
  if (typeof window === "undefined") throw new Error("Not in browser environment");
  const { ethers } = await import("ethers");
  const win = window as unknown as {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  };

  if (!win.ethereum) {
    return null;
  }

  const provider = new ethers.BrowserProvider(win.ethereum as Parameters<typeof ethers.BrowserProvider>[0]);

  try {
    const network = await provider.getNetwork();
    if (Number(network.chainId) !== CHAIN_ID) {
      try {
        await win.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
        });
      } catch (switchError: any) {
        // Chain not added to MetaMask yet (error code 4902)
        if (switchError?.code === 4902 || switchError?.message?.includes("Unrecognized chain")) {
          await win.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${CHAIN_ID.toString(16)}`,
                chainName: "BlockLearnX Hardhat Localhost",
                rpcUrls: [RPC_URL],
                nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
              },
            ],
          });
        }
      }
    }
  } catch (err) {
    console.warn("Chain switch check notice:", err);
  }

  return provider;
}

/**
 * Get read-only JSON-RPC provider for server-side or public reads.
 */
async function getReadProvider() {
  const { ethers } = await import("ethers");
  return new ethers.JsonRpcProvider(RPC_URL);
}

// ─── Contract Instance Helpers ────────────────────────────────────────────────

async function getMXTokenContract(writable = false) {
  const { ethers } = await import("ethers");
  if (writable) {
    const provider = await getBrowserProvider();
    if (provider) {
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESSES.MXToken, MX_TOKEN_ABI, signer);
    }
  }
  const provider = await getReadProvider();
  return new ethers.Contract(CONTRACT_ADDRESSES.MXToken, MX_TOKEN_ABI, provider);
}

async function getCertificateContract(writable = false) {
  const { ethers } = await import("ethers");
  if (writable) {
    const provider = await getBrowserProvider();
    if (provider) {
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESSES.CertificateNFT, CERTIFICATE_NFT_ABI, signer);
    }
  }
  const provider = await getReadProvider();
  return new ethers.Contract(CONTRACT_ADDRESSES.CertificateNFT, CERTIFICATE_NFT_ABI, provider);
}

async function getCourseRegistryContract(writable = false) {
  const { ethers } = await import("ethers");
  if (writable) {
    const provider = await getBrowserProvider();
    if (provider) {
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESSES.CourseRegistry, COURSE_REGISTRY_ABI, signer);
    }
  }
  const provider = await getReadProvider();
  return new ethers.Contract(CONTRACT_ADDRESSES.CourseRegistry, COURSE_REGISTRY_ABI, provider);
}

// ─── Wallet ────────────────────────────────────────────────────────────────────

const FALLBACK_WALLET_ADDRESS = "0x82f9B841A0293e8841B9240A9188412891A91942";

export const blockchainService = {
  CHAIN_ID,

  // ── Wallet ────────────────────────────────────────────────────────────────

  async connectWallet(): Promise<string> {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      throw new Error("MetaMask is not installed in your browser. Please install the MetaMask extension to connect your Web3 wallet.");
    }
    const win = window as unknown as {
      ethereum: {
        request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      };
    };
    try {
      const accounts = (await win.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        localStorage.setItem("blocklearnx_connected_wallet", address);

        // Try switching chain to Hardhat local (31337 / 0x7a69)
        try {
          await win.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
          });
        } catch (switchError: any) {
          if (switchError?.code === 4902 || switchError?.message?.includes("Unrecognized chain")) {
            await win.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${CHAIN_ID.toString(16)}`,
                  chainName: "BlockLearnX Hardhat Localhost",
                  rpcUrls: [RPC_URL],
                  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
                },
              ],
            });
          }
        }

        return address;
      }
      throw new Error("No Web3 account selected in MetaMask.");
    } catch (err: any) {
      if (err?.code === 4001) {
        throw new Error("MetaMask connection request rejected by user.");
      }
      throw err;
    }
  },

  async connectDemoWallet(): Promise<string> {
    localStorage.setItem("blocklearnx_connected_wallet", FALLBACK_WALLET_ADDRESS);
    return FALLBACK_WALLET_ADDRESS;
  },

  async getWalletAddress(): Promise<string | null> {
    if (typeof window !== "undefined") {
      // Clear legacy mock address if previously cached in localStorage
      const stored = localStorage.getItem("blocklearnx_connected_wallet");
      if (stored === FALLBACK_WALLET_ADDRESS) {
        localStorage.removeItem("blocklearnx_connected_wallet");
      }

      if ((window as any).ethereum) {
        try {
          const accounts = (await (window as any).ethereum.request({
            method: "eth_accounts",
          })) as string[];
          if (accounts && accounts.length > 0) {
            localStorage.setItem("blocklearnx_connected_wallet", accounts[0]);
            return accounts[0];
          }
        } catch {
          /* ignore */
        }
      }

      const activeStored = localStorage.getItem("blocklearnx_connected_wallet");
      if (activeStored && activeStored !== FALLBACK_WALLET_ADDRESS) {
        return activeStored;
      }
    }
    return null;
  },

  // ── MX Token ──────────────────────────────────────────────────────────────

  async getMXBalance(address: string): Promise<string> {
    try {
      const { ethers } = await import("ethers");
      const contract = await getMXTokenContract();
      const raw = (await contract.balanceOf(address)) as bigint;
      return ethers.formatUnits(raw, 18);
    } catch {
      return "1000";
    }
  },

  async getMXTotalSupply(): Promise<string> {
    const { ethers } = await import("ethers");
    const contract = await getMXTokenContract();
    const raw = (await contract.totalSupply()) as bigint;
    return ethers.formatUnits(raw, 18);
  },

  async mintReward(
    learnerAddress: string,
    milestone: keyof typeof REWARD_CONFIG
  ): Promise<string> {
    const contract = await getMXTokenContract(true);
    const amount = REWARD_CONFIG[milestone];
    const label = milestone.replace(/([A-Z])/g, " $1").trim();
    const tx = await contract.mintReward(learnerAddress, amount, label);
    const receipt = (await (tx as { wait: () => Promise<{ hash: string }> }).wait()) as { hash: string };
    return receipt.hash;
  },

  // ── Certificates ──────────────────────────────────────────────────────────

  async mintCertificate(
    learnerAddress: string,
    courseTitle: string,
    learnerName: string,
    score: number
  ): Promise<{ tokenId: string; txHash: string }> {
    const contract = await getCertificateContract(true);
    const metadataURI = `ipfs://blocklearnx/${courseTitle.replace(/\s+/g, "-").toLowerCase()}`;
    const tx = await contract.mintCertificate(learnerAddress, courseTitle, learnerName, score, metadataURI);
    const receipt = (await (tx as { wait: () => Promise<{ hash: string; logs: unknown[] }> }).wait()) as { hash: string; logs: unknown[] };

    // Parse tokenId from event
    const { ethers } = await import("ethers");
    const iface = new ethers.Interface(CERTIFICATE_NFT_ABI as unknown as string[]);
    let tokenId = "0";
    for (const log of receipt.logs) {
      try {
        const parsed = iface.parseLog(log as { topics: string[]; data: string });
        if (parsed?.name === "CertificateMinted") {
          tokenId = parsed.args[0].toString();
          break;
        }
      } catch { /* skip */ }
    }
    return { tokenId, txHash: receipt.hash };
  },

  async getLearnerCertificates(address: string): Promise<CertificateData[]> {
    const certContract = await getCertificateContract();
    const tokenIds = (await certContract.getLearnerCertificates(address)) as bigint[];
    const certificates: CertificateData[] = [];
    for (const id of tokenIds) {
      const cert = (await certContract.getCertificate(id)) as CertificateData;
      certificates.push(cert);
    }
    return certificates;
  },

  // ── Course Registry ────────────────────────────────────────────────────────

  async registerCourse(
    courseId: string,
    title: string,
    priceEth: string,
    rewardPoolMX: number
  ): Promise<string> {
    const { ethers } = await import("ethers");
    const contract = await getCourseRegistryContract(true);
    const priceWei = ethers.parseEther(priceEth);
    const tx = await contract.registerCourse(courseId, title, priceWei, rewardPoolMX);
    const receipt = (await (tx as { wait: () => Promise<{ hash: string }> }).wait()) as { hash: string };
    return receipt.hash;
  },

  async submitForApproval(courseId: string): Promise<string> {
    const contract = await getCourseRegistryContract(true);
    const tx = await contract.submitForApproval(courseId);
    const receipt = (await (tx as { wait: () => Promise<{ hash: string }> }).wait()) as { hash: string };
    return receipt.hash;
  },

  async approveCourse(courseId: string): Promise<string> {
    const contract = await getCourseRegistryContract(true);
    const tx = await contract.approveCourse(courseId);
    const receipt = (await (tx as { wait: () => Promise<{ hash: string }> }).wait()) as { hash: string };
    return receipt.hash;
  },

  async enrollInCourse(courseId: string, priceEth: string): Promise<string> {
    const { ethers } = await import("ethers");
    const contract = await getCourseRegistryContract(true);
    const tx = await contract.enrollInCourse(courseId, { value: ethers.parseEther(priceEth) });
    const receipt = (await (tx as { wait: () => Promise<{ hash: string }> }).wait()) as { hash: string };
    return receipt.hash;
  },

  async getCourse(courseId: string): Promise<CourseOnChain | null> {
    try {
      const contract = await getCourseRegistryContract();
      const raw = (await contract.courses(courseId)) as [
        string, string, string, bigint, bigint, number, bigint, bigint
      ];
      return {
        courseId:          raw[0],
        title:             raw[1],
        provider:          raw[2],
        price:             raw[3],
        rewardPool:        raw[4],
        status:            COURSE_STATUS_MAP[raw[5]] ?? "Draft",
        totalEnrollments:  raw[6],
        totalRevenue:      raw[7],
      };
    } catch {
      return null;
    }
  },

  async getCourseCount(): Promise<number> {
    const contract = await getCourseRegistryContract();
    const count = (await contract.getCourseCount()) as bigint;
    return Number(count);
  },

  async isEnrolled(courseId: string, address: string): Promise<boolean> {
    const contract = await getCourseRegistryContract();
    return (await contract.isEnrolled(courseId, address)) as boolean;
  },

  // ── Utilities ─────────────────────────────────────────────────────────────

  REWARD_CONFIG,
  CONTRACT_ADDRESSES,
  CHAIN_ID,
  RPC_URL,
};

export default blockchainService;
export { REWARD_CONFIG, CONTRACT_ADDRESSES };
