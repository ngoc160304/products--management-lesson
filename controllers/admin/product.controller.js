const Product = require("../../models/product.model");
const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterSearch");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false,
    }
    if(req.query.status) {
        find.status = req.query.status;
    }
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    const quantityProduct = await Product.countDocuments(find);
    const objectPagination = paginationHelper(
        {
            limit: 4,
            pageNumber: 1,
            // skip: 0,
        },
        quantityProduct,
        req.query
    )
    const products = await Product.find(find)
        .sort({ position : "desc"})
        .limit(objectPagination.limit)
        .skip(objectPagination.skip);
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products : products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

// [PATCH] /change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    await Product.updateOne(
        {
            _id : req.params.id    
        },
        {
            status: req.params.status
        }
    )
    res.redirect('back');
}

// [PATCH] /change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
            await Product.updateMany(
                { _id: { $in: ids } },
                {
                    status: "active"
                }
            )
            break;
        case "inactive":
            await Product.updateMany(
                { _id: { $in: ids } },
                {
                    status: "inactive"
                }
            )
            break;
        case "delete-all":
            await Product.updateMany(
                { _id: { $in: ids } },
                {
                    deleted : true,
                    deleted : new Date()
                }
            )
        case "change-position":
            for(const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne(
                    { _id: id },
                    {
                        position : position
                    }
                )
            }
        default:
            break;
    }
    res.redirect('back');
}
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id : id}, { 
        deleted : true,
        deletedAt : new Date()
    });
    res.redirect('back');
}
// [GET] /admin/products/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products/create.pug", {
        pageTitle: "Thêm mới sản phẩm"
    });
}
// [POST] /admin/products/craete
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position === "") {
        const countProducts = await Product.countDocuments({});
        req.body.position = countProducts + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }
    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}
// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted : false,
            _id : req.params.id
        }
        const product = await Product.findOne(find);
        res.render("admin/pages/products/edit.pug", {
            pageTitle : "Chỉnh sửa sản phẩm",
            product : product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}
// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    try {
        await Product.updateOne({
            _id: req.params.id
        }, req.body);
        res.redirect("back");
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products/edit/${req.params.id}`);
    }
}
// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted : false,
            _id : req.params.id
        }
        const product = await Product.findOne(find);
        res.render("admin/pages/products/detail", {
            pageTitle : product.title,
            product : product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}