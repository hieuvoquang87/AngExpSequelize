module.exports = function errorHandling (app) {
    //Handle 404 response
    app.use(function (req, res, next) {
        if (res.status(404)) {
            res.send('Opps!');
        } else {
            next();
        }
    });
    //Generic errors
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        next(err);
    });
    //Handle client errors
    app.use(function (err, req, res, next) {
        if (req.xhr) {
            res.status(500).send({ error: 'Something blew up!' });
        } else {
            next(err);
        }
    });
    //Catch all errors
    app.use(function (err, req, res, next) {
        res.status(500);
        res.send('Something unexpected happened!')
        //res.render('error', { error: err }); --> render 500 template
    });
}