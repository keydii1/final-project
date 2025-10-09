const express = require("express");
const router = express.Router();
const multer = require('multer')


// const storageMulter = require("../../helpers/storageMulter");
// const upload = multer({ storage: storageMulter() })
const upload = multer() // Sử dụng bộ nhớ tạm thời
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const controller  = require("../../controllers/admin/account.controller")
router.get("/", controller.index);
router.get("/create",controller.create)
router.post("/create",
    upload.single("avatar"),
    uploadCloud.uploadToCloud,
    controller.createPost)
module.exports = router;