import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "../features/cart/CartSlice";

function CartItem({ setPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    window.alert("Coming Soon!");
  };

  return (
    <section className="page-container cart-container">
      <h1 className="page-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Find a plant to bring some greenery into your home.</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => setPage("plants")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-info">
                <h3>{item.name}</h3>

                <p>Unit price: ${item.price.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>

                  <span>Quantity: {item.quantity}</span>

                  <button
                    type="button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>

              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </article>
          ))}

          <div className="cart-summary">
            <h2>
              Total: ${totalAmount.toFixed(2)}
            </h2>

            <p>
              Total items:{" "}
              {cartItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              )}
            </p>

            <div className="cart-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setPage("plants")}
              >
                Continue Shopping
              </button>

              <button
                type="button"
                className="checkout-button"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default CartItem;