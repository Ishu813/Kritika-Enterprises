import React, { use, useEffect, useState } from "react";

const ChoicesBox = ({ title, options, products, setFilteredProducts }) => {
  const [features, setFeatures] = useState([]);

  const toggleSelection = (option) => {
    setFeatures((prev) => {
      const exists = prev.find((feature) => feature === option);
      if (exists) {
        // Remove if already selected
        return prev.filter((feature) => feature !== option);
      } else {
        // Add if not selected
        return [...prev, option];
      }
    });
  };

  const isSelected = (option) => features.find((feature) => feature === option);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter(
        (product) =>
          features.includes(product.processor) ||
          features.includes(product.graphicCard)
      );
      setFilteredProducts(filtered);
    };
    if (features.length === 0) {
      setFilteredProducts(products);
    } else if (products.length > 0) {
      filterProducts();
    }
  }, [features]);

  return (
    <div
      style={{
        border: "2px solid lightgrey",
        borderRadius: "1rem",
        padding: "1rem",
        marginTop: "1rem",
        backgroundColor: "white",
        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "1rem",
        }}
      >
        <span>{title}</span>
        <span style={{ transform: "rotate(180deg)", display: "inline-block" }}>
          ^
        </span>
      </div>

      {options.map((option, idx) => {
        const selected = isSelected(option);

        return (
          <div
            key={idx}
            onClick={() => toggleSelection(option)}
            style={{
              display: "inline-block",
              padding: "0.5rem",
              border: "2px solid grey",
              backgroundColor: selected ? "grey" : "white",
              borderRadius: "1rem",
              color: selected ? "white" : "grey",
              margin: "4px",
              transition: "background-color 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (!selected)
                e.currentTarget.style.backgroundColor = "lightgrey";
            }}
            onMouseLeave={(e) => {
              if (!selected) e.currentTarget.style.backgroundColor = "white";
            }}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};

export default ChoicesBox;
