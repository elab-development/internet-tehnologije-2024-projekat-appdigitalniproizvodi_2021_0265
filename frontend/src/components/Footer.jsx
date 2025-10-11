import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-gray-300">
            © {currentYear} Jelisandia Shop.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Prodaja digitalnih slika
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
