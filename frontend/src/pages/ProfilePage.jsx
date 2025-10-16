import React from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import useApi from '../hooks/useApi';
import Button from '../components/Button';
import Breadcrumbs from '../components/Breadcrumbs';

const ProfilePage = () => {
  const { isAuthenticated, loading: authLoading, token } = useAuth();

  const handleDownload = async (purchaseId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/my-purchases/${purchaseId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'download.png';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert('Fajl je uspešno preuzet!');
    } catch (error) {
      console.error('Greška pri preuzimanju fajla:', error);
      if (error.response?.status === 403) {
        alert('Nemate pravo da preuzmete ovaj fajl.');
      } else if (error.response?.status === 404) {
        alert('Fajl nije pronađen.');
      } else {
        alert('Greška pri preuzimanju fajla. Pokušajte ponovo.');
      }
    }
  };
  
  
  
  
  const { data: purchasesData, loading: purchasesLoading, error: purchasesError } = useApi(isAuthenticated ? 'http://127.0.0.1:8000/api/my-purchases' : null);

  
  const breadcrumbs = [
    { label: 'Početna', to: '/' },
    { label: 'Moj profil', to: null }
  ];

  
  const isLoading = authLoading || purchasesLoading;

  
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


  if (purchasesError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs links={breadcrumbs} />
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">
            Greška pri učitavanju podataka: {purchasesError?.message}
          </p>
        </div>
      </div>
    );
  }

  const purchases = purchasesData?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs links={breadcrumbs} />

      <div className="max-w-4xl mx-auto">
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
                    
                    <div className="ml-4 flex space-x-2">
                      <Button 
                        onClick={() => window.location.href = `/products/${purchase.product?.id}`}
                        variant="outline"
                        size="small"
                      >
                        Pogledaj
                      </Button>
                      <Button 
                        onClick={() => handleDownload(purchase.id)}
                        variant="primary"
                        size="small"
                      >
                        Download
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
