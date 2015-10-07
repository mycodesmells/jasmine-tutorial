var Store = require('./../../server/counting/store');

fdescribe('store', function() {

    var store;

    beforeEach(function(){
        store = new Store();
        spyOn(store, 'fetchData').and.callThrough();
    });

    it('should return data', function() {
        var data = store.getData();

        expect(data).toEqual('code that fetches the value');
    });

    it('should fetch data', function(){
        store.getData();

        expect(store.fetchData).toHaveBeenCalled();
    });

    it('should fetch data only once', function(){
        store.getData();
        store.getData();

        var callsCount = store.fetchData.calls.count();
        expect(callsCount).toEqual(1);
    });

});