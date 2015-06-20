var fs = require('fs')
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    domain = require('domain').create();

function setupDomain (app) {
    app.use(function (req, res, next) {
        domain.on('error', function (err){
            
        });
    });
}

function setupLogger (app) {
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(__dirname + '/../../logs/access.log', {flags: 'a'})
    // setup the logger
    morgan.token('date', function(){ return new Date(); });
    app.use(morgan('combined', {stream: accessLogStream}))
}

function setupReqParser (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
}

function setupDatabase (dbconfig) {
    var mongoose = require('mongoose'),
        options = {
            server : {
                socketOptions: {keepAlive: 1}
            }
        };
    mongoose.connect('mongodb://hieuqvo:gaubu@ds063160.mongolab.com:63160/hieuqvo', options);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function (callback) {
        console.log('Successfully connect to MongoDB!');
    });
}

module.exports = function (app, db) {
    setupLogger(app);
    setupReqParser(app);
    //setupDatabase();
    require('../articles/models/mysql.js');
}