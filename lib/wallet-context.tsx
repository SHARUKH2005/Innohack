"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

type WalletContextValue = {
  address: string | null;
  chainId: string | null;
  connecting: boolean;
  error: string | null;
  connectWallet: () => Promise<string | null>;
  disconnectWallet: () => void;
  clearWalletError: () => void;
};

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncWallet = async (provider: EthereumProvider, nextAddress?: string) => {
    const accounts = nextAddress
      ? [nextAddress]
      : (await provider.request({ method: "eth_accounts" }) as string[]);
    const currentAddress = accounts[0] || null;
    const currentChainId = await provider.request({ method: "eth_chainId" }) as string;
    setAddress(currentAddress);
    setChainId(currentChainId || null);
    if (currentAddress) localStorage.setItem("blocklearnx_wallet_address", currentAddress);
    else localStorage.removeItem("blocklearnx_wallet_address");
  };

  useEffect(() => {
    const provider = window.ethereum;
    if (!provider) return;

    void syncWallet(provider).catch(() => undefined);
    const handleAccountsChanged = (...args: unknown[]) => {
      void syncWallet(provider, (args[0] as string[] | undefined)?.[0]).catch(() => undefined);
    };
    const handleChainChanged = (chain: unknown) => setChainId(String(chain));
    provider.on?.("accountsChanged", handleAccountsChanged);
    provider.on?.("chainChanged", handleChainChanged);
    return () => {
      provider.removeListener?.("accountsChanged", handleAccountsChanged);
      provider.removeListener?.("chainChanged", handleChainChanged);
    };
  }, []);

  const connectWallet = async () => {
    const provider = window.ethereum;
    setError(null);
    if (!provider) {
      setError("No compatible wallet found. Install MetaMask or another Ethereum wallet extension.");
      return null;
    }
    setConnecting(true);
    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" }) as string[];
      await syncWallet(provider, accounts[0]);
      return accounts[0] || null;
    } catch (cause) {
      const code = typeof cause === "object" && cause !== null && "code" in cause
        ? (cause as { code?: number }).code
        : undefined;
      setError(code === 4001 ? "Wallet connection was rejected." : "Unable to connect to the wallet.");
      return null;
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setChainId(null);
    localStorage.removeItem("blocklearnx_wallet_address");
  };

  const value = useMemo(
    () => ({ address, chainId, connecting, error, connectWallet, disconnectWallet, clearWalletError: () => setError(null) }),
    [address, chainId, connecting, error],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
}
