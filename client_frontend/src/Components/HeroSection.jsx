import { TypeAnimation } from 'react-type-animation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Components/Ui/Card';
import InfiniteScrollLogos from '../Utilis/InfiniteScrollLogos';
import img1 from '../assets/store1.jpeg';
import img2 from '../assets/store2.jpeg';
import img3 from '../assets/store3.jpeg';
import img4 from '../assets/store4.jpeg';
import img5 from '../assets/store5.jpeg';
import img6 from '../assets/store6.jpeg';
import { 
  Building2, 
  ShoppingCart, 
  Users, 
  MessageSquare,
} from 'lucide-react';


import { useState, useEffect, useRef } from 'react';
import ProductsCarosel from './ProductsCarousel';


const carouselImages = [img1, img2, img3,img4,img5,img6];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  // Auto-slide logic
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 2000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // Handlers for arrows
  const prevSlide = () => setCurrent((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % carouselImages.length);

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

  //
   const features = [
    {
      icon: Building2,
      title: "B2B Solutions",
      description: "Enterprise-grade products and bulk ordering for businesses",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: ShoppingCart,
      title: "B2C Marketplace",
      description: "Consumer products with personalized shopping experience",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Smart chat support for instant product recommendations",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Connect with industry experts for specialized advice",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="flex flex-col w-full object-cover text-[#1F2937] pl-0 pr-2 sm:pl-4 sm:pr-4">
      <ProductsCarosel />

      <div className="min-h-screen">

         <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Everything You Need for Modern Commerce
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our platform combines cutting-edge technology with expert human support 
          to deliver exceptional shopping experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300"
          >
            <CardHeader className="text-center pb-4">
              <div
                className={`mx-auto p-4 rounded-full w-fit mb-4 transform transition-transform duration-300 ${feature.color} group-hover:scale-110`}
              >
                <feature.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600 leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

        {/* about store */}

        <div className="pl-2 pr-2 sm:pl-4 sm:pr-4 mx-auto bg-[#040273] rounded-xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl flex flex-col-reverse lg:flex-row gap-4 sm:gap-8 items-start">
  {/* Left: Text */}
  <div className="w-full lg:w-1/2 text-left">
    <div className="font-bold text-[#F33539] text-3xl sm:text-4xl md:text-5xl mb-4">
      Kritika-Enterprises
    </div>
    <div className="mt-4 text">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">
        <span className="inline-flex items-baseline">
          We sell&nbsp;
          <span className="text-[#6870D1] text-2xl sm:text-3xl font-semibold">
            <TypeAnimation
              sequence={[
                'Laptops', 500,
                'Gaming Components ', 500,
                'Monitors', 500,
                'Desktops', 500,
                'Gaming Laptops', 500,
                'Digital boards', 500,
                'Printers ', 500,
                'Servers', 500,
                'Softwares', 500,
                'Storages', 500,
                'Input devices', 500
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ display: 'inline-block' }}
            />
          </span>
        </span>
      </h2>
      <p className="text sm:text-md mt-2 sm:mt-4 w-full sm:w-4/5 mx-auto lg:mx-0">
        At Kritika Enterprises, we specialize in providing high-performance hardware solutions for both businesses and individual consumers.
        We deliver only the best from leading global brands like HP, Dell, and ASUS. Whether you're a hospital, a startup, or a home user,
        we ensure fast, reliable tech solutions with unmatched support.
      </p>
    </div>
  </div>

  {/* Right: Carousel */}
  <div
    className="relative w-full lg:w-1/2 h-56 sm:h-64 md:h-72 lg:h-80 rounded-md sm:rounded-lg overflow-hidden bg-white shadow-md"
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    <img
      src={carouselImages[current]}
      alt={`carousel-${current}`}
      className="w-full h-full object-cover transition-all duration-500"
    />
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
      {carouselImages.map((_, idx) => (
        <span
          key={idx}
          className={`w-2 h-2 rounded-full ${idx === current ? 'bg-[#7C3AED]' : 'bg-gray-300'}`}
        />
      ))}
    </div>
  </div>
</div>

         {/* Brands section */}
        <div className=" mt-8">
          <h2 className="text-2xl  sm:text-3xl text-center font-bold">
            <span className="bg-[#040273] text-white rounded-full px-4 py-1 inline-block">
              Our Associated Brands
            </span>
          </h2>
          <div className="w-full mt-4 ">
            <InfiniteScrollLogos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
