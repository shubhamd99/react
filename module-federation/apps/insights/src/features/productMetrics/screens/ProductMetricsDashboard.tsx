// feature
import TopProductsCards from '../components/TopProductsCards';
import TopProductsList from '../components/TopProductsList';

const ProductMetricsDashboard = () => (
  <div className="p-6">
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        Insights
      </p>
      <h1 className="mt-1 text-2xl font-bold text-primary">Product Metrics</h1>
    </div>

    <TopProductsCards />

    <div style={{ marginTop: '3rem' }}>
      <TopProductsList />
    </div>
  </div>
);

export { ProductMetricsDashboard };
