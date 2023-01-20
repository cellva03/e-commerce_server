
# Shop4Home server

It is a server nodejs application for purchasing a home furnitures and decorations.

## Used Packages

 - [Mongoose](https://www.npmjs.com/package/mongoose)
 - [Body-Parser](https://www.npmjs.com/package/body-parser)
 - [Cors](https://www.npmjs.com/package/cors)
 - [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
 - [Bcrypt](npmjs.com/package/bcrypt)

# API Reference 

## User API

#### Login the user

```http
  POST /api/auth/login
```
#### Register a User

```http
  POST /api/auth/signup
```
#### Post cart Products

```http
  POST /api/auth/cart
```
#### Get cart from Database

```http
  GET /api/auth/cart
```

#### Remove a product from a Cart

```http
  DELET /api/auth/cart/${id}
```
#### Post wishList Products

```http
  POST /api/auth/wish
```
#### Get wishlist from Database

```http
  GET /api/auth/wish
```

#### Remove a product from a wishlist

```http
  DELETE /api/auth/wish/${id}
```

#### Check Order for a user
```http
  POST /api/auth/checkout
```

## Product API
#### Get all product

```http
  GET /api/products
```
#### Get a single product

```http
  GET /api/products/${id}
```

## Steps to run
In the project root directory, you can run:

### `npm install `

It will install all the necessary packages to `node_module` folder

then, you can run:

### `npm start`

Runs the server app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

## Authors

- [@KumarHarsh](https://github.com/KumarHarsh2001)
- [@Yashgade](https://github.com/Yashgade)
- [@Selva](https://github.com/cellva03)

