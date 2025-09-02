import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./Cloth.css";
import { Link } from "react-router-dom";

const Cloths = () => {
  const [cloths, setCloths] = useState([]);
  const [loading, setLoading] = useState(true);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCloths = async () => {
      try {
        const res = await axios.get(`${REACT_APP_API_URL}/api/home/all-products`);
        const clothItems = res.data.filter(p => p.category === "clothing");
        setCloths(clothItems);
      } catch (err) {
        console.error("Error fetching cloths:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCloths();
  }, [REACT_APP_API_URL]);

  return (
    <div className="cloths-container">
      <h2>Clothes</h2>
      <p>Explore our collection of fashionable clothes.</p>

      {loading ? (
        <p>Loading clothes...</p>
      ) : cloths.length === 0 ? (
        <p>No clothing products available.</p>
      ) : (
        <div className="cloths-list">
          {cloths.map(cloth => (
            <Link to={`/all-product/${cloth._id}`} key={cloth._id}>
              <ProductCard
                product={cloth}
                BASE_IMAGE_URL={REACT_APP_API_URL}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cloths;
