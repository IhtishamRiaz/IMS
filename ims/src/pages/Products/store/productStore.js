import { create } from 'zustand'

export const useAccountStore = create((set) => ({
  products: [],
  setProducts: (product) => set({ product }),

  isEdit: false,
  setIsEdit: (isEdit) => set({ isEdit }),

  productToEdit: null,
  setProductToEdit: (product) => set({ productToEdit: product }),
}))