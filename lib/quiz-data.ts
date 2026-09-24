export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface QuizData {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  partner: string;
  partnerLogo: string;
  category: string;
  durationMinutes: number;
  passingScorePercent: number;
  rewardMX: number;
  nextAssignment: {
    id: string;
    title: string;
    url: string;
    deadline: string;
    bounty: string;
  };
  questions: QuizQuestion[];
}

export const QUIZZES_DATA: Record<string, QuizData> = {
  "solidity-fundamentals-quiz": {
    id: "solidity-fundamentals-quiz",
    title: "Solidity Fundamentals & EVM Architecture Assessment",
    courseId: "solidity-fundamentals",
    courseTitle: "Solidity Fundamentals",
    partner: "Stanford Online",
    partnerLogo: "🌲",
    category: "Blockchain",
    durationMinutes: 15,
    passingScorePercent: 80,
    rewardMX: 50,
    nextAssignment: {
      id: "deploy-reentrancy-safe-vault",
      title: "Programming Assignment: Deploy Reentrancy-Safe Vault",
      url: "/assignment/deploy-reentrancy-safe-vault",
      deadline: "Due Sun, Oct 5, 11:59 PM PDT",
      bounty: "+100 MX",
    },
    questions: [
      {
        id: "q1",
        question: "What is the primary technical reason Ethereum uses 'Gas' for every EVM computational operation?",
        options: [
          "To compensate validators and solve the Turing completeness Halting Problem by metering execution steps",
          "To encrypt the transaction inputs so miners cannot inspect bytecode",
          "To increase block production speed beyond the physical network latency",
          "To allow miners to execute JavaScript scripts natively on nodes"
        ],
        correctAnswer: 0,
        explanation: "Because the EVM is Turing-complete, programs could theoretically run into infinite loops. Gas meters every opcode, halting execution if the gas limit is exceeded and preventing denial-of-service attacks on validator nodes.",
        points: 20
      },
      {
        id: "q2",
        question: "Consider the following contract. What occurs if an external caller calls 'withdraw()' without having deposited?",
        codeSnippet: {
          language: "solidity",
          code: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    (bool sent, ) = msg.sender.call{value: amount}("");
    require(sent, "Failed to send Ether");
}`
        },
        options: [
          "The transaction reverts immediately with 'Insufficient balance' and all state changes are undone",
          "The contract sends 0 ETH and silently records a negative balance",
          "The contract transfers all remaining contract funds to the caller",
          "The transaction succeeds but is permanently flagged as an error on Etherscan"
        ],
        correctAnswer: 0,
        explanation: "The 'require' statement evaluates the condition 'balances[msg.sender] >= amount'. If false, the transaction reverts with the specified error string, reverting any state changes and refunding remaining unspent gas.",
        points: 20
      },
      {
        id: "q3",
        question: "Which EVM data location is read-only, non-modifiable, and the most gas-efficient for receiving complex external function parameters such as arrays or strings?",
        options: [
          "calldata",
          "storage",
          "memory",
          "stack"
        ],
        correctAnswer: 0,
        explanation: "'calldata' points directly to the transaction's input payload buffer without copying bytes into volatile memory or persistent storage, making it significantly cheaper for external calls.",
        points: 20
      },
      {
        id: "q4",
        question: "In the context of the Checks-Effects-Interactions (CEI) design pattern, what is the mandatory sequence of operations during a token withdrawal?",
        options: [
          "1. Check preconditions -> 2. Update internal state (balances) -> 3. Perform external transfer call",
          "1. Perform external transfer call -> 2. Check preconditions -> 3. Update internal state",
          "1. Update internal state -> 2. Transfer -> 3. Emit event -> 4. Check preconditions",
          "1. Call external contract -> 2. Deduct balance"
        ],
        correctAnswer: 0,
        explanation: "Under CEI, you must check conditions first, update state variables (the effect) second, and perform external calls (interaction) last to eliminate recursive reentrancy exploit windows.",
        points: 20
      },
      {
        id: "q5",
        question: "What is the difference between 'view' and 'pure' function state mutability modifiers in Solidity 0.8.x?",
        options: [
          "'view' can read contract storage without modifying state; 'pure' can neither read nor write contract storage",
          "'pure' can read storage; 'view' can only execute math calculations",
          "'view' functions cost gas on external RPC read calls; 'pure' functions are always free on-chain",
          "There is no difference; they are interchangeable aliases"
        ],
        correctAnswer: 0,
        explanation: "'view' guarantees that state is not modified (read-only access to storage allowed). 'pure' is stricter: it guarantees neither reading from nor writing to storage (only operating on arguments and pure calculations).",
        points: 20
      }
    ]
  },

  "smart-contract-security-quiz": {
    id: "smart-contract-security-quiz",
    title: "Smart Contract Security & Auditing Certification Quiz",
    courseId: "smart-contract-security",
    courseTitle: "Smart Contract Security & Auditing",
    partner: "Ethereum Foundation Lab",
    partnerLogo: "💎",
    category: "Smart Contracts",
    durationMinutes: 20,
    passingScorePercent: 80,
    rewardMX: 50,
    nextAssignment: {
      id: "formal-audit-capstone",
      title: "Programming Assignment: Full Smart Contract Audit & AI Submission",
      url: "/assignment/formal-audit-capstone",
      deadline: "Due Wed, Oct 8, 11:59 PM PDT",
      bounty: "+150 MX",
    },
    questions: [
      {
        id: "sec-q1",
        question: "How does an attacker exploit a contract that executes an external ETH transfer before setting user balance to 0?",
        options: [
          "By implementing a malicious fallback or receive() function that recursively calls withdraw() before state updates",
          "By mining blocks with faster timestamp drift",
          "By injecting malicious assembly instructions into the gas stipend",
          "By overloading the transaction mempool with dust transactions"
        ],
        correctAnswer: 0,
        explanation: "When ETH is sent via address.call{value: amount}(''), control flow transfers to the recipient contract's receive() function, allowing reentrant execution of withdraw() while the balance is still non-zero.",
        points: 20
      },
      {
        id: "sec-q2",
        question: "Which tool is an open-source static analysis framework designed by Trail of Bits to automatically detect Solidity vulnerabilities?",
        options: [
          "Slither",
          "Webpack",
          "Prisma",
          "Docker Compose"
        ],
        correctAnswer: 0,
        explanation: "Slither is a leading static analysis framework for Solidity that detects common vulnerabilities, calculates code metrics, and prints AST visual representations.",
        points: 20
      },
      {
        id: "sec-q3",
        question: "What built-in feature was introduced in Solidity 0.8.0 to protect against arithmetic integer overflow and underflow vulnerabilities?",
        options: [
          "Default checked arithmetic that automatically reverts on overflow without needing SafeMath",
          "Automatic 512-bit floating point conversion",
          "Dynamic gas fee rebates for unchecked blocks",
          "Hardware enclave encryption"
        ],
        correctAnswer: 0,
        explanation: "Since Solidity 0.8.0, arithmetic operations revert on overflow and underflow by default, obviating the need for OpenZeppelin SafeMath in modern codebases.",
        points: 20
      },
      {
        id: "sec-q4",
        question: "What is the primary vulnerability of relying on block.timestamp for pseudo-random number generation in smart contracts?",
        options: [
          "Validators can manipulate block timestamps within an allowable window (approx. 15 seconds) to favor their outcome",
          "Timestamps are stored as strings and cannot be cast to uint256",
          "Timestamps reset to zero after 256 transactions",
          "Timestamps cause irreversible compiler memory leaks"
        ],
        correctAnswer: 0,
        explanation: "Block timestamps are partially controlled by the proposing validator, allowing them to bias or forge random outcomes. Use Chainlink VRF (Verifiable Random Function) for secure randomness.",
        points: 20
      },
      {
        id: "sec-q5",
        question: "What security property does OpenZeppelin's 'ReentrancyGuard' provide?",
        options: [
          "A mutex lock that prevents a contract function from being invoked again while an execution frame is already active",
          "Protection against frontrunning via private mempools",
          "Automated insurance payouts in case of insolvency",
          "Encrypted state variable storage"
        ],
        correctAnswer: 0,
        explanation: "ReentrancyGuard sets a state flag (typically 1 -> 2) at entry and checks that it is not already locked, reverting if recursive calls occur within the same call stack.",
        points: 20
      }
    ]
  },

  "ai-agents-quiz": {
    id: "ai-agents-quiz",
    title: "Autonomous Web3 AI Agents & Tool Execution Quiz",
    courseId: "autonomous-web3-ai-agents",
    courseTitle: "Autonomous Web3 AI Agents",
    partner: "DeepLearning.AI",
    partnerLogo: "🤖",
    category: "AI & ML",
    durationMinutes: 15,
    passingScorePercent: 80,
    rewardMX: 50,
    nextAssignment: {
      id: "build-ai-oracle-agent",
      title: "Programming Assignment: Deploy Autonomous Arbitrage AI Agent",
      url: "/assignment/build-ai-oracle-agent",
      deadline: "Due Fri, Oct 10, 11:59 PM PDT",
      bounty: "+180 MX",
    },
    questions: [
      {
        id: "ai-q1",
        question: "In the ReAct pattern for Web3 autonomous agents, what do the core loop phases stand for?",
        options: [
          "Reasoning (Thought), Action (Tool Call), and Observation (Blockchain State Feedback)",
          "React.js, ActionScript, and TypeScript",
          "Recurrent, Activated, and Continuous Tokenization",
          "Recursive Account Transactions"
        ],
        correctAnswer: 0,
        explanation: "The ReAct paradigm iteratively combines chain-of-thought Reasoning with external Actions (such as querying an RPC or signing a transaction) and inspecting the resulting Observation.",
        points: 25
      },
      {
        id: "ai-q2",
        question: "What Ethereum standard enables autonomous AI agents to execute transactions with session keys and gas sponsorship without holding raw private keys in plaintext?",
        options: [
          "ERC-4337 (Account Abstraction)",
          "ERC-20 (Fungible Tokens)",
          "ERC-721 (NFTs)",
          "EIP-1559 (Base Fee Burning)"
        ],
        correctAnswer: 0,
        explanation: "ERC-4337 Account Abstraction allows smart contract wallets to implement programmable session keys, paymaster gas sponsorship, and granular transaction permissions ideal for autonomous bots.",
        points: 25
      },
      {
        id: "ai-q3",
        question: "Why can't an on-chain smart contract directly execute an HTTP request to query OpenAI's API?",
        options: [
          "Smart contract execution must be 100% deterministic across all global validator nodes, which external HTTP requests violate",
          "Ethereum nodes lack internet connections",
          "OpenAI forbids blockchain IP addresses",
          "EVM only supports TLS 1.0"
        ],
        correctAnswer: 0,
        explanation: "All nodes must achieve exact consensus on state transitions. Because external HTTP responses can change, fail, or vary by geography, blockchains require decentralized Oracles (like Chainlink) to feed verified data on-chain.",
        points: 25
      },
      {
        id: "ai-q4",
        question: "What is the primary role of a Chainlink Oracle in autonomous Web3 agent ecosystems?",
        options: [
          "To provide cryptographically signed, tamper-resistant off-chain data feeds to smart contracts",
          "To host Next.js frontends on decentralized servers",
          "To replace Solidity with Python",
          "To eliminate validator gas fees completely"
        ],
        correctAnswer: 0,
        explanation: "Chainlink acts as a decentralized oracle network connecting real-world external data, asset price feeds, and off-chain AI outputs to smart contracts with cryptographic proof.",
        points: 25
      }
    ]
  }
};

/**
 * Fallback generator for any quizId so that no quiz route ever crashes
 */
export function getQuizData(quizId: string): QuizData {
  if (QUIZZES_DATA[quizId]) {
    return QUIZZES_DATA[quizId];
  }

  // Derive title from quizId slug
  const cleanTitle = quizId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    id: quizId,
    title: `${cleanTitle} Mastery Assessment`,
    courseId: "solidity-fundamentals",
    courseTitle: `${cleanTitle} Specialization`,
    partner: "BlockLearnX Academy",
    partnerLogo: "🎓",
    category: "Blockchain",
    durationMinutes: 15,
    passingScorePercent: 80,
    rewardMX: 50,
    nextAssignment: {
      id: `${quizId}-assignment`,
      title: `Programming Assignment: ${cleanTitle} Capstone Implementation`,
      url: `/assignment/${quizId}-assignment`,
      deadline: "Due Sun, Oct 12, 11:59 PM PDT",
      bounty: "+100 MX",
    },
    questions: [
      {
        id: "gen-q1",
        question: `What is the foundational architectural principle evaluated in ${cleanTitle}?`,
        options: [
          "State transitions must be deterministic, validated through cryptography, and protected against reentrancy",
          "Smart contracts must store large binary files directly on-chain",
          "Gas costs should be ignored during production contract deployment",
          "Private keys should be hardcoded directly into Solidity source files"
        ],
        correctAnswer: 0,
        explanation: "Deterministic execution and cryptographic verification form the bedrock of production blockchain protocols.",
        points: 25
      },
      {
        id: "gen-q2",
        question: "Which opcode consumes the most gas during smart contract execution?",
        options: [
          "SSTORE (Storage write: initializing a new slot)",
          "ADD (Arithmetic addition on stack)",
          "DUP1 (Stack duplication)",
          "MLOAD (Memory load)"
        ],
        correctAnswer: 0,
        explanation: "SSTORE requires up to 20,000 gas when modifying an uninitialized storage slot due to the permanent state storage requirements placed on all Ethereum validator nodes.",
        points: 25
      },
      {
        id: "gen-q3",
        question: "Why should external contract function parameters prefer 'calldata' over 'memory'?",
        options: [
          "Calldata avoids copying argument data into volatile memory, significantly reducing execution gas",
          "Calldata encrypts parameters with RSA 4096-bit keys",
          "Calldata allows the caller to alter the state of previous blocks",
          "Calldata runs outside the EVM sandbox"
        ],
        correctAnswer: 0,
        explanation: "Calldata is an immutable, read-only slice pointing directly to transaction calldata, saving costly memory allocation and copy opcodes.",
        points: 25
      },
      {
        id: "gen-q4",
        question: "How does the Checks-Effects-Interactions (CEI) pattern defend against reentrancy vulnerabilities?",
        options: [
          "By updating internal state balances before making any external calls or Ether transfers",
          "By increasing the compiler optimizer runs to 200",
          "By enforcing 2-factor authentication for wallet signers",
          "By requiring all functions to be marked as 'pure'"
        ],
        correctAnswer: 0,
        explanation: "Updating state before external interaction guarantees that if a malicious fallback function attempts to re-enter, the contract sees zero balance or already-processed status.",
        points: 25
      }
    ]
  };
}
