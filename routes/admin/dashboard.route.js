const app = require("express");
const router = app.Router();

const controller = require("../../controllers/admin/dashboard.controller");

router.get("/", controller.dashboard);
module.exports = router;