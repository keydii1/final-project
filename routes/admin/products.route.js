const controller = require("../../controllers/admin/product.controller");
const express = require("express");
const router = express.Router();
    router.get("/", controller.index);
    router.patch("/change-status/:status/:id", controller.changeStatus);
// Export router
module.exports = router;