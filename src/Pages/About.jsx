import React from "react";
import "./About.css";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="cont">
      <Navbar />

      <div className="about-container">
        <div className="about-card">
          <h1 className="about-heading">About Us</h1>

          <div className="imgs">
            <img src="/app5.jpeg" alt="App Preview" />
            <h2>CEO : Mohan Kumar</h2>
          </div>

          <p className="about-text">
            Welcome to our <span className="highlight">E-Commerce Platform</span>.  
            We are dedicated to providing the best online shopping experience.
          </p>

          <p className="about-text">
            Our mission is to offer a wide range of products at competitive prices,  
            with a strong focus on <span className="highlight">customer satisfaction</span>.
          </p>

          <p className="about-text">Thank you for choosing us!</p>
        </div>

        <footer className="about-footer">
          <p>&copy; {new Date().getFullYear()} E-Commerce Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
