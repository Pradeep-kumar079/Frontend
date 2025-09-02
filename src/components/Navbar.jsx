import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBars,
  faTimes,
  faHome,
  faBox,
  faInfoCircle,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    // Example: read from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.name || "User");
      } catch {
        setUsername("User");
      }
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="navbar">
      <h1>My Store</h1>

      <div className="menubar" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>

      <ul className={`nav-links ${isOpen ? "show" : ""}`}>
        <div className="nameblock">
          <h3>Hello, {username}</h3>
        </div>

        <li>
          <NavLink to="/home" onClick={closeMenu}>
            <FontAwesomeIcon icon={faHome} /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" onClick={closeMenu}>
            <FontAwesomeIcon icon={faBox} /> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={closeMenu}>
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </NavLink>
        </li>
        <li>
          <NavLink to="/account" onClick={closeMenu}>
            <FontAwesomeIcon icon={faUser} /> Account
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" onClick={closeMenu}>
            <FontAwesomeIcon icon={faCartShopping} /> Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" onClick={closeMenu}>
            <FontAwesomeIcon icon={faRightToBracket} /> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
