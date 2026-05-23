import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import "../styles/checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  const cartItems = useSelector(state => state.cart.items[userEmail] || []);

  // ===============================
  // FORM STATE
  // ===============================
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  // ===============================
  // TOTAL CALCULATION (WITH OFFER)
  // ===============================
  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const offer = Number(item.offer) || 0;
    const discounted = price - (price * offer) / 100;
    return sum + discounted * (item.quantity || 1);
  }, 0);

  // ===============================
  // INPUT CHANGE
  // ===============================
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ===============================
  // VALIDATION
  // ===============================
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===============================
  // PLACE ORDER
  // ===============================
  const handleOrder = () => {
    if (!validateForm()) return;

    dispatch(clearCart(userEmail));
    alert("Order placed successfully 🎉");
    navigate("/");
  };

  // ===============================
  // EMPTY CART
  // ===============================
  if (!cartItems.length) {
    return <p style={{ textAlign: "center", padding: 40 }}>Your cart is empty</p>;
  }

  // ===============================
  // UI
  // ===============================
  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-wrapper">
        {/* FORM */}
        <div className="checkout-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
          />
          {errors.state && <p className="error">{errors.state}</p>}

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
          />
          {errors.pincode && <p className="error">{errors.pincode}</p>}
        </div>

        {/* SUMMARY */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {cartItems.length}</p>
          <h2>Total: ₹{total.toFixed(2)}</h2>

          <button className="place-order" onClick={handleOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
