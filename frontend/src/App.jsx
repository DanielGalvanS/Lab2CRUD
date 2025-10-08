import React, { useState, useCallback, useEffect } from 'react';
import CountryForm from './components/CountryForm';
import CountryList from './components/CountryList';
import CountryModal from './components/CountryModal';
import apiService from './services/api';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar países al iniciar
  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllCountries();
      setCountries(data);
    } catch (err) {
      setError('Error al cargar los países');
      console.error('Error loading countries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCountry = useCallback(() => {
    setEditingCountry(null);
    setIsModalOpen(true);
  }, []);

  const handleEditCountry = useCallback((country) => {
    setEditingCountry(country);
    setIsModalOpen(true);
  }, []);

  const handleSubmitCountry = useCallback(async (countryData) => {
    try {
      setError(null);
      if (editingCountry) {
        // Update existing country
        const updatedCountry = await apiService.updateCountry(editingCountry.id, countryData);
        setCountries(prev => 
          prev.map(country => 
            country.id === editingCountry.id ? updatedCountry : country
          )
        );
      } else {
        // Add new country
        const newCountry = await apiService.createCountry(countryData);
        setCountries(prev => [...prev, newCountry]);
      }
      setIsModalOpen(false);
      setEditingCountry(null);
    } catch (err) {
      setError('Error al guardar el país');
      console.error('Error saving country:', err);
    }
  }, [editingCountry]);

  const handleDeleteCountry = useCallback(async (countryId) => {
    const country = countries.find(c => c.id === countryId);
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${country?.name}"?`)) {
      try {
        setError(null);
        await apiService.deleteCountry(countryId);
        setCountries(prev => prev.filter(country => country.id !== countryId));
      } catch (err) {
        setError('Error al eliminar el país');
        console.error('Error deleting country:', err);
      }
    }
  }, [countries]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingCountry(null);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Países</h1>
        <p>Gestionar información de países</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={loadCountries} className="btn btn-secondary">
              Reintentar
            </button>
          </div>
        )}

        <div className="app-controls">
          <button 
            onClick={handleAddCountry}
            className="btn btn-primary btn-add"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Agregar País'}
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <p>Cargando países...</p>
          </div>
        ) : (
          <CountryList 
            countries={countries}
            onEdit={handleEditCountry}
            onDelete={handleDeleteCountry}
          />
        )}
      </main>

      <CountryModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CountryForm
          country={editingCountry}
          onSubmit={handleSubmitCountry}
          onCancel={handleCloseModal}
        />
      </CountryModal>
    </div>
  );
}

export default App;