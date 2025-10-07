const express = require("express");
const router = express.Router();
const multer = require('multer')


// const storageMulter = require("../../helpers/storageMulter");
// const upload = multer({ storage: storageMulter() })
const upload = multer() // Sử dụng bộ nhớ tạm thời
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/product.validate");
const controller = require("../../controllers/admin/product.controller");
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.create);
router.post("/create",
    upload.single("thumbnail"),
    uploadCloud.uploadToCloud,
    validate.titleIsNotNull,
    validate.tileNoLessThan8character,
    validate.description,
    controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.uploadToCloud,
    validate.titleIsNotNull,
    // validate.tileNoLessThan8character,
    controller.editPatch);
router.get("/detail/:id", controller.detail);
// Export router
module.exports = router;