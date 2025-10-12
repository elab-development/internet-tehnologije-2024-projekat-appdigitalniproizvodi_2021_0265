import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SimpleAppLayout = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Jelisandia Web Store
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Početna
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Zdravo, {user?.name}!
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Admin
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            2025 Jelisandia Shop. 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SimpleAppLayout;
