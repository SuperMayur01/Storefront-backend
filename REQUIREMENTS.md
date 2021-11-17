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