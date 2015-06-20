var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    ipaddress = process.env.IP || '127.0.0.1',
    main = require('./app');

app.use(express.static(__dirname + '/client'));
app.use(main);

app.listen(port, ipaddress, function () {
    console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), ipaddress, port);
});