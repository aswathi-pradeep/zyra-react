import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loadWishlist } from "../redux/wishlistSlice";
import { setGender,setCategory } from "../redux/filterSlice";
import categories from "../data/categories.json";
import "../styles/navbar.css";
import AuthModal from "./AuthModel";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Navbar = ({ showLogin, setShowLogin, showSignup, setShowSignup }) => {
  const [showAccount, setShowAccount] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
   const [searchTerm, setSearchTerm] = useState(""); 
  
 

const handleSearch = e => {
  e.preventDefault();

  const term = searchTerm.trim();
  if (!term) return;

  navigate(`/products?search=${encodeURIComponent(term)}`);
};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountRef = useRef();
  const menuRef = useRef();

  const { gender, category } = useSelector(state => state.filter);
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.email;
  const userName = user?.name || user?.email || "Account";

  useEffect(() => {
    if (userId) {
      dispatch(loadWishlist(userId));
    }
  }, [dispatch, userId]);

  const cartCount = useSelector(state =>
    state.cart.items[userId]?.reduce((t, i) => t + i.quantity, 0) || 0
  );
  const wishlistCount = useSelector(
    state => state.wishlist.items[userId]?.length || 0
  );

  const isLoggedIn = !!userId;

  useEffect(() => {
    const closeDropdowns = e => {
      if (accountRef.current && !accountRef.current.contains(e.target))
        setShowAccount(false);
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", closeDropdowns);
    return () => document.removeEventListener("mousedown", closeDropdowns);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className={`navbar-wrapper ${gender === "women" ? "women-theme" : "men-theme"}`}>
      <div className="navbar">
        <h2 className="logo">ZYRA</h2>

        <form className="search-box" onSubmit={handleSearch} >
          <input 
          type="text"
          placeholder="Search accessories..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)}/>
            
        </form>

        <div className="nav-right">
          {/* ACCOUNT */}
          <div className="nav-icon account" ref={accountRef}>
            <button onClick={() => setShowAccount(!showAccount)}>
              <FaUser />
              <span>{userName}</span>
            </button>

            {showAccount && (
              <div className="dropdown">
                {!isLoggedIn ? (
                  <>
                    <button onClick={() => setShowLogin(true)}>Login</button>
                    <button onClick={() => setShowSignup(true)}>Signup</button>
                  </>
                ) : (
                  <button onClick={handleLogout}>Logout</button>
                )}
              </div>
            )}
          </div>

          {/* WISHLIST */}
          <Link to="/wishlist" className="nav-icon desktop-only">
            <FaHeart />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>

          {/* CART */}
          <Link to="/cart" className="nav-icon desktop-only">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* MENU */}
          <div className="nav-icon menu" ref={menuRef}>
            <button onClick={() => setShowMenu(!showMenu)}>
              <FaBars />
            </button>

            {showMenu && (
              <div className="dropdown menu-dropdown">
                <div className="mobile-only">
                  <Link to="/wishlist">Wishlist ({wishlistCount})</Link>
                  <Link to="/cart">Cart</Link>
                </div>
                <Link to="/about">About Us</Link>
                
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CATEGORY LIST */}
      <div className="navbar-lists">
        <ul>
          {categories[gender].map(cat => (
            <li key={cat}>
              <button
                className={category === cat ? "active" : ""}
                onClick={() => {
                  dispatch(setCategory(cat));
                  navigate("/products");
                }}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* GENDER SWITCH */}
      <div className="theme">
        <span
          className={gender === "women" ? "active" : ""}
          onClick={() => {
            dispatch(setGender("women"));
            navigate("/")
          }}
        >
          WOMEN
        </span>
        <span> | </span>
        <span className={gender === "men" ? "active" : ""}
         onClick={() => {
          dispatch(setGender("men"));
          navigate("/")
         }}>
          MEN
        </span>
      </div>

      {/* AUTH MODALS */}
      <AuthModal show={showLogin} onClose={() => setShowLogin(false)}>
        <Login onSuccess={() => setShowLogin(false)} switchToSignup={() => { setShowLogin(false); setShowSignup(true); }} />
      </AuthModal>

      <AuthModal show={showSignup} onClose={() => setShowSignup(false)}>
        <Signup onSuccess={() => setShowSignup(false)} switchToLogin={() => { setShowSignup(false); setShowLogin(true); }} />
      </AuthModal>
    </nav>
  );
};

export default Navbar;
