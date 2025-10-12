import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import useApi from '../hooks/useApi';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';

const ProfilePage = () => {
  const { user: authUser, logout, isAuthenticated, loading: authLoading } = useAuth();
  
  
  const { 
    data: userData, 
    loading: userLoading, 
    error: userError 
  } = useApi(isAuthenticated ? 'http://127.0.0.1:8000/api/me' : null);
  
  
  const { 
    data: purchasesData, 
    loading: purchasesLoading, 
    error: purchasesError 
  } = useApi(isAuthenticated ? 'http://127.0.0.1:8000/api/my-purchases' : null);

  
  const breadcrumbs = [
    { label: 'Početna', to: '/' },
    { label: 'Moj profil', to: null }
  ];

  
  const isLoading = authLoading || userLoading || purchasesLoading;

  
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">Morate se ulogovati da biste pristupili profilu.</p>
          <Button 
            onClick={() => window.location.href = '/login'}
            variant="primary"
          >
            Uloguj se
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs links={breadcrumbs} />
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Učitava se...</p>
        </div>
      </div>
    );
  }


  if (userError || purchasesError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs links={breadcrumbs} />
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">
            Greška pri učitavanju podataka: {userError?.message || purchasesError?.message}
          </p>
        </div>
      </div>
    );
  }

  const user = userData?.user || authUser;
  const purchases = purchasesData?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs links={breadcrumbs} />

      <div className="max-w-4xl mx-auto">
        {/* Informacije o korisniku */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Moj profil
            </h1>
            <Button 
              onClick={logout}
              variant="outline"
              size="medium"
            >
              Odjavi se
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Lični podaci
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-700">Ime:</span>
                  <span className="ml-2 text-gray-900">{user?.name || 'N/A'}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-900">{user?.email || 'N/A'}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Uloga:</span>
                  <span className="ml-2 text-gray-900 capitalize">{user?.role || 'N/A'}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Član od:</span>
                  <span className="ml-2 text-gray-900">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('sr-RS') : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Statistike
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-700">Ukupno kupovina:</span>
                  <span className="ml-2 text-gray-900">{purchases.length}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Ukupno potrošeno:</span>
                  <span className="ml-2 text-gray-900">
                    ${purchases.reduce((total, purchase) => {
                      const price = parseFloat(purchase.product?.price || 0);
                      return total + price;
                    }, 0).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Istorija kupovina */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Istorija kupovina
          </h2>
          
          {purchases.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg mb-4">
                Niste još kupili nijedan proizvod.
              </p>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="primary"
              >
                Pregledaj proizvode
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div 
                  key={purchase.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {purchase.product?.name || 'Nepoznat proizvod'}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {purchase.product?.description || 'Nema opisa'}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          Cena: <span className="font-medium text-blue-600">
                            ${parseFloat(purchase.product?.price || 0).toFixed(2)}
                          </span>
                        </span>
                        <span>
                          Kupljeno: {new Date(purchase.created_at).toLocaleDateString('sr-RS')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <Button 
                        onClick={() => window.location.href = `/products/${purchase.product?.id}`}
                        variant="outline"
                        size="small"
                      >
                        Pogledaj
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
