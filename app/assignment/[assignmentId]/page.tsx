"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  FileCode,
  Terminal,
  Upload,
  Sparkles,
  Coins,
  ShieldCheck,
  Award,
  Play,
  Copy,
  Check,
  ExternalLink,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { Confetti } from "@/components/learning/confetti";

export default function AssignmentPage() {
  const params = useParams();
  const assignmentId = (params?.assignmentId as string) || "deploy-reentrancy-safe-vault";

  const [solidityCode, setSolidityCode] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title SecureVault
 * @notice Implements safe deposits and withdrawals using the CEI pattern
 */
contract SecureVault is ReentrancyGuard {
    mapping(address => uint256) private _balances;

    event Deposited(address indexed account, uint256 amount);
    event Withdrawn(address indexed account, uint256 amount);

    function deposit() external payable {
        require(msg.value > 0, "Deposit must be > 0");
        _balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external nonReentrant {
        // 1. CHECKS
        require(amount > 0, "Amount must be > 0");
        require(_balances[msg.sender] >= amount, "Insufficient balance");

        // 2. EFFECTS (state update before external call)
        _balances[msg.sender] -= amount;

        // 3. INTERACTIONS (external ETH call)
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit Withdrawn(msg.sender, amount);
    }

    function getBalance(address account) external view returns (uint256) {
        return _balances[account];
    }
}`);

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditComplete(true);
      setShowConfetti(true);
    }, 2200);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(solidityCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col justify-between">
      
      {/* ── TOP HEADER ── */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/dashboard" className="shrink-0 flex items-center">
            <Logo height={32} width={135} />
          </Link>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              Programming Assignment
            </span>
            <h2 className="text-xs font-bold text-white truncate max-w-sm">
              Deploy Reentrancy-Safe Vault
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold font-mono">
            <Coins className="h-3.5 w-3.5 fill-amber-400" />
            <span>+100 MX Bounty</span>
          </div>

          <Link
            href="/dashboard"
            className="text-xs font-semibold text-slate-400 hover:text-white px-2 py-1 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* ── MAIN WORKSPACE ── */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Cols: Assignment Brief & Rubric */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <Link
                href="/courses/solidity-fundamentals"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#0056D2]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Curriculum
              </Link>

              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-[#0056D2]">
                  Capstone Lab 1
                </span>
                <h1 className="text-xl font-black text-slate-900 mt-2">
                  Deploy Reentrancy-Safe Vault
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Stanford Online · Smart Contract Security Track
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="font-bold text-slate-800">Requirements &amp; Rubric:</p>
                <ul className="space-y-1.5 text-slate-600 pl-4 list-disc">
                  <li>Implement the Checks-Effects-Interactions (CEI) sequence.</li>
                  <li>Incorporate OpenZeppelin ReentrancyGuard mutex on withdraw().</li>
                  <li>Validate msg.value and sender account balances using require.</li>
                  <li>Emit indexed event logs for all state-changing operations.</li>
                </ul>
              </div>

              {auditComplete && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2 animate-in fade-in duration-300">
                  <p className="font-black flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    AI Static Analysis Passed: 100/100
                  </p>
                  <p className="text-slate-600">
                    Slither and Foundry fuzz testing completed with 0 high, 0 medium vulnerabilities detected.
                  </p>
                  <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] font-mono">
                    <span>Reward: +100 MX</span>
                    <span className="text-emerald-700 font-bold">Claimed to Wallet</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right 7 Cols: Solidity Code Editor & Submission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
              
              {/* Editor Header Bar */}
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2 font-mono">
                  <FileCode className="h-4 w-4 text-blue-400" />
                  <span className="text-white font-semibold">SecureVault.sol</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    Solidity 0.8.24
                  </span>
                </div>
              </div>

              {/* Code Area */}
              <textarea
                value={solidityCode}
                onChange={(e) => setSolidityCode(e.target.value)}
                rows={18}
                className="w-full p-4 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-none"
              />

              {/* Action Toolbar */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Automated test runner powered by Foundry &amp; Slither AI.
                </span>

                <Button
                  onClick={handleRunAudit}
                  disabled={isAuditing}
                  className="bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs h-10 px-6 rounded-xl shadow-md gap-2"
                >
                  {isAuditing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Running AI Audit...</span>
                    </>
                  ) : auditComplete ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Re-run Audit</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Submit for AI Audit</span>
                    </>
                  )}
                </Button>
              </div>

            </div>
          </div>

        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900 py-3 text-center text-xs text-slate-500">
        BlockLearnX Verification Node · Polygon zkEVM Testnet
      </footer>

      <Confetti
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

    </div>
  );
}
