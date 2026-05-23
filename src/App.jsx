
import { useState } from "react"
import Navbar from "./components/Navbar"
import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import ProductDetails from "./pages/ProductDetails"
import GenderCategoryProducts from "./pages/GenderCategoryProducts"
import Footer from "./components/Footer"
import Products from "./pages/Products"
import ProtectedRoute from "./components/ProtectedRoute"
import Wishlist from "./pages/WishList"
import NavbarContext from "./context/NavbarContext"
import About from "./pages/About"
import Checkout from "./pages/Checkout"
function App() {
 
  const [showLogin, setShowLogin] = useState(false);
   const [showSignup, setShowSignup] = useState(false);
  return (
    <>
    
      <NavbarContext.Provider value={{ openLoginModal: () => setShowLogin(true) }}>
        <Navbar
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          showSignup={showSignup}
          setShowSignup={setShowSignup}
        />
      <Routes> 
        <Route path="/" element={<Home/>}></Route>
         <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute> <Wishlist /> </ProtectedRoute>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails/>}></Route>
        <Route path="/:gender/category/:categoryName" element={<GenderCategoryProducts/>}></Route>
        <Route path="/checkout"element={<Checkout/>}/>
        
      </Routes>
      </NavbarContext.Provider>
    <Footer/>
    </>
  )
}

export default App
