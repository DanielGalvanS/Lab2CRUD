import React from 'react';

const CountryList = ({ countries, onEdit, onDelete }) => {
  if (countries.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay países registrados. ¡Agrega el primero!</p>
      </div>
    );
  }

  return (
    <div className="country-list">
      <h2>Países ({countries.length})</h2>
      <div className="countries-grid">
        {countries.map((country) => (
          <div key={country.id} className="country-card">
            <div className="country-info">
              <h3 className="country-name">{country.name}</h3>
              <div className="country-details">
                <p><strong>Capital:</strong> {country.capital}</p>
                <p><strong>Moneda:</strong> {country.currency}</p>
              </div>
            </div>
            <div className="country-actions">
              <button 
                onClick={() => onEdit(country)} 
                className="btn btn-edit"
                title="Editar"
                aria-label="Editar"
              >
                Editar
              </button>
              <button 
                onClick={() => onDelete(country.id)} 
                className="btn btn-delete"
                title="Eliminar"
                aria-label="Eliminar"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
