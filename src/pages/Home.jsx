import Products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/filterSlice";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import categories from "../data/categories.json";
import WomenBanner from "../assets/womenImage.png";
import MenBanner from "../assets/menImage.png";
import OfferImage from "../assets/offer.png"
const Home = () => {
  const { gender } = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trendingProducts = Products.filter(p => p.gender === gender).slice(0, 5);
 
  const showOfferProducts = () => {
    navigate("/products",{state:{offerOnly:true}}); // pass query param
  };

  return (
    <>
  
      <section className="hero">
        <img
          src={gender === "women" ? WomenBanner : MenBanner}
          alt={gender}
          className={`hero-banner ${gender === "men" ? "men-banner" : ""}`}
        />
        <div className="hero-overlay">
          <h1>{gender === "women" ? "Women's Collection" : "Men's Collection"}</h1>
          <p>Premium accessories curated for you</p>
          <button
            className="hero-btn"
            style={{backgroundColor:gender==="women"? "#f6c1d1" : "#1f2937"}}
            onClick={() =>
              document.querySelector(".categories").scrollIntoView({ behavior: "smooth" })
            }
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories[gender].map((cat) => {
            const catImage = Products.find(
              p => p.gender === gender && p.category.toLowerCase() === cat.toLowerCase()
            )?.image;
            return (
              <div
                key={cat}
                className="category-card"
                onClick={() => {
                  dispatch(setCategory(cat));
                  navigate("/products");
                }}
              >
                {catImage && <img src={catImage} alt={cat} />}
                <div className="category-overlay"><h3>{cat}</h3></div>
              </div>
            );
          })}
        </div>
      </section>

      
      <section className="offer" style={{backgroundImage:`url(${OfferImage})`}}>
        <h2>Flat 30% OFF</h2>
        <p>Limited time offer on selected accessories</p>
        <button
         className="offer-btn"
         onClick={showOfferProducts}
         style={{backgroundColor:gender==="women"? "#f6c1d1" : "#1f2937"}}
        >Shop Now</button>
      </section>

     
      <section className="featured" >
        <h2 className="section-title">Trending Products</h2>
        <div className="product-grid">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
