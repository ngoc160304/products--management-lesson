module.exports.createPost =(req, res, next) => {
    if(req.body.title === '') {
        req.flash("Error", "Vui lòng nhập tiêu đề");
        res.redirect("back");
        return;
    }
    // Thành công thì đi sang bước kế tiếp
    next();
}