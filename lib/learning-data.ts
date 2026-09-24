import { EXPLORE_COURSES, CourseItem } from "./courses-data";

export interface LessonResource {
  id: string;
  title: string;
  type: "pdf" | "slides" | "code" | "link";
  size: string;
  downloadUrl: string;
  description: string;
}

export interface LessonQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonItem {
  id: string;
  slug: string;
  title: string;
  moduleTitle: string;
  moduleIndex: number;
  lessonIndex: number;
  duration: string;
  durationSeconds: number;
  type: "video" | "reading" | "lab";
  videoUrl: string; // YouTube embed URL or direct video
  videoPoster?: string;
  bountyMX: number;
  summary: string;
  keyTakeaways: string[];
  codeSnippet?: {
    language: string;
    filename?: string;
    code: string;
    explanation?: string;
  };
  content: string;
  resources: LessonResource[];
  quiz?: LessonQuiz;
}

export interface CourseCurriculum {
  courseId: string;
  courseTitle: string;
  instructor: string;
  partner: string;
  partnerLogo: string;
  category: string;
  totalDuration: string;
  totalReward: string;
  nftName: string;
  modules: {
    id: string;
    title: string;
    description: string;
    lessons: LessonItem[];
  }[];
}

/* ─────────────────────────────────────────────────────────────
   DETAILED CURRICULA FOR PRIMARY COURSES
   ───────────────────────────────────────────────────────────── */

