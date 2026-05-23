
import React from "react";
import "../styles/authModal.css";

const AuthModal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div
        className="auth-modal-content"
        onClick={(e) => e.stopPropagation()} 
      >
        <button className="auth-modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default AuthModal;
