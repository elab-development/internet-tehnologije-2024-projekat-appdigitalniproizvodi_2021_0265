import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <div className="w-64 bg-gray-800 text-white min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Link 
              to="/" 
              className="text-sm text-gray-300 hover:text-white transition-colors mt-2 block"
            >
              ← Nazad na početnu
            </Link>
          </div>
          
          <nav className="mt-6">
            <div className="px-3">
              <Link
                to="/admin"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/admin') 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                Dashboard
              </Link>
              
              <Link
                to="/admin/products"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md mt-1 transition-colors ${
                  isActive('/admin/products') 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Proizvodi
              </Link>
            </div>
          </nav>
        </div>

        <div className="flex-1">
          <div className="p-6">
            <div className="mb-4">
              <Link 
                to="/" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Nazad na početnu
              </Link>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
