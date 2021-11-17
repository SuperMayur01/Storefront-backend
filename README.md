# Storefront Backend Project

## Getting Started

Open in VS code and install docker extension

Perform npm install to install all dependencies

Commands to run:
start - npm run start
test - npm run test
build - npm run build

# Create .env file with following info:
POSTGRES_HOST=localhost
POSTGRES_DB=store_backend
POSTGRES_USER=postgres
POSTGRES_PASSWORD=helloworld
BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10
PEPPER=ENCRYPT
TOKEN_SECRET=let-me-in

# Database Setup:

- Run following commands
docker run -p 5432:5432 --name myBack -e POSTGRES_PASSWORD=helloworld -d postgres
docker exec -it myBack bash
su postgres
psql
CREATE DATABASE store_backend;
\c store_backend;

*Make sure docker container is running*

db-migrate up

### backend at localhost:3000 and database at localhost:5432
## Create a user first to receive jwt token and send token in headers as authorization: Bearer <token>

# Api Endpoints:

### User
GET '/users' [token required] - get all users
GET '/users/:id' [token required] - get user by id {id in params}
POST '/users' [token create] -  create a user {firstname, lastname, password in body}

### Products
GET '/products' - get all products
GET '/products/:id' - get product by id {id in params}
POST '/products' [token required] -  create a product {name, price, category in body} 
GET '/products/:category' - product by category {category in params}

### Orders
GET '/orders/:id' [token required] - get order by id {id in params}
POST '/orders' [token required] - create an order {user_id, quantity, order_id, product_id in body}