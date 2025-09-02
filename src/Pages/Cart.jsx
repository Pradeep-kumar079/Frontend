import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; 
import './Cart.css';
import Navbar from '../components/Navbar';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // ✅ store user details
  const [loadingPayment, setLoadingPayment] = useState(false);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  // Fetch cart
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${REACT_APP_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.cart);
      setLoading(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setLoading(false);
    }
  };

  // Fetch logged in user ✅
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${REACT_APP_API_URL}/api/user/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error("User fetch failed", err.response?.data || err.message);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, action) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${REACT_APP_API_URL}/api/cart/update`,
        { productId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Remove item
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${REACT_APP_API_URL}/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchUser(); // ✅ also fetch user
  }, []);

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-cont">
      <Navbar />
      <div className="cart_container">
        {/* Cart Items */}
        <div className="cart_items">
          <h2>Your Cart</h2>
          {cart && cart.items.length > 0 ? (
            cart.items.map((item, index) => (
              <div key={index} className="cart_item">
                <div className="cart_image">
                  {item.productId?.images && item.productId.images.length > 0 ? (
                    <img
                      src={`${REACT_APP_API_URL}/${item.productId.images[0]}`}
                      alt={item.productId.name}
                    />
                  ) : (
                    <div className="no_image">No Image</div>
                  )}
                </div>

                <div className="cart_info">
                  <h4>{item.productId?.name || 'Unknown Product'}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ₹{(item.productId?.price || 0) * item.quantity}</p>

                  <div className="quantity_controls">
                    <button
                      onClick={() => updateQuantity(item.productId._id, 'decrease')}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId._id, 'increase')}
                    >
                      +
                    </button>

                    <button
                      className="remove_btn"
                      onClick={() => removeFromCart(item.productId._id)}
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Checkout */}
        <div className="checkout">
          <h3>Checkout</h3>
          <p>Total Items: {cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0}</p>
          <p>
            Total Price: ₹
            {cart?.items.reduce(
              (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
              0
            ) || 0}
          </p>

          {/* ✅ Cashfree Checkout */}
          <button
            className="checkout_btn"
            onClick={async () => {
              if (!user) return alert("Please log in to continue.");

              try {
                setLoadingPayment(true);
                const token = localStorage.getItem("token");
                const totalAmount = cart.items.reduce(
                  (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
                  0
                );

                const res = await axios.post(
                  `${REACT_APP_API_URL}/api/order/create`,
                  {
                    amount: totalAmount,
                    orderItems: cart.items.map(item => ({
                      product: item.productId._id,
                      quantity: item.quantity,
                      price: item.productId.price
                    })),
                    customer: {
                      customer_id: user._id,
                      customer_name: user.username,
                      customer_email: user.email,
                      customer_phone: user.phone,
                    },
                  },
                  { headers: { Authorization: `Bearer ${token}` } }
                );

                const { paymentSessionId } = res.data;

                // ✅ use Cashfree SDK instead of redirect
                const script = document.createElement("script");
                script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
                script.onload = () => {
                  const cashfree = window.Cashfree({ mode: "sandbox" });
                  cashfree.checkout({ paymentSessionId, redirectTarget: "_self" });
                };
                document.body.appendChild(script);

              } catch (err) {
                console.error(err.response?.data || err.message);
              } finally {
                setLoadingPayment(false);
              }
            }}
            disabled={loadingPayment}
          >
            {loadingPayment ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>

        <div className="extra-details">
          <p>This is nothing bro</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
