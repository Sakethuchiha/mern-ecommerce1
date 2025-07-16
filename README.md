<<<<<<< HEAD
# 🛒 MERN E-Commerce

A full-stack e-commerce web application built with the **MERN stack** (MongoDB, Express, React, Node.js).

This project provides a seamless shopping experience—from browsing products to checking out—along with secure authentication and cart management. It's a solid foundation for building a real-world e-commerce platform.

---

## 🚀 Features

### 🔐 Authentication
- Users can **register** and **log in** securely.
- JWT tokens are used for authentication and stored in local storage.
- Logged-in user's name is shown in the navbar for a personalized experience.

### 🛍️ Product Listing
- View a list of all products on the **Home Page**.
- Click on any product to see **detailed information**.

### 🛒 Cart Functionality
- Add products to the cart from either the list or details page.
- Update item quantities and automatically see updated totals.
- Cart items **persist** even after logout using Redux.

### 💳 Checkout Flow
- Enter a **shipping address** and view **order details**.
- Multiple **payment options** (UI only, integration-ready).
- Orders are saved in the backend after checkout.

---

## 🧠 State Management

- Built with **Redux Toolkit** for global state management.
- Manages user sessions, cart contents, and order details.
- Ensures data like cart items persist across pages and sessions.

---

## 🛠️ Backend (Node.js + Express)

### 📁 Collections in MongoDB:
- `users` – stores user credentials and profile data.
- `products` – contains product information.
- `cart` – holds items added by each user.
- `orders` – saves order details after checkout.

### ✅ API Highlights:
- Secure routes protected via JWT tokens.
- Reflects real-time updates from frontend to database.

---

## 🧪 How It Works

1. **Register** or **log in** to start shopping.
2. Browse and **add items** to your cart.
3. Adjust **quantities** or remove items from the cart.
4. Go to **checkout**, enter your address, and choose a payment option.
5. Your cart, orders, and user info are stored in **MongoDB** and reflected instantly in the UI.

---

## 🧰 Tech Stack

- **Frontend**: React, Tailwind CSS, Redux Toolkit, Axios, React Router
- **Backend**: Node.js, Express.js, Mongoose, JWT
- **Database**: MongoDB (via Atlas or local)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3. Set Up Environment Variables

In the `server` folder, create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the Servers

#### Backend
```bash
cd server
npm start
```

#### Frontend
```bash
cd client
npm run dev
```

---

=======
# MERN E-Commerce

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

### Frontend (React)
- **User Registration & Login:**
  - Users can register and log in securely.
  - JWT token is used for authentication and is stored in local storage.
  - The logged-in user's name is displayed in the navbar.
- **Product Listing & Details:**
  - View all products on the home page.
  - Click on a product to view its details.
- **Cart Functionality:**
  - Add products to the cart from the product list or details page.
  - Update the quantity of items in the cart; the total amount updates automatically.
  - Cart items persist even after logout (using Redux for state management).
- **Checkout Flow:**
  - Enter shipping address and view order details during checkout.
  - Multiple payment options (UI only; integration can be added).

### Backend (Node.js, Express)
- **Authentication:**
  - Uses JWT tokens for secure authentication and protected routes.
- **MongoDB Database:**
  - Three main collections:
    - `users`: Stores user information and credentials.
    - `products`: Stores product details.
    - `cart`: Stores each user's cart items.
    - `orders`: Stores order details after checkout.
  - All frontend actions (cart, orders, user info) are reflected in the database.

### State Management
- **Redux** is used for global state management (user, cart, etc.), ensuring cart items persist across sessions and after logout.

## How It Works
- Register or log in to start shopping.
- Browse products, add them to your cart, and update quantities as needed.
- Proceed to checkout, enter your address, and select a payment option.
- Orders, cart, and user info are managed in MongoDB and reflected in the UI.

## Setup
1. Clone the repo and install dependencies in both `backend` and `frontend` folders.
2. Set up your MongoDB connection string in the backend `.env` file.
3. Start the backend and frontend servers.

---

**Enjoy your shopping experience with ShopNest!**
>>>>>>> e1c3a69 (changes)
