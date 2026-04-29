// api
import {
  fetchProducts,
  createProduct,
  deleteProduct,
} from '../api/products.api'

// store
import { useProductsStore } from '../store/products.store'

// defs
import type { ProductFormData } from '@admin/defs'

const store = () => useProductsStore.getState()

export async function loadProducts(page = store().page) {
  store().setLoading(true)
  store().setError(null)
  try {
    const data = await fetchProducts(page)
    store().setResult(data)
    store().setPage(page)
  } catch {
    store().setError('Failed to load products')
  } finally {
    store().setLoading(false)
  }
}

export async function submitCreateProduct(data: ProductFormData) {
  store().setLoading(true)
  store().setError(null)
  try {
    await createProduct(data)
    const fresh = await fetchProducts(1)
    store().setResult(fresh)
    store().setPage(1)
  } catch {
    store().setError('Failed to create product')
  } finally {
    store().setLoading(false)
  }
}

export async function removeProduct(id: string) {
  store().setLoading(true)
  store().setError(null)
  try {
    await deleteProduct(id)
    const fresh = await fetchProducts(store().page)
    store().setResult(fresh)
  } catch {
    store().setError('Failed to delete product')
  } finally {
    store().setLoading(false)
  }
}

export async function goToPage(page: number) {
  store().setLoading(true)
  store().setError(null)
  try {
    const data = await fetchProducts(page)
    store().setResult(data)
    store().setPage(page)
  } catch {
    store().setError('Failed to load products')
  } finally {
    store().setLoading(false)
  }
}
