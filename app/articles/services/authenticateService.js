exports.isAuthenticated = function (req, res, next) {
    console.log('Req is Authorized');
    next();
};

exports.isAuthorized = function (req, res, next) {

};