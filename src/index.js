const express = require("express");

const productController = require("./controller/product.controller");

const userController = require("./controller/user.controller")


const app = express();

app.use(express.json());

app.use("/products", productController);
app.use("/users", userController);


module.exports = app;