export const COURSES_CURRICULUM: Record<string, CourseCurriculum> = {
  "solidity-fundamentals": {
    courseId: "solidity-fundamentals",
    courseTitle: "Solidity Fundamentals",
    instructor: "Dr. Elena Rostova",
    partner: "Stanford Online",
    partnerLogo: "🌲",
    category: "Blockchain",
    totalDuration: "6 hours",
    totalReward: "+100 MX",
    nftName: "Solidity Pioneer",
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Getting Started with Solidity & EVM",
        description: "Introduction to EVM execution model, gas architecture, and Remix IDE setup.",
        lessons: [
          {
            id: "what-is-solidity",
            slug: "what-is-solidity",
            title: "What is Solidity & EVM Architecture?",
            moduleTitle: "Module 1: Getting Started with Solidity & EVM",
            moduleIndex: 1,
            lessonIndex: 1,
            duration: "10:15",
            durationSeconds: 615,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/ipwxYa-F1uY?autoplay=0&rel=0",
            bountyMX: 15,
            summary: "Understand the core concepts of Solidity, the Ethereum Virtual Machine (EVM), gas mechanics, and how deterministic state machines function on decentralized networks.",
            keyTakeaways: [
              "Solidity is a statically-typed, contract-oriented language targeting the EVM.",
              "Smart contracts execute in a sandboxed, deterministic virtual environment.",
              "Gas metering prevents infinite loops and allocates scarce validator computation.",
              "State changes require cryptographically signed transactions."
            ],
            codeSnippet: {
              language: "solidity",
              filename: "HelloWorld.sol",
              code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HelloWorld {
    string public greeting;
    address public owner;

    event GreetingChanged(string newGreeting, address indexed by);

    constructor(string memory _initialGreeting) {
        greeting = _initialGreeting;
        owner = msg.sender;
    }

    function setGreeting(string calldata _newGreeting) external {
        require(msg.sender == owner, "Only owner can update");
        greeting = _newGreeting;
        emit GreetingChanged(_newGreeting, msg.sender);
    }
}`,
              explanation: "A canonical contract demonstrating license identifier, pragma compiler specification, public storage variables, events, and access control."
            },
            content: `
### What is Solidity?
Solidity is an object-oriented, high-level language for implementing smart contracts. Smart contracts are programs that govern the behavior of accounts within the Ethereum state machine.

Solidity was influenced by C++, Python, and JavaScript, and is designed to target the **Ethereum Virtual Machine (EVM)**. It is statically typed, supports inheritance, libraries, and complex user-defined types.

#### The Ethereum Virtual Machine (EVM)
The EVM is a deterministic, stack-based state machine. Every Ethereum node maintains a copy of this state. When a contract function is invoked:
1. The EVM checks the transaction signature and gas allowance.
2. Bytecode instructions are executed step-by-step from the contract storage.
3. Every opcode consumes a fixed amount of **Gas**.
4. If execution succeeds without reverting, the world state is updated and receipt logs are emitted.

#### Key Principles to Remember:
- **Immutability:** Once deployed, bytecode cannot be modified without proxy upgrade patterns.
- **Transparency:** All contract state and transaction data are public on-chain.
- **Deterministic Execution:** The same inputs must always yield the exact same output across all validating nodes globally.
            `,
            resources: [
              {
                id: "res-1",
                title: "Solidity 0.8.x Cheat Sheet & Syntax Guide.pdf",
                type: "pdf",
                size: "2.4 MB",
                downloadUrl: "#",
                description: "Complete reference for keywords, function visibility modifiers, global variables, and gas optimization patterns."
              },
              {
                id: "res-2",
                title: "EVM Opcodes & Gas Architecture Slides.pdf",
                type: "slides",
                size: "4.1 MB",
                downloadUrl: "#",
                description: "Lecture slides illustrating EVM memory model, calldata vs memory vs storage."
              },
              {
                id: "res-3",
                title: "GitHub Repository: Solidity Starter Kit",
                type: "code",
                size: "1.2 MB",
                downloadUrl: "https://github.com",
                description: "Boilerplate Hardhat and Foundry workspace with automated tests."
              }
            ],
            quiz: {
              question: "What is the primary role of Gas in the Ethereum Virtual Machine?",
              options: [
                "To meter compute resources and prevent infinite loops (Halting Problem)",
                "To encrypt contract bytecode on the blockchain",
                "To generate random private keys for signers",
                "To speed up transaction propagation over HTTP"
              ],
              correctAnswer: 0,
              explanation: "Gas prices each EVM opcode to quantify computational effort, protect nodes against denial-of-service loops, and compensate validators."
            }
          },
          {
            id: "setting-up-remix",
            slug: "setting-up-remix",
            title: "Setting Up Remix IDE & Workspace",
            moduleTitle: "Module 1: Getting Started with Solidity & EVM",
            moduleIndex: 1,
            lessonIndex: 2,
            duration: "12:30",
            durationSeconds: 750,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/gyMwXuJrbJQ?autoplay=0&rel=0",
            bountyMX: 15,
            summary: "Learn to configure Remix Online IDE, select the Solidity compiler version, manage workspace files, and run JavaScript test scripts in a simulated VM environment.",
            keyTakeaways: [
              "Remix IDE runs directly in your browser without local node installation.",
              "The Remix VM provides 10 pre-funded test accounts with 100 fake ETH each.",
              "Compiler warnings highlight insecure patterns such as unchecked return values.",
              "Debugger allows step-by-step transaction walkthrough and opcode inspection."
            ],
            codeSnippet: {
              language: "solidity",
              filename: "StorageBox.sol",
              code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract StorageBox {
    uint256 private secretValue;

    function store(uint256 _val) external {
        secretValue = _val;
    }

    function retrieve() external view returns (uint256) {
        return secretValue;
    }
}`,
              explanation: "A simple storage contract to test compiling, deploying, and invoking functions in the Remix VM."
            },
            content: `
### Setting up Remix IDE
Remix is a powerful open-source web application for Ethereum smart contract development.

#### Key Interface Sections:
1. **File Explorer:** Manage your \`.sol\` files, libraries, and compilation artifacts.
2. **Solidity Compiler:** Choose compiler version (e.g., \`0.8.24\`), toggle optimizer, and inspect ABI/Bytecode.
3. **Deploy & Run Transactions:** Select environment (\`Remix VM (Cancun)\` or \`Injected Provider - MetaMask\`).
4. **Remix Debugger:** Step into transactions to view call stacks and local memory.
            `,
            resources: [
              {
                id: "res-remix-guide",
                title: "Remix IDE Quickstart Manual.pdf",
                type: "pdf",
                size: "1.8 MB",
                downloadUrl: "#",
                description: "Step-by-step guide with screenshots for Remix IDE navigation and debugging."
              }
            ],
            quiz: {
              question: "Which Remix environment allows testing without spending real cryptocurrency or needing a browser wallet?",
              options: [
                "Remix VM (in-browser simulated blockchain)",
                "Mainnet Injected Provider",
                "Hardhat Remote RPC over WebSocket",
                "Alchemy Production Endpoint"
              ],
              correctAnswer: 0,
              explanation: "The Remix VM runs an in-memory blockchain simulation inside your browser with 10 instant test accounts."
            }
          },
          {
            id: "first-smart-contract",
            slug: "first-smart-contract",
            title: "Your First Smart Contract: State & Storage",
            moduleTitle: "Module 1: Getting Started with Solidity & EVM",
            moduleIndex: 1,
            lessonIndex: 3,
            duration: "18:45",
            durationSeconds: 1125,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/M576WGiDBdQ?autoplay=0&rel=0",
            bountyMX: 20,
            summary: "Deep dive into Ethereum storage slots, state variables vs local variables, and gas costs associated with SSTORE and SLOAD opcodes.",
            keyTakeaways: [
              "Storage is persistent and expensive; memory is temporary and cheap.",
              "Each storage slot contains 32 bytes (256 bits).",
              "Packing adjacent variables smaller than 32 bytes saves gas.",
              "Constant and immutable variables live in contract bytecode rather than storage."
            ],
            codeSnippet: {
              language: "solidity",
              filename: "GasOptimizedStorage.sol",
              code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GasOptimizedStorage {
    // Packed into a single 32-byte storage slot (16 + 8 + 8 = 32)
    uint128 public balance;
    uint64 public lastTimestamp;
    uint64 public transactionCount;

    address public immutable i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    function update(uint128 _newBalance) external {
        require(msg.sender == i_owner, "Unauthorized");
        balance = _newBalance;
        lastTimestamp = uint64(block.timestamp);
        transactionCount++;
    }
}`,
              explanation: "Demonstration of variable packing inside a single 32-byte slot to reduce SSTORE gas costs."
            },
            content: `
### EVM Data Locations: Storage, Memory, and Calldata
Understanding EVM data storage locations is essential for writing gas-efficient and secure code:

- **Storage:** A key-value mapping from \`uint256\` slot index to \`uint256\` value. Values persist between transactions. High gas cost (~20,000 gas for first write).
- **Memory:** Volatile linear memory allocated per transaction. Cleared when execution finishes.
- **Calldata:** Read-only byte array containing function call arguments. Highly gas-efficient for external functions.
            `,
            resources: [
              {
                id: "res-storage-slots",
                title: "EVM Storage Slot Layout Diagram.pdf",
                type: "pdf",
                size: "3.2 MB",
                downloadUrl: "#",
                description: "Visual architectural diagram detailing how structs and mappings map into 32-byte storage hashes."
              }
            ],
            quiz: {
              question: "What is the primary gas advantage of 'calldata' over 'memory' for function arguments?",
              options: [
                "Calldata is read-only and does not copy parameters into expensive volatile memory",
                "Calldata automatically bypasses reentrancy guards",
                "Calldata encrypts function parameters with RSA",
                "Calldata permits modifying values without paying gas"
              ],
              correctAnswer: 0,
              explanation: "Calldata points directly to the input payload slice without allocating new memory, saving substantial gas."
            }
          }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Solidity Core Types & Functions",
        description: "Master mappings, dynamic arrays, visibility modifiers, and custom events.",
        lessons: [
          {
            id: "data-types-variables",
            slug: "data-types-variables",
            title: "Data Types & Variables in Solidity",
            moduleTitle: "Module 2: Solidity Core Types & Functions",
            moduleIndex: 2,
            lessonIndex: 4,
            duration: "15:20",
            durationSeconds: 920,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/ipwxYa-F1uY?autoplay=0&rel=0",
            bountyMX: 15,
            summary: "Explore value types (uint, int, bool, address) versus reference types (arrays, structs, strings, mappings).",
            keyTakeaways: [
              "Solidity does not support floating point numbers (use fixed-point math with decimals).",
              "The address payable type can receive native ETH transfers.",
              "Enums provide type-safe finite state modeling for smart contracts."
            ],
            content: `### Value Types vs Reference Types
Solidity supports value types passed by value (booleans, integers, addresses, byte arrays) and reference types (arrays, structs, mappings) that require explicit location specifiers (\`memory\`, \`storage\`, or \`calldata\`).`,
            resources: [
              {
                id: "res-types-pdf",
                title: "Solidity Data Types Quick Guide.pdf",
                type: "pdf",
                size: "1.9 MB",
                downloadUrl: "#",
                description: "Comprehensive table comparing uint sizes, address methods, and string encodings."
              }
            ]
          },
          {
            id: "functions-visibility",
            slug: "functions-visibility",
            title: "Functions, Visibility & Modifiers",
            moduleTitle: "Module 2: Solidity Core Types & Functions",
            moduleIndex: 2,
            lessonIndex: 5,
            duration: "20:10",
            durationSeconds: 1210,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/gyMwXuJrbJQ?autoplay=0&rel=0",
            bountyMX: 20,
            summary: "Learn public, external, internal, and private visibility modifiers, plus custom function modifiers.",
            keyTakeaways: [
              "External functions have cheaper call overhead when passing large calldata arrays.",
              "Function modifiers wrap logic before or after the _; merge point.",
              "View functions read storage without modifying state; Pure functions compute without reading or writing storage."
            ],
            content: `### Function Visibility in Solidity
- **public:** Accessible both internally and externally via message calls.
- **external:** Only accessible externally via transactions or other contracts.
- **internal:** Only accessible within the current contract and inheriting contracts.
- **private:** Only accessible within the exact contract where defined.`,
            resources: [
              {
                id: "res-vis-pdf",
                title: "Function Visibility Matrix.pdf",
                type: "pdf",
                size: "1.4 MB",
                downloadUrl: "#",
                description: "Security matrix showing access boundaries and compiler generation."
              }
            ]
          },
          {
            id: "mappings-arrays",
            slug: "mappings-arrays",
            title: "Mappings & Dynamic Arrays",
            moduleTitle: "Module 2: Solidity Core Types & Functions",
            moduleIndex: 2,
            lessonIndex: 6,
            duration: "22:40",
            durationSeconds: 1360,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/M576WGiDBdQ?autoplay=0&rel=0",
            bountyMX: 20,
            summary: "Understand hash table mappings (\`mapping(key => value)\`), array push/pop methods, and iterating safely without gas limit exhaustion.",
            keyTakeaways: [
              "Mappings cannot be iterated directly because keys are not tracked.",
              "Unbounded loops over dynamic arrays can run out of gas and brick a contract.",
              "Delete keyword resets a storage slot to its default zero value."
            ],
            content: `### Mappings in EVM
Mappings are implemented using Keccak-256 hashes of the key and slot index: \`keccak256(key . slot)\`. This means mappings don't have a concept of length or keys list.`,
            resources: [
              {
                id: "res-map-pdf",
                title: "Enumerable Maps Pattern.pdf",
                type: "pdf",
                size: "2.1 MB",
                downloadUrl: "#",
                description: "How OpenZeppelin EnumerableMap provides gas-efficient iterable mappings."
              }
            ]
          }
        ]
      },
      {
        id: "mod-3",
        title: "Module 3: Standards & Real-World dApps",
        description: "Build an ERC-20 token, implement transfers, allowances, and deploy to a testnet.",
        lessons: [
          {
            id: "erc20-token-standard",
            slug: "erc20-token-standard",
            title: "ERC-20 Token Standard Implementation",
            moduleTitle: "Module 3: Standards & Real-World dApps",
            moduleIndex: 3,
            lessonIndex: 7,
            duration: "28:15",
            durationSeconds: 1695,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/ipwxYa-F1uY?autoplay=0&rel=0",
            bountyMX: 25,
            summary: "Code an ERC-20 standard fungible token contract from scratch, including totalSupply, balanceOf, transfer, approve, and transferFrom.",
            keyTakeaways: [
              "ERC-20 defines 6 required functions and 2 events for token interoperability.",
              "Approval frontrunning can be mitigated using increaseAllowance and decreaseAllowance.",
              "Use OpenZeppelin's audited implementation in production."
            ],
            codeSnippet: {
              language: "solidity",
              filename: "MiniERC20.sol",
              code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MiniERC20 {
    string public name = "BlockLearnX Coin";
    string public symbol = "BLX";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** decimals;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}`,
              explanation: "Foundational ERC-20 token implementation showcasing transfer mechanics and zero-address mint event."
            },
            content: `
### The ERC-20 Standard
EIP-20 is the cornerstone standard for fungible tokens on Ethereum. Every exchange, wallet, and DEX relies on this exact interface.
            `,
            resources: [
              {
                id: "res-erc20-spec",
                title: "EIP-20 Official Specification.pdf",
                type: "pdf",
                size: "1.1 MB",
                downloadUrl: "#",
                description: "Full Ethereum Improvement Proposal document with mathematical guarantees."
              }
            ]
          },
          {
            id: "deploying-to-testnet",
            slug: "deploying-to-testnet",
            title: "Deploying to Testnet & Verifying on Etherscan",
            moduleTitle: "Module 3: Standards & Real-World dApps",
            moduleIndex: 3,
            lessonIndex: 8,
            duration: "19:50",
            durationSeconds: 1190,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/gyMwXuJrbJQ?autoplay=0&rel=0",
            bountyMX: 25,
            summary: "Deploy your smart contract to Sepolia testnet using MetaMask, acquire faucet funds, and verify source code on Etherscan.",
            keyTakeaways: [
              "Testnets mirror mainnet EVM rules without risking real financial capital.",
              "Etherscan verification publishes your Solidity source and ABI publicly for community inspection.",
              "Never commit your private keys or mnemonic seed phrases to Git."
            ],
            content: `### Testnet Deployment Best Practices
Learn how to use environment variables with dotenv to protect private keys, generate constructor arguments, and automate deployment scripts.`,
            resources: [
              {
                id: "res-deploy-guide",
                title: "Sepolia Testnet Deployment Guide.pdf",
                type: "pdf",
                size: "2.8 MB",
                downloadUrl: "#",
                description: "Comprehensive guide for RPC endpoints, faucets, and API key setup."
              }
            ]
          }
        ]
      }
    ]
  },

  "smart-contract-security": {
    courseId: "smart-contract-security",
    courseTitle: "Smart Contract Security & Auditing",
    instructor: "Marcus Vance",
    partner: "Ethereum Foundation Lab",
    partnerLogo: "💎",
    category: "Smart Contracts",
    totalDuration: "8 hours",
    totalReward: "+150 MX",
    nftName: "Security Auditor",
    modules: [
      {
        id: "sec-mod-1",
        title: "Module 1: The Threat Landscape & Reentrancy",
        description: "Deep dive into the DAO hack, CEI pattern, and reentrancy guards.",
        lessons: [
          {
            id: "common-vulnerability-classes",
            slug: "common-vulnerability-classes",
            title: "Common Vulnerability Classes (SWC Registry)",
            moduleTitle: "Module 1: The Threat Landscape & Reentrancy",
            moduleIndex: 1,
            lessonIndex: 1,
            duration: "14:20",
            durationSeconds: 860,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/ipwxYa-F1uY?autoplay=0&rel=0",
            bountyMX: 20,
            summary: "Analyze real-world exploits causing over $3B in losses: reentrancy, access control bypass, flash loan manipulation, and frontrunning.",
            keyTakeaways: [
              "Smart contracts manage billions in value with irreversible transaction finality.",
              "Bugs cannot be patched post-deployment without proxy migration.",
              "Security must be architected from day one using defensive programming."
            ],
            content: `### Overview of Smart Contract Security
Unlike traditional software, Web3 smart contract code is public, immutable, and directly holds custody of digital assets. An unhandled edge case can lead to catastrophic, irreversible fund drainage.`,
            resources: [
              {
                id: "res-swc-pdf",
                title: "Smart Contract Weakness Classification.pdf",
                type: "pdf",
                size: "3.5 MB",
                downloadUrl: "#",
                description: "Top 25 SWC vulnerabilities and mitigation patterns."
              }
            ],
            quiz: {
              question: "What makes smart contract vulnerabilities significantly higher risk than traditional web server bugs?",
              options: [
                "Transactions are immutable and execute directly on public financial state without rollbacks",
                "Solidity is an interpreted script that requires no compiler",
                "EVM does not support conditional statements",
                "Blockchains can only process one transaction per day"
              ],
              correctAnswer: 0,
              explanation: "Once an on-chain transaction executes and includes in a finalized block, the state change cannot be manually undone."
            }
          },
          {
            id: "reentrancy-deep-dive",
            slug: "reentrancy-deep-dive",
            title: "Reentrancy Attacks & Checks-Effects-Interactions (CEI)",
            moduleTitle: "Module 1: The Threat Landscape & Reentrancy",
            moduleIndex: 1,
            lessonIndex: 2,
            duration: "25:40",
            durationSeconds: 1540,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/gyMwXuJrbJQ?autoplay=0&rel=0",
            bountyMX: 25,
            summary: "Understand how external calls transfer control flow back to the attacker contract before balance updates take effect.",
            keyTakeaways: [
              "Always apply Checks-Effects-Interactions: modify state variables BEFORE calling external addresses.",
              "Use OpenZeppelin's ReentrancyGuard nonReentrant modifier on sensitive withdrawals.",
              "Cross-function and cross-contract reentrancy can bypass basic mutexes."
            ],
            codeSnippet: {
              language: "solidity",
              filename: "SafeVault.sol",
              code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SafeVault {
    mapping(address => uint256) public balances;
    bool private locked;

    modifier nonReentrant() {
        require(!locked, "Reentrant call detected");
        locked = true;
        _;
        locked = false;
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external nonReentrant {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Zero balance");

        // 1. CHECKS complete
        // 2. EFFECTS (update state before external transfer)
        balances[msg.sender] = 0;

        // 3. INTERACTIONS (external call last)
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}`,
              explanation: "A robust vault implementation adhering strictly to the Checks-Effects-Interactions pattern with a nonReentrant mutex lock."
            },
            content: `
### Reentrancy: How the DAO Hack Happened
A reentrancy attack occurs when a vulnerable contract transfers native ETH or calls an external contract before setting the sender's balance to zero.

Because the recipient contract's \`receive()\` or \`fallback()\` function executes immediately upon receiving ETH, the attacker can recursively re-enter the \`withdraw()\` function again and again, draining the vault before the state ever updates!
            `,
            resources: [
              {
                id: "res-cei-pdf",
                title: "Checks-Effects-Interactions Pattern Whitepaper.pdf",
                type: "pdf",
                size: "2.2 MB",
                downloadUrl: "#",
                description: "Formal verification and state machine analysis of the CEI pattern."
              }
            ]
          }
        ]
      }
    ]
  },

  "autonomous-web3-ai-agents": {
    courseId: "autonomous-web3-ai-agents",
    courseTitle: "Autonomous Web3 AI Agents",
    instructor: "Dr. Kenji Tanaka",
    partner: "DeepLearning.AI",
    partnerLogo: "🤖",
    category: "AI & ML",
    totalDuration: "10 hours",
    totalReward: "+180 MX",
    nftName: "AI Agent Architect",
    modules: [
      {
        id: "ai-mod-1",
        title: "Module 1: Large Language Models & Web3 Integration",
        description: "Connect LangChain agent runtimes to blockchain RPC providers.",
        lessons: [
          {
            id: "how-llms-work-in-web3",
            slug: "how-llms-work-in-web3",
            title: "How Large Language Models & Agents Work in Web3",
            moduleTitle: "Module 1: Large Language Models & Web3 Integration",
            moduleIndex: 1,
            lessonIndex: 1,
            duration: "16:45",
            durationSeconds: 1005,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/ipwxYa-F1uY?autoplay=0&rel=0",
            bountyMX: 20,
            summary: "Learn how autonomous agents reason through tool use, inspect blockchain state, formulate transactions, and manage smart wallets.",
            keyTakeaways: [
              "AI agents combine reasoning LLMs with deterministic blockchain tool calling.",
              "Autonomous wallets utilize Account Abstraction (ERC-4337) for programmable session keys.",
              "Cryptographic prompt attestations verify the agent's deterministic execution."
            ],
            content: `### Autonomous Web3 Agents
Discover how autonomous agents execute DeFi trades, monitor mempools, and trigger automated smart contract functions using oracles.`,
            resources: [
              {
                id: "res-agent-arch",
                title: "Autonomous Web3 Agent Architecture.pdf",
                type: "pdf",
                size: "3.7 MB",
                downloadUrl: "#",
                description: "System diagram showing LangChain, ERC-4337 bundlers, and paymaster flows."
              }
            ]
          }
        ]
      }
    ]
  }
};

