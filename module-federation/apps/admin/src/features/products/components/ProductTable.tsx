// packages
import { Button, Table } from '@repo/ui';
import { formatCurrency } from '@repo/utils';

// defs
import type { Product } from '@admin/defs';

// components
import { ProductStatusBadge } from './ProductStatusBadge';

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const ProductTable = ({ products, onDelete, isLoading }: Props) => {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Th>Name</Table.Th>
          <Table.Th>SKU</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Category</Table.Th>
          <Table.Th>Stock</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {products.map((product) => (
          <Table.Row key={product.id}>
            <Table.Td className="font-medium">{product.name}</Table.Td>
            <Table.Td className="font-mono text-xs text-muted">
              {product.sku}
            </Table.Td>
            <Table.Td>{formatCurrency(product.price)}</Table.Td>
            <Table.Td className="capitalize">{product.category}</Table.Td>
            <Table.Td>
              {product.stock === 0 ? (
                <span className="text-danger">Out of stock</span>
              ) : (
                product.stock
              )}
            </Table.Td>
            <Table.Td>
              <ProductStatusBadge status={product.status} />
            </Table.Td>
            <Table.Td>
              <Button
                variant="ghost"
                size="sm"
                disabled={isLoading}
                onClick={() => onDelete(product.id)}
              >
                Delete
              </Button>
            </Table.Td>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default ProductTable
