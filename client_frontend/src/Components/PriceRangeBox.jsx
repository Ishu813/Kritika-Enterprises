import React, { useEffect, useState } from "react";
import "./PriceRange.css";

const PriceRangeBox = () => {
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

{
  /* <div
        style={{
          display: "flex",
          width: "100%",
          height: "8px",
          backgroundColor: "lightgrey",
          marginTop: "2rem",
          marginBottom: "2rem",
          borderRadius: "1rem",
          alignItems: "center",
        }}
      >
        <div style={{ width: minPercent + "%", height: "8px" }}></div>

        <div
          style={{
            display: "flex",
            width: 100 - (minPercent + maxPercent) + "%",
            height: "8px",
            backgroundColor: "darkblue",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "1rem",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "1rem",
              backgroundColor: "white",
              border: "4px solid darkblue",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: "20px", left: "-8px" }}>
              0$
            </div>
          </div>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "1rem",
              backgroundColor: "white",
              border: "4px solid darkblue",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: "20px", right: "-16px" }}>
              5000$
            </div>
          </div>
        </div>

        <div style={{ width: maxPercent + "%", height: "8px" }}></div>
      </div> */
}
