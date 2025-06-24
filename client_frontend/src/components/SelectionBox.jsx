import { AlignHorizontalSpaceAround } from "lucide-react";
import React, { useState, useEffect } from "react";

const SelectionBox = ({ title, options, products, setFilteredProducts }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    const setData = async () => {
      setFilteredProducts(
        products.filter((product) => selectedOptions.includes(product.brand))
      );
    };
    if (selectedOptions.length === 0) {
      setFilteredProducts(products);
    } else {
      setData();
    }
  }, [selectedOptions]);

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
        <span style={{ rotate: "180deg" }}>^</span>
      </div>
      {options.map((option) => (
        <label
          key={option}
          style={{
            display: "inline-block",
            cursor: "pointer",
            border: "2px solid lightgrey",
            padding: "0.5rem",
            borderRadius: "2rem",
            margin: "4px",
            color: "grey",
            alignContent: "center",
            justifyItems: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "lightgrey";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
          }}
        >
          <span
            style={{
              height: "12px",
              width: "12px",
              borderRadius: "50%",
              border: "2px solid #555",
              backgroundColor: selectedOptions.includes(option)
                ? "#555"
                : "transparent",
              display: "inline-block",
              transition: "0.2s ease",
            }}
          ></span>
          <input
            type="checkbox"
            name={title}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleToggle(option)}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
          />{" "}
          {option}
        </label>
      ))}
    </div>
  );
};

export default SelectionBox;
