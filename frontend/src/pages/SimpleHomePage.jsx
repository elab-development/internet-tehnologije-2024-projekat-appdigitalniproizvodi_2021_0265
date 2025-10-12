import React from 'react';

const SimpleHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Jelisandia Shop</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Test Proizvod 1</h3>
            <p className="text-gray-600 mb-4">Opis proizvoda...</p>
            <p className="text-xl font-bold text-green-600">$19.99</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Test Proizvod 2</h3>
            <p className="text-gray-600 mb-4">Opis proizvoda...</p>
            <p className="text-xl font-bold text-green-600">$29.99</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Test Proizvod 3</h3>
            <p className="text-gray-600 mb-4">Opis proizvoda...</p>
            <p className="text-xl font-bold text-green-600">$39.99</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">Ovo je jednostavna test stranica bez API poziva.</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleHomePage;
