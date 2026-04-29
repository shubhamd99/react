// ─── Common ──────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message?: string
}

// ─── Product Metrics ──────────────────────────────────────────────────────────

export interface ProductCartAdds {
  productId: string
  productName: string
  cartAdds: number
}

export interface CartClickThrough {
  clicks: number
  conversions: number
  rate: number
}

export interface TopProduct {
  rank: number
  productId: string
  productName: string
  views: number
  revenue: number
}

// ─── Store ───────────────────────────────────────────────────────────────────

export interface ProductMetricsState {
  cartAdds:     ProductCartAdds[]
  clickThrough: CartClickThrough | null
  topProducts:  TopProduct[]
}

export interface ProductMetricsActions {
  setCartAdds:     (data: ProductCartAdds[]) => void
  setClickThrough: (data: CartClickThrough) => void
  setTopProducts:  (data: TopProduct[]) => void
}
