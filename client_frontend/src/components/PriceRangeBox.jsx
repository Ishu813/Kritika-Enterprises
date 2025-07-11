import React, { useEffect, useState } from "react";
import "./PriceRange.css";

const PriceRangeBox = ({ products, setFilteredProducts }) => {
  const min = 0;
  const max = 500000;
  const step = 1000;

  const [minVal, setMinVal] = useState(20000);
  const [maxVal, setMaxVal] = useState(400000);

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(val);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(val);
  };

  useEffect(() => {
    const setData = async () => {
      setFilteredProducts(
        products.filter(
          (product) =>
            Number(product.price) >= minVal && Number(product.price) <= maxVal
        )
      );
    };

    setData();
  }, [minVal, maxVal]);

  return (
    <div
      style={{
        border: "2px solid lightgrey",
        borderRadius: "1rem",
        padding: "1rem",
        marginTop: "1rem",
        backgroundColor: "#192747",
        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "1rem 0rem 1rem 0.5rem",
        }}
      >
        <span>Price Range</span>
      </div>

      <div className="price-range-wrapper">
        <div className="slider">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={handleMinChange}
            className="thumb thumb--left"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={handleMaxChange}
            className="thumb thumb--right"
          />
          <div className="slider-track" />
          <div
            className="slider-range"
            style={{
              left: `${(minVal / max) * 100}%`,
              right: `${100 - (maxVal / max) * 100}%`,
            }}
          />
        </div>
        <div className="price-values" style={{ color: "grey" }}>
          <input
            type="number"
            style={{ width: "5rem", textAlign: "center" }}
            value={minVal}
            onChange={(e) => handleMinChange(e)}
          ></input>
          <span>-</span>
          <input
            type="number"
            style={{ width: "5rem", textAlign: "center" }}
            value={maxVal}
            onChange={(e) => handleMaxChange(e)}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeBox;
