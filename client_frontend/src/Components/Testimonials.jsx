import React, { useEffect, useRef, useState } from 'react';

const TrustedStats = () => {
  const [counts, setCounts] = useState({
    customers: 0,
    products: 0,
    satisfaction: 0,
  });

  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect(); // trigger only once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCounting) return;

    const targets = {
      customers: 50000,
      products: 500,
      satisfaction: 99,
    };

    const steps = {
      customers: Math.ceil(targets.customers / 150),
      products: Math.ceil(targets.products / 150),
      satisfaction: Math.ceil(targets.satisfaction / 150),
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
    }, 40); // slower and smoother

    return () => clearInterval(interval);
  }, [startCounting]);

  return (
    <div
      ref={sectionRef}
      className="pl-2 pr-2 sm:pl-4 sm:pr-4 mx-auto bg-[#192747] rounded-xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl my-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-wide">
          Investing in <span className="text-blue-400">teamwork</span> pays off
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mt-2">
          Experience the difference with our premium gaming and tech solutions
        </p>
      </div>

      <div className="inline-block w-full p-8 rounded-xl border border-blue-500 bg-[#0f172a]/50 backdrop-blur-md">
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
  );
};

export default TrustedStats;
