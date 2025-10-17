import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-purple-100 shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-purple-800 hover:text-purple-900 transition-colors">
              Admin panel
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link
                to="/admin/products"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/admin/products') 
                    ? 'bg-purple-200 text-purple-900' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Proizvodi
              </Link>
              
              <Link
                to="/admin/purchases"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/admin/purchases') 
                    ? 'bg-purple-200 text-purple-900' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Kupovine
              </Link>
              
              <Link 
                to="/" 
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                ← Nazad na početnu
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
