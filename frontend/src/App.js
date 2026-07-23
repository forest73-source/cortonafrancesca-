import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Arcani from "@/pages/Arcani";
import Opere from "@/pages/Opere";
import OpereSerie from "@/pages/OpereSerie";
import Contatti from "@/pages/Contatti";
import "@/App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />
        <main data-testid="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/arcani" element={<Arcani />} />
            <Route path="/opere" element={<Opere />} />
            <Route path="/opere/:slug" element={<OpereSerie />} />
            <Route path="/contatti" element={<Contatti />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
