// react
import { useEffect } from 'react';

// packages
import { formatCurrency } from '@repo/utils';

// feature
import { loadTopProducts } from '../actions/productMetrics.actions';
import { useProductMetricsStore } from '../store/productMetrics.store';
import MetricCard from './MetricCard';

const TopProductsCards = () => {
  const topProducts = useProductMetricsStore((s) => s.topProducts);

  useEffect(() => {
    loadTopProducts();
  }, []);

  const totalRevenue = topProducts.reduce((sum, p) => sum + p.revenue, 0);
  const totalViews = topProducts.reduce((sum, p) => sum + p.views, 0);
  const topProduct = topProducts[0];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
      }}
    >
      <MetricCard
        label="Total Revenue"
        value={formatCurrency(totalRevenue)}
        change="+15%"
        trending="up"
        headline="Trending up this month"
        description="Across all top products"
      />
      <MetricCard
        label="Total Views"
        value={totalViews.toLocaleString()}
        change="+10%"
        trending="up"
        headline="Strong engagement"
        description="Views across top products"
      />
      <MetricCard
        label="Top Product"
        value={formatCurrency(topProduct?.revenue ?? 0)}
        change="+20%"
        trending="up"
        headline={topProduct?.productName ?? '—'}
        description={`${(
          topProduct?.views ?? 0
        ).toLocaleString()} views this period`}
      />
    </div>
  );
};

export default TopProductsCards;
