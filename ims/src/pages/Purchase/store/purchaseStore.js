import { create } from 'zustand'

export const usePurchaseStore = create((set) => ({
  purchases: [],
  setPurchases: (purchases) => set({ purchases }),

  isEdit: false,
  setIsEdit: (isEdit) => set({ isEdit }),

  purchaseToEdit: null,
  setPurchaseToEdit: (purchase) => set({ purchaseToEdit: purchase }),
}))