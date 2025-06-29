import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Leftbar from "./Components/Leftbar";
import Herosection from "./Components/HeroSection";
import ProductsPage from "./pages/ProductsPage";
import Services from "./Components/Services";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Contact from "./Components/Contact";
import Advisorform from "./Components/Advisorform";
import ExpertAssistance from "./Components/ExpertAssistance";
import Developers from "./Components/Developers"; 
import Cart from "./Components/Cart";
import Chatbot from "./Components/Chatbot";

const App = () => {
  return (
    <div className="relative z-0 bg-[#0f172a]">
      <Navbar />
      <Leftbar />
      <div className="pt-20 pl-14 overflow-visible">
        <Routes>
          <Route path="/" element={<Herosection />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/laptops" element={<ProductsPage />} />
          <Route path="/solutions/b2b" element={<Services />} />
          <Route path="/solutions/b2c" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/advisory" element={<ExpertAssistance />} />
          <Route path="/developers" element={<Developers />} /> 
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Contact />
        <Chatbot />
      </div>
    </div>
  );
};

export default App;
