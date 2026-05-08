declare module 'products/ProductList' {
  const ProductList: React.ComponentType<{
    onAddToCart?: (productName: string) => void;
  }>;

  export default ProductList;
}

declare module 'cart/CartSummary' {
  const CartSummary: React.ComponentType<{
    items?: Array<{ id: number; name: string }>;
  }>;

  export default CartSummary;
}
