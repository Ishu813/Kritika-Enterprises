import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Leftbar from "./Components/Leftbar";
import Herosection from "./Components/HeroSection";
import Products from "./Components/Products";
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
      <div className="pt-20 sm:pl-16 pl-0 overflow-visible">
        <Routes>
          <Route path="/" element={<Herosection />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/advisory" element ={<Advisorform/>}/>
        </Routes>
        <Contact />
      </div>
    </div>
  );
};

export default App;
