# FoodApp



# 🍔 FoodApp Backend

This is the backend API for **FoodApp**, a Node.js Express application for managing users, food items, orders, and authentication (including admin functionality).

---

## 🚀 Features

✅ User Registration with:

- Avatar and cover image upload to Cloudinary
- Validation using `express-validator`
- Password hashing with bcrypt
- Email normalization

✅ Authentication:

- Login and protected routes using JWT
- Admin login and authorization middleware

✅ Food Items:

- CRUD operations
- Image uploads

✅ Orders:

- Create orders with multiple food items
- Retrieve order history

✅ Validations:

- Strong request validation with `express-validator`
- Custom error handling with clear messages

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **Cloudinary** for media storage
- **JWT** for authentication
- **bcrypt** for password hashing
- **express-validator** for input validation

---

## 📂 Folder Structure

backend/
├── controllers/ # Request handlers
│ ├── auth.controller.js
│ └── user.controller.js

│
├── middlewares/
│ ├── validate.middleware.js
│ ├── auth.middleware.js
│ └── errorHandler.js
│
├── models/ # Mongoose schemas
│ └── user.model.js
│
├── routes/ # Express routes
│ └── auth.routes.js
│├── utils/ # Utility functions
│ ├── ApiError.js
│ ├── ApiResponse.js
│ └── uploadOnCloudinary.js
│
├── uploads/ # (Optional) Temporary storage
│
├── .env
├── server.js
└── package.json

## Env

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
