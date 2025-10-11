import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Naslov */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Jelisandia Web Store
          </Link>

          {/* Navigacija */}
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Početna
            </Link>
            
            {isAuthenticated ? (
              // Korisnik je ulogovan
              <>
                <span className="text-gray-700 font-medium">
                  Zdravo, {user?.name}!
                </span>
                <Button 
                  onClick={logout}
                  variant="outline"
                  size="small"
                >
                  Logout
                </Button>
              </>
            ) : (
              // Korisnik nije ulogovan
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;