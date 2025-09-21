#  Ecommerce API v2

## Description
The E-commerce API v2 is a feature-rich backend service for building modern online stores. It provides endpoints to manage products, users, and orders, with secure authentication and authorization. This project is designed to support scalable e-commerce applications with robust data handling and structured API design.

## Features
-Authentication & Authorization using JWT

-User management (register, login, profile update)

-Product management (create, update, delete, list products)

-Order management (create, update status, view user orders)

-Protected routes for users and admins

-RESTful API design with scalability in mind

-Environment configuration with .env

## Installation & Usage

``bash
# Clone the repository
git clone https://github.com/Don-pizu/ecommerce-api-v2.git

# Navigate into the project folder
cd ecommerce-api-v2

# Install dependencies
npm install

# Start the server
node server.js

project-root/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── productController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Cart.js
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── utils/
│   └── payment.js
├── .env
├── server.js
└── README.md



## API Endpoints

## Authentication

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | `/auth/signup` | Register new user       |
| POST   | `/auth/login`  | Login user & return JWT |


## Product Routes

| Method | Endpoint        | Description        | Access     |
| ------ | --------------- | ------------------ | ---------- |
| GET    | `/products`     | Get all products   | Public     |
| GET    | `/products/:id` | Get single product | Public     |
| POST   | `/products`     | Create product     | Admin only |
| PATCH  | `/products/:id` | Update product     | Admin only |
| DELETE | `/products/:id` | Delete product     | Admin only |

## Cart Routes

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | `/cart/add`        | Add product to cart   |
| GET    | `/cart`            | View user cart        |
| DELETE | `/cart/remove/:id` | Remove item from cart |

## Orders Routes

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | `/orders/checkout` | Create order from cart     |
| POST   | `/orders/confirm`  | Confirm payment simulation |
| GET    | `/orders`          | View all user orders       |
| GET    | `/orders/:id`      | View single order          |


## Admin Routes

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| GET    | `/admin/orders`             | Get all orders             |
| PATCH  | `/admin/orders/:id/status`  | Update order status        |



## Technologies used
-Node.js
-Express.js
-MongoDB
-JWT Authentication
-Bcrypt.js (password hashing)
-dotenv (environment variables)
-Helmet, Express-rate-limit, Mongo-sanitize, XSS-clean
-Joi


## Author name

-Asiru Adedolapo

## Stage, Commit, and Push**

``bash
git add .
git commit -m "feat: initial project setup with folder structure and README"
git branch -M main
git remote add origin https://github.com/Don-pizu/ecommerce-api-v2.git
git push -u origin main

