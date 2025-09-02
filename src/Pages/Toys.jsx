import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Toys.css';

const Toys = () => {
  const BASE_API_URL = process.env.REACT_APP_API_URL; // API base URL
  const [toys, setToys] = useState([]);

  useEffect(() => {
    const fetchToys = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/home/all-products`);
        const toyItems = res.data.filter(p => p.category?.toLowerCase() === "toys");
        setToys(toyItems);
        console.log("Toys fetched:", toyItems);
      } catch (err) {
        console.error("Error fetching toys:", err);
      }
    };

    fetchToys();
  }, [BASE_API_URL]);

  return (
    <div className="toys-container">
      <div className="toys-list">
        {toys.length > 0 ? (
          toys.map(item => (
            <ProductCard
              key={item._id}
              product={item}
              BASE_IMAGE_URL={BASE_API_URL}
            />
          ))
        ) : (
          <p>No toys available.</p>
        )}
      </div>
    </div>
  );
};

export default Toys;
