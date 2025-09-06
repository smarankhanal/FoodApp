# 🍽️ FoodApp

A complete **Food Ordering Application** with a **React + Vite frontend** and a **Node.js + Express backend**.  
Includes user features like food ordering, order history, profile management, dark/light mode, and an **admin panel** for managing users, food items, and orders.

---

## 🚀 Tech Stack

### Frontend
- **React (Vite)** → Fast and modern frontend build setup  
- **Redux Toolkit + Redux Persist** → Global state management with persistence  
- **React Hook Form** → Validated and user-friendly form handling  
- **Tailwind CSS** → Utility-first styling with dark mode support  
- **React Icons** → Lightweight icons  
- **React Loading Skeleton** → Skeleton UI for smooth loading states  

### Backend
- **Node.js + Express.js** → Robust backend framework  
- **MongoDB + Mongoose** → Database and schema modeling  
- **Cloudinary** → Media storage for images  
- **JWT** → Authentication and authorization  
- **bcrypt** → Secure password hashing  
- **express-validator** → Input validation  

---

## ✨ Features

### User
- 🍔 **Order Food** – Browse menu and place orders  
- 📜 **Order History** – View past orders in a timeline format  
- 🔑 **Change Password** – Update account credentials  
- 📝 **Update Profile** – Edit user details (name, email, avatar, etc.)  
- 🌙 **Dark / Light Mode** – Switch between themes  
- 💾 **Persistent State** – Cart & session persist after reload (Redux Persist)  
- 🦴 **Loading Skeletons** – Smooth experience while fetching data  

### Admin
- 🔑 **Admin Authentication** – Separate login for admins  
- 👥 **Manage Users** – View and update user accounts  
- 🍽️ **Manage Food Items** – Add, update, and delete food items with images  
- 📦 **Manage Orders** – View all orders and update status (pending, completed, cancelled)  

---

## ⚙️ Backend Env Setup

Create a `.env` file inside the backend folder:

```bash
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Admin Credentials
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
