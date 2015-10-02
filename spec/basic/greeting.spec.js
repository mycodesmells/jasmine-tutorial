var greeting = require('./../../server/basic/greeting');

describe('greeting', function () {

    it('returns a greeting with given name', function () {
        var message = greeting('Reader');

        expect(message).toEqual('Howdy Reader, I\'m a teapot!');
    });

    it('returns a greeting without name if not defined', function () {
        var message = greeting();

        expect(message).toEqual('Howdy, I\'m a teapot!');
    });

});