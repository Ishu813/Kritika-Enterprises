import React from "react";
import { Linkedin } from "lucide-react";

// Local images
import AryanImg from './photos/Aryan.jpeg';
import IshuImg from './photos/Ishu.jpeg';
import NandiniImg from './photos/Nandini.jpeg';
import DivyanshImg from './photos/Divyansh.jpeg';
const teamMembers = [
  {
    name: "Ashish Kumar",
    role: "Sales Executive",
    img: "https://i.pravatar.cc/150?img=63",
    desc: "Ashish ensures seamless customer experiences and excels at building strong client relationships.",
    linkedin: "#",
  },
  {
    name: "Divyansh Pandit",
    role: "Sales Executive",
    img: "https://i.pravatar.cc/150?img=64",
    desc: "Focused on customer satisfaction and business growth through efficient communication and sales strategies.",
    linkedin: "#",
  },
  {
    name: "Ishu Agrawal",
    role: "Full Stack Developer",
    img: IshuImg,
    desc: "IIT BHU",
    linkedin: "https://www.linkedin.com/in/ishu-agrawal-b64930285/",
  },
  {
    name: "Aryan Gautam",
    role: "Frontend Developer ",
    img: AryanImg,
    desc: "IIT BHU",
    linkedin: "https://www.linkedin.com/in/aryangautam890",
  },
  {
    name: "Nandini Aggarwal",
    role: "Frontend Developer ",
    img: NandiniImg,
    desc: "IIT BHU",
    linkedin: "https://www.linkedin.com/in/nandini-aggarwal-22613926a/",
  },
  {
    name: "Divyansh Mishra",
    role: "AI Engineer",
    img: DivyanshImg,
    desc: "IIT BHU",
    linkedin: "https://www.linkedin.com/in/divyansh-mishra-4767702b0/",
  },
];

const Developers = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-12 sm:px-10">
      <h1 className="text-5xl font-extrabold text-white text-center mb-24 drop-shadow-lg">
        Meet Our Team
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
        {teamMembers.map((dev, index) => (
          <div
            key={index}
            className="bg-[#1e293b] w-full max-w-[280px] mx-auto rounded-xl p-5 border border-transparent hover:border-[3px] hover:border-[#3878d8] hover:shadow-[0_0_15px_#3878d8] hover:scale-105 transition-all duration-300"
          >
            <img
              src={dev.img}
              alt={dev.name}
              className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-md object-cover"
            />
            <h2 className="text-lg font-bold text-center">{dev.name}</h2>
            <h3 className="text-sm text-center text-blue-400 mb-2">{dev.role}</h3>
            <p className="text-xs text-center text-gray-300 mb-4">{dev.desc}</p>

            {/* LinkedIn icon */}
            <div className="flex justify-center mt-3">
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
