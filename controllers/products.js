const Product = require("../models/product");


exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product',{
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
    // we can send response as a html,json,object 
    // res.send('<h1>Helloo from express</h1>');
    // it set the header automatically. You can also set with setheader() as well.
    
    // since we implement pug as a template engine we don't need to send html no more.
    // res.sendFile(path.join(__dirname,'../','views','shop.html'));
    Product.fetchAll(products => {
        res.render('shop/product-list',
        {prods:products,
        pageTitle : 'Shop',
        path:'/shop'}); 
    });
}