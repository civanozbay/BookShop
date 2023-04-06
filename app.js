// http,https,fs,path,os
// core modules


const bodyParser = require('body-parser')

const express = require('express');
const path = require('path')


const app = express(); // since it returns function we call it like this

app.set('view engine','pug')

const adminData = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

// we can use adminRoutes like this because we already register two request to the admin.js through routes
app.use('/admin/',adminData.router); 
app.use(shopRoutes)

app.use((req,res,next)=> {
    res
        .status(404)
        // .sendFile(path.join(__dirname,'views','page-not-found.html'))
        .render('page-not-found',{pageTitle: 'Page not Found'})
})

// const server = http.createServer(app);
// server.listen(3000)

// can listen the port like this!!! as well
app.listen(3000);