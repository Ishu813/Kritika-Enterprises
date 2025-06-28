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
    <div className="border-2 border-gray-300 rounded-xl p-4 mt-4 bg-[#192747] text-white shadow-md w-full max-w-3xl mx-auto">
      <div className="flex justify-between pb-4">
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
            className={`inline-block px-3 py-2 border-2 rounded-xl m-1 cursor-pointer transition-colors duration-200 ${
              selected ? "bg-gray-600 text-white border-gray-600" : "bg-white text-gray-600 border-gray-500 hover:bg-gray-200"
            }`}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};

export default ChoicesBox;
