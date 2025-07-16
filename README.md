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

