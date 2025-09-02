import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminEditProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    type: "",
    stock: 0,
    attributes: {}
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const REACT_URL = process.env.REACT_APP_API_URL;

  const productId = window.location.pathname.split("/").pop();

  // Fetch product details
  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`${REACT_URL}/api/admin/product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  // Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${REACT_URL}/api/admin/modify-product/${product._id}`, product);
      alert("Product updated successfully");
      navigate("/manage-products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          />
        </div>

        <div>
          <label>Type:</label>
          <input
            type="text"
            value={product.type}
            onChange={(e) => setProduct({ ...product, type: e.target.value })}
          />
        </div>

        <div>
          <label>Name:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>

        <div>
          <label>Attributes (JSON):</label>
          <textarea
            value={JSON.stringify(product.attributes, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setProduct({ ...product, attributes: parsed });
              } catch {
                // Don’t update if JSON is invalid
                console.warn("Invalid JSON in attributes field");
              }
            }}
          />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
