import './App.css';

type Product = {
  id: number;
  name: string;
  team: string;
  price: number;
};

type ProductListProps = {
  onAddToCart?: (productName: string) => void;
};

const products: Product[] = [
  { id: 1, name: 'Starter Dashboard', team: 'Products Team', price: 49 },
  { id: 2, name: 'Analytics Pack', team: 'Growth Team', price: 79 },
  { id: 3, name: 'Billing Add-on', team: 'Platform Team', price: 29 },
];

export default function ProductList({ onAddToCart }: ProductListProps) {
  return (
    <section className="remote-card">
      <p className="eyebrow">Remote app: products</p>
      <h2>Product catalog</h2>
      <p className="muted">
        This component is exposed from the products app and rendered inside the
        host at runtime.
      </p>

      <div className="product-list">
        {products.map((product) => (
          <article className="product-row" key={product.id}>
            <div>
              <strong>{product.name}</strong>
              <span>
                {product.team} | ${product.price}
              </span>
            </div>
            <button type="button" onClick={() => onAddToCart?.(product.name)}>
              Add
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
