import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../redux/cartSlice";
import "../styles/cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;
  const cartItems = useSelector(state => state.cart.items[userEmail] || []);

  // Safely calculate total using offer if available
  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0; // fallback to 0 if price is missing
    const offer = Number(item.offer) || 0; // fallback to 0 if offer is missing
    const discountedPrice = price - (price * offer) / 100;
    return sum + discountedPrice * (item.quantity || 1);
  }, 0);

  if (!cartItems.length) {
    return (
      <div style={{ minHeight: "50vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <p style={{ fontSize: 30 }}>CART</p>
        <p>Your cart is currently empty.</p>
        <Link to="/">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {cartItems.map(item => {
        const price = Number(item.price) || 0;
        const offer = Number(item.offer) || 0;
        const discountedPrice = price - (price * offer) / 100;

        return (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <h4>{item.name}</h4>

              {offer > 0 ? (
                <p>
                  <span className="original-price">₹{price.toFixed(2)}</span>{" "}
                  <span className="offer-price">₹{discountedPrice.toFixed(2)}</span>
                </p>
              ) : (
                <p>₹{price.toFixed(2)}</p>
              )}

              <div className="qty-controls">
                <button onClick={() => dispatch(decreaseQty({ productId: item.id, userId: userEmail }))}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQty({ productId: item.id, userId: userEmail }))}>+</button>
              </div>

              <button className="remove" onClick={() => dispatch(removeFromCart({ productId: item.id, userId: userEmail }))}>Remove</button>
            </div>
          </div>
        );
      })}

      <h3>Total: ₹{total.toFixed(2)}</h3>
      <Link to="/checkout">
  <button className="checkout-btn">Proceed to Checkout</button>
</Link>
    </div>
  );
};

export default Cart;
