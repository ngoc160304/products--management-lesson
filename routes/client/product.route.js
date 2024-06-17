const app = require("express");
const router = app.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/", controller.index);

router.get("/:slug", controller.detail);
module.exports = router;
// thư mục .env là nơi chứa các hàng số