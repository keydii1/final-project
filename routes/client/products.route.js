// cách 1
const express = require("express");
// Tạo router
const router = express.Router();
const controller = require("../../controllers/client/product.controller");
    router.get("/",controller.product);
    router.get("/:slug",controller.productDetail);
// Export router
module.exports = router;