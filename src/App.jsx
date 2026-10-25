import { useState } from "react";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />

      <main>
        {page === "home" && <AboutUs setPage={setPage} />}
        {page === "plants" && <ProductList />}
        {page === "cart" && <CartItem setPage={setPage} />}
      </main>

      <footer className="footer">
        <p>© 2026 Paradise Nursery. Grow your happiness.</p>
      </footer>
    </div>
  );
}

export default App;