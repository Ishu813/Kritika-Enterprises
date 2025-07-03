import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Leftbar from "./components/Leftbar";
import Herosection from "./components/HeroSection";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Services from "./components/Services";
import Contact from "./components/Contact";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
// import Advisorform from "./components/Advisorform";
import ExpertAssistance from "./components/ExpertAssistance";
import Developers from "./components/Developers";

const App = () => {
  return (
    <div className="relative z-0 bg-[#0f172a]">
      <Navbar />
      <Leftbar />
      <div className="pt-20 pl-14 overflow-visible">
        <Routes>
          <Route path="/" element={<Herosection />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/advisory" element={<Advisorform />} /> */}
          <Route path="/developers" element={<Developers />} />
          <Route path="/expert-assistance" element={<ExpertAssistance />} />
        </Routes>
        <Contact />
      </div>
    </div>
  );
};

export default App;
