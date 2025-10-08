const API_BASE_URL = 'http://localhost:3001/api/countries';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Obtener todos los países
  async getAllCountries() {
    return this.request('');
  }

  // Obtener un país por ID
  async getCountryById(id) {
    return this.request(`/${id}`);
  }

  // Crear un nuevo país
  async createCountry(countryData) {
    return this.request('', {
      method: 'POST',
      body: JSON.stringify(countryData),
    });
  }

  // Actualizar un país
  async updateCountry(id, countryData) {
    return this.request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(countryData),
    });
  }

  // Eliminar un país
  async deleteCountry(id) {
    return this.request(`/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
