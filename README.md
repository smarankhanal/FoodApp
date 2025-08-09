# FoodApp

# 🍽️ FoodApp - Frontend

A responsive and modern **Food Ordering App** frontend built with **React + Vite**, styled using **Tailwind CSS**, and powered by **Redux Toolkit** for state management.  
It includes features such as ordering food, viewing order history, updating user details, switching between light/dark mode, and more.

---

## 🚀 Tech Stack

- **React (Vite)** → Fast and modern frontend build setup
- **React Hook Form** → For smooth and validated form handling
- **Redux Toolkit** → State management for global app data
- **Tailwind CSS** → Utility-first styling with dark mode support
- **React Icons** → Beautiful, lightweight icons

---

## ✨ Features

- 🍔 **Order Food** – Browse menu items and place orders.
- 📜 **View Order History** – Check all past orders in a clean history page.
- 🔑 **Change Password** – Securely update account credentials.
- 📝 **Update User Details** – Edit name, email, and other profile information.
- 🌙 **Dark / Light Mode Toggle** – Switch themes with smooth styling.
- ⚡ **Fast Performance** – Powered by Vite for lightning-fast development and builds.
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop.

---

## Backend

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

## Env

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```
