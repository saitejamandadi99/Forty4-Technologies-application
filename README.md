# Forty4 Technologies Application

A full-stack MERN application for managing users with create, read, update, and delete (CRUD) functionality. Built with React and Bootstrap on the frontend, and Express, MongoDB, and Mongoose on the backend.

## Live URLs

- Frontend: https://forty4-technologies-application-fro.vercel.app/  
- Backend API: https://forty4-technologies-application.vercel.app/api  

## GitHub Repositories

- Frontend: https://github.com/saitejamandadi99/Forty4-Technologies-application/tree/main/ff-frontend  
- Backend:  https://github.com/saitejamandadi99/Forty4-Technologies-application/tree/main/ff-backend  

## Features

- Dashboard listing all users in responsive Bootstrap cards  
- Create user form with nested address and geolocation  
- View, edit, and delete user operations  
- Frontend routing with React Router v7  
- Environment-based API URL configuration  
- Input validation on both frontend and backend  
- Responsive design for mobile and desktop  

## Frontend (ff-frontend)

### Tech Stack

- React 19  
- React Router v7  
- Axios for HTTP requests  
- Bootstrap 5 & React-Bootstrap  
- Optional Tailwind CSS (installed but can be removed)  
- react-dotenv for environment variables  

### Available Scripts

```bash
cd ff-frontend
npm install
npm start
# Runs development server on http://localhost:3000
npm run build
# Builds production bundle into /build
```

### Environment Variables

Create a `.env.local` file in the project root:

```
REACT_APP_API_URL=https://forty4-technologies-application.vercel.app
```

## Backend (ff-backend)

### Tech Stack

- Node.js & Express 5  
- MongoDB & Mongoose  
- CORS  
- dotenv for configuration  

### Available Scripts

```bash
cd ff-backend
npm install
npm start
# Runs server with nodemon on port 5000 by default
```

### Environment Variables

Create a `.env` file in the project root:

```
MONGODB_URI=<Your MongoDB connection string>
PORT=5000
```

## API Endpoints

All routes are prefixed with `/api/users`:

| HTTP Method | Endpoint           | Description                 |
| ----------- | ------------------ | --------------------------- |
| GET         | `/api/users`       | Fetch all users             |
| POST        | `/api/users`       | Create a new user           |
| GET         | `/api/users/:id`   | Get a user by ID            |
| PUT         | `/api/users/:id`   | Update a user by ID         |
| DELETE      | `/api/users/:id`   | Delete a user by ID         |

## Directory Structure

```
ff-frontend/
├── public/
├── src/
│   ├── api/           # Axios API wrappers
│   ├── components/    # Reusable components (Navbar, UserCard)
│   ├── pages/         # Views: Dashboard, ViewUser, EditUser, CreateUser
│   ├── App.js
│   ├── index.js
│   └── index.css
└── .env.local

ff-backend/
├── controllers/       # Route handlers
├── models/            # Mongoose schemas
├── routes/            # Express routers
├── index.js           # Application entry point
└── .env
```

## Author

Saiteja Mandadi  
