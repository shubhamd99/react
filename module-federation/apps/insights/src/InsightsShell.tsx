// third-party
import { Navigate, Route, Routes } from 'react-router-dom'

// feature
import { ProductMetricsDashboard } from './features/productMetrics/screens/ProductMetricsDashboard'

// components
import { AppLayout } from './components/AppLayout'

const InsightsShell = () => (
  <AppLayout>
    <Routes>
      <Route index element={<Navigate to="products" replace />} />
      <Route path="products" element={<ProductMetricsDashboard />} />
    </Routes>
  </AppLayout>
)

export default InsightsShell
