// third-party
import { create } from 'zustand';

// defs
import type { ProductsState, ProductsActions } from '@admin/defs';

export const useProductsStore = create<ProductsState & ProductsActions>(
  (set) => ({
    result: null,
    isLoading: false,
    error: null,
    page: 1,

    setResult: (result) => set({ result }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setPage: (page) => set({ page }),
  })
);
