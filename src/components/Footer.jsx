import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import "../styles/footer.css"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
  <>

   <section className="trust">
        <div>🚚 Free Shipping</div>
        <div>🔄 Easy Returns</div>
        <div>🔒 Secure Payments</div>
        <div>⭐ Premium Quality</div>
      </section>

      
    <footer className="footer">

      <div className="footer-container">

      
        <div className="footer-section">
          <h2 className="footer-logo">ZYRA</h2>
          <p>
            Elevate your style with premium accessories.  
            Discover elegance in every detail.
          </p>
        </div>

      
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/products'>Shop</Link></li>
            <li><Link to='/about'>About us</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h4>Customer Care</h4>
          <ul>
            <li>FAQs</li>
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

     
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
            <FaPinterestP />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ZYRA. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
