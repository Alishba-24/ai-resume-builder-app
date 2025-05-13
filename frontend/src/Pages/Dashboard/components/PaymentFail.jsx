import React from "react";

const PaymentFailed = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>❌ Payment was cancelled or failed.</h2>
      <p>You can try again or choose a free template.</p>
      <button onClick={() => window.location.href = "/templates"}>
        Back to Templates
      </button>
    </div>
  );
};

export default PaymentFailed;
