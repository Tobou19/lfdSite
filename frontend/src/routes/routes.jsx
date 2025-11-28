
import React from "react";
import { Routes, Route } from "react-router-dom";

import ProductDetails from "../pages/ProductDetails";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Les routes seront ajoutées automatiquement ici */}
          <Route path="/productdetails" element={<ProductDetails />} />
    </Routes>
  );
}
