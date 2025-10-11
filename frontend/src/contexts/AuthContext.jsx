import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Proveri localStorage prilikom prvog učitavanja
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Dodaj malu pauzu da se aplikacija učita
        setTimeout(() => {
          try {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            
            if (storedToken && storedUser) {
              setToken(storedToken);
              setUser(JSON.parse(storedUser));
              
              // Postavi token za sve buduće axios zahteve
              axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            }
          } catch (error) {
            console.error('Greška pri učitavanju auth podataka:', error);
            // Ako ima grešku, obriši sve iz localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          } finally {
            setLoading(false);
          }
        }, 100);
      } catch (error) {
        console.error('Greška pri inicijalizaciji auth-a:', error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
      });

      const { user: userResponse, token: tokenResponse } = response.data;
      
      // Sačuvaj u localStorage
      localStorage.setItem('token', tokenResponse);
      localStorage.setItem('user', JSON.stringify(userResponse));
      
      // Ažuriraj state
      setUser(userResponse);
      setToken(tokenResponse);
      
      // Postavi token za sve buduće axios zahteve
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse}`;
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Greška pri registraciji:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Greška pri registraciji' 
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const { user: userResponse, token: tokenResponse } = response.data;
      
      // Sačuvaj u localStorage
      localStorage.setItem('token', tokenResponse);
      localStorage.setItem('user', JSON.stringify(userResponse));
      
      // Ažuriraj state
      setUser(userResponse);
      setToken(tokenResponse);
      
      // Postavi token za sve buduće axios zahteve
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse}`;
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Greška pri logovanju:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Greška pri logovanju' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      // Obriši iz localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Resetuj state
      setUser(null);
      setToken(null);
      
      // Ukloni token iz axios header-a
      delete axios.defaults.headers.common['Authorization'];
      
      console.log('Korisnik je uspešno odjavljen');
    } catch (error) {
      console.error('Greška pri odjavljivanju:', error);
    }
  };

  const purchaseProduct = async (productId) => {
    try {
      setLoading(true);
      
      const response = await axios.post(`http://127.0.0.1:8000/api/products/${productId}/purchase`);
      
      console.log('Kupovina uspešna:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Greška pri kupovini:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Greška pri kupovini proizvoda' 
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    purchaseProduct,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
