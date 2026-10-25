
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/CartSlice";
import plants from "../data/plants";
import "./ProductList.css";

function ProductList({ setPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Xác định những cây đã có trong giỏ.
  const addedToCart = new Set(
    cartItems.map((item) => item.id)
  );

  // Tính tổng số lượng sản phẩm trong giỏ.
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Gom cây theo danh mục.
  const categories = Object.entries(
    plants.reduce((groups, plant) => {
      if (!groups[plant.category]) {
        groups[plant.category] = [];
      }

      groups[plant.category].push(plant);
      return groups;
    }, {})
  );

  return (
    <div className="plants-page">
      {/* Navbar */}
      <nav className="plants-navbar">
        <button
          type="button"
          className="plants-brand"
          onClick={() => setPage("home")}
        >
          Paradise Nursery
        </button>

        <div className="plants-nav-links">
          <button
            type="button"
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            type="button"
            className="active"
            onClick={() => setPage("plants")}
          >
            Plants
          </button>

          <button
            type="button"
            className="plants-cart-link"
            onClick={() => setPage("cart")}
          >
            🛒 Cart
            <span className="plants-cart-count">
              {totalItems}
            </span>
          </button>
        </div>
      </nav>

      {/* Page heading */}
      <header className="plants-header">
        <p className="plants-eyebrow">GROW YOUR GREEN SPACE</p>
        <h1>Our Houseplants</h1>
        <p>
          Discover beautiful plants to bring more life
          and freshness into your home.
        </p>
      </header>

      {/* Product categories */}
      <main className="plants-container">
        {categories.map(([categoryName, categoryPlants]) => (
          <section
            className="category-section"
            key={categoryName}
          >
            <div className="category-heading">
              <h2>{categoryName}</h2>
              <span>{categoryPlants.length} plants</span>
            </div>

            <div className="product-list">
              {categoryPlants.map((plant) => {
                const isAdded = addedToCart.has(plant.id);

                return (
                  <article
                    className="plant-card"
                    key={plant.id}
                  >
                    <div className="plant-image-wrapper">
                      <img
                        className="plant-image"
                        src={plant.image}
                        alt={plant.name}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src =
                            "https://placehold.co/600x400/e8eee4/233528?text=Plant";
                        }}
                      />
                    </div>

                    <div className="plant-info">
                      <h3>{plant.name}</h3>

                      <p className="plant-price">
                        ${Number(plant.price).toFixed(2)}
                      </p>

                      <button
                        type="button"
                        className="add-button"
                        disabled={isAdded}
                        onClick={() => dispatch(addItem(plant))}
                      >
                        {isAdded
                          ? "Added to Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
