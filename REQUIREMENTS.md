# Api Endpoints:

### User
GET '/users' [token required] - get all users
GET '/users/:id' [token required] - get user by id {id in params}
POST '/users' [token create] -  create a user {firstname, lastname, password in body}

#### Users shape
##### users table
id - serial primary key
firstname - varchar
lastname - varchar
password - varchar

### Products
GET '/products' - get all products
GET '/products/:id' - get product by id {id in params}
POST '/products' [token required] -  create a product {name, price, category in body} 
GET '/products/:category' - product by category {category in params}

#### Products shape
##### products table
id - serial primary key
name - varchar
price - int
category - varchar

### Orders
GET '/orders/:id' [token required] - get order by id {id in params}
POST '/orders' [token required] - create an order {user_id, quantity, order_id, product_id in body}

#### Orders shape
##### orders table
id - serial primary key
user_id - bigint (references id in users table)
status - varchar (default value set to active)

##### order_products table
id - serial primary key
quantity - int 
order_id - bigint (references id in orders table)
product_id - bigint (references id in products table)