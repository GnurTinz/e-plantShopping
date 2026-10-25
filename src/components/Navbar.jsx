import { useSelector } from "react-redux";
import { Leaf, ShoppingCart } from "lucide-react";

function Navbar({ page, setPage }) {
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="navbar">
      <button
        type="button"
        className="brand"
        onClick={() => setPage("home")}
        aria-label="Go to Home"
      >
        <Leaf size={24} />
        <span>Paradise Nursery</span>
      </button>

      <nav className="nav-links" aria-label="Main navigation">
        <button
          type="button"
          className="nav-link"
          aria-current={page === "home" ? "page" : undefined}
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          type="button"
          className="nav-link"
          aria-current={page === "plants" ? "page" : undefined}
          onClick={() => setPage("plants")}
        >
          Plants
        </button>

        <button
          type="button"
          className="nav-link"
          aria-current={page === "cart" ? "page" : undefined}
          onClick={() => setPage("cart")}
        >
          <ShoppingCart size={20} />
          <span>Cart</span>
          <span className="cart-count">{totalQuantity}</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;