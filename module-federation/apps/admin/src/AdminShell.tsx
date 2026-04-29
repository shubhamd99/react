// third-party
import { Navigate, Route, Routes } from 'react-router-dom';

// feature
import { ProductList } from './features/products/screens/ProductList';
import { ProductCreate } from './features/products/screens/ProductCreate';

// components
import { AppLayout } from './components/AppLayout';

const AdminShell = () => {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<ProductCreate />} />
      </Routes>
    </AppLayout>
  );
};

export default AdminShell;
