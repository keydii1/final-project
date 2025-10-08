
const express= require ("express");
const router =express.Router();
const multer = require('multer')
const upload = multer() // Sử dụng bộ nhớ tạm thời
const controller  = require("../../controllers/admin/role.controller")
router.get("/", controller.index);
router.get("/create",controller.create)
router.post("/create",controller.createPost)


module.exports = router;
