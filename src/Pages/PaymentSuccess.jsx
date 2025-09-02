import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderId = query.get("order_id");

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!orderId) return;
        setLoading(true);
        const res = await fetch(
          `${REACT_APP_API_URL}/api/order/verify-payment?order_id=${orderId}`
        );
        if (!res.ok) throw new Error("Failed to fetch order details");
        const data = await res.json();
        setOrderDetails(data);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Could not load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, REACT_APP_API_URL]);

  if (!orderId) {
    return <h2>No order details found in URL ❌</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Payment Success ✅</h1>

      {loading && <p>Loading payment details...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orderDetails && !loading && !error && (
        <>
          <p><strong>Order ID:</strong> {orderDetails.order_id}</p>
          <p><strong>Status:</strong> {orderDetails.order_status}</p>
          <p><strong>Amount:</strong> {orderDetails.order_amount} {orderDetails.order_currency}</p>
          <p><strong>Payment Method:</strong> {orderDetails.payment_method?.payment_mode || "N/A"}</p>
        </>
      )}

      <button
        onClick={() => (window.location.href = "/home")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Go to Home
      </button>
    </div>
  );
}
