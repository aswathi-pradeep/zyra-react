// context/NavbarContext.jsx
import { createContext, useState } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLoginModal = () => setShowLogin(true);
  const openSignupModal = () => setShowSignup(true);

  return (
    <NavbarContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showSignup,
        setShowSignup,
        openLoginModal,
        openSignupModal
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext; // ✅ semicolon added
