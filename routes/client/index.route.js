const productRouter = require("./product.route");
const homeRouter = require("./home.route");
module.exports = (app) => {
    // Nếu sài phương thức khác use ví dụ như get thì các ruote con sẽ đều là get
    app.use("/", homeRouter);
    app.use("/products", productRouter);
}