import './App.css';
import CartSummary from './CartSummary';

const App = () => {
  return <CartSummary items={[{ id: 1, name: 'Standalone cart item' }]} />;
};

export default App;
