import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/CartSlice";
import plants from "../data/plants";

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const addedToCart = {};

  cartItems.forEach((item) => {
    addedToCart[item.name] = true;
  });

  const plantsArray = Object.entries(
    plants.reduce((groups, plant) => {
      if (!groups[plant.category]) {
        groups[plant.category] = [];
      }

      groups[plant.category].push(plant);
      return groups;
    }, {})
  ).map(([category, plantsInCategory]) => ({
    category,
    plants: plantsInCategory,
  }));

  return (
    <section className="page-container">
      <h1 className="page-title">Our Houseplants</h1>
      <p className="page-title">
        Discover plants to bring more life into your space.
      </p>

      {plantsArray.map((category) => (
        <section
          className="category-section"
          key={category.category}
        >
          <h2 className="category-title">
            {category.category}
          </h2>

          <div className="product-list">
            {category.plants.map((plant) => (
              <article className="plant-card" key={plant.id}>
                <img
                  className="plant-image"
                  src={plant.image}
                  alt={plant.name}
                  loading="lazy"
                />

                <div className="plant-info">
                  <h3>{plant.name}</h3>

                  <p className="plant-price">
                    ${plant.price.toFixed(2)}
                  </p>

                  <button
                    type="button"
                    className="add-button"
                    disabled={Boolean(addedToCart[plant.name])}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {addedToCart[plant.name]
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

export default ProductList;