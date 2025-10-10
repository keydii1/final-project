
const express= require ("express");
const router =express.Router();
const multer = require('multer')
const upload = multer() // Sử dụng bộ nhớ tạm thời
const controller  = require("../../controllers/admin/auth.controller")

router.get("/",controller.index)

module.exports = router;