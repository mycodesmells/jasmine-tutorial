# Jasmine Tutorial - Isolation With Spies

Jasmine tutorial: [Part 1](http://mycodesmells.com/post/jasmine-tutorial-running-simple-tests/)

This is the second part of Jasmine tutorial. This time we'll take a look on one of the most important features of Jasmine and unit testing in general - their isolation. When testing your application you should make sure that every time you create a new unit test case, you are testing the behaviour of just one class of script file. So, shall we?

### The most common example

Every time you create some code responsible for the connection with a database, you are facing the fact that you need test isolation. Obviously you can create some test environment that could initialize database with data appropriate for your tests, but this approach is such a bad practice! First of all, this would affect your tests speed, as you would need to set up the connection.

Here we have a simple architecture that you may encounter in your application. There are three files, that define model, database connection and service that is using them:

**Model** (`models.js`)

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
    
    var schema = new Schema({
        name: String,
        value: String
    });
    
    module.exports = mongoose.model('SimpleModel', schema);
    
**Database connection** (`database.js`)

    var mongoose = require('mongoose');
    var SimpleModel = require('./models');
    
    mongoose.connect('mongodb://localhost/jasmine-tutorial');
    
    module.exports.getAll = function(callback) {
        SimpleModel.find(callback);
    };
    
    module.exports.get = function(id, callback) {
        SimpleModel.findById(id, callback);
    };
    
**Service** (`service.js`)

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
    
### Writing simple tests

There are two important issues with testing database conection: mocking the response and handling asynchronous calls. That's why we'll use two of the Jasmine features to accoplish that: spies and `done` callback, respectively.

First of all, let's look at the code structure. When calling `service.getAll(callback)`, we're actually creating a database connection that executes callback with all the items that are stored in the database. That result is then passed to the `callback` provided in your call. The service returns a text information about the number of returned elements. 

In order to test it, we should provide some fake callback that will be using service's result, so that we could check what the result is. This cn be done with spies - we will mock the callback object and check what parameters it has been called with.

The second thing that has to be done in our fake callback, is the indication of the end of the test. Wait, what? So far, we've been creating synchronous tests, so we knew that each line of the source code is executed after the previous one. But now, we're making a call to the database and we should be waiting for a callback to be called. This is why we should notify Jasmine, that reaching the last line of a test does not mean that it's completed. This is why the library provides an optional parameter to the `it` method, very often described as `done` function. If the parameter is set, Jasmine will wait for it to be called and then conclude the test.

So, to sum up, the test looks like as follows (`service.spec.js`):

    var service = require('./../../server/spies/service');
    var database = require('./../../server/spies/database');
    
    describe('service', function () {
    
        fit('some', function (done) {
            function doneCallback(responseText) {
                expect(responseText).toEqual("We have 4 in the database.");
                done();
            }
    
            spyOn(database, 'getAll').and.callFake(function(callback){
                callback(null, ['a', 'b', 'c', 'd']);
            });
    
            service.getSummary(doneCallback);
        });
    
    });
    
**Note**, that in the test above we don't check the details of `SimpleModel` model in `getAll` method - we just want to know if the result text displays correct count. This way we can mock the response with any list, as the code just test its length and not what is actually stored inside.

Code available at [GitHub repository](https://github.com/mycodesmells/jasmine-tutorial)