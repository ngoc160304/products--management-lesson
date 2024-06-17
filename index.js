const express = require("express");
require("dotenv").config();
// To use http get put patch
var methodOverride = require('method-override')
// Nhận dữ liệu từ form 
var bodyParser = require('body-parser')


var flash = require('express-flash')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

app.use(cookieParser('jsdjfhsadljfh'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


const database = require("./config/database");
database.connect();

const systemConfig = require("./config/system");

// dotenv
const port = process.env.PORT;

// View pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// Public
// khi đẩy lên online phải dùng __dirname (đường dẫn thư mục) kh được dùng 'public' vì deloy k hiểu
app.use(express.static(`${__dirname}/public`));

// Router
const route = require("./routes/client/index.route");
route(app);

const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);

// App local variable Chỉ dùng được cho file pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// swagger, dto.
// Băng thông, ddos


console.log(__dirname);