import "../styles/cartPopup.css"

const CartPopup = ({ show, message }) => {
  return (
    <div className={`cart-popup ${show ? "show" : ""}`}>
      {message}
    </div>
  )
}

export default CartPopup
