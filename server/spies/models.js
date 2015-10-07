var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    value: String
});

module.exports = mongoose.model('SimpleModel', schema);