var express = require('express');
var app = express();

var greeting = require('./server/basic/greeting');
var greetingMiddleware = require('./server/basic/greeting-middleware');

app.get('/greet', function(req, res){
    var name = req.query.name;
    var message = greeting(name);

    res.status(418)
        .end(message);
});

app.get('/greet2', greetingMiddleware);

app.listen(9000);