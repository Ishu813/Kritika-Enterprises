import { useEffect, useState } from "react";

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
    <div className="border-2 border-gray-300 rounded-xl p-4 mt-4 bg-[#192747] shadow-md">
      <div className="flex justify-between pb-4 px-2">
        <span className="font-semibold text-white">Price Range</span>
      </div>

      <div className="w-full">
        <div className="relative h-6">
          {/* Track */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[5px] bg-gray-300 rounded z-[1]" />
          {/* Range */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[5px] bg-blue-600 rounded z-[2]"
            style={{
              left: `${(minVal / max) * 100}%`,
              right: `${100 - (maxVal / max) * 100}%`,
            }}
          />
          {/* Min Thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={handleMinChange}
            className="absolute top-1/2 -translate-y-1/2 w-full appearance-none pointer-events-none z-[3] h-0"
          />
          {/* Max Thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={handleMaxChange}
            className="absolute top-1/2 -translate-y-1/2 w-full appearance-none pointer-events-none z-[3] h-0"
          />
        </div>

        <div className="mt-4 font-semibold flex justify-between text-gray-600">
          <input
            type="number"
            className="w-20 text-center border border-gray-300 bg-[#192747] text-white rounded-md"
            value={minVal}
            onChange={handleMinChange}
          />
          <span className="text-white">-</span>
          <input
            type="number"
            className="w-20 text-center border border-gray-300 bg-[#192747] text-white rounded-md"
            value={maxVal}
            onChange={handleMaxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeBox;
