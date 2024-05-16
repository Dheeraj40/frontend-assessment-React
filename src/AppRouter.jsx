import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import ProductListingPage from "./screens/ProductListingPage";
import ProductDetailsPage from "./screens/ProductDetailsPage";
import ProductDashboard from "./screens/ProductDashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/dashboard" element={<ProductDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
