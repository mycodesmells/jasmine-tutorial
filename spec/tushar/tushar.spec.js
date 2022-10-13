const expect = require('chai').expect;
const getLeads = require('../../tushar/getLeads');
const leads = require('./../../tushar/leadsParamsSchema');

describe('service', function () {
    it('some', function (done) {
        function doneCallback(err, leads) {
            expect(err).equal(null);
            expect(leads).to.have.all.members(['a', 'b', 'c', 'd'])
            done();
        }

        spyOn(getLeads, 'getAllLeads').and.callFake(function({mongoose,logger},callback){
            callback(null, ['a', 'b', 'c', 'd']);
        });

        getLeads.getAllLeads({}, doneCallback)
    });
});
