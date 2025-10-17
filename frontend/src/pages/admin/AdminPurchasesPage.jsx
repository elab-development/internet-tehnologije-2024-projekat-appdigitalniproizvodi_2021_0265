import React from 'react';
import useApi from '../../hooks/useApi';

const AdminPurchasesPage = () => {
  const { data: purchasesData, loading, error } = useApi('http://127.0.0.1:8000/api/purchases');
  
  const purchases = purchasesData?.data || [];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Učitava se...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">
            Greška pri učitavanju kupovina: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sve kupovine</h1>
        <p className="mt-2 text-gray-600">
          Pregled svih kupovina korisnika
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          {purchases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nema kupovina za prikaz</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Korisnik
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Proizvod
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cena
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Datum kupovine
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {purchase.user?.name || 'Nepoznat korisnik'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {purchase.user?.email || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {purchase.product?.name || 'Nepoznat proizvod'}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {purchase.product?.description || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${parseFloat(purchase.product?.price || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {purchase.created_at ? new Date(purchase.created_at).toLocaleDateString('sr-RS') : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPurchasesPage;
