export interface AssessmentQuestion {
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

export interface AssessmentData {
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
  maxViolations: number;
  questions: AssessmentQuestion[];
  nextStep: {
    label: string;
    url: string;
  };
}

export const ASSESSMENTS_DATA: Record<string, AssessmentData> = {
  "solidity-final-exam": {
    id: "solidity-final-exam",
    title: "Solidity Smart Contract Development — Final Proctored Exam",
    courseId: "solidity-fundamentals",
    courseTitle: "Solidity Fundamentals",
    partner: "Stanford Online",
    partnerLogo: "🌲",
    category: "Blockchain",
    durationMinutes: 25,
    passingScorePercent: 75,
    rewardMX: 150,
    maxViolations: 3,
    nextStep: {
      label: "View Certificate",
      url: "/portfolio",
    },
    questions: [
      {
        id: "q1",
        question:
          "Which of the following best describes the Checks-Effects-Interactions (CEI) pattern in Solidity?",
        options: [
          "Perform all external calls first, then update internal state, then validate inputs",
          "Validate inputs first, then update internal state, then make external calls",
          "Make external calls last only when gas is sufficient",
          "Emit events before updating state to maintain audit trails",
        ],
        correctAnswer: 1,
        explanation:
          "CEI: 1) CHECK inputs/preconditions, 2) update EFFECTS (state), 3) make external INTERACTIONS. This prevents reentrancy by updating state before any external calls.",
        points: 10,
      },
      {
        id: "q2",
        question:
          "What EVM opcode is responsible for storing a 256-bit value in contract storage and approximately how much gas does a cold write cost?",
        options: [
          "MSTORE — ~200 gas",
          "SSTORE — ~20,000 gas",
          "PUSH32 — ~3 gas",
          "CALL — ~2,600 gas",
        ],
        correctAnswer: 1,
        explanation:
          "SSTORE writes to persistent contract storage. A cold slot initialization costs ~20,000 gas. MSTORE only writes to memory (temporary, cheaper).",
        points: 10,
      },
      {
        id: "q3",
        question:
          "Examine the following Solidity snippet. What critical vulnerability does it contain?",
        codeSnippet: {
          language: "solidity",
          code: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount);
    (bool ok,) = msg.sender.call{value: amount}("");
    require(ok);
    balances[msg.sender] -= amount; // state update AFTER call
}`,
        },
        options: [
          "Integer overflow vulnerability",
          "Reentrancy vulnerability — state updated after external call",
          "Denial-of-service due to unbounded loop",
          "Front-running vulnerability in the require check",
        ],
        correctAnswer: 1,
        explanation:
          "The balance is deducted AFTER the external call. A malicious contract's fallback can recursively call withdraw() before the balance is updated, draining funds.",
        points: 15,
      },
      {
        id: "q4",
        question:
          "What is the difference between `memory` and `storage` data locations in Solidity?",
        options: [
          "`memory` is permanent and survives transactions; `storage` is temporary",
          "`memory` is temporary (exists only during function execution); `storage` is persistent on-chain",
          "Both are identical but `memory` costs less gas for arrays",
          "`storage` can only be used for mappings; `memory` for all other types",
        ],
        correctAnswer: 1,
        explanation:
          "`storage` persists between transactions on the blockchain. `memory` is ephemeral — allocated during a function call and cleared afterward. Using `calldata` for read-only params is the cheapest option.",
        points: 10,
      },
      {
        id: "q5",
        question:
          "Which modifier pattern correctly implements a mutex (mutual exclusion) to prevent reentrancy?",
        codeSnippet: {
          language: "solidity",
          code: `// Option A
bool private _locked;
modifier nonReentrant() {
    require(!_locked);
    _locked = true;
    _;
    _locked = false;
}

// Option B
modifier nonReentrant() {
    _;
    require(msg.value > 0);
}`,
        },
        options: [
          "Option B — simpler and more gas efficient",
          "Option A — sets lock before execution and clears after",
          "Neither — you must use OpenZeppelin's ReentrancyGuard exclusively",
          "Both are equivalent for reentrancy protection",
        ],
        correctAnswer: 1,
        explanation:
          "Option A is a correct mutex. It sets `_locked = true` BEFORE executing the function body (`_;`), preventing recursive calls. It resets after completion.",
        points: 15,
      },
      {
        id: "q6",
        question:
          "In Solidity 0.8.x, what happens when an arithmetic operation overflows without using `unchecked {}`?",
        options: [
          "The value silently wraps around (modular arithmetic)",
          "The transaction reverts with a panic error",
          "The compiler emits a warning but execution continues",
          "The excess value is truncated to fit the type",
        ],
        correctAnswer: 1,
        explanation:
          "Since Solidity 0.8.0, arithmetic overflow/underflow causes an automatic revert (Panic error 0x11). Before 0.8.0 you needed SafeMath. Use `unchecked {}` only when you're certain overflow can't occur.",
        points: 10,
      },
      {
        id: "q7",
        question:
          "What does the `indexed` keyword in an event declaration do?",
        codeSnippet: {
          language: "solidity",
          code: `event Transfer(
    address indexed from,
    address indexed to,
    uint256 value  // NOT indexed
);`,
        },
        options: [
          "Makes the parameter mandatory in all event emissions",
          "Stores the parameter in a Bloom filter topic for efficient log querying",
          "Encrypts the parameter value for privacy",
          "Limits the event to only 3 parameters total",
        ],
        correctAnswer: 1,
        explanation:
          "Indexed parameters are stored as topics in the transaction log, allowing efficient filtering/querying by DApps and block explorers. You can have up to 3 indexed parameters per event.",
        points: 10,
      },
      {
        id: "q8",
        question:
          "What is the gas cost implication of using `string` vs `bytes32` for fixed-length string data in Solidity?",
        options: [
          "`string` and `bytes32` have identical gas costs for all operations",
          "`bytes32` is more gas efficient for fixed strings; `string` uses dynamic memory allocation",
          "`string` is cheaper because it uses compression",
          "`bytes32` cannot store UTF-8 characters so it must use ASCII only",
        ],
        correctAnswer: 1,
        explanation:
          "`bytes32` is a fixed-size value type stored in a single 32-byte EVM word slot. `string` is a dynamic reference type requiring pointer + length + dynamic memory, making it significantly more expensive for short fixed strings.",
        points: 10,
      },
    ],
  },

  "smart-contract-security-exam": {
    id: "smart-contract-security-exam",
    title: "Smart Contract Security Auditing — Final Proctored Exam",
    courseId: "smart-contract-security",
    courseTitle: "Smart Contract Security",
    partner: "MIT OpenCourseWare",
    partnerLogo: "🏛️",
    category: "Security",
    durationMinutes: 30,
    passingScorePercent: 80,
    rewardMX: 200,
    maxViolations: 3,
    nextStep: {
      label: "View Certificate",
      url: "/portfolio",
    },
    questions: [
      {
        id: "q1",
        question:
          "What is a flash loan attack and which DeFi protocol property enables it?",
        options: [
          "A brute-force attack on wallet private keys using borrowed compute",
          "Borrowing uncollateralized funds within one atomic transaction to manipulate protocol state",
          "A social engineering attack targeting protocol admin keys",
          "A Sybil attack using multiple wallets to drain liquidity pools",
        ],
        correctAnswer: 1,
        explanation:
          "Flash loans allow borrowing any amount without collateral, provided funds are returned in the same transaction. Attackers exploit this to manipulate oracle prices, drain pools, or governance systems atomically.",
        points: 10,
      },
      {
        id: "q2",
        question:
          "Which of the following is the MOST dangerous consequence of a private key compromise for a smart contract admin?",
        options: [
          "Gas fees increase for all users",
          "Complete loss of protocol control — ownership transfer, treasury drain, contract upgrade to malicious code",
          "Temporary downtime until the key is rotated",
          "User data exposure through on-chain event logs",
        ],
        correctAnswer: 1,
        explanation:
          "Admin private key compromise gives full control: upgrade proxies to malicious implementations, drain treasuries, change ownership, pause/unpause, modify critical parameters — often irreversibly.",
        points: 10,
      },
      {
        id: "q3",
        question: "Identify the oracle manipulation vulnerability in this code:",
        codeSnippet: {
          language: "solidity",
          code: `function getPrice() public view returns (uint256) {
    // Uses spot price from a single DEX pool
    (uint112 reserve0, uint112 reserve1,) = IUniswapV2Pair(pool).getReserves();
    return (reserve1 * 1e18) / reserve0;
}`,
        },
        options: [
          "No vulnerability — Uniswap reserves are trustworthy",
          "Spot price oracle — manipulable via flash loans in the same block",
          "Integer overflow due to uint112 multiplication",
          "Missing access control on the price function",
        ],
        correctAnswer: 1,
        explanation:
          "Spot prices from a single block are trivially manipulable with flash loans. Use time-weighted average price (TWAP) oracles like Uniswap V3 TWAP or Chainlink price feeds instead.",
        points: 15,
      },
    ],
  },
};

export function getAssessmentData(assessmentId: string): AssessmentData {
  return (
    ASSESSMENTS_DATA[assessmentId] ||
    ASSESSMENTS_DATA["solidity-final-exam"]
  );
}
