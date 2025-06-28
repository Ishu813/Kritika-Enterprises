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
    <div className="border-2 border-lightgrey rounded-xl p-4 mt-4 bg-[#192747] shadow-md shadow-black/20">
      <div className="flex justify-between pb-4">
        <span>{title}</span>
        <span style={{ rotate: "180deg" }}>^</span>
      </div>
      {options.map((option) => (
        <label
          key={option}
          className="inline-block cursor-pointer border-2 border-lightgrey p-2 rounded-full m-1 text-gray-500 hover:bg-lightgrey"
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
