import React from 'react';

const ProductCard = ({ product }) => {
  const imageUrl = `http://127.0.0.1:8000/storage/${product.preview_file_path}`;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Slika proizvoda */}
      <div className="aspect-w-16 aspect-h-12 bg-gray-200">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      
      {/* Sadržaj kartice */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
            Kupi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
