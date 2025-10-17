import React from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  
  const { data: productsData, loading: productsLoading } = useApi('http://127.0.0.1:8000/api/products?per_page=1000');
  const { data: usersData, loading: usersLoading } = useApi('http://127.0.0.1:8000/api/users');
  const { data: purchasesData, loading: purchasesLoading } = useApi('http://127.0.0.1:8000/api/purchases');

  const handleViewPurchases = () => {
    
    navigate('/admin/products');
  };

  const productsCount = productsData?.data?.length || 0;
  const usersCount = usersData?.data?.length || 0;
  const purchasesCount = purchasesData?.data?.length || 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Dobrodošli u admin panel. Ovo je glavna stranica za upravljanje sajtom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Statistike kartice */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Ukupno proizvoda
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    -
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Registrovani korisnici
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    -
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h6.5M17 18h-6.5" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Ukupno kupovina
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    -
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brze akcije */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Brze akcije</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Dodaj novi proizvod</h3>
            <p className="text-gray-600 mb-4">Kreiraj novi proizvod u prodavnici</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Dodaj proizvod
            </button>
          </div>
          
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Pregled kupovina</h3>
            <p className="text-gray-600 mb-4">Pogledaj sve kupovine korisnika</p>
            <button 
              onClick={handleViewPurchases}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Pregled kupovina
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
