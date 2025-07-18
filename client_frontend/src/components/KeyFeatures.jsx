import React from "react";

const KeyFeatures = ({ product }) => {
  if (!product) {
    return null;
  }

  const key_features = product.key_features.filter((feature) => feature !== "");

  return (
    <div
      style={{
        backgroundColor: "#0f1419",
        padding: "2rem",
        marginTop: "2rem",
        color: "#94a3b8",
        borderRadius: "1rem",
      }}
    >
      <p style={{ fontSize: "1.2rem", color: "#f8fafc" }}>Key Features</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        {key_features.map((feature, idx) => (
          <p key={idx} style={{ width: "18rem", padding: "0.5rem" }}>
            <span style={{ color: "green", fontSize: "1.2rem" }}>&#10003;</span>
            &nbsp;&nbsp; {feature}
          </p>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
