import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState({});
  const [loading, setLoading] = useState(true);

  // Search states
  const [searchCategory, setSearchCategory] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchName, setSearchName] = useState("");

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/admin/allproducts`
      );

      // Group by category
      const grouped = response.data.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
      }, {});

      setProducts(grouped);
      setFilteredProducts(grouped);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtering logic
  useEffect(() => {
    const filtered = Object.keys(products).reduce((acc, category) => {
      const matchedProducts = products[category].filter(
        (product) =>
          product.category
            .toLowerCase()
            .includes(searchCategory.toLowerCase()) &&
          product.type.toLowerCase().includes(searchType.toLowerCase()) &&
          product.name.toLowerCase().includes(searchName.toLowerCase())
      );

      if (matchedProducts.length > 0) acc[category] = matchedProducts;
      return acc;
    }, {});

    setFilteredProducts(filtered);
  }, [searchCategory, searchType, searchName, products]);

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {Object.keys(filteredProducts).length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        Object.keys(filteredProducts).map((category) => (
          <div key={category} className="category-section">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Description</th>
                  <th>Attributes</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts[category].map((product) => (
                  <tr key={product._id}>
                    <td>{product.category}</td>
                    <td>{product.type}</td>
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.description}</td>
                    <td>
                      {product.attributes &&
                        Object.entries(product.attributes).map(
                          ([key, value]) => (
                            <div key={key}>
                              <strong>{key}</strong>: {value}
                            </div>
                          )
                        )}
                    </td>
                    <td>
                      {product.images &&
                        product.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={
                              img.startsWith("http")
                                ? img
                                : `${REACT_APP_API_URL}${img}`
                            }
                            alt={product.name}
                            className="product-image"
                          />
                        ))}
                    </td>
                    <td>
                      <Link to={`/admin/modify-product/${product._id}`}>
                        <button className="edit-btn">Edit</button>
                      </Link>
                      <Link to={`/admin/delete-product/${product._id}`}>
                        <button className="delete-btn">Delete</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageProducts;
