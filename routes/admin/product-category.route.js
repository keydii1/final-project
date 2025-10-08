
const express= require ("express");
const router =express.Router();
const multer = require('multer')
const upload = multer() // Sử dụng bộ nhớ tạm thời

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/product-category.validate");
const controller = require("../../controllers/admin/product-category.controller");
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create",
    upload.single("thumbnail"),
    uploadCloud.uploadToCloud,
    validate.titleIsNotNull,
    validate.description,
    controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.uploadToCloud,
    validate.titleIsNotNull,
    validate.description,
    controller.PatchPost); 
module.exports = router;