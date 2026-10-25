
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />

      <main>
        {page === "home" && (
          <section className="landing-page background-image">
            <div className="landing-content">
              <p className="eyebrow">WELCOME TO YOUR GREEN SPACE</p>
              <h1>Welcome to Paradise Nursery</h1>
              <p>
                Bring nature home with beautiful plants for
                a greener and more peaceful living space.
              </p>

              <button
                type="button"
                className="get-started-button"
                onClick={() => setPage("plants")}
              >
                Get Started
              </button>
            </div>
          </section>
        )}

        {page === "plants" && <ProductList setPage={setPage} />}

        {page === "cart" && (
          <CartItem setPage={setPage} />
        )}
      </main>

      <footer className="footer">
        <p>
          © 2026 Paradise Nursery. Grow your happiness.
        </p>
      </footer>
    </div>
  );
}

export default App;
