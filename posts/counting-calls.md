# Jasmine Tutorial - Counting Method Calls

Jasmine tutorial: [Part 1](http://mycodesmells.com/post/jasmine-tutorial-running-simple-tests/) [Part 2](http://mycodesmells.com/post/jasmine-tutorial-isolation-with-spies/)

You have already seen Jasmine spies in action, hopefully you find them easy and clear - you will probably be using them a lot in your tests. Today we'll take a look on one of the cooler features of spying and mocking - counting calls.

### Use case

The most common use case in which you'll be using calls count is any kind of cache. Imagine that you have some frontend information store that should ask the server for some data only once, when its value is undefined. The simple code would look like that:

**store.js**:

    module.exports = function() {
    
        var data;
    
        this.getData = function() {
            if (!data) {
                this.fetchData();
            }
    
            return data;
        };
    
        this.fetchData = function() {
            data = "code that fetches the value";
        };
    
    };
    
### Check returned value

We've done that before:

    it('should return data', function() {
        var store = new S1tore();
        var data = store.getData();

        expect(data).toEqual('code that fetches the value');
    });
    
### Check if method was called

Another classic example of Jasmine spies use:

    it('should fetch data', function(){
        var store = new Store();
        spyOn(store, 'fetchData').and.callThrough();

        store.getData();

        expect(store.fetchData).toHaveBeenCalled();
    });
    
### Counting calls

This is something brand new. We can make use of an attribute created for all Jasmine spy objects, that is `calls`. It tracks some useful information about the interaction with the spied object. In this test we will call `getData` method twice, but we expect that during the second call, a cached `data` value is being returned. That would mean that `fetchData` is called only once:

    it('should fetch data only once', function(){
        var store = new Store();
        spyOn(store, 'fetchData').and.callThrough();

        store.getData();
        store.getData();

        var callsCount = store.fetchData.calls.count();
        expect(callsCount).toEqual(1);
    });
    
### Final Result

After extracting common code to `beforeEach` method, it looks just like that:

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
    
And it works (!):

    $ ./node_modules/.bin/jasmine 
    Started
    ...
        
    Ran 3 of 8 specs
    3 specs, 0 failures
    Finished in 0.003 seconds