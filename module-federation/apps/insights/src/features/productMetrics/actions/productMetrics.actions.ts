import { fetchCartAdds, fetchClickThrough, fetchTopProducts } from '../api/productMetrics.api'
import { useProductMetricsStore } from '../store/productMetrics.store'

export async function loadCartAdds() {
  const data = await fetchCartAdds()
  useProductMetricsStore.getState().setCartAdds(data)
}

export async function loadClickThrough() {
  const data = await fetchClickThrough()
  useProductMetricsStore.getState().setClickThrough(data)
}

export async function loadTopProducts() {
  const data = await fetchTopProducts()
  useProductMetricsStore.getState().setTopProducts(data)
}
