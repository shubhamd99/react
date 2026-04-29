// packages
import { Card, Table } from '@repo/ui'
import { formatCurrency } from '@repo/utils'

// feature
import { useProductMetricsStore } from '../store/productMetrics.store'

const TopProductsList = () => {
  const products = useProductMetricsStore((s) => s.topProducts)

  return (
    <Card>
      <Card.Header>
        <Card.Title>Top Products</Card.Title>
        <span className="text-xs text-muted">by views</span>
      </Card.Header>
      <Card.Body className="p-0">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Th className="w-10">#</Table.Th>
              <Table.Th>Product</Table.Th>
              <Table.Th>Views</Table.Th>
              <Table.Th>Revenue</Table.Th>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {products.map((p) => (
              <Table.Row key={p.productId}>
                <Table.Td>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-surface-overlay text-xs font-semibold text-primary">
                    {p.rank}
                  </span>
                </Table.Td>
                <Table.Td className="font-medium">{p.productName}</Table.Td>
                <Table.Td>{p.views.toLocaleString()}</Table.Td>
                <Table.Td>{formatCurrency(p.revenue)}</Table.Td>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default TopProductsList
