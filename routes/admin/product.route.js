const app = require("express");
// Up load ảnh
const multer  = require('multer');
// dest là đường dẫn thư mục muốn lưu ảnh
const storageMulterHelper = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulterHelper() })

// Validate
const validate = require("../../validates/admin/product.validate");

const controller = require("../../controllers/admin/product.controller");

const router = app.Router();
// [GET] admin/products
router.get("/", controller.index)

// [PATCH] admin/products/change-status/:status/:id
router.patch("/change-status/:status/:id", controller.changeStatus);

// [PATCH] admin/products/change-multi
router.patch("/change-multi", controller.changeMulti);

// [PATCH] admin/products/change-status/:status/:id
router.delete("/delete/:id", controller.deleteItem)

// [GET] admin/products/products/create
router.get("/create", controller.create)

// [POST] admin/products/products/create
router.post(
    "/create", 
    upload.single('thumbnail'), 
    // truyền được nhiều hàm middleware mỗi hàm đều có req, res
    validate.createPost,
    controller.createPost
)
// middleware được hiểu như một thằng trung gian được hiểu như nếu A muón đi qua
// qua C thì B được gọi là trung gian để kiểm tra xem A có thảo điều kiện để đi qua C
// hàm trên validate được coi là một middleware

// [GET] admin/products/edit/:id
router.get("/edit/:id", controller.edit);

// [PATCH] admin/products/edit/:id
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.createPost,
    controller.editPatch
)

// [GET] admin/products/detail/:id
router.get("/detail/:id", controller.detail);



module.exports = router;