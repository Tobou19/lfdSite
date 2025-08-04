import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/equipe" element={<Team />} />
            <Route path="/témoignages" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ressources" element={<Resources />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;