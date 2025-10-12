import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  console.log('AdminRoute - loading:', loading, 'user:', user);

  
  if (loading) {
    console.log('AdminRoute - showing loading spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  
  if (!user) {
    console.log('AdminRoute - no user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  
  if (user.role !== 'admin') {
    console.log('AdminRoute - user is not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

 
  console.log('AdminRoute - user is admin, showing content');
  return children;
};

export default AdminRoute;
