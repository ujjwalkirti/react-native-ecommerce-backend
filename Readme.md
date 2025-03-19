# Ecommerce API

This is a dummy api for an ecommerce website. I have created this to test my DevOps and AWS skills.

## Endpoints

### Product Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /products | Get all products |
| GET | /products/:id | Get a single product |
| GET | /products/search/:key | Search for a product |
| POST | /products | Create a new product |

### Cart Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /cart/find/:id | Get a cart |
| POST | /cart | Create a new cart |
| POST | /cart/:quantity | Add a product to the cart |
| DELETE | /cart/:cartItemId | Remove a product from the cart |

### Order Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /orders/:id | Get all orders |

### User Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| DELETE | /user/:id | Delete a user |
| GET | /user/:id | Get a user |

### Auth Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login a user |




### Things to do:
[] Dockerfile to build docker image
[] Kubernetes deployment file
[] Deploy to AWS EKS
[] Configure env variables in k8s deployment
[] Add jwt based login feature
[] store tokens in mongodb

