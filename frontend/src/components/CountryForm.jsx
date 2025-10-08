import React, { useState, useEffect } from 'react';

const CountryForm = ({ country, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    currency: ''
  });

  useEffect(() => {
    if (country) {
      setFormData({
        name: country.name || '',
        capital: country.capital || '',
        currency: country.currency || ''
      });
    }
  }, [country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.capital && formData.currency) {
      onSubmit(formData);
    }
  };

  return (
    <div className="country-form">
      <h2>{country ? 'Editar País' : 'Nuevo País'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="México"
            autoComplete="off"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="capital">Capital</label>
          <input
            type="text"
            id="capital"
            name="capital"
            value={formData.capital}
            onChange={handleChange}
            required
            placeholder="Ciudad de México"
            autoComplete="off"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="currency">Moneda</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
            placeholder="Peso Mexicano"
            autoComplete="off"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {country ? 'Actualizar' : 'Agregar'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CountryForm;
