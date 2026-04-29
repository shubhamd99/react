// packages
import { MOCK_CART_ADDS, MOCK_CLICK_THROUGH, MOCK_TOP_PRODUCTS } from '@repo/mocks'

// feature
import type { ProductCartAdds, CartClickThrough, TopProduct } from '@insights/defs'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function fetchCartAdds(): Promise<ProductCartAdds[]> {
  await delay(300)
  return MOCK_CART_ADDS as ProductCartAdds[]
}

export async function fetchClickThrough(): Promise<CartClickThrough> {
  await delay(200)
  return MOCK_CLICK_THROUGH
}

export async function fetchTopProducts(): Promise<TopProduct[]> {
  await delay(350)
  return MOCK_TOP_PRODUCTS as TopProduct[]
}
