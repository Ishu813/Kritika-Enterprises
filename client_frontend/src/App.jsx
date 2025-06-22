import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Leftbar from "./Components/Leftbar";
import Herosection from "./components/HeroSection";
import ProductsPage from "./pages/ProductsPage";
import Services from "./components/Services";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Contact from "./Components/Contact";
import Advisorform from "./components/Advisorform";
import ExpertAssistance from "./Components/ExpertAssistance";
import Developers from "./Components/Developers"; 

const App = () => {
  return (
    <div className="relative z-0 bg-[#0f172a]">
      <Navbar />
      <Leftbar />
      <div className="pt-20 pl-14 overflow-visible">
        <Routes>
          <Route path="/" element={<Herosection />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/advisory" element={<ExpertAssistance />} />
          <Route path="/developers" element={<Developers />} /> 
        </Routes>
        <Contact />
      </div>
    </div>
  );
};

export default App;
