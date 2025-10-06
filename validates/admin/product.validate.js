module.exports.titleIsNotNull = (req,res,next) => {
    if(!req.body.title){
        req.flash('error', 'Title is required');
        const backURL = req.header('Referer') || '/admin/products';
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