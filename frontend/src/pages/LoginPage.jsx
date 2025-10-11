import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Obriši grešku za to polje kada korisnik počne da kuca
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email je obavezan';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email nije ispravan';
    }
    
    if (!formData.password) {
      newErrors.password = 'Lozinka je obavezna';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Lozinka mora imati najmanje 6 karaktera';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitError('');
    
    const result = await login(formData);
    
    if (result.success) {
      navigate('/');
    } else {
      setSubmitError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Prijavite se na svoj nalog
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ili{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              registrujte se
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email adresa"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Unesite vaš email"
              required
              error={!!errors.email}
              errorMessage={errors.email}
            />
            
            <Input
              label="Lozinka"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Unesite vašu lozinku"
              required
              error={!!errors.password}
              errorMessage={errors.password}
            />
          </div>

          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {submitError}
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              size="large"
              disabled={loading}
            >
              {loading ? 'Prijavljivanje...' : 'Prijavite se'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
