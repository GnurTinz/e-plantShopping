
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/CartSlice";
import { plants } from "../data/plants";

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const categories = [...new Set(
    plants.map((plant) => plant.category)
  )];

  return (
    <section className="products-section">
      <div className="section-heading">
        <p className="eyebrow">OUR COLLECTION</p>
        <h1>Find Your Perfect Plant</h1>
        <p>Bring a little more green into your everyday life.</p>
      </div>

      {categories.map((category) => (
        <div className="category-section" key={category}>
          <h2>{category}</h2>

          <div className="product-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => {
                const inCart = items.some(
                  (item) => item.id === plant.id
                );

                return (
                  <article className="product-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name} />

                    <div className="product-info">
                      <h3>{plant.name}</h3>
                      <p className="price">
                        ${Number(plant.price).toFixed(2)}
                      </p>

                      <button
                        className="primary-button add-button"
                        disabled={inCart}
                        onClick={() => dispatch(addToCart(plant))}
                      >
                        {inCart ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
      ))}
    </section>
  );
}
