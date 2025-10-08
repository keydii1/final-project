module.exports.titleIsNotNull = (req,res,next) => {
    if(!req.body.title || req.body.title.trim() === ""){
        req.flash('error', 'Tiêu đề không được để trống');
        const backURL = req.header('Referer') || `${req.app.locals.prefixAdmin}/product-category`;
        res.redirect(backURL);
        return;
    }
    next();
}
module.exports.tileNoLessThan8character = (req,res,next) => {
    if(req.body.title.length < 8){
        req.flash('error', 'Please enter title no less than 8 characters');
        const backURL = req.header('Referer') || '/admin/products';
        res.redirect(backURL);
        return;
    }
    next();
}
module.exports.description = (req,res,next) => {
        if (Array.isArray(req.body.description)) {
        req.body.description = req.body.description.join(' ');
        }
        next();
}