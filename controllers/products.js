const Product = require("../models/product");


exports.getAddProduct = (req,res,next) => {
    res.render('add-product',{
        pageTitle:'Add Product',
        path:'/admin/add-product'
    })
}

exports.postAddProduct = (req,res,next)=>{    
    const product = new Product(req.body.title)
    product.save();
    res.redirect('/');
}

exports.getProducts = (req,res,next) => {
    const products = Product.fetchAll();
    // we can send response as a html,json,object 
    // it set the header automatically. You can also set with setheader() as well.
    // res.send('<h1>Helloo from express</h1>');

    // since we implement pug as a template engine we don't need to send html no more.
    // res.sendFile(path.join(__dirname,'../','views','shop.html'));
    res.render('shop',
    {prods:products,
    pageTitle : 'Shop',
    path:'/shop'}); 
}