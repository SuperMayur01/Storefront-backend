# Storefront Backend Project

## Getting Started

Open in VS code and install docker extension

Perform npm install to install all dependencies

Commands to run:
start - npm run start
test - npm run test
build - npm run build
migrate-up - npm run migrate-up
migrate-down - npm run migrate-down

# Create .env file with following info:
POSTGRES_HOST=localhost
POSTGRES_DB=store_backend
POSTGRES_DB_TEST=store_backend_test
ENV=dev
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
CREATE DATABASE store_backend_test;
\c store_backend;

*Make sure docker container is running*

db-migrate up

### backend at localhost:3000 and database at localhost:5432
## Create a user first to receive jwt token and send token in headers as authorization: Bearer <token>