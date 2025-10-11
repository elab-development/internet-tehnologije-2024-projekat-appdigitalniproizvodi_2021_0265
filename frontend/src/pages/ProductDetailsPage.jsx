import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching product with ID:', id);
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        console.log('API Response:', response.data);
        console.log('Product data:', response.data.data);
        setProduct(response.data.data);
      } catch (err) {
        console.error('Greška pri učitavanju proizvoda:', err);
        console.error('Error details:', err.response?.data);
        setError('Greška pri učitavanju proizvoda');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Breadcrumbs konfiguracija
  const breadcrumbs = [
    { label: 'Početna', to: '/' },
    { label: product ? product.name : 'Proizvod', to: null }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Učitava se...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">
            {error || 'Proizvod nije pronađen'}
          </p>
          <Button 
            onClick={() => window.history.back()} 
            variant="outline" 
            className="mt-4"
          >
            Nazad
          </Button>
        </div>
      </div>
    );
  }

  const imageUrl = `http://127.0.0.1:8000/storage/${product.preview_file_path}`;
  console.log('Image URL:', imageUrl);
  console.log('Preview file path:', product.preview_file_path);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs links={breadcrumbs} />

      {/* Sadržaj proizvoda */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Slika proizvoda */}
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
          </div>
        </div>

        {/* Informacije o proizvodu */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-blue-600">
              ${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price || 0).toFixed(2)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Opis proizvoda
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Dugmad */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1"
              size="large"
            >
              Kupi proizvod
            </Button>
            <Button 
              variant="outline" 
              size="large"
              onClick={() => window.history.back()}
            >
              Nazad
            </Button>
          </div>

          {/* Dodatne informacije */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Informacije o proizvodu
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">ID proizvoda:</span> #{product.id || 'N/A'}</p>
              <p><span className="font-medium">Datum kreiranja:</span> {product.created_at ? new Date(product.created_at).toLocaleDateString('sr-RS') : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
