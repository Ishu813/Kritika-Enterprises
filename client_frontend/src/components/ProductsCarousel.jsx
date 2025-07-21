import React, { useState, useEffect, useRef } from "react";
import prod1 from "../assets/carousals/acercar.241Z.png";
import prod2 from "../assets/carousals/asus2car.097Z.png";
import prod3 from "../assets/carousals/cybernetyxcar.644Z.png";
import prod4 from "../assets/carousals/hpvictuscar.128Z.png";
import prod5 from "../assets/carousals/lenovoideapadcar.210Z.png";
import prod6 from "../assets/carousals/LGcar.453Z.png";
import prod7 from "../assets/carousals/maxhubcar.548Z.png";
import prod8 from "../assets/carousals/sonycar.184Z.png";
import prod9 from "../assets/carousals/tplinkcar.034Z.png";
import prod10 from "../assets/carousals/tufcar.633Z.png";

const productCarouselImages = [
  prod1,
  prod2,
  prod3,
  prod4,
  prod5,
  prod6,
  prod7,
  prod8,
  prod9,
  prod10,
];

const ProductsCarosel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  // Auto-slide logic
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % productCarouselImages.length);
    }, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // Handlers for arrows
  const prevSlide = () =>
    setCurrent(
      (prev) =>
        (prev - 1 + productCarouselImages.length) % productCarouselImages.length
    );
  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % productCarouselImages.length);

  // Touch/swipe logic
  const startX = useRef(null);
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();
    startX.current = null;
  };

  return (
    <div className="bg-[#0f172a]">
      {/* Product Carousel */}
      <div className="flex justify-center items-center px-0">
        <div
          className="relative w-screen h-48 sm:h-64 md:h-80 lg:h-[28rem] overflow-hidden shadow-lg bg-white"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={productCarouselImages[current]}
            alt={`product-carousel-${current}`}
            className="w-full h-full object-cover transition-all duration-500"
          />
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-60"
            aria-label="Previous"
          >
            &#8592;
          </button>
          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-60"
            aria-label="Next"
          >
            &#8594;
          </button>
          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            {productCarouselImages.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === current ? "bg-[#6f46a6]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCarosel;
