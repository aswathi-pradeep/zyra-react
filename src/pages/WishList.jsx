import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { removeFromWishlist } from "../redux/wishlistSlice";
import "../styles/wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.email;

  const wishlistItems = useSelector(
    (state) => state.wishlist.items[userId] || []
  );

  if (!wishlistItems.length) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Your wishlist is empty ❤️</h2>;
    
  }

  return (
    <div className="wishlist-page">
      {wishlistItems.map((product) => (
        <div className="wishlist-card" key={product.id}>
          <img src={product.image} alt={product.name} />

          <div className="wishlist-info">
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>

          <div className="wishlist-actions">
            <button
              onClick={() => {
                dispatch(addToCart({ userId, product }));
                dispatch(removeFromWishlist({ userId, productId: product.id }));
              }}
            >
              Move to Cart
            </button>

            <button
              className="remove"
              onClick={() =>
                dispatch(removeFromWishlist({ userId, productId: product.id }))
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
