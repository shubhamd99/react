// react
import { useEffect } from 'react';

// routing
import { Link } from 'react-router-dom';

// hooks
import { useShallow } from 'zustand/react/shallow';
import { useProductsStore } from '../store/products.store';

// actions
import {
  loadProducts,
  removeProduct,
  goToPage,
} from '../actions/products.actions';

// components / ui
import { Button, Card } from '@repo/ui';
import ProductTable from '../components/ProductTable';

// types
import type { ProductsState, ProductsActions } from '@admin/defs';

export const ProductList = () => {
  const { result, isLoading, error, page } = useProductsStore(
    useShallow((s: ProductsState & ProductsActions) => ({
      result: s.result,
      isLoading: s.isLoading,
      error: s.error,
      page: s.page,
    }))
  );

  useEffect(() => {
    loadProducts();
  }, []);

  const totalPages = result ? Math.ceil(result.total / result.pageSize) : 1;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Admin
          </p>
          <h1 className="mt-1 text-2xl font-bold text-primary">Products</h1>
        </div>
        <Link to="create">
          <Button size="md">+ New Product</Button>
        </Link>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <Card>
        <Card.Body className="p-0">
          {isLoading && !result ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-surface-border border-t-accent" />
            </div>
          ) : (
            <ProductTable
              products={result?.items ?? []}
              onDelete={removeProduct}
              isLoading={isLoading}
            />
          )}
        </Card.Body>
        {result && totalPages > 1 && (
          <Card.Footer>
            <span className="text-xs text-muted">
              Page {page} of {totalPages} — {result.total} products
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
              >
                Prev
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </Card.Footer>
        )}
      </Card>
    </div>
  );
};
