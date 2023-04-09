const Product = require('../models/product')
exports.getProducts = (req,res,next) => {
    // we can send response as a html,json,object 
    // res.send('<h1>Helloo from express</h1>');
    // it set the header automatically. You can also set with setheader() as well.
    
    // since we implement pug as a template engine we don't need to send html no more.
    // res.sendFile(path.join(__dirname,'../','views','shop.html'));
    Product.fetchAll(products => {
        res.render('shop/product-list',
        {prods:products,
        pageTitle : 'All products',
        path:'/products'}); 
    });
}


exports.getIndex = (req,res,next) =>{
    Product.fetchAll(products => {
        res.render('shop/index',
        {prods:products,
        pageTitle : 'Shop',
        path:'/'}); 
    });
}

exports.getCart = (req,res,next) => {
    res.render('shop/cart', {
        path:'/cart',
        pageTitle:'Your Cart'        
    })
}

exports.getOrders = (req,res,next) => {
    res.render('shop/orders', {
        path:'/orders',
        pageTitle:'Your Orders'        
    })
}

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        path:'/checkout',
        pageTitle:'Checkout'
    })
}
