const controller = require("../../controllers/client/home.controller");
const express = require("express");
const router = express.Router();
    router.get("/", controller.home);
// Export router
module.exports = router;