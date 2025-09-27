const controller = require("../../controllers/admin/product.controller");
const express = require("express");
const router = express.Router();
    router.get("/", controller.product);
// Export router
module.exports = router;