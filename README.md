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
2. **Install Dependencies:**
   ```bash
   npm install
3. **Create a .env file:**
   Create a .env file at the root of your project, and add the following environment variables:
   ```bash
   DATABASE_URL=your_postgres_database_url
   PORT=3000
   ```

    Note:
    - If you use Docker, set the DATABASE_URL to postgresql://postgres:password@localhost:5432/productdb (assuming the default credentials in docker-compose.yml).
    - If you use NeonDB, replace your_postgres_database_url with the NeonDB connection string.

## **Database Setup**
- ### Option 1: Using Docker

  Run PostgreSQL in a Docker container:
  Create a docker-compose.yml file at the root of your project if it doesn't already exist:

  ```yaml
    version: '3.1'

    services:
    postgres:
        image: postgres:13
        container_name: productdb
        environment:
        POSTGRES_USER: postgres
        POSTGRES_PASSWORD: password
        POSTGRES_DB: productdb
        ports:
        - "5432:5432"
        volumes:
        - ./data/db:/var/lib/postgresql/data
        networks:
        - mynetwork

    networks:
    mynetwork:
        driver: bridge
  ```
  After that, run the following command to spin up the PostgreSQL container:

    ```bash
    docker-compose up -d
    ```
    This will start the PostgreSQL instance on localhost:5432 using the default credentials (postgres/password).

    Run migrations:
    Run Sequelize migrations to set up the necessary tables in your Dockerized PostgreSQL instance:

    ```bash
    npx sequelize-cli db:migrate

- ### Option 2: Using NeonDB
    Create a NeonDB Project. Go to NeonDB and create a PostgreSQL instance.
    
    Copy the connection string from your NeonDB dashboard in the following format:
    ```bash
    postgresql://username:password@your-neondb-url/dbname
    ```
    Update the .env file:
    Replace the DATABASE_URL value in the .env file with the connection string from NeonDB:

    ```bash
    DATABASE_URL=postgresql://username:password@your-neondb-url/dbname
    ```
    Run migrations:
    Run Sequelize migrations to create the required tables:

    ```bash
    npx sequelize-cli db:migrate 
