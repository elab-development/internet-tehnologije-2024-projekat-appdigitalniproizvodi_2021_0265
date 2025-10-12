import React, { useState, useContext } from 'react';
import axios from 'axios';
import useApi from '../../hooks/useApi';
import AuthContext from '../../contexts/AuthContext';
import Button from '../../components/Button';
import AddProductForm from '../../components/AddProductForm';
import EditProductForm from '../../components/EditProductForm';

const AdminProductsPage = () => {
  const { token } = useContext(AuthContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  

  const { data: productsData, loading, error, refetch } = useApi('http://127.0.0.1:8000/api/products?per_page=1000');
  

  const products = productsData?.data || [];


  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?');
    
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert('Proizvod je uspešno obrisan!');
      

      if (refetch) {
        refetch();
      }
    } catch (error) {
      console.error('Greška pri brisanju proizvoda:', error);
      alert('Greška pri brisanju proizvoda. Pokušajte ponovo.');
    }
  };

  const handleProductAdded = (newProduct) => {
    setShowAddForm(false);
    if (refetch) {
      refetch();
    }
  };

  
  const handleProductUpdated = (updatedProduct) => {
    setEditingProduct(null);
    if (refetch) {
      refetch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upravljanje Proizvodima</h1>
            <p className="mt-2 text-gray-600">
              Uredjivanje proizvoda
            </p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showAddForm ? 'Otkaži' : 'Dodaj proizvod'}
          </Button>
        </div>
      </div>

          {showAddForm && (
            <div className="mb-8">
              <AddProductForm onProductAdded={handleProductAdded} />
            </div>
          )}

          {editingProduct && (
            <EditProductForm 
              product={editingProduct}
              onProductUpdated={handleProductUpdated}
              onCancel={() => setEditingProduct(null)}
            />
          )}

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pretraži proizvode
            </label>
            <input
              type="text"
              placeholder="Naziv proizvoda..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sortiraj po
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="name">Naziv (A-Z)</option>
              <option value="price">Cena (najjeftiniji)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
              Filtriraj
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Učitava se...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-700">Greška pri učitavanju proizvoda: {error}</span>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ime
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cena
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Akcije
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        Nema proizvoda za prikaz
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {product.preview_file_path ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={`http://127.0.0.1:8000/storage/${product.preview_file_path}`}
                                  alt={product.name}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {product.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${parseFloat(product.price).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => setEditingProduct(product)}
                                >
                                  Izmeni
                                </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              Obriši
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">
            Ukupno proizvoda: <span className="font-medium text-gray-900">{products.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
