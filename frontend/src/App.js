import React, { useState } from "react";
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
import Dashboard from "./dashboard/pages/dashboard";
import AdminLogin from "./dashboard/component/signin";

function LayoutPublic({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function LayoutDashboard({ children }) {
  return <main>{children}</main>;
}

function App() {
  const [isLoginned, setIsLoginned] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutPublic>
                <Home />
              </LayoutPublic>
            }
          />
          <Route
            path="/a-propos"
            element={
              <LayoutPublic>
                <About />
              </LayoutPublic>
            }
          />
          <Route
            path="/services"
            element={
              <LayoutPublic>
                <Services />
              </LayoutPublic>
            }
          />
          <Route
            path="/equipe"
            element={
              <LayoutPublic>
                <Team />
              </LayoutPublic>
            }
          />
          <Route
            path="/témoignages"
            element={
              <LayoutPublic>
                <Testimonials />
              </LayoutPublic>
            }
          />
          <Route
            path="/contact"
            element={
              <LayoutPublic>
                <Contact />
              </LayoutPublic>
            }
          />
          <Route
            path="/ressources"
            element={
              <LayoutPublic>
                <Resources />
              </LayoutPublic>
            }
          />

          <Route
            path="/dashboard"
            element={
              <LayoutDashboard>
   
                {isLoginned ? (
                  <Dashboard />
                ) : (
                  <AdminLogin loginned={() => setIsLoginned(true)} />
                )}
              </LayoutDashboard>
            }
          />

          <Route
            path="/dashboard/admin-login"
            element={
              <LayoutDashboard>
                <AdminLogin loginned={() => setIsLoginned(true)} />
              </LayoutDashboard>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
