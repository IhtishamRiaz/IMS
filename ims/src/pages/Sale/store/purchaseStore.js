import { create } from 'zustand'

export const usePurchaseStore = create((set) => ({
   purchases: [],
   setPurchases: (purchases) => set({ purchases }),

   mode: '',
   setMode: (mode) => set({ mode }),

   selectedPurchase: null,
   setSelectedPurchase: (purchase) => set({ selectedPurchase: purchase }),
}))