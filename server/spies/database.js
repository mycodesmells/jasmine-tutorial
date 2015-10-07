var mongoose = require('mongoose');
var SimpleModel = require('./models');

mongoose.connect('mongodb://localhost/jasmine-tutorial');

module.exports.getAll = function(callback) {
    SimpleModel.find(callback);
};

module.exports.get = function(id, callback) {
    SimpleModel.findById(id, callback);
};