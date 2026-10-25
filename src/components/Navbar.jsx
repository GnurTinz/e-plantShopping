
import { useSelector } from "react-redux";
import { ShoppingCart, Leaf } from "lucide-react";

export default function Navbar({ page, setPage }) {
  const items = useSelector((state) => state.cart.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="navbar">
      <button
        className="brand"
        onClick={() => setPage("home")}
      >
        <Leaf size={25} />
        <span>Paradise Nursery</span>
      </button>

      <nav className="nav-links">
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          className={page === "plants" ? "active" : ""}
          onClick={() => setPage("plants")}
        >
          Plants
        </button>

        <button
          className={`cart-link ${page === "cart" ? "active" : ""}`}
          onClick={() => setPage("cart")}
        >
          <ShoppingCart size={20} />
          Cart
          <span className="cart-count">{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}
