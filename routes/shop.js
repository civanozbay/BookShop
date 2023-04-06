const path = require('path');
const express = require('express')

// const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();


router.get('/',(req,res,next) => {
    // we can send response as a html,json,object 
    // it set the header automatically. You can also set with setheader() as well.
    // res.send('<h1>Helloo from express</h1>');

    // since we implement pug as a template engine we don't need to send html no more.
    // res.sendFile(path.join(__dirname,'../','views','shop.html'));
    const products = adminData.products;
    res.render('shop',
    {prods:products,
    pageTitle : 'Shop',
    path:'/shop'}); 
})


module.exports = router