/* ─────────────────────────────────────────────────────────────
   FALLBACK CURRICULUM GENERATOR FOR REMAINING COURSES
   ───────────────────────────────────────────────────────────── */

export function getCourseCurriculum(courseId: string): CourseCurriculum {
  if (COURSES_CURRICULUM[courseId]) {
    return COURSES_CURRICULUM[courseId];
  }

  // Find course in EXPLORE_COURSES
  const course = EXPLORE_COURSES.find((c) => c.id === courseId || c.slug === courseId);

  const title = course?.title || "Web3 Engineering Specialization";
  const partner = course?.partner || "BlockLearnX Academy";
  const partnerLogo = course?.partnerLogo || "🎓";
  const instructor = course?.instructor || "Senior Web3 Faculty";
  const category = course?.category || "Blockchain";
  const totalReward = course?.reward || "+100 MX";
  const duration = course?.duration || "8 hours";

  // Create 3 rich modules
  const moduleNames = [
    "Module 1: Core Fundamentals & Architecture",
    "Module 2: Advanced Implementation & Tooling",
    "Module 3: Production Deployment & Capstone"
  ];

  const lessonTopics = [
    ["Introduction & Architectural Concepts", "Environment Setup & Developer Tooling", "Writing Your First Program"],
    ["State Management & Data Structures", "Design Patterns & Best Practices", "Testing & Verification"],
    ["On-Chain Deployment", "Security Auditing & Gas Optimization", "Final Capstone Evaluation"]
  ];

  let lessonCounter = 1;
  const modules = moduleNames.map((modTitle, modIdx) => ({
    id: `mod-${modIdx + 1}`,
    title: modTitle,
    description: `Comprehensive study and practical exercises for ${modTitle}.`,
    lessons: lessonTopics[modIdx].map((lessonTitle, lIdx) => {
      const slug = lessonTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const currentNum = lessonCounter++;
      return {
        id: slug,
        slug: slug,
        title: `${lessonTitle}`,
        moduleTitle: modTitle,
        moduleIndex: modIdx + 1,
        lessonIndex: currentNum,
        duration: `${10 + (lIdx * 5)}:00`,
        durationSeconds: (10 + (lIdx * 5)) * 60,
        type: (lIdx === 2 ? "lab" : "video") as "video" | "lab",
        videoUrl: "https://www.youtube.com/embed/ipwxYa-F1uY?autoplay=0&rel=0",
        bountyMX: 15 + (modIdx * 5),
        summary: `Master the essential techniques and professional workflows of ${lessonTitle} in ${title}.`,
        keyTakeaways: [
          `Foundational concepts of ${lessonTitle}.`,
          "Industry standard patterns implemented by leading Web3 protocols.",
          "Defensive programming and gas efficiency best practices.",
          "Verifiable credentials minted on-chain upon completion."
        ],
        codeSnippet: {
          language: "solidity",
          filename: "Contract.sol",
          code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ModuleContract {
    address public immutable owner;
    uint256 public value;

    event ValueUpdated(uint256 indexed newValue);

    constructor() {
        owner = msg.sender;
    }

    function setValue(uint256 _val) external {
        require(msg.sender == owner, "Only owner");
        value = _val;
        emit ValueUpdated(_val);
    }
}`,
          explanation: "Production pattern demonstrating constructor immutability, indexed event logging, and access control."
        },
        content: `
### ${lessonTitle}
Welcome to this essential unit of **${title}**. In this lesson, we break down both theoretical foundations and hands-on implementation steps.

#### Key Objectives:
1. Understand the core specifications and standards.
2. Follow best practices for maintainability, security, and gas profiling.
3. Complete the interactive knowledge check and claim your cryptographic MX reward.
        `,
        resources: [
          {
            id: `res-${slug}-pdf`,
            title: `${lessonTitle} Course Guide.pdf`,
            type: "pdf" as const,
            size: "2.1 MB",
            downloadUrl: "#",
            description: "Detailed curriculum notes, diagrams, and code references."
          },
          {
            id: `res-${slug}-slides`,
            title: `${lessonTitle} Presentation Deck.pdf`,
            type: "slides" as const,
            size: "3.4 MB",
            downloadUrl: "#",
            description: "Visual slides used in the instructor video lectures."
          }
        ],
        quiz: {
          question: `What is the primary best practice emphasized in ${lessonTitle}?`,
          options: [
            "Ensuring state updates occur before external calls and verifying authorization",
            "Skipping unit testing to minimize deployment time",
            "Storing large images directly inside contract storage slots",
            "Hardcoding private keys into public repositories"
          ],
          correctAnswer: 0,
          explanation: "Defensive programming with proper authorization checks and clean state transitions is the industry standard."
        }
      };
    })
  }));

  return {
    courseId,
    courseTitle: title,
    instructor,
    partner,
    partnerLogo,
    category,
    totalDuration: duration,
    totalReward,
    nftName: `${title.split(" ")[0]} Specialist`,
    modules
  };
}

/* ─────────────────────────────────────────────────────────────
   HELPER UTILITIES
   ───────────────────────────────────────────────────────────── */

/** Get all lessons in linear sequence for a given course */
export function getAllCourseLessons(courseId: string): LessonItem[] {
  const curriculum = getCourseCurriculum(courseId);
  return curriculum.modules.flatMap((m) => m.lessons);
}

/** Find a specific lesson by lessonId or slug */
export function getLesson(courseId: string, lessonId: string): { lesson: LessonItem; curriculum: CourseCurriculum } | null {
  const curriculum = getCourseCurriculum(courseId);
  const all = curriculum.modules.flatMap((m) => m.lessons);
  const found = all.find((l) => l.id === lessonId || l.slug === lessonId);
  
  if (found) {
    return { lesson: found, curriculum };
  }

  // Fallback to first lesson if not found
  if (all.length > 0) {
    return { lesson: all[0], curriculum };
  }

  return null;
}

/** Get next and previous lesson pointers */
export function getSurroundingLessons(courseId: string, currentLessonId: string): {
  prevLesson: LessonItem | null;
  nextLesson: LessonItem | null;
  currentIndex: number;
  totalLessons: number;
} {
  const all = getAllCourseLessons(courseId);
  const currentIndex = all.findIndex((l) => l.id === currentLessonId || l.slug === currentLessonId);

  if (currentIndex === -1) {
    return {
      prevLesson: null,
      nextLesson: all[1] || null,
      currentIndex: 0,
      totalLessons: all.length,
    };
  }

  return {
    prevLesson: currentIndex > 0 ? all[currentIndex - 1] : null,
    nextLesson: currentIndex < all.length - 1 ? all[currentIndex + 1] : null,
    currentIndex,
    totalLessons: all.length,
  };
}

/* ─────────────────────────────────────────────────────────────
   PROGRESS PERSISTENCE (LOCAL STORAGE WITH SAFE SSR)
   ───────────────────────────────────────────────────────────── */

const STORAGE_KEY = "blocklearnx_course_progress_v1";

export interface ProgressState {
  completedLessons: string[];
  totalEarnedMX: number;
  lastCompletedAt?: string;
}

export function loadCourseProgress(courseId: string): ProgressState {
  if (typeof window === "undefined") {
    return { completedLessons: [], totalEarnedMX: 0 };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessons: [], totalEarnedMX: 0 };
    const allProgress = JSON.parse(raw);
    return allProgress[courseId] || { completedLessons: [], totalEarnedMX: 0 };
  } catch (e) {
    return { completedLessons: [], totalEarnedMX: 0 };
  }
}

export function saveLessonCompletion(courseId: string, lessonId: string, rewardMX: number): ProgressState {
  if (typeof window === "undefined") {
    return { completedLessons: [lessonId], totalEarnedMX: rewardMX };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const allProgress = raw ? JSON.parse(raw) : {};
    const courseState: ProgressState = allProgress[courseId] || { completedLessons: [], totalEarnedMX: 0 };

    if (!courseState.completedLessons.includes(lessonId)) {
      courseState.completedLessons.push(lessonId);
      courseState.totalEarnedMX = (courseState.totalEarnedMX || 0) + rewardMX;
      courseState.lastCompletedAt = new Date().toISOString();
      allProgress[courseId] = courseState;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));

      // Also trigger storage event so other components can react
      window.dispatchEvent(new Event("blocklearnx_progress_updated"));
    }

    return courseState;
  } catch (e) {
    return { completedLessons: [lessonId], totalEarnedMX: rewardMX };
  }
}
