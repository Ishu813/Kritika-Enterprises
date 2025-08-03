import React, { useEffect, useRef, useState } from "react";

import camera1 from "../assets/testimonial_photo/camera1.jpg";
import camera from "../assets/testimonial_photo/camera.jpg";
import monitor from "../assets/testimonial_photo/monitor.jpg";
import laptop from "../assets/testimonial_photo/laptop.jpg";
import board from "../assets/testimonial_photo/board.jpg";
import printer from "../assets/testimonial_photo/printer.jpg";
import projector from "../assets/testimonial_photo/projector.jpg";
import speaker from "../assets/testimonial_photo/speaker.jpg";
import ssd from "../assets/testimonial_photo/ssd.jpg";
import img1 from "../assets/testimonial_photo/1.jpg";
import img2 from "../assets/testimonial_photo/2.jpg";
import img3 from "../assets/testimonial_photo/3.jpg";
import img4 from "../assets/testimonial_photo/4.jpg";
import img5 from "../assets/testimonial_photo/5.jpg";

const allImages = [
  camera1,
  camera,
  monitor,
  laptop,
  board,
  printer,
  projector,
  speaker,
  ssd,
  img1,
  img2,
  img3,
  img4,
  img5,
];

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const TrustedStatsSection = () => {
  const [counts, setCounts] = useState({
    customers: 0,
    products: 0,
    satisfaction: 0,
  });

  const sectionRef = useRef(null);
  const [startCounting, setStartCounting] = useState(false);
  const hasStartedCountingRef = useRef(false);

  const shuffledImages = shuffle(allImages);
  const columns = [[], [], [], []];
  shuffledImages.forEach((img, i) => {
    columns[i % 4].push(img);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedCountingRef.current) {
          setStartCounting(true);
          hasStartedCountingRef.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCounting) return;

    const targets = { customers: 50000, products: 250, satisfaction: 92.7 };
    const steps = {
      customers: Math.ceil(targets.customers / 100),
      products: Math.ceil(targets.products / 100),
      satisfaction: Math.ceil(targets.satisfaction / 100),
    };

    const interval = setInterval(() => {
      setCounts((prev) => {
        const updated = { ...prev };
        let allReached = true;

        for (let key in targets) {
          if (prev[key] < targets[key]) {
            updated[key] = Math.min(prev[key] + steps[key], targets[key]);
            allReached = false;
          }
        }

        if (allReached) clearInterval(interval);
        return updated;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [startCounting]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0f172a] py-16 text-white w-full"
    >
      <style>
        {`
          @keyframes scrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes scrollDown {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
          .scroll-up-smooth {
            animation: scrollUp 25s linear infinite;
          }
          .scroll-down-smooth {
            animation: scrollDown 25s linear infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 z-0 flex w-full justify-between px-2 sm:px-8 gap-2 pointer-events-none bg-[#0f172a] opacity-40 overflow-hidden">
        {columns.map((columnImgs, colIndex) => (
          <div
            key={colIndex}
            className={`relative h-[200%] ${
              colIndex % 2 === 0 ? "scroll-up-smooth" : "scroll-down-smooth"
            } w-1/2 sm:w-1/4 flex flex-col items-center`}
          >
            {[...columnImgs, ...columnImgs].map((img, idx) => (
              <img
                key={`${colIndex}-${idx}`}
                src={img}
                alt={`tech-${colIndex}-${idx}`}
                className="max-w-[32vw] sm:max-w-[140px] h-auto object-contain brightness-110 contrast-125 drop-shadow-md bg-white/10 rounded p-2 my-2"
              />
            ))}
          </div>
        ))}
      </div>

      <div className="relative z-0 text-center px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-16 leading-tight">
          Investing in <span className="text-blue-400">teamwork</span> pays off
        </h2>

        <div className="inline-block w-full p-6 sm:p-8 rounded-xl border border-blue-500 bg-[#192747]/90 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-8 space-y-6 sm:space-y-0 text-center items-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-blue-400">
                {counts.customers >= 1000
                  ? `${(counts.customers / 1000).toFixed(0)}K+`
                  : `${counts.customers}+`}
              </div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-blue-400">
                {counts.products}+
              </div>
              <div className="text-blue-200">Products</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-blue-400">
                {counts.satisfaction}%
              </div>
              <div className="text-blue-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedStatsSection;
