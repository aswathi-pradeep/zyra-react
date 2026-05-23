import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const showOffer = searchParams.get("offer") === "true"; // optional: pass ?offer=true

  // Redux filters
  const { gender, category } = useSelector(state => state.filter);

  // Filter products
  let filteredProducts = products.filter(p => p.gender === gender);

  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (showOffer) {
    filteredProducts = filteredProducts.filter(p => p.offer); // only products with offer
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm)
    );
  }
  

  return (
    <section className="products-section" style={{ padding: "20px 40px" }}>
      {filteredProducts.length === 0 ? (
        <p style={{ padding: 40, textAlign: "center" }}>No products found</p>
      ) : (
        <div
          className="product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
