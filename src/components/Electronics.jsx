import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./Electronic.css";
import { Link } from "react-router-dom";

const Electronics = () => {
  const [electronics, setElectronics] = useState([]);
  const [loading, setLoading] = useState(true);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const res = await axios.get(`${REACT_APP_API_URL}/api/home/all-products`);
        const electronicItems = res.data.filter(p => p.category === "electronics");
        setElectronics(electronicItems);
      } catch (err) {
        console.error("Error fetching electronics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchElectronics();
  }, [REACT_APP_API_URL]);

  return (
    <div className="electronics-container">
      <h2>Electronics</h2>
      <p>Explore our collection of latest electronics.</p>

      {loading ? (
        <p>Loading electronics...</p>
      ) : electronics.length === 0 ? (
        <p>No electronics available.</p>
      ) : (
        <div className="electronics-list">
          {electronics.map(item => (
            <Link to={`/all-product/${item._id}`} key={item._id}>
              <ProductCard
                product={item}
                BASE_IMAGE_URL={REACT_APP_API_URL}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Electronics;
