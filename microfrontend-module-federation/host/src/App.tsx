import './App.css';
import { Component, lazy, type ReactNode, Suspense, useState } from 'react';

const ProductList = lazy(() => import('products/ProductList'));
const CartSummary = lazy(() => import('cart/CartSummary'));

type RemoteBoundaryProps = {
  children: ReactNode;
};

type RemoteBoundaryState = {
  hasError: boolean;
};

class RemoteBoundary extends Component<
  RemoteBoundaryProps,
  RemoteBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="remote-fallback">
          <strong>Remote failed to load.</strong>
          <span>Start the remote app and refresh the host.</span>
        </section>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const [cartItems, setCartItems] = useState<
    Array<{ id: number; name: string }>
  >([]);

  function addToCart(productName: string) {
    setCartItems((currentItems) => [
      ...currentItems,
      { id: Date.now(), name: productName },
    ]);
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Host app</p>
        <h1>Minimal micro frontend with Module Federation</h1>
        <p>
          The shell owns page layout and state. Product and cart features are
          loaded from separate React apps at runtime.
        </p>
      </header>

      <section className="diagram" aria-label="Module federation flow">
        <span>Host :3000</span>
        <span>loads</span>
        <span>Products remote :3001</span>
        <span>and</span>
        <span>Cart remote :3002</span>
      </section>

      <div className="remote-grid">
        <RemoteBoundary>
          <Suspense
            fallback={
              <div className="remote-fallback">Loading products...</div>
            }
          >
            <ProductList onAddToCart={addToCart} />
          </Suspense>
        </RemoteBoundary>

        <RemoteBoundary>
          <Suspense
            fallback={<div className="remote-fallback">Loading cart...</div>}
          >
            <CartSummary items={cartItems} />
          </Suspense>
        </RemoteBoundary>
      </div>
    </main>
  );
};

export default App;
