
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/CartSlice";
import plantsArray from "../data/plants";
import "./ProductList.css";

function ProductList({ setPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Lưu tên các cây đã có trong giỏ hàng.
  const addedToCart = {};

  cartItems.forEach((item) => {
    addedToCart[item.name] = true;
  });

  // Tổng số lượng cây trong giỏ hàng.
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Navigation handlers.
  const handleNavigationHome = () => {
    setPage("home");
  };

  const handleNavigationPlants = () => {
    setPage("plants");
  };

  const handleNavigationCart = () => {
    setPage("cart");
  };

  return (
    <div className="plants-page">
      {/* Navbar */}
      <nav className="navbar">
        <button
          type="button"
          className="plants-brand"
          onClick={handleNavigationHome}
        >
          Paradise Nursery
        </button>

        <div className="plants-nav-links">
          <button
            type="button"
            onClick={handleNavigationHome}
          >
            Home
          </button>

          <button
            type="button"
            className="active"
            onClick={handleNavigationPlants}
          >
            Plants
          </button>

          <button
            type="button"
            className="plants-cart-link"
            onClick={handleNavigationCart}
          >
            🛒 Cart
            <span
              id="cart_quantity_count"
              className="cart_quantity_count"
            >
              {totalItems}
            </span>
          </button>
        </div>
      </nav>

      {/* Page heading */}
      <header className="plants-header">
        <p className="plants-eyebrow">
          GROW YOUR GREEN SPACE
        </p>

        <h1>Our Houseplants</h1>

        <p>
          Discover beautiful plants to bring more life
          and freshness into your home.
        </p>
      </header>

      {/* Product categories */}
      <main className="plants-container">
        {plantsArray.map((categoryData) => (
          <section
            className="category-section"
            key={categoryData.category}
          >
            <div className="category-heading">
              <h2>{categoryData.category}</h2>

              <span>
                {categoryData.plants.length} plants
              </span>
            </div>

            <div className="product-list">
              {categoryData.plants.map((plant) => {
                const isAdded = Boolean(
                  addedToCart[plant.name]
                );

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
                        disabled={Boolean(
                          addedToCart[plant.name]
                        )}
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
