var express = require('express'), 
    app = express();

    //App config
    require('./config')(app);

    //App routes
    app.use(require('./articles'));

    //Error handling middleware
    require('./errorHandlers.js')(app);


module.exports = app;