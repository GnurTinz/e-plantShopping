
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "../features/cart/CartSlice";

function CartItem({ setPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Hỗ trợ cả dữ liệu có cost và dữ liệu hiện tại dùng price.
  const getPrice = (item) =>
    Number(item.cost ?? item.price ?? 0);

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + getPrice(item) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
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
    if (item.quantity <= 1) {
      dispatch(removeItem(item.id));
      return;
    }

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

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setPage("plants");
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
          <button
            type="button"
            className="get-started-button"
            onClick={handleContinueShopping}
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

                <p className="cart-item-cost">
                  Unit price: ${getPrice(item).toFixed(2)}
                </p>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-total">
                  Subtotal: $
                  {(getPrice(item) * item.quantity).toFixed(2)}
                </p>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}

          <div className="cart-summary">
            <h2>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>
            <p>Total items: {totalItems}</p>

            <div className="cart-actions">
              <button
                type="button"
                className="get-started-button"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>

              <button
                type="button"
                className="get-started-button1"
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
