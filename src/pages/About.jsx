import "../styles/about.css"
import offerImage from "../assets/offer.png"

const About = () => {
  return (
    <div className="about-page">
      
     
      <section className="about-hero" style={{backgroundImage:`url(${offerImage})`}}>
        <h1>About ZYRA</h1>
        <p>Premium accessories crafted for your everyday style</p>
      </section>

     
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          ZYRA was born with a simple idea — to bring premium, stylish,
          and affordable accessories to everyone.  
          From elegant jewelry to modern watches and everyday essentials,
          we curate pieces that elevate your look effortlessly.
        </p>
      </section>

     
      <section className="about-section light">
        <h2>Our Mission</h2>
        <p>
          Our mission is to make fashion accessories accessible without
          compromising on quality. Every product at ZYRA is carefully
          selected to match modern trends and timeless elegance.
        </p>
      </section>

     
      <section className="about-section">
        <h2>Why Choose ZYRA?</h2>

        <div className="about-grid">
          <div className="about-card">
            <h3>✨ Premium Quality</h3>
            <p>High-quality materials you can trust.</p>
          </div>

          <div className="about-card">
            <h3>🚚 Fast Shipping</h3>
            <p>Quick and reliable delivery across India.</p>
          </div>

          <div className="about-card">
            <h3>🔒 Secure Payments</h3>
            <p>Safe and trusted payment methods.</p>
          </div>

          <div className="about-card">
            <h3>💬 Customer First</h3>
            <p>Support that truly cares about you.</p>
          </div>
        </div>
      </section>

    
      <section className="about-footer">
        <p>
          Thank you for choosing <strong>ZYRA</strong>.  
          We’re excited to be part of your style journey 💙
        </p>
      </section>

    </div>
  )
}

export default About
