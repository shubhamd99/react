// packages
import { Card } from '@repo/ui';

// feature
import { useProductsStore } from '../store/products.store';
import ProductForm from '../components/ProductForm';

export const ProductCreate = () => {
  const error = useProductsStore((s) => s.error);

  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Admin
        </p>
        <h1 className="mt-1 text-2xl font-bold text-primary">New Product</h1>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <Card>
        <Card.Body className="py-8">
          <ProductForm />
        </Card.Body>
      </Card>
    </div>
  );
};
