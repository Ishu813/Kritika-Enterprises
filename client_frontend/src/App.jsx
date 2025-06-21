import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Leftbar from "./components/Leftbar";
import Herosection from "./components/HeroSection";
import ProductsPage from "./pages/ProductsPage";
import Services from "./components/Services";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Contact from "./Components/Contact";
import Advisorform from "./components/Advisorform";
import ExpertAssistance from "./Components/ExpertAssistance";

const App = () => {
  return (
    <div className="relative z-0 bg-[#0f172a]" >
      <Navbar />
      <Leftbar />
      <div className="pt-20 pl-14 overflow-visible">
        <Routes>
          <Route path="/" element={<Herosection />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/advisory" element={<ExpertAssistance/>} />
        </Routes>
        <Contact />
      </div>
    </div>
  );
};

export default App;
