import { create } from 'zustand'

export const useAccountStore = create((set) => ({
  accounts: [],
  setAccounts: (accounts) => set({ accounts: accounts }),

  isEdit: false,
  setIsEdit: (isEdit) => set({ isEdit }),

  accountToEdit: null,
  setAccountToEdit: (account) => set({ accountToEdit: account }),
}))