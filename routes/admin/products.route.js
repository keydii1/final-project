const controller = require("../../controllers/admin/product.controller");
const express = require("express");
const router = express.Router();
    router.get("/", controller.index);
    router.patch("/change-status/:status/:id", controller.changeStatus);
    router.patch("/change-multi", controller.changeMulti);
    router.delete("/delete/:id", controller.deleteItem);
// Export router
module.exports = router;

