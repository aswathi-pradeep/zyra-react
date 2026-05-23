import { useContext } from "react";
import NavbarContext from "../context/NavbarContext";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.email;

  const { openLoginModal } = useContext(NavbarContext);

  const product = products.find(p => p.id === Number(id));
  if (!product) return <p style={{ padding: 50, textAlign: "center" }}>Product not found</p>;

  const wishlistItems = useSelector(state => state.wishlist.items[userId] ?? []);
  const isWishlisted = wishlistItems.some(i => i.id === product.id);

  const handleAddToCart = () => {
    if (!userId) return openLoginModal();
    dispatch(addToCart({ userId, product }));
  };

  const handleToggleWishlist = () => {
    if (!userId) return openLoginModal();
    dispatch(toggleWishlist({ userId, product }));
  };
  const offerPrice = product.offer ? Math.round(product.price * (1 - product.offer / 100)) : null;

  return (
    <div className="product-details-page">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>
       {offerPrice ? (
            <p>
              <span style={{ textDecoration: "line-through", marginRight: "8px" }}>₹{product.price}</span>
              <span style={{ color: "red" }}>₹{offerPrice}</span>
            </p>
          ) : (
            <p>₹{product.price}</p>
          )}
        
        <h5>Rating { product.rating}</h5>
        <p className="category">Category: {product.category}</p>

        <div className="buttons">
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleToggleWishlist} className={isWishlisted ? "wishlisted" : ""}>
            {isWishlisted ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
