var express = require('express');
var app = express();

var greeting = require('./server/basic/greeting');

app.get('/', function(req, res){
    var name = req.query.name;
    var message = greeting(name);

    res.status(418)
        .end(message);
});
app.listen(9000);