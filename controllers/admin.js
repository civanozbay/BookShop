const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({  // this method coming from sequalize since we bond them with hasMany method in app.js file,it directly create a product with userId   
    title : title,
    imageUrl : imageUrl,
    price : price,
    description : description
  })
    .then(result => {console.log('created')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => { // this code block gonna execute after saving the product and catch cover both then cases.So, we don't need to declare again.
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
  }; 

exports.postDeleteProduct = (req,res,next) => {
  const prodId = req.body.productId
  Product.findByPk(prodId)
    .then(product => {
      product.destroy();
    })
    .then(result => {
      console.log('Destroyed product');
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
  
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(product => {
      res.render('admin/products', {
        prods: product,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }
  const prodId = req.params.productId;
  
  Product.findByPk(prodId)
    .then(product =>{
      if(!product){
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing : editMode,
        product : product
      });
    })
    .catch(err => console.log(err))
};
