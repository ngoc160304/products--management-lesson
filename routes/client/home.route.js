const app = require("express");
const router = app.Router();

const controller = require("../../controllers/client/home.controller")

router.get("/", controller.index)
module.exports = router;