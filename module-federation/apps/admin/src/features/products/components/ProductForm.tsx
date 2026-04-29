// third-party
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// packages
import { Input, Select, Textarea, Button } from '@repo/ui';

// feature
import { submitCreateProduct } from '../actions/products.actions';
import { useProductsStore } from '../store/products.store';
import { productSchema } from './product.schema';

// defs
import type { ProductFormData } from '@admin/defs';

const ProductForm = () => {
  const navigate = useNavigate();
  const isLoading = useProductsStore((s) => s.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema) as never,
    defaultValues: {
      status: 'draft',
      category: 'electronics',
      stock: 0,
      description: '',
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    await submitCreateProduct(data);
    navigate('/admin/products');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-semibold text-primary">
            Product Details
          </h3>
          <p className="mt-1 text-sm text-muted">
            Basic information about your product catalog.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-4">
          <Input
            label="Name"
            placeholder="Product name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="SKU"
            placeholder="e.g. WH-001"
            error={errors.sku?.message}
            {...register('sku')}
          />
          <div className="sm:col-span-2">
            <Textarea
              label="Description"
              placeholder="Product description (optional)"
              error={errors.description?.message}
              className="min-h-[100px] w-full"
              {...register('description')}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-4">
        <div>
          <h3 className="text-base font-semibold text-primary">Inventory</h3>
          <p className="mt-1 text-sm text-muted">
            Pricing, stock levels, and classification.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-4">
          <Input
            label="Price"
            type="number"
            step="0.01"
            placeholder="0.00"
            error={errors.price?.message}
            {...register('price')}
          />
          <Input
            label="Stock Quantity"
            type="number"
            placeholder="0"
            error={errors.stock?.message}
            {...register('stock')}
          />
          <Select
            label="Category"
            error={errors.category?.message}
            {...register('category')}
          >
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
            <option value="books">Books</option>
            <option value="other">Other</option>
          </Select>
          <Select
            label="Status"
            error={errors.status?.message}
            {...register('status')}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-surface-border pt-8 mt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/admin/products')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} size="md">
          {isLoading ? 'Creating…' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
