# Backend Documentation

## Overview
This project is the backend for a MERN-based real-time messaging application. It includes user authentication, profile management, and real-time messaging using Socket.IO. The backend is built with Node.js, Express, and MongoDB.

---

## Features
- **User Authentication**
  - Signup, login, and logout with JWT-based authentication.
  - Password hashing using `bcryptjs`.
  - Secure token management with `jsonwebtoken`.

- **User Management**
  - CRUD operations for user profiles.
  - Update profile picture functionality with Cloudinary integration.

- **Messaging**
  - Real-time messaging via `Socket.IO`.
  - Message persistence in MongoDB, including support for text and media messages.

- **Middleware**
  - Protected routes using JWT authentication.

---

## Project Structure
```
src/
├── controllers/    # Contains controller logic for routes
├── libs/           # Utility libraries (e.g., cloudinary, token creation)
├── middlewares/    # Middleware for authentication and validation
├── models/         # Mongoose models for database schemas
├── routers/        # API route definitions
├── server/         # Server configuration (Socket.IO setup)
└── index.js        # Entry point for the application
```

---

## Dependencies
Below are the major dependencies used:
- **Core Libraries**: `express`, `mongoose`
- **Authentication**: `jsonwebtoken`, `bcryptjs`
- **File Handling**: `cloudinary`
- **Real-Time Communication**: `socket.io`
- **Cookie Management**: `cookie-parser`
- **Environment Variables**: `dotenv`

---

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## API Routes
### **Auth Routes**
- **Signup**  
  `POST /api/auth/signup`  
  Creates a new user account.  

- **Login**  
  `POST /api/auth/login`  
  Authenticates a user and returns a JWT.  

- **Logout**  
  `POST /api/auth/logout`  
  Clears the JWT token from the client.

### **User Routes**
- **Update Profile Picture**  
  `PUT /api/user/update`  
  Updates the profile picture of the authenticated user.  

### **Message Routes**
- **Get Users**  
  `GET /api/message/sidebar`  
  Fetches all users except the logged-in user.  

- **Get Messages**  
  `GET /api/message/:id`  
  Retrieves messages exchanged between the logged-in user and a specific user.  

- **Send Message**  
  `POST /api/message/:id`  
  Sends a text or media message to a specific user.

---

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/sumit160803/Chitty-Chat.git
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file.
   - Add MongoDB URI, JWT secret, and Cloudinary credentials.

4. **Run the server**
   ```bash
   npm run dev
   ```

5. **Server will run on**
   ```
   http://localhost:5001
   ```

---

