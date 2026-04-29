// ─── Common ──────────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

// ─── Product ─────────────────────────────────────────────────────────────────

export type ProductStatus = 'draft' | 'published'

export type ProductCategory = 'electronics' | 'clothing' | 'food' | 'books' | 'other'

export interface Product {
  id: string
  name: string
  sku: string
  price: number
  category: ProductCategory
  stock: number
  description: string
  status: ProductStatus
  createdAt: string
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt'>

// ─── Store ───────────────────────────────────────────────────────────────────

export interface ProductsState {
  result: PaginatedResult<Product> | null
  isLoading: boolean
  error: string | null
  page: number
}

export interface ProductsActions {
  setResult: (result: PaginatedResult<Product>) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setPage: (page: number) => void
}
