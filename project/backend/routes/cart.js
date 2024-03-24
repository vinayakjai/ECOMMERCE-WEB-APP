const express = require("express");
const cartRouter = express.Router();
const {
  getUserCart,
  addProductToCart,
  removeProductFromCart,
  createCartForUser,
  deleteUserCart,
  deleteProductsOfCart,
  updateQuantity,
  deleteProductFromUserCart,
  calculateTotalPrice,
} = require("../controller/cart");
const { authCheck } = require("../middleware/authMiddleware");

cartRouter.get('/totalAmount',calculateTotalPrice);
cartRouter.get("/:id", getUserCart);//

cartRouter.post("/:id", createCartForUser);//
cartRouter.put("/product",addProductToCart);//
cartRouter.put('/quantity',updateQuantity);
cartRouter.delete("/product",removeProductFromCart);//

cartRouter.delete("/:id",deleteUserCart);

cartRouter.delete("/products/:id",deleteProductsOfCart);//



module.exports = cartRouter;
