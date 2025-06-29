import React, { useState } from "react";
import { useCart } from "./CartContext";

const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Hardcoded user info
  const userInfo = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+911234567890",
    address: "123 Main St, City, Country"
  };

  const handleRazorpayPayment = async () => {
    setError("");
    setLoading(true);
    try {
      // 1. Create order on backend
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.error || "Order creation failed");
      const { order } = orderData;

      // 2. Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Kritika Enterprises",
        description: "Cart Payment",
        handler: async function (response) {
          // 3. Verify payment on backend
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userInfo: { ...userInfo, cart: cartItems },
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setPaymentSuccess(true);
            setReference(verifyData.reference);
            clearCart();
          } else {
            setError(verifyData.error || "Payment verification failed");
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        theme: { color: "#3399cc" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div style={{ padding: "2rem", background: "#0f172a", minHeight: "100vh", color: "#fff", fontFamily: 'Inter, sans-serif' }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem", color: "#60a5fa" }}>Payment Successful!</h2>
        <p style={{ fontSize: "1.2rem", color: "#cbd5e1" }}>Thank you for your purchase.</p>
        <p style={{ fontSize: "1.1rem", color: "#60a5fa", marginTop: "1rem" }}>Reference Number: <b>{reference}</b></p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        background: "#0f172a",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem", color: "#60a5fa" }}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ color: "#cbd5e1", fontSize: "1.2rem" }}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ maxWidth: 600, margin: "0 auto" }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid #334155",
                  paddingBottom: "1.5rem",
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  padding: "1.5rem 1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <strong style={{ color: "#fff", fontSize: "1.1rem" }}>{item.id}</strong> <br />
                    <span style={{ color: "#60a5fa", fontWeight: 500 }}>Price: ₹{item.price}</span> <br />
                    <span style={{ color: "#cbd5e1" }}>Quantity: </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      style={{
                        background: "#334155",
                        color: "#60a5fa",
                        border: "none",
                        borderRadius: "50%",
                        width: 28,
                        height: 28,
                        fontSize: 18,
                        margin: "0 0.25rem",
                        cursor: item.quantity > 1 ? "pointer" : "not-allowed",
                        transition: "background 0.2s",
                      }}
                    >
                      -
                    </button>
                    <span style={{ margin: "0 0.5rem", color: "#fff", fontWeight: 600 }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        background: "#334155",
                        color: "#60a5fa",
                        border: "none",
                        borderRadius: "50%",
                        width: 28,
                        height: 28,
                        fontSize: 18,
                        margin: "0 0.25rem",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      color: "#f87171",
                      background: "#334155",
                      border: "none",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "2rem", textAlign: "right", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            <strong style={{ fontSize: "1.3rem", color: "#fff" }}>Total: <span style={{ color: "#60a5fa" }}>₹{total}</span></strong>
          </div>
          {error && <div style={{ color: "#f87171", marginTop: 16 }}>{error}</div>}
          <div style={{ textAlign: "right", maxWidth: 600, marginLeft: "auto", marginRight: "auto", display:"flex",justifyContent:"space-between" }}>
            <button
              onClick={handleRazorpayPayment}
              disabled={loading}
              style={{
                marginTop: "1.5rem",
                background: loading ? "#64748b" : "#1e40af",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.75rem 2rem",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                transition: "background 0.2s, color 0.2s",
                marginRight: "1rem",
              }}
            >
              {loading ? "Processing..." : `Pay ₹${total}`}
            </button>
            <button
              onClick={clearCart}
              style={{
                marginTop: "1.5rem",
                background: "#1e40af",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.75rem 2rem",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                transition: "background 0.2s, color 0.2s",
                marginRight: "1rem",
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 