const express = require("express");
const multer = require('multer')


// const storageMulter = require("../../helpers/storageMulter");
// const upload = multer({ storage: storageMulter() })
const upload = multer() // Sử dụng bộ nhớ tạm thời
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const controller = require("../../controllers/admin/my-account.controller");

// Set up multer for file uploads (if needed)
// Create router
const router = express.Router();
    router.get("/", controller.index);
    router.get("/edit", controller.edit);
    router.patch("/edit",
        upload.single('avatar'),
        uploadCloud.uploadToCloud,
        // Use multer middleware if handling file uploads
        controller.editPatch);
// Export router
module.exports = router;

