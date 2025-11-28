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
import ManageTestimonials from "./dashboard/pages/testimonials";
import ManageSettings from "./dashboard/pages/settings";
import ManageUsers from "./dashboard/pages/user";
import LayoutDashboard from "./Layout/layout-dashboard";
import AdminLogin from "./dashboard/components/signin";
import ManageBeneficiaries from "./dashboard/pages/beneficiaries";
import AppointementPage from "./dashboard/pages/appointement";
import ManageEntries from "./dashboard/pages/entries";
import Carnet from "./components/carnet/carnet";
import ServicesPage from "./dashboard/pages/services";
import ProductDetails from "./pages/ProductDetails";

function LayoutPublic({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  const [isLoginned, setIsLoginned] = useState(() => {
    return localStorage.getItem("token") ? true : false;
  });
  const products = [
    {
      id: 1,
      name: "Superfood Mix Détox",
      description: "Mélange 100% naturel – spiruline, moringa, gingembre et curcuma.",
      price: 8500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8NsS0nlgjgOUMCHXF1VuerX09oE9fKvCCXg&s"
    },
    {
      id: 2,
      name: "Thé Minceur Métabolique",
      description: "Accélère la combustion, régule l'appétit & réduit la rétention d’eau.",
      price: 6500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkOlyZyrSDD8ZzWSkXcF3q3OLMaYYGc8SYw&s"
    },
    {
      id: 3,
      name: "Huile de Nigelle Premium",
      description: "Anti-inflammatoire puissant – excellente pour le diabète & l’immunité.",
      price: 9500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSju8v1p1_krQqji7uh3IWrTQdFjC7FxgZUgA&s"
    },
    {
      id: 4,
      name: "Superfood Mix Détox",
      description: "Mélange 100% naturel – spiruline, moringa, gingembre et curcuma.",
      price: 8500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8NsS0nlgjgOUMCHXF1VuerX09oE9fKvCCXg&s"
    },
    {
      id: 5,
      name: "Thé Minceur Métabolique",
      description: "Accélère la combustion, régule l'appétit & réduit la rétention d’eau.",
      price: 6500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkOlyZyrSDD8ZzWSkXcF3q3OLMaYYGc8SYw&s"
    },
    {
      id: 6,
      name: "Huile de Nigelle Premium",
      description: "Anti-inflammatoire puissant – excellente pour le diabète & l’immunité.",
      price: 9500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSju8v1p1_krQqji7uh3IWrTQdFjC7FxgZUgA&s"
    }
  ];

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
            path="/produit/:id"
            element={
              <LayoutPublic>
                <ProductDetails products={products}/>
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
              isLoginned ? (
                <LayoutDashboard>
                  <Dashboard />
                </LayoutDashboard>
              ) : (
                <AdminLogin loginned={() => setIsLoginned(true)} />
              )
            }
          />
          <Route
            path="/dashboard/testimonials"
            element={
              isLoginned ? (
                <LayoutDashboard>
                  <ManageTestimonials />
                </LayoutDashboard>
              ) : (
                <AdminLogin loginned={() => setIsLoginned(true)} />
              )
            }
          />
          <Route
            path="/dashboard/entries"
            element={
              isLoginned ? (
                <LayoutDashboard>
                  <ManageEntries />
                </LayoutDashboard>
              ) : (
                <AdminLogin loginned={() => setIsLoginned(true)} />
              )
            }
          />
          <Route
            path="/dashboard/carnet/:id"
            element={
              isLoginned ? (
                <LayoutDashboard>
                  <Carnet />
                </LayoutDashboard>
              ) : (
                <AdminLogin loginned={() => setIsLoginned(true)} />
              )
            }
          />

          <Route
            path="/dashboard/users"
            element={
              isLoginned ? (
                <LayoutDashboard>
                  <ManageUsers />
                </LayoutDashboard>
              ) : (
                <AdminLogin loginned={() => setIsLoginned(true)} />
              )
            }
          />
          <Route
            path="/dashboard/appointement"
            element={
              isLoginned ? (
                <LayoutDashboard>
                  <AppointementPage />
                </LayoutDashboard>
              ) : (
                <AdminLogin loginned={() => setIsLoginned(true)} />
              )
            }
          />
          <Route
            path="/dashboard/services"
            element={
              isLoginned ? (
                <LayoutDashboard>
                  <ServicesPage />
                </LayoutDashboard>
              ) : (
                <AdminLogin loginned={() => setIsLoginned(true)} />
              )
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              isLoginned ? (
                <LayoutDashboard>
                  <ManageSettings />
                </LayoutDashboard>
              ) : (
                <AdminLogin loginned={() => setIsLoginned(true)} />
              )
            }
          />
          <Route
            path="/dashboard/beneficiares"
            element={
              isLoginned ? (
                <LayoutDashboard>
                  <ManageBeneficiaries />
                </LayoutDashboard>
              ) : (
                <AdminLogin loginned={() => setIsLoginned(true)} />
              )
            }
          />

          <Route
            path="/dashboard/admin-login"
            element={<AdminLogin loginned={() => setIsLoginned(true)} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
