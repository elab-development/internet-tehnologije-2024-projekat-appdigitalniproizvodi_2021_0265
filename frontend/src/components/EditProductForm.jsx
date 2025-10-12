import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import Button from './Button';

const EditProductForm = ({ product, onProductUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

 
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        image: null
      });
      if (product.preview_file_path) {
        setImagePreview(`http://127.0.0.1:8000/storage/${product.preview_file_path}`);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setFormData(prev => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Naziv je obavezan.';
    if (!formData.description.trim()) newErrors.description = 'Opis je obavezan.';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Cena mora biti pozitivan broj.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('_method', 'PUT'); // Laravel spoofing za PUT request
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://127.0.0.1:8000/api/products/${product.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert('Proizvod uspešno ažuriran!');
      if (onProductUpdated) {
        onProductUpdated(response.data.data);
      }
    } catch (error) {
      console.error('Greška pri ažuriranju proizvoda:', error);
      alert('Greška pri ažuriranju proizvoda. Proverite da li su svi podaci ispravni.');
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      image: null
    });
    setImagePreview(product.preview_file_path ? `http://127.0.0.1:8000/storage/${product.preview_file_path}` : null);
    setErrors({});
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Izmeni Proizvod</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Naziv proizvoda"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Unesite naziv"
            error={errors.name}
          />
          <Input
            label="Cena"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Unesite cenu"
            error={errors.price}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Opis proizvoda
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            value={formData.description}
            onChange={handleChange}
            placeholder="Unesite detaljan opis proizvoda"
            aria-describedby={errors.description ? "description-error" : undefined}
          ></textarea>
          {errors.description && <p id="description-error" className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        <div className="mt-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Nova slika proizvoda (opciono)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="max-w-xs h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-1">
                {formData.image ? 'Nova slika' : 'Trenutna slika'}
              </p>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={loading}
          >
            Poništi
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Otkaži
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Ažuriranje...
              </div>
            ) : (
              'Ažuriraj Proizvod'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
