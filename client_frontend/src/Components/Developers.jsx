import React from "react";

const teamMembers = [
  {
    name: "Dev 1",
    role: "Backend Developer",
    img: "https://i.pravatar.cc/150?img=65",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac ligula vel arcu tristique semper.",
  },
  {
    name: "Dev 2",
    role: "Frontend Engineer",
    img: "https://i.pravatar.cc/150?img=66",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra at justo nec malesuada.",
  },
  {
    name: "Dev 3",
    role: "Full Stack Developer",
    img: "https://i.pravatar.cc/150?img=67",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id tellus id risus fermentum placerat.",
  },
  {
    name: "Dev 4",
    role: "UI/UX Designer",
    img: "https://i.pravatar.cc/150?img=68",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae velit a felis blandit sagittis.",
  },
];

const Developers = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-12 sm:px-10">
      <h1 className="text-5xl font-extrabold text-center mb-24 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
        👨‍💻 Meet Our Developers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">
        {teamMembers.map((dev, index) => (
          <div
            key={index}
            className="bg-[#1e293b] w-full max-w-[250px] mx-auto rounded-xl p-5 border border-blue-600 hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={dev.img}
              alt={dev.name}
              className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-md object-cover"
            />
            <h2 className="text-lg font-bold text-center">{dev.name}</h2>
            <h3 className="text-sm text-center text-blue-400 mb-2">{dev.role}</h3>
            <p className="text-xs text-center text-gray-300">{dev.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
