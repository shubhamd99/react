import './App.css';
import ProductList from './ProductList';

const App = () => {
  return <ProductList onAddToCart={(name) => alert(`${name} added locally`)} />;
};

export default App;
