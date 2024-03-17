const express = require("express");
const router = express.Router();
const product = require("../controller/product");

router.get("/", product.getAllProducts);
router.get("/categories", product.getProductCategories);
router.get("/category/:category", product.getProductsInCategory);


router.get('/filter',product.filterProduct);
router.get("/:id", product.getProduct);




module.exports = router;
