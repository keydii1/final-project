const controller = require("../../controllers/admin/dashboard.controller");
const express = require("express");
const router = express.Router();
    router.get("/", controller.dashboard);
// Export router
module.exports = router;