"use client";

import { useState } from "react";
import { useBlockchain } from "@/lib/hooks/useBlockchain";
import { CONTRACT_ADDRESSES, CHAIN_ID } from "@/lib/blockchain/contracts";

export function BlockchainPanel() {
  const {
    isConnected,
    walletAddress,
    mxBalance,
    isLoading,
    error,
    connectWallet,
    mintReward,
    rewardConfig,
    contractAddresses,
  } = useBlockchain();

  const [lastTx, setLastTx] = useState<string | null>(null);
  const [mintMsg, setMintMsg] = useState<string | null>(null);

  const handleMint = async (milestone: "lessonCompletion" | "quizPass" | "assignmentPass" | "courseCompletion") => {
    try {
      setMintMsg(null);
      const txHash = await mintReward(milestone);
      setLastTx(txHash);
      setMintMsg(`✅ Minted ${rewardConfig[milestone]} MX for ${milestone}`);
    } catch (e) {
      setMintMsg(`❌ ${e instanceof Error ? e.message : "Transaction failed"}`);
    }
  };

  return (
    <div className="blockchain-panel">
      <div className="bp-header">
        <div className="bp-chain-badge">
          <span className="bp-dot" />
          Hardhat Local · Chain {CHAIN_ID}
        </div>
        <h2 className="bp-title">⛓ Blockchain Integration</h2>
      </div>

      {/* Contract Addresses */}
      <div className="bp-section">
        <h3 className="bp-section-title">Deployed Contracts</h3>
        <div className="bp-contracts">
          {Object.entries(contractAddresses).map(([name, addr]) => (
            <div key={name} className="bp-contract-row">
              <span className="bp-contract-name">{name}</span>
              <code className="bp-contract-addr">{addr}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet */}
      <div className="bp-section">
        <h3 className="bp-section-title">Wallet Connection</h3>
        {isConnected ? (
          <div className="bp-wallet-info">
            <div className="bp-wallet-row">
              <span className="bp-label">Address</span>
              <code className="bp-value">{walletAddress}</code>
            </div>
            <div className="bp-wallet-row">
              <span className="bp-label">MX Balance</span>
              <span className="bp-mx-balance">{Number(mxBalance).toLocaleString()} MX</span>
            </div>
          </div>
        ) : (
          <button className="bp-connect-btn" onClick={connectWallet} disabled={isLoading}>
            {isLoading ? "Connecting…" : "🦊 Connect MetaMask"}
          </button>
        )}
        {error && <p className="bp-error">{error}</p>}
      </div>

      {/* Mint Rewards (Demo) */}
      {isConnected && (
        <div className="bp-section">
          <h3 className="bp-section-title">Test Reward Minting</h3>
          <div className="bp-rewards-grid">
            {(Object.entries(rewardConfig) as [keyof typeof rewardConfig, number][]).map(([key, tokens]) => (
              <button
                key={key}
                className="bp-reward-btn"
                onClick={() => handleMint(key)}
                disabled={isLoading}
              >
                <span className="bp-reward-label">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
                </span>
                <span className="bp-reward-tokens">+{tokens} MX</span>
              </button>
            ))}
          </div>
          {mintMsg && <p className="bp-mint-msg">{mintMsg}</p>}
          {lastTx && (
            <p className="bp-tx">
              Last Tx: <code>{lastTx.slice(0, 20)}…</code>
            </p>
          )}
        </div>
      )}

      <style>{`
        .blockchain-panel {
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 16px;
          padding: 24px;
          color: #e2e8f0;
          font-family: inherit;
          margin: 24px 0;
        }
        .bp-header { margin-bottom: 20px; }
        .bp-chain-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 12px;
          color: #a78bfa;
          margin-bottom: 8px;
        }
        .bp-dot {
          width: 8px; height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .bp-title { font-size: 20px; font-weight: 700; color: #c4b5fd; margin: 0; }
        .bp-section { margin-bottom: 20px; }
        .bp-section-title {
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }
        .bp-contracts { display: flex; flex-direction: column; gap: 8px; }
        .bp-contract-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          padding: 8px 12px;
        }
        .bp-contract-name { font-weight: 600; color: #a78bfa; font-size: 13px; }
        .bp-contract-addr { font-size: 11px; color: #64748b; word-break: break-all; }
        .bp-wallet-info { display: flex; flex-direction: column; gap: 8px; }
        .bp-wallet-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.04);
          border-radius: 8px;
          padding: 10px 14px;
        }
        .bp-label { font-size: 12px; color: #64748b; }
        .bp-value { font-size: 12px; color: #94a3b8; }
        .bp-mx-balance { font-size: 18px; font-weight: 700; color: #f59e0b; }
        .bp-connect-btn {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          color: white;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .bp-connect-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .bp-connect-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .bp-error { color: #f87171; font-size: 13px; margin-top: 8px; }
        .bp-rewards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .bp-reward-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 10px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
          color: inherit;
        }
        .bp-reward-btn:hover:not(:disabled) {
          background: rgba(139, 92, 246, 0.25);
          transform: translateY(-2px);
        }
        .bp-reward-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .bp-reward-label { font-size: 11px; color: #94a3b8; margin-bottom: 4px; }
        .bp-reward-tokens { font-size: 16px; font-weight: 700; color: #f59e0b; }
        .bp-mint-msg { font-size: 13px; margin-top: 10px; padding: 8px 12px; background: rgba(34,197,94,0.1); border-radius: 6px; }
        .bp-tx { font-size: 11px; color: #64748b; margin-top: 6px; }
      `}</style>
    </div>
  );
}
