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

food-app-backend/
-├── 📁 config/              # Configuration files (e.g., db, cloudinary)
│   ├── db.js
│   └── cloudinary.js
│
-├── 📁 controllers/         # Route handler functions
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── food.controller.js
│   └── order.controller.js
│
-├── 📁 middlewares/         # Custom middleware functions
│   ├── auth.middleware.js
│   ├── adminAuth.middleware.js
│   ├── validate.middleware.js
│   └── errorHandler.middleware.js
│
-├── 📁 models/              # Mongoose models
│   ├── user.model.js
│   ├── foodItem.model.js
│   └── order.model.js
│
-├── 📁 routes/              # Express route definitions
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── food.routes.js
│   └── order.routes.js
│
-├── 📁 utils/               # Utility/helper functions
│   ├── asyncHandler.js
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── jwtHelper.js
│   └── toTitleCase.js
│
-├── 📁 uploads/             # Temporary image storage (for local uploads)
│
-├── 📁 public/              # Public static files (optional)
│
-├── 📁 validations/         # express-validator schemas
│   ├── auth.validation.js
│   └── user.validation.js
│
-├── .env                    # Environment variables
-├── .gitignore
-├── package.json
-├── README.md
-├── server.js               # Entry point
-└── app.js                  # Express app setup

## ⚙️ .env Configuration

Create a `.env` file in the root directory and add the following:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/foodapp
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret

