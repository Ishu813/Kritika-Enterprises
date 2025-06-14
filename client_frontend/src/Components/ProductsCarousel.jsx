import React, { useState, useEffect, useRef } from 'react';
import prod1 from '../assets/product1.webp';
import prod2 from '../assets/product2.webp';
import prod3 from '../assets/product3.webp';
import prod4 from '../assets/product4.webp';

const productCarouselImages = [prod1, prod2, prod3,prod4];

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
  const prevSlide = () => setCurrent((prev) => (prev - 1 + productCarouselImages.length) % productCarouselImages.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % productCarouselImages.length);

  // Touch/swipe logic
  const startX = useRef(null);
  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();
    startX.current = null;
  };

  return (
    <div className="bg-[#9a99f2]">
      {/* Product Carousel */}
      <div className="flex justify-center items-center px-0">
        <div
          className="relative w-screen h-48 sm:h-64 md:h-80 lg:h-[28rem] rounded-none sm:rounded-lg overflow-hidden shadow-lg bg-white"
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
                className={`w-2 h-2 rounded-full ${idx === current ? 'bg-[#6f46a6]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCarosel;
