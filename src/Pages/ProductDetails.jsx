import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const BASE_URL = process.env.REACT_APP_API_URL;

  // Fetch product details + related products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/home/all-products/${id}`);
        const data = await res.json();
        setProduct(data);

        if (data.category) {
          const relatedRes = await fetch(
            `${BASE_URL}/api/home/products?category=${data.category}`
          );
          const related = await relatedRes.json();
          setRelatedProducts(related.filter((rp) => rp._id !== data._id));
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id, BASE_URL]);

  // Fetch logged-in user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${BASE_URL}/api/user/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, [BASE_URL]);

  // Handle payment
  const handleBuy = async () => {
    if (!user) return alert("Please log in to continue.");

    setLoadingPayment(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: product.price,
          customer: {
            customer_id: user._id,
            customer_name: user.username,
            customer_email: user.email,
            customer_phone: user.phone,
          },
          orderItems: [
            { product: product._id, quantity: 1, price: product.price },
          ],
        }),
      });

      if (!res.ok) throw new Error("Unauthorized / Failed to create order");

      const { paymentSessionId } = await res.json();

      // Load Cashfree SDK only once
      if (!document.getElementById("cashfree-sdk")) {
        const script = document.createElement("script");
        script.id = "cashfree-sdk";
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.onload = () => {
          const cashfree = window.Cashfree({ mode: "sandbox" });
          cashfree.checkout({ paymentSessionId, redirectTarget: "_self" });
        };
        document.body.appendChild(script);
      } else {
        const cashfree = window.Cashfree({ mode: "sandbox" });
        cashfree.checkout({ paymentSessionId, redirectTarget: "_self" });
      }
    } catch (err) {
      console.error("Error initiating payment:", err);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setLoadingPayment(false);
    }
  };

  if (!product) return <div>Loading...</div>;

  // Normalize images
  const images = Array.isArray(product.images)
    ? product.images
    : product.images
    ? product.images.split(",")
    : [];

  return (
    <>
      <Navbar />
      <div className="single-product">
        {/* --- IMAGE GALLERY --- */}
        <div className="product-left-container">
          <div className="gallery">
            {images.length > 0 && (
              <img
                src={`${BASE_URL}${images[currentIndex].trim()}`}
                alt={`${product.name}-${currentIndex}`}
                className="main-image"
              />
            )}

            <div className="thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`${BASE_URL}${img.trim()}`}
                  alt={`${product.name}-thumb-${index}`}
                  className={index === currentIndex ? "thumb active" : "thumb"}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* --- RELATED PRODUCTS --- */}
          <div className="related-products">
            <h4>Related Products:</h4>
            <div className="related-grid">
              {relatedProducts.length > 0 ? (
                relatedProducts.map((rp) => (
                  <Link
                    key={rp._id}
                    to={`/product/${rp._id}`}
                    className="related-card"
                  >
                    <img
                      src={`${BASE_URL}${
                        Array.isArray(rp.images)
                          ? rp.images[0]
                          : rp.images?.split(",")[0]
                      }`}
                      alt={rp.name}
                    />
                    <div className="related-info">
                      <h5>{rp.name}</h5>
                      <p>₹{rp.price}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No related products found.</p>
              )}
            </div>
          </div>
        </div>

        {/* --- PRODUCT INFO --- */}
        <div className="product-container">
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Type:</strong> {product.type}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <div className="descriptions">
              <p>
                <strong>Description:</strong> {product.description}
              </p>
            </div>
            {product.attributes && (
              <div className="specifications">
                <h4>Specifications:</h4>
                <ul>
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={handleBuy} disabled={loadingPayment}>
              {loadingPayment ? "Processing..." : "Buy"}
            </button>
          </div>

          {/* --- REVIEWS --- */}
          <div className="reviews">
            <h4>Customer Reviews:</h4>
            <ul>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.username}</strong>: {review.comment} (Rating:{" "}
                    {review.rating})
                  </li>
                ))
              ) : (
                <li>No reviews yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
