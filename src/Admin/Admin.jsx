import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';
import { FaUsers, FaPlus, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const REACT_URL = process.env.REACT_APP_API_URL;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${REACT_URL}/api/admin/allproducts`);
      const grouped = response.data.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
      }, {});
      setProducts(grouped);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='admin-dashboard'>
      
      {/* Sidebar */}
      <div className="dashboard">
        <ul>
          <li><Link to="/manage-users"><FaUsers className="icon" /> Manage Users</Link></li>
          <li><Link to="/add-products"><FaPlus className="icon" /> Add Products</Link></li>
          <li><Link to="/manage-products"><FaBoxOpen className="icon" /> Manage Products</Link></li>
          <li><Link to="/view-orders"><FaShoppingCart className="icon" /> View Orders</Link></li>
          <li><Link to="/logout"><FaSignOutAlt className="icon" /> Log Out</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="head">
          <h1>Admin Dashboard</h1>
          <p>Manage your store settings, products, and users from this dashboard.</p>
        </div>

        <div className="profile">
          <img src="dress1.jpeg" alt="Profile" />
          <p>Name: Admin</p>
          <p>Email: admin@example.com</p>
          <p>Role: Admin</p>
          <div className="btns">
            <button>Update Profile</button>
            <button>Change Password</button>
          </div>
        </div>

        <div className="sub-contents">
          <div className="analytics">
            <h2>Analytics Overview</h2>
            {loading ? (
              <p>Loading analytics...</p>
            ) : (
              <>
                <p>View key metrics and insights about your store's performance.</p>
                <h3>Total categories: {Object.keys(products).length}</h3>
                <h3>Total products: {Object.values(products).flat().length}</h3>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
