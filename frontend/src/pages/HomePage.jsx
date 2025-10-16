import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);

  const fetchProducts = async (url = 'http://127.0.0.1:8000/api/products') => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      
      setProducts(response.data.data);
      setPagination(response.data);
    } catch (error) {
      console.error('Greška pri učitavanju proizvoda:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-center mb-12">Istraži kolekciju</h1>
      </div>

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Učitava se...</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {pagination && pagination.links && (
            <div className="flex flex-col items-center mt-12 space-y-4">
              <div className="flex items-center space-x-6">
                <Button
                  onClick={() => fetchProducts(pagination.links.prev)}
                  disabled={!pagination.links.prev}
                  className={`px-5 py-2 rounded-md transition-all duration-200 ${
                    !pagination.links.prev 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  ← Prethodna
                </Button>
                
                <span className="text-gray-600 font-medium px-4 py-2 bg-gray-100 rounded-lg">
                  Strana {pagination.current_page} od {pagination.last_page}
                </span>
                
                <Button
                  onClick={() => fetchProducts(pagination.links.next)}
                  disabled={!pagination.links.next}
                  className={`px-5 py-2 rounded-md transition-all duration-200 ${
                    !pagination.links.next 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Sledeća →
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Nema dostupnih proizvoda.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
