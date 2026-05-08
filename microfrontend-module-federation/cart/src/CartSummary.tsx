import './App.css';

type CartItem = {
  id: number;
  name: string;
};

type CartSummaryProps = {
  items?: CartItem[];
};

export default function CartSummary({ items = [] }: CartSummaryProps) {
  const hasItems = items.length > 0;

  return (
    <section className="remote-card">
      <p className="eyebrow">Remote app: cart</p>
      <h2>Cart summary</h2>
      <p className="muted">
        The cart remote receives state from the host through normal React props.
      </p>

      {hasItems ? (
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">No products added yet.</p>
      )}
    </section>
  );
}
