import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Leftbar from "./components/Leftbar";
import Herosection from "./components/HeroSection";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Contact from "./components/Contact";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import ExpertAssistance from "./components/ExpertAssistance";
import Developers from "./components/Developers";
import Chatbot from "./components/Chatbot";
import ComingSoon from "./components/ComingSoon";
import TempNavbar from "./components/TempNavbar";

const App = () => {
  const isDownForMaintenance = false;
  return (
    <div className="relative z-0 bg-[#0f172a] min-h-screen">
      {isDownForMaintenance ? (
        <>
          <TempNavbar /> <ComingSoon />
        </>
      ) : (
        <>
          <Navbar /> <Leftbar />
          <div className="pt-20 pl-14 overflow-visible">
            <Routes>
              <Route path="/" element={<Herosection />} />{" "}
              <Route path="/products" element={<ProductsPage />} />{" "}
              <Route path="/products/:id" element={<ProductDetailsPage />} />{" "}
              <Route path="/signup" element={<SignUpPage />} />{" "}
              <Route path="/login" element={<LoginPage />} />{" "}
              <Route path="/developers" element={<Developers />} />{" "}
              <Route path="/expert-assistance" element={<ExpertAssistance />} />{" "}
            </Routes>
            <Contact />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
