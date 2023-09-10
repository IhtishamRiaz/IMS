import { create } from 'zustand'

export const useAccountStore = create((set) => ({
  selectedRow: null,
  setSelectedRow: (row) => set({ selectedRow: row }),

  accounts: [],
  setAccounts: (accounts) => set({ accounts }),
}))