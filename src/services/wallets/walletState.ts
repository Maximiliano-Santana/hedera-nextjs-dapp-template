"use client";

import { create } from "zustand";

type WalletState = {
  isConnected: boolean;
  accountId: string | null;
  connect: (accountId: string) => void;
  disconnect: () => void;
};

export const useWalletState = create<WalletState>((set) => ({
  isConnected: false,
  accountId: null,

  connect: (accountId: string) => set({ isConnected: true, accountId }),
  disconnect: () => set({ isConnected: false, accountId: null }),
}));