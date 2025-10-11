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
    <div className="container mx-auto px-4 py-8">
      {/* Header sekcija */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Jelisandia
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Jelisandia je web prodavnica digitalnih slika iz kolekcije The Peepsicles.
        </p>
      </div>

      {/* Loading stanje */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Učitava se...</p>
        </div>
      )}

      {/* Grid proizvoda */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Paginacija */}
          {pagination && pagination.links && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <Button
                onClick={() => fetchProducts(pagination.links.prev)}
                disabled={!pagination.links.prev}
                variant="outline"
                size="medium"
              >
                Prethodna
              </Button>
              
              <span className="text-gray-600">
                Strana {pagination.current_page} od {pagination.last_page}
              </span>
              
              <Button
                onClick={() => fetchProducts(pagination.links.next)}
                disabled={!pagination.links.next}
                variant="outline"
                size="medium"
              >
                Sledeća
              </Button>
            </div>
          )}
        </>
      )}

      {/* Prazan stanje */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Nema dostupnih proizvoda.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
