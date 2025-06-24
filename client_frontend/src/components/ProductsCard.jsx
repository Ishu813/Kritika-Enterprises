import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [opacity, setOpacity] = useState("1");
  const [opacitybtn, setOpacitybtn] = useState("1");
  const [opaque1, setOpaque1] = useState("1");
  const [opaque2, setOpaque2] = useState("1");
  const [opacitycart, setOpacitycart] = useState("1");

  return (
    <div
      style={{
        width: "20rem",
        backgroundColor: "white",
        borderRadius: "1rem",
        opacity: opacity,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        margin: "0.5rem",
      }}
      onMouseEnter={() => setOpacity("0.8")}
      onMouseLeave={() => setOpacity("1")}
    >
      <div
        style={{
          width: "20rem",
          position: "relative",
        }}
      >
        <img
          style={{ width: "20rem", maxHeight: "16rem" }}
          src={product.imageUrl}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "1rem",
            right: "1rem",
            padding: "0.6rem",
            borderRadius: "2rem",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(8px)",
            opacity: opacitycart,
            justifyContent: "center",
            alignItems: "center",
          }}
          onMouseEnter={() => setOpacitycart("0.5")}
          onMouseLeave={() => setOpacitycart("1")}
        >
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "1rem",
            left: "1rem",
            padding: "0.5rem",
            borderRadius: "2rem",
            backgroundColor: "green",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          -{product.discount}%
        </div>
      </div>
      <div style={{ borderRadius: "1rem" }}>
        <div
          style={{
            height: "10rem",
            padding: "0.8rem",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >
          <p style={{ fontSize: "1.5rem" }}>{product.id}</p>
          {product.key_features &&
            product.key_features.map((feature, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "12px",
                  border: "1px solid grey",
                  padding: "2px",
                  color: "grey",
                  borderRadius: "4px",
                  marginRight: "4px",
                }}
              >
                {feature}
              </span>
            ))}
          <p
            style={{
              fontSize: "1rem",
              padding: "2px",
              color: "grey",
              marginTop: "0.5rem",
            }}
          >
            {product.description}
          </p>
        </div>

        <div style={{ margin: "0.5rem 1rem 0.5rem 1rem" }}>
          <p style={{ fontSize: "12px", color: "grey", fontWeight: "bold" }}>
            PRICE
          </p>
          <p style={{ fontSize: "1.5rem" }}>
            &#8377;
            {new Intl.NumberFormat("en-IN").format(
              Number(product.price * (1 - product.discount / 100))
            )}
          </p>
          <span style={{ fontSize: "16px", color: "grey" }}>
            &#8377;
            {new Intl.NumberFormat("en-IN").format(Number(product.price))}
          </span>
          <i
            style={{ marginLeft: "1rem", color: "green" }}
            className="fa-solid fa-tag"
          ></i>
          <span style={{ color: "green" }}>{product.discount}%</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              borderRadius: "2rem",
              backgroundColor: "#D0E7FF",
              height: "3rem",
              width: "4rem",
              opacity: opaque2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={() => setOpaque2("0.8")}
            onMouseLeave={() => setOpaque2("1")}
          >
            <i
              className="fa-solid fa-minus"
              style={{ fontSize: "1rem", color: "#007BFF" }}
            ></i>
          </div>
          <span>1</span>
          <div
            style={{
              display: "flex",
              borderRadius: "2rem",
              backgroundColor: "#D0E7FF",
              opacity: opaque1,
              height: "3rem",
              width: "4rem",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={() => setOpaque1("0.8")}
            onMouseLeave={() => setOpaque1("1")}
          >
            <i
              className="fa-solid fa-plus"
              style={{ fontSize: "1rem", color: "#007BFF" }}
            ></i>
          </div>
        </div>
        <button
          style={{
            width: "90%",
            padding: "1rem",
            margin: "1rem",
            backgroundColor: "darkblue",
            color: "white",
            opacity: opacitybtn,
            borderRadius: "2rem",
            fontSize: "1rem",
          }}
          onMouseEnter={() => setOpacitybtn("0.8")}
          onMouseLeave={() => setOpacitybtn("1")}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
