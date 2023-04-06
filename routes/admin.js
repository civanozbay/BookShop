const express = require('express');
const path = require('path');

const router = express.Router();

const products = [];


// admin/add-product => GET
router.get('/add-product',(req,res,next) => {
    // next(); // allows the req to continue to the next middleware in line
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
    // res.sendFile(path.join(__dirname,'../','views','add-product.html'))
    res.render('add-product.pug',{pageTitle:'Add product',path:'/admin/add-product'})
})

// admin/add-product => POST
router.post('/add-product',(req,res,next)=>{
    products.push({title:req.body.title})
    res.redirect('/');
});


exports.router = router;
exports.products = products;