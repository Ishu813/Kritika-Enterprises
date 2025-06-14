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

const App = () => {
  return (
    <div className="relative z-0">
      <Navbar />
      <Leftbar />
      <div className="pt-20 pl-16 overflow-visible">
        <Routes>
          <Route path="/" element={<Herosection />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/advisory" element ={<Advisorform/>}/>
        </Routes>
      </div>
      <Contact />
    </div>
  );
};

export default App;
