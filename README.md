# **Product Management API**

This project is a simple RESTful API for managing a list of products. The API allows users to create, read, update, and delete products, with attributes such as name, price, description, and category. It is built using **Node.js** with **Express.js** as the framework, and **PostgreSQL** as the database, using **Sequelize ORM** for database interactions.

## **Features**

- Add a new product
- Fetch all products
- Fetch a single product by ID
- Update an existing product
- Delete a product by ID
- Data validation and error handling
- Optional pagination and search functionality

## **Table of Contents**

1. [Installation](#installation)
2. [Database Setup](#database-setup)
   - [Option 1: Using Docker](#option-1-using-docker)
   - [Option 2: Using NeonDB](#option-2-using-neondb)
3. [API Endpoints](#api-endpoints)
4. [Database Model](#database-model)
5. [Error Handling](#error-handling)
6. [Extra Features](#extra-features)
7. [Contributing](#contributing)
8. [License](#license)

---

## **Installation**

### **Requirements**
- Node.js (>= 14.x)
- PostgreSQL or MySQL
- Docker (if using the Docker setup)

### **Steps**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/product-api.git
   cd product-api
