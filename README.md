# Evotec Full-Stack Web Application

This is a full-stack web application built for the Evotec software developer assignment. It features user authentication, role-based access control, and a CRUD form management system.

## Tech Stack Used

- **Frontend:** React.js (Bootstrapped with Create React App)
- **UI Library:** Material UI (MUI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs for password hashing

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB instance running locally (or update the `.env` with a remote URI)

### 1. Backend Setup

Navigate to the `server` directory:
```bash
cd server
npm install
```

Configure your environment variables (see below).

Run the seed script to create the initial admin account:
```bash
node seed.js
```
*(The initial admin credentials will be: `admin@evotec.com` / `admin123`)*

Start the backend server:
```bash
npm run dev
# or
node server.js
```
The backend will run on `http://localhost:5000`.

### 2. Frontend Setup

Open a new terminal and navigate to the `client` directory:
```bash
cd client
npm install
```

Start the React development server:
```bash
npm start
```
The frontend will run on `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/evotec
JWT_SECRET=supersecret_evotec_jwt_key
JWT_REFRESH_SECRET=supersecret_evotec_jwt_refresh_key
```

## API Endpoint Documentation

### Authentication Routes (`/api/auth`)
- `POST /register`: Register a new customer.
  - Body: `{ "email": "user@test.com", "password": "password123", "confirmPassword": "password123" }`
- `POST /login`: Login as a customer.
  - Body: `{ "email": "user@test.com", "password": "password123" }`
- `POST /admin/login`: Login as an admin.
  - Body: `{ "email": "admin@evotec.com", "password": "admin123" }`
- `POST /admin/create`: Create a new admin (Requires Admin Token).
  - Body: `{ "email": "newadmin@evotec.com" }`

### Form Submission Routes (`/api/forms`)
- `POST /`: Submit a new application form (Requires Customer Token).
  - Body: `{ "firstName": "John", "lastName": "Doe", "email": "john@test.com", "gender": "MALE", "mobileNumber": "1234567890", "address": "123 Main St", "feedback": "Great service!" }`

### Admin Dashboard Routes (`/api/admin/forms`)
- `GET /`: Retrieve all submissions (Requires Admin Token).
  - Query Params: `?search=John` (Search by first or last name), `?gender=MALE` (Filter by gender)
- `PUT /:id`: Update a submission by ID (Requires Admin Token).
  - Body: Fields to update
- `DELETE /:id`: Delete a submission by ID (Requires Admin Token).
