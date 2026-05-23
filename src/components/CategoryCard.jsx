import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import "../styles/categoryCard.css"

const CategoryCard = ({ category }) => {
  const navigate = useNavigate()
  const gender = useSelector(state => state.filter.gender)

  return (
    <div
      className="category-card"
      onClick={() =>
        navigate(`/${gender}/category/${category.name}`)
      }
    >
      <img src={category.image} alt={category.name} />
      <div className="category-overlay">
        <h3>{category.name}</h3>
      </div>
    </div>
  )
}

export default CategoryCard
