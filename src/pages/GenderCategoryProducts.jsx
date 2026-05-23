import { useNavigate } from "react-router-dom";
import Products from "../data/products.json";
import "../styles/categoryCard.css";

const CategoryCardHome = ({ categoryName, gender }) => {
  const navigate = useNavigate();
  const sampleProducts = Products.filter(p => p.gender === gender && p.category === categoryName).slice(0, 4);

  return (
    <div className="home-category-card">
      <h3>{categoryName}</h3>
      <div className="sample-products">
        {sampleProducts.map(p => <img key={p.id} src={p.image} alt={p.name} />)}
      </div>
      <button onClick={() => navigate(`/category/${gender}/${categoryName}`)}>View All</button>
    </div>
  );
};

export default CategoryCardHome;
