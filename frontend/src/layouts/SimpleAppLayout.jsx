import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SimpleAppLayout = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <header className="bg-purple-100 shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img 
                src="/img/logoooo.png" 
                alt="Jelisandia Shop" 
                className="h-20 w-auto hover:opacity-80 transition-opacity"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNSIgZmlsbD0iIzI1NjNlYiIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvZ288L3RleHQ+Cjwvc3ZnPg==';
                }}
              />
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Početna
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                O meni
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Kontakt
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Zdravo, {user?.name}!
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin/products" className="text-gray-700 hover:text-purple-600 transition-colors">
                      Admin
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    Odjavite se
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 hover:text-purple-600 transition-colors">
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
