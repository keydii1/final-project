const controller = require("../../controllers/admin/my-account.controller");
const express = require("express");
const systemconfig = require("../../config/system");
const multer = require("multer");
// Set up multer for file uploads (if needed)
const upload = multer({ dest: 'uploads/' }); // You can customize the destination and other options
// Create router
const router = express.Router();
    router.get("/", controller.index);
    router.get("/edit", controller.edit);
    router.patch("/edit", controller.editPatch);
// Export router
module.exports = router;