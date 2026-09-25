"use client";

/**
 * useBlockchain — React hook for BlockLearnX smart contract interactions
 * Manages wallet connection state and exposes contract methods.
 */

import { useState, useEffect, useCallback } from "react";
import blockchainService, { type CourseOnChain } from "@/lib/blockchain/blockchainService";

export interface BlockchainState {
  isConnected: boolean;
  walletAddress: string | null;
  mxBalance: string;
  isLoading: boolean;
  error: string | null;
  chainId: number | null;
}

export function useBlockchain() {
  const [state, setState] = useState<BlockchainState>({
    isConnected: false,
    walletAddress: null,
    mxBalance: "0",
    isLoading: false,
    error: null,
    chainId: null,
  });

  const setError = (error: string | null) => setState(s => ({ ...s, error }));
  const setLoading = (isLoading: boolean) => setState(s => ({ ...s, isLoading }));

  // ── Connect Wallet ──────────────────────────────────────────────────────

  const connectWallet = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const address = await blockchainService.connectWallet();
      let mxBalance = "1000";
      try {
        mxBalance = await blockchainService.getMXBalance(address);
      } catch {
        mxBalance = "1000";
      }
      setState(s => ({
        ...s,
        isConnected: true,
        walletAddress: address,
        mxBalance,
        isLoading: false,
        chainId: blockchainService.CHAIN_ID,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
      setLoading(false);
      throw err;
    }
  }, []);

  const connectDemoWallet = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const address = await blockchainService.connectDemoWallet();
      const mxBalance = await blockchainService.getMXBalance(address);
      setState(s => ({
        ...s,
        isConnected: true,
        walletAddress: address,
        mxBalance,
        isLoading: false,
        chainId: blockchainService.CHAIN_ID,
      }));
    } catch (err) {
      setError("Failed to connect demo wallet");
      setLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("blocklearnx_connected_wallet");
    }
    setState({
      isConnected: false,
      walletAddress: null,
      mxBalance: "0",
      isLoading: false,
      error: null,
      chainId: null,
    });
  }, []);

  // ── Auto-check wallet on mount & listen to MetaMask events ──────────────────

  useEffect(() => {
    blockchainService.getWalletAddress().then(address => {
      if (address) {
        blockchainService.getMXBalance(address).then(mxBalance => {
          setState(s => ({
            ...s,
            isConnected: true,
            walletAddress: address,
            mxBalance,
            chainId: blockchainService.CHAIN_ID,
          }));
        });
      }
    });

    if (typeof window !== "undefined" && (window as any).ethereum) {
      const eth = (window as any).ethereum;
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          localStorage.removeItem("blocklearnx_connected_wallet");
          setState(s => ({ ...s, isConnected: false, walletAddress: null, mxBalance: "0" }));
        } else {
          const newAddress = accounts[0];
          localStorage.setItem("blocklearnx_connected_wallet", newAddress);
          blockchainService.getMXBalance(newAddress).then(mxBalance => {
            setState(s => ({ ...s, isConnected: true, walletAddress: newAddress, mxBalance }));
          });
        }
      };

      const handleChainChanged = () => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      };

      eth.on?.("accountsChanged", handleAccountsChanged);
      eth.on?.("chainChanged", handleChainChanged);

      return () => {
        eth.removeListener?.("accountsChanged", handleAccountsChanged);
        eth.removeListener?.("chainChanged", handleChainChanged);
      };
    }
  }, []);

  // ── MX Token Methods ────────────────────────────────────────────────────

  const refreshBalance = useCallback(async () => {
    if (!state.walletAddress) return;
    const mxBalance = await blockchainService.getMXBalance(state.walletAddress);
    setState(s => ({ ...s, mxBalance }));
  }, [state.walletAddress]);

  const mintReward = useCallback(
    async (milestone: "lessonCompletion" | "quizPass" | "assignmentPass" | "courseCompletion") => {
      if (!state.walletAddress) throw new Error("Wallet not connected");
      setLoading(true);
      try {
        const txHash = await blockchainService.mintReward(state.walletAddress, milestone);
        await refreshBalance();
        return txHash;
      } finally {
        setLoading(false);
      }
    },
    [state.walletAddress, refreshBalance]
  );

  // ── Course Registry Methods ─────────────────────────────────────────────

  const registerCourse = useCallback(
    async (courseId: string, title: string, priceEth = "0.01", rewardPoolMX = 500) => {
      setLoading(true);
      try {
        return await blockchainService.registerCourse(courseId, title, priceEth, rewardPoolMX);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const submitForApproval = useCallback(async (courseId: string) => {
    setLoading(true);
    try {
      return await blockchainService.submitForApproval(courseId);
    } finally {
      setLoading(false);
    }
  }, []);

  const approveCourse = useCallback(async (courseId: string) => {
    setLoading(true);
    try {
      return await blockchainService.approveCourse(courseId);
    } finally {
      setLoading(false);
    }
  }, []);

  const enrollInCourse = useCallback(async (courseId: string, priceEth = "0.01") => {
    setLoading(true);
    try {
      return await blockchainService.enrollInCourse(courseId, priceEth);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCourse = useCallback(async (courseId: string): Promise<CourseOnChain | null> => {
    return blockchainService.getCourse(courseId);
  }, []);

  // ── Certificate Methods ─────────────────────────────────────────────────

  const mintCertificate = useCallback(
    async (courseTitle: string, score: number, learnerName?: string) => {
      if (!state.walletAddress) throw new Error("Wallet not connected");
      setLoading(true);
      try {
        return await blockchainService.mintCertificate(
          state.walletAddress,
          courseTitle,
          learnerName ?? state.walletAddress.slice(0, 8),
          score
        );
      } finally {
        setLoading(false);
      }
    },
    [state.walletAddress]
  );

  const getLearnerCertificates = useCallback(async () => {
    if (!state.walletAddress) return [];
    return blockchainService.getLearnerCertificates(state.walletAddress);
  }, [state.walletAddress]);

  return {
    ...state,
    connectWallet,
    connectDemoWallet,
    disconnectWallet,
    refreshBalance,
    mintReward,
    registerCourse,
    submitForApproval,
    approveCourse,
    enrollInCourse,
    getCourse,
    mintCertificate,
    getLearnerCertificates,
    rewardConfig: blockchainService.REWARD_CONFIG,
    contractAddresses: blockchainService.CONTRACT_ADDRESSES,
  };
}
