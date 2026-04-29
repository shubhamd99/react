// packages
import { MOCK_PRODUCTS } from '@repo/mocks';

// constants
import { PAGE_SIZE } from '@admin/constants';

// defs
import type { PaginatedResult, Product, ProductFormData } from '@admin/defs';

let mockProducts: Product[] = MOCK_PRODUCTS as Product[];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchProducts(
  page: number
): Promise<PaginatedResult<Product>> {
  await delay(300);
  const start = (page - 1) * PAGE_SIZE;
  return {
    items: mockProducts.slice(start, start + PAGE_SIZE),
    total: mockProducts.length,
    page,
    pageSize: PAGE_SIZE,
  };
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  await delay(400);
  const product: Product = {
    ...data,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  mockProducts = [product, ...mockProducts];
  return product;
}

export async function deleteProduct(id: string): Promise<void> {
  await delay(300);
  mockProducts = mockProducts.filter((p) => p.id !== id);
}
