# 🌍 Country CRUD - Full Stack Application

A complete full-stack application for managing country information with PostgreSQL database, Node.js/Express backend, and React frontend.

## 🏗️ Architecture

- **Frontend**: React + Vite (Port 5173)
- **Backend**: Node.js + Express (Port 5000)
- **Database**: PostgreSQL
- **API**: RESTful API with CRUD operations

## 🚀 Quick Start

### Prerequisites

- Node.js (version 20.19+ or 22.12+)
- PostgreSQL database
- npm or yarn

### 1. Database Setup

First, make sure PostgreSQL is running and create a database:

```sql
CREATE DATABASE countries_db;
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd country-api-postgres

# Install dependencies
npm install

# Create .env file with database configuration
echo "DB_HOST=localhost
DB_PORT=5432
DB_NAME=countries_db
DB_USER=your_username
DB_PASSWORD=your_password
PORT=5000" > .env

# Start the backend server
npm start
```

The backend will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📊 Database Schema

The application uses a simple `country` table:

```sql
CREATE TABLE country (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  capital VARCHAR(100),
  currency VARCHAR(100)
);
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/countries` | Get all countries |
| GET | `/api/countries/:id` | Get country by ID |
| POST | `/api/countries` | Create new country |
| PUT | `/api/countries/:id` | Update country |
| DELETE | `/api/countries/:id` | Delete country |

### Example API Usage

```javascript
// Get all countries
GET http://localhost:5000/api/countries

// Create a new country
POST http://localhost:5000/api/countries
Content-Type: application/json

{
  "name": "México",
  "capital": "Ciudad de México",
  "currency": "Peso Mexicano"
}
```

## 🎨 Frontend Features

- **Minimalist Design**: Clean, simple interface
- **Real-time Data**: Connected to PostgreSQL database
- **CRUD Operations**: Create, Read, Update, Delete countries
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls
- **Responsive Design**: Works on all devices

## 🛠️ Development

### Backend Development

```bash
cd country-api-postgres
npm run dev  # If you have nodemon installed
```

### Frontend Development

```bash
cd frontend
npm run dev
```

### Testing API Connection

You can test the API connection using the test utility:

```javascript
import { testApiConnection } from './src/utils/testApi.js';

// Test API connection
testApiConnection();
```

## 📁 Project Structure

```
Lab2CRUD/
├── country-api-postgres/          # Backend API
│   ├── controllers/
│   │   └── countryController.js   # CRUD operations
│   ├── routes/
│   │   └── countryRoutes.js       # API routes
│   ├── db.js                      # Database connection
│   ├── server.js                  # Express server
│   └── package.json
├── frontend/                      # React Frontend
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── services/
│   │   │   └── api.js             # API service
│   │   ├── utils/
│   │   │   └── testApi.js         # API testing
│   │   └── App.jsx                # Main app
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `country-api-postgres` directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=countries_db
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
PORT=5000
```

### CORS Configuration

The backend is configured with CORS to allow requests from the frontend running on port 5173.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **API Connection Failed**
   - Verify backend is running on port 5000
   - Check CORS configuration
   - Verify API endpoints are accessible

3. **Frontend Build Issues**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

### Port Conflicts

- Backend: Change `PORT` in `.env` file
- Frontend: Change port in `vite.config.js`

## 📝 Features

### Backend Features
- ✅ PostgreSQL database integration
- ✅ RESTful API with full CRUD operations
- ✅ Error handling and validation
- ✅ CORS enabled for frontend communication

### Frontend Features
- ✅ Minimalist, clean design
- ✅ Real-time data from database
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ Form validation
- ✅ Modal interface for forms

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy to your preferred hosting service

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update API URL in `src/services/api.js` if needed

## 📄 License

This project is open source and available under the MIT License.
