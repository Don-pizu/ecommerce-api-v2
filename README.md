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
├── controllers/
├── models/
├── routes/ 
├── middleware/
├── config/
├── tests/
├── server.js
├── .env
├── .gitignore
└── README.md


## Technologies used
-Node.js
-Express.js
-MongoDB
-JWT Authentication
-Bcrypt.js (password hashing)
-dotenv (environment variables)
-Helmet, Express-rate-limit, Mongo-sanitize, XSS-clean


## Author name

-Asiru Adedolapo

## Stage, Commit, and Push**

``bash
git add .
git commit -m "feat: initial project setup with folder structure and README"
git branch -M main
git remote add origin https://github.com/Don-pizu/ecommerce-api-v2.git
git push -u origin main

