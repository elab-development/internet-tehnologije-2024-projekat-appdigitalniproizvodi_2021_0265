import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;