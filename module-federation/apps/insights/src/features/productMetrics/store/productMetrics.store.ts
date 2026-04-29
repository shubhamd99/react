// third-party
import { create } from 'zustand'

// feature
import type { ProductMetricsState, ProductMetricsActions } from '@insights/defs'

export const useProductMetricsStore = create<ProductMetricsState & ProductMetricsActions>((set) => ({
  cartAdds:     [],
  clickThrough: null,
  topProducts:  [],

  setCartAdds:     (cartAdds)     => set({ cartAdds }),
  setClickThrough: (clickThrough) => set({ clickThrough }),
  setTopProducts:  (topProducts)  => set({ topProducts }),
}))
