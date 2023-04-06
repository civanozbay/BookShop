exports.get404 = (req,res,next)=> {
    res
        .status(404)
        // .sendFile(path.join(__dirname,'views','page-not-found.html'))
        .render('page-not-found',{pageTitle: 'Page not Found'})
}