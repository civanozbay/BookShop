// http,https,fs,path,os
// core modules


const bodyParser = require('body-parser');

const express = require('express');
const path = require('path')
const errorController = require('./controllers/error')
const sequelize=require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')
const CartItem = require('./models/cartItems')

const app = express(); // since it returns function we call it like this

app.set('view engine','pug')
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
    // we define new property to the req object with name as "user".But it keeping user object as sequelize object not js object.So that mean we can call sequlize util methods like destroy through req.user
        req.user =user;
        next();
    })
    .catch(err=>console.log(err))
})


// we can use adminRoutes like this because we already register two request to the admin.js through routes
app.use('/admin/',adminRoutes); 
app.use(shopRoutes)

app.use(errorController.get404)

// const server = http.createServer(app);
// server.listen(3000)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product,{through:OrderItem});


sequelize
// this method create a table for the models that you defined
// sequelize.sync({force:true})
  .sync({ force: true })
//   .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
    })
    .then(cart => {
      app.listen(3000);

  })
  .catch(err => {
    console.log(err);
  });

// can listen the port like this!!! as well
// app.listen(3000);