import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

const ProductCard = ({ product }) => {
  const { isAuthenticated, purchaseProduct } = useAuth();
  const [purchasing, setPurchasing] = useState(false);
  const [message, setMessage] = useState(null);
  const imageUrl = `http://127.0.0.1:8000/storage/${product.preview_file_path}`;

  const handlePurchase = async (e) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!isAuthenticated) {
      setMessage({ type: 'error', text: 'Morate se ulogovati da biste kupili proizvod.' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setPurchasing(true);
    setMessage(null);

    try {
      const result = await purchaseProduct(product.id);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Uspešno ste kupili proizvod!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Greška pri kupovini proizvoda.' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error('Greška pri kupovini:', error);
      setMessage({ type: 'error', text: 'Greška pri kupovini proizvoda.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setPurchasing(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Slika proizvoda - link na detalje */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-w-16 aspect-h-12 bg-gray-200">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
        </div>
      </Link>
      
      {/* Sadržaj kartice */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          
          <Button 
            onClick={handlePurchase}
            size="small"
            disabled={purchasing}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {purchasing ? 'Kupuje...' : 'Kupi'}
          </Button>
        </div>

        {/* Poruka o kupovini */}
        {message && (
          <div className={`mt-3 p-2 rounded text-xs ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
