import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const founders = [
  {
    name: 'Shubhangi Goel',
    title: 'Co-founder, Lawyer',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    quote: 'Innovation begins with courage and clarity.',
    description:
      'A driving force behind our vision. With a strong legal background, she ensures structure, integrity, and compliance at every step.',
    linkedin: '..',
    instagram: '..',
  },
  {
    name: 'Priyansh Goel',
    title: 'CEO & Co-founder, ex Scaler Academy',
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
    quote: 'Tech should simplify life, not complicate it.',
    description:
      'An innovator at heart. With experience at Scaler Academy, he leads product, strategy, and growth with a sharp tech-first mindset.',
    linkedin: '..',
    instagram: '..',
  },
];

const Founder = () => {
  return (
    <section className="bg-[#0f172a] text-white py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl">🗣</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">What Our Founders Say</h2>
        </div>
        <p className="text-slate-300 text-lg sm:text-xl mb-12 max-w-2xl mx-auto">
          Meet the visionaries behind our success. Their passion and expertise drive our commitment to excellence.
        </p>

        

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="bg-[#1e293b] rounded-2xl shadow-lg p-8 text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300"
            >
              <img
                src={founder.image}
                alt={founder.name}
                className="w-24 h-24 rounded-full border-4 border-white mx-auto mb-4 object-cover shadow-md"
              />
              <h3 className="text-xl font-bold">{founder.name}</h3>
              <p className="text-slate-300 font-medium mb-4">{founder.title}</p>
              <blockquote className="italic text-slate-400 mb-4">
                “{founder.quote}”
              </blockquote>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{founder.description}</p>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={founder.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founder;
