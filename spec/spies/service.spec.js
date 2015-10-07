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