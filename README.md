Sweet Shop Management System (TDD Kata)

Objective
The goal of this project is to design, build, and test a full-stack Sweet Shop Management System demonstrating backend API development, frontend SPA implementation, database integration, authentication, testing, and responsible AI usage.

Features
- User registration and login (JWT authentication)
- Role-based access control (USER / ADMIN)
- View, search, and filter sweets
- Purchase sweets (quantity decreases)
- Admin can add, update, restock, and delete sweets
- Fully tested backend using Jest & Supertest
- Modern React frontend with responsive UI

Tech Stack
Backend:
- Node.js, TypeScript, Express
- MongoDB, Mongoose
- JWT Authentication
- Jest, Supertest

Frontend:
- React, TypeScript
- Vite
- Axios
- Custom CSS

API Endpoints
Auth:
POST /api/auth/register
POST /api/auth/login

Sweets:
GET /api/sweets
GET /api/sweets/search
POST /api/sweets (Admin)
PUT /api/sweets/:id (Admin)
DELETE /api/sweets/:id (Admin)

Inventory:
POST /api/sweets/:id/purchase
POST /api/sweets/:id/restock (Admin)

Setup Instructions
Backend:
- cd backend
- npm install
- npm run dev

Frontend:
- cd frontend
- npm install
- npm run dev

Environment Variables (.env):
PORT=5001
MONGO_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=my_super_secret_key

Testing
- cd backend
- npm test

AI Usage
AI tools (ChatGPT) were used for:
- Boilerplate generation
- Writing and debugging tests
- Improving UI logic
- Debugging authentication issues

All AI-generated code was reviewed and modified manually.

Conclusion
This project demonstrates full-stack development skills, clean coding practices, TDD, and responsible AI usage.