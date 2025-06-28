import React from "react";

const TechSpecifications = ({ product }) => {
  if (!product) {
    return null;
  }
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
      <p style={{ fontSize: "1.2rem", color: "#f8fafc" }}>
        Technical Specifications
      </p>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <i
          style={{ color: "#2563eb", fontSize: "1.5rem" }}
          className="fa-solid fa-microchip"
        ></i>
        <div style={{ paddingLeft: "1rem" }}>
          <p style={{ color: "#f8fafc" }}>Processor</p>
          <p>{product.processor}</p>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <i
          style={{ color: "#10b981", fontSize: "1.5rem" }}
          className="fa-solid fa-display"
        ></i>
        <div style={{ paddingLeft: "1rem" }}>
          <p style={{ color: "#f8fafc" }}>Graphic Card</p>
          <p>{product.graphicCard}</p>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <i
          style={{ color: "purple", fontSize: "1.5rem" }}
          className="fa-solid fa-hard-drive"
        ></i>
        <div style={{ paddingLeft: "1rem" }}>
          <p style={{ color: "#f8fafc" }}>AMD</p>
          <p>{product.amd}</p>
        </div>
      </div>
    </div>
  );
};

export default TechSpecifications;
