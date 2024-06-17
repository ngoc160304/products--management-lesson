const { default: mongoose } = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { 
        type: String, 
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt : Date
}, {
    timestamps: true
});
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
// Slug chức năng: nếu ở trang chi tiết sản phẩm url sẽ để id lên slug sinh ra để thay thế id của sản phẩm vd /admin/products/8437-39814832 thay thế /admin/product/san-pham-1