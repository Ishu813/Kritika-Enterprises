import React, { useEffect, useRef, useState } from 'react';

const logos = [
  'https://cdn.worldvectorlogo.com/logos/spotify-2.svg',
  'https://cdn.worldvectorlogo.com/logos/netflix-3.svg',
  'https://cdn.worldvectorlogo.com/logos/tesla-9.svg',
  'https://cdn.worldvectorlogo.com/logos/microsoft.svg',
  'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
  'https://cdn.worldvectorlogo.com/logos/twitter-6.svg',
  'https://cdn.worldvectorlogo.com/logos/spotify-2.svg',
  'https://cdn.worldvectorlogo.com/logos/netflix-3.svg',
];

const TrustedStatsSection = () => {
  const [counts, setCounts] = useState({
    customers: 0,
    products: 0,
    satisfaction: 0,
  });

  const sectionRef = useRef(null);
  const audioRef = useRef(null);
  const [startCounting, setStartCounting] = useState(false);
  const hasStartedCountingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedCountingRef.current) {
          setStartCounting(true);
          hasStartedCountingRef.current = true;

          if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play().catch((err) =>
              console.log('Autoplay error:', err)
            );
          }
        } else if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
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
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        preload="auto"
        loop
      />

      <style>
        {`
          @keyframes scrollUp {
            0% { transform: translateY(0%); }
            100% { transform: translateY(-50%); }
          }
          @keyframes scrollDown {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0%); }
          }
          .scroll-up-smooth {
            animation: scrollUp 25s linear infinite;
          }
          .scroll-down-smooth {
            animation: scrollDown 25s linear infinite;
          }
        `}
      </style>

      {/* Floating Logos */}
      <div className="absolute inset-0 z-0 flex w-full justify-between px-2 sm:px-8 gap-2 pointer-events-none bg-[#0f172a] opacity-40 overflow-hidden">
        {[...Array(4)].map((_, col) => (
          <div
            key={col}
            className={`relative h-[200%] ${
              col % 2 === 0 ? 'scroll-up-smooth' : 'scroll-down-smooth'
            } w-1/2 sm:w-1/4 flex flex-col items-center`}
          >
            {[...logos, ...logos].map((logo, idx) => (
              <img
                key={`${col}-${idx}`}
                src={logo}
                alt={`logo-${idx}`}
                className="max-w-[32vw] sm:max-w-[140px] h-auto object-contain brightness-110 contrast-125 drop-shadow-md bg-white/10 rounded p-2 my-2"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-16 leading-tight">
          Investing in <span className="text-blue-400">teamwork</span> pays off
        </h2>

        <div className="inline-block w-full p-6 sm:p-8 rounded-xl border border-blue-500 bg-[#192747]/90 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-8 space-y-6 sm:space-y-0 text-center items-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-blue-400">
                {counts.customers >= 1000
                  ? `${(counts.customers / 1000).toFixed(0)}K+`
                  : counts.customers + '+'}
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
