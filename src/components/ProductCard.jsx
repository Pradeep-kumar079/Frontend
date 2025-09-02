import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, BASE_IMAGE_URL = process.env.REACT_APP_API_URL }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = (e) => {
    e.preventDefault(); // ✅ prevent navigation when clicking like
    setLiked(!liked);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault(); // ✅ prevent navigation when clicking add to cart
    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // ensure user logged in
      if (!token) {
        alert("⚠️ Please login first to add products to cart.");
        return;
      }

      const res = await fetch(`${BASE_IMAGE_URL}/api/cart/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          attributes: {}, // add size/color later if needed
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product added to cart!");
        console.log("Updated Cart:", data.cart);
      } else {
        alert(`❌ ${data.message || "Failed to add product"}`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("⚠️ Error adding product to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-container">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-card">
          <img
            src={`${BASE_IMAGE_URL}${product.images?.[0] || "/placeholder.png"}`}
            alt={product.name}
            className="product-img"
          />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <p>{product.description}</p>

          <div className="product-buttons">
            <button
              onClick={handleLike}
              style={{ color: liked ? "red" : "gray", fontSize: "24px" }}
            >
              <FaHeart />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={loading}
              style={{ fontSize: "12px", width: "80px" }}
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
