import { useContext } from "react";
import NavbarContext from "../context/NavbarContext";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartPopup from "./cartPopup";
import "../styles/productCard.css";

const ProductCard = ({ product, offerOnly }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.email;
  const wishlistItems = useSelector(state => state.wishlist.items[userId] ?? []);
  const isWishlisted = wishlistItems.some(i => i.id === product.id);
  const { openLoginModal } = useContext(NavbarContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!userId) return openLoginModal();
    dispatch(addToCart({ userId, product }));
       setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!userId) return openLoginModal();
    dispatch(toggleWishlist({ userId, product }));
  };
  const [showPopup, setShowPopup] = useState(false);

  // Calculate offer price if exists
  const offerPrice = product.offer ? Math.round(product.price * (1 - product.offer / 100)) : null;

  return (
    <>
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-img-wrapper">
          <img src={product.image} alt={product.name} />
          <button className={`wishlist-btn ${isWishlisted ? "active" : ""}`} onClick={handleWishlist}>❤</button>
        </div>
        <div className="product-info">
          <h4>{product.name}</h4>
          
          {offerPrice ? (
            <p>
              <span style={{ textDecoration: "line-through", marginRight: "8px" }}>₹{product.price}</span>
              <span style={{ color: "red" }}>₹{offerPrice}</span>
            </p>
          ) : (
            <p>₹{product.price}</p>
          )}
        </div>
      </Link>

      <button className="add-cart" onClick={handleAddToCart}>Add to Cart</button>
    </div>

    <CartPopup show={showPopup} message="Added to cart 🛒" />
    </>
  );
};

export default ProductCard;
