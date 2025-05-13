import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
  const verifyPayment = async () => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (!sessionId) {
      setMessage("❌ No session ID found in the URL.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Login required to verify payment.");
        setLoading(false);
        return;
      }

      // Make the API call to verify the payment
      const { data } = await axios.get(`/api/v1/payment/verify-payment?session_id=${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("🔍 Payment verification response:", data); // Log the response from the backend

      if (data?.success) {
        localStorage.setItem("paidSessionId", sessionId);
        setMessage("✅ Payment verified successfully. Premium template unlocked!");
      } else {
        setMessage(data?.message || "❌ Payment was not successful.");
      }
    } catch (error) {
      console.error("⚠️ Payment verification error:", error);
      setMessage("⚠️ Something went wrong during payment verification.");
    } finally {
      setLoading(false);
    }
  };

  verifyPayment();
}, []);


  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {loading ? (
        <p>🔄 Verifying payment...</p>
      ) : (
        <>
          <h2>{message}</h2>
          <button
            onClick={() => window.location.href = "/dashboard"}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
