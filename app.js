// http,https,fs,path,os
// core modules


const bodyParser = require('body-parser');

const express = require('express');
const path = require('path')
const errorController = require('./controllers/error')

const app = express(); // since it returns function we call it like this

app.set('view engine','pug')
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// we can use adminRoutes like this because we already register two request to the admin.js through routes
app.use('/admin/',adminRoutes); 
app.use(shopRoutes)

app.use(errorController.get404)

// const server = http.createServer(app);
// server.listen(3000)

// can listen the port like this!!! as well
app.listen(3000);