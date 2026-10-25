
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/CartSlice";

export default function CartItem({ setPage }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section className="cart-section empty-cart">
        <h1>Your Shopping Cart</h1>
        <p>Your cart is waiting for some greenery!</p>
        <button
          className="primary-button"
          onClick={() => setPage("plants")}
        >
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <h1>Your Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-product-info">
                <h3>{item.name}</h3>
                <p>${Number(item.price).toFixed(2)} each</p>

                <div className="quantity-controls">
                  <button
                    aria-label={`Decrease ${item.name}`}
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    aria-label={`Increase ${item.name}`}
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-button"
                  onClick={() =>
                    dispatch(removeFromCart(item.id))
                  }
                >
                  Remove
                </button>
              </div>

              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <p>Items: {totalItems}</p>

          <div className="summary-total">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button
            className="primary-button full-button"
            onClick={() => window.alert("Coming Soon!")}
          >
            Checkout
          </button>

          <button
            className="secondary-button full-button"
            onClick={() => setPage("plants")}
          >
            Continue Shopping
          </button>
        </aside>
      </div>
    </section>
  );
}
