var database = require('./database');

module.exports.getSummary = function(callback) {
    database.getAll(function(err, items){
        callback("We have " + items.length + " in the database.");
    });
};

module.exports.getItemDetails = function(id, callback) {
    database.get(id, function(err, item){
        callback("Item named " + item.name+ " has value: " + item.value);
    });
};