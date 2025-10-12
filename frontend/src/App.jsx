import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SimpleAppLayout from './layouts/SimpleAppLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SimpleAppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Route>
      
      <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
      </Route>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;