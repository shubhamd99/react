// packages
import { Badge } from '@repo/ui';

// defs
import type { ProductStatus } from '@admin/defs';

interface Props {
  status: ProductStatus;
}

export const ProductStatusBadge = ({ status }: Props) => {
  return (
    <Badge variant={status === 'published' ? 'success' : 'default'}>
      {status === 'published' ? 'Published' : 'Draft'}
    </Badge>
  );
}
