import { create } from 'zustand'

export const useSaleStore = create((set) => ({
   sales: [],
   setSales: (sales) => set({ sales }),

   mode: '',
   setMode: (mode) => set({ mode }),

   selectedSale: null,
   setSelectedSale: (sale) => set({ selectedSale: sale }),
}))