import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import Input from './Input';
import Button from './Button';

const AddProductForm = ({ onProductAdded }) => {
  const { token } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
    

    if (errors.image) {
      setErrors(prev => ({
        ...prev,
        image: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Naziv proizvoda je obavezan';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Opis proizvoda je obavezan';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Cena je obavezna';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Cena mora biti validan pozitivan broj';
    }
    
    if (!formData.image) {
      newErrors.image = 'Slika je obavezna';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name.trim());
      submitData.append('description', formData.description.trim());
      submitData.append('price', formData.price.trim());
      submitData.append('image', formData.image);
      
      const response = await axios.post('http://127.0.0.1:8000/api/products', submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 201) {
        alert('Proizvod uspešno kreiran!');
        
        setFormData({
          name: '',
          description: '',
          price: '',
          image: null
        });
        
        const fileInput = document.getElementById('image');
        if (fileInput) {
          fileInput.value = '';
        }
        
        if (onProductAdded) {
          onProductAdded(response.data);
        }
      }
    } catch (error) {
      console.error('Greška pri kreiranju proizvoda:', error);
      
      if (error.response?.data?.errors) {
        const validationErrors = {};
        Object.keys(error.response.data.errors).forEach(key => {
          validationErrors[key] = error.response.data.errors[key][0];
        });
        setErrors(validationErrors);
      } else {
        alert('Greška pri kreiranju proizvoda. Pokušajte ponovo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dodaj novi proizvod</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Naziv proizvoda */}
          <Input
            label="Naziv proizvoda"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Unesite naziv proizvoda"
            error={errors.name}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis proizvoda
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Unesite opis proizvoda"
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
          
          <Input
            label="Cena"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            placeholder="0.00"
            error={errors.price}
            required
          />
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slika proizvoda
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.image ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
            {formData.image && (
              <p className="mt-1 text-sm text-gray-600">
                Odabrana slika: {formData.image.name}
              </p>
            )}
          </div>
          
          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Kreira se...
                </>
              ) : (
                'Kreiraj proizvod'
              )}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  image: null
                });
                setErrors({});
                const fileInput = document.getElementById('image');
                if (fileInput) {
                  fileInput.value = '';
                }
              }}
              className="flex-1"
            >
              Poništi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
