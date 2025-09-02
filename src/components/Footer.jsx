import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <h3>E-commerce</h3>
          <p>Your one-stop shop for everything!</p>
          <p>+91 9353198519</p> <p>pradeepk9348@gmail.com</p>
          <ul className="socials">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>

        <div className="links">
      <div className="links1">
            <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>

       <div className="links2">
         <ul>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/returns">Returns</a></li>
          <li><a href="/shipping">Shipping Info</a></li>
          <li><a href="/careers">Careers</a></li>
        </ul>

       </div>

        <div className="links2">
         <ul>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/returns">Returns</a></li>
          <li><a href="/shipping">Shipping Info</a></li>
          <li><a href="/careers">Careers</a></li>
        </ul>

       </div>
      </div>
      </footer>

      
      <p>&copy; 2023 E-commerce. All rights reserved.</p>
    </div>
  )
}

export default Footer
