
const express= require ("express");
const router =express.Router();
const multer = require('multer')
const upload = multer() // Sử dụng bộ nhớ tạm thời
const controller  = require("../../controllers/admin/auth.controller")
const validate = require("../../validates/admin/authen.validate")
router.get("/login",controller.login)
router.post("/login",
    validate.loginPost,
    controller.loginPost)
module.exports = router;