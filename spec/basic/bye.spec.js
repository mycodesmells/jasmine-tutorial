var bye = require('./../../server/basic/bye');

describe('bye', function () {

    it('returns a bye-bye with given name', function () {
        var message = bye('Reader');

        expect(message).toEqual('Bye Reader!');
    });

    it('returns a bye-bye without name if not defined', function () {
        var message = bye();

        expect(message).toEqual('Bye!');
    });

});