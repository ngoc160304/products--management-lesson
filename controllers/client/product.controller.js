// [GET] /product
const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position : "desc"});
    const newProduct = products.map((item) => {
        item.priceNew = (item.price *(100 - item.discountPercentage)/100).toFixed(2);
        return item;
    });
    res.render("client/pages/product/index", {
        pageTitle: "Trang sản phẩm",
        products: newProduct
    });
}

// [GET] /product/:slug
module.exports.detail = async (req, res) => {
    try {
        const product = await Product.findOne(
            {
                deleted: false,
                slug: req.params.slug,
                status: "active"
            }
        )
        res.render("client/pages/product/detail", {
            pageTitle : "Chi tiet san pham",
            product : product
        })
    } catch (error) {
        res.redirect("/products")
    }
}