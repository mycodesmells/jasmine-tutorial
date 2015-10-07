# Testing with Jasmine

Writing test is not an easy task. If you are new to JavaScript development, you should be looking for the tool that is easy to start with, yet powerful enough to be useful for a long time. Fortunately there is Jasmine. It's easy, it's popular, it's all you need to start. Let's write some tests then!

### Witing simple tests

This is something that I've already mentioned on MyCodeSmells, so just a quick reminder ([full post here](http://mycodesmells.com/post/simple-nodejs-example-with-tdd/)):
 
 1. `npm install jasmine`
 2. `./node_modules/.bin/jasmine init`
 3. Create test
 4. `./node_modules/.bin/jasmine`
 
**Test file** (`./spec/basic/greeting`)

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
    
**Source file** (`./server/basic/greeting`)

    module.exports = function (name) {
        var _name = name || '';
        var prefix = ("Howdy " + _name).trim();
        var suffix = ", I'm a teapot!";
    
        return prefix + suffix;
    };
    
**Running tests**

    $ ./node_modules/.bin/jasmine 
    Started
    ..
    
    2 specs, 0 failures
    Finished in 0.004 seconds

### Skipping test

Sometimes you might find yourself in the middle of some major refactoring and you just know that for some (short, hopefully) the test is going to fail. Or, you might be almost sure that the test is not correct but still want your build to complete. If you must, you can skip a test, so that it is ignored and not run during your build. To do that, place `x` before your `it` (`xit`) for a test case, or `describe` (`xdescribe`) for a whole group:

    var greeting = require('./../../server/basic/greeting'); 
    describe('greeting', function () {
    
        xit('returns a greeting with given name', function () {
            // test body
        });
    
        it('returns a greeting without name if not defined', function () {
            // test body
        });
    
    });
    
Output:

    $ ./node_modules/.bin/jasmine
    Started
    *.
    
    Pending:
    
    1) greeting returns a greeting with given name
      No reason given
    
    2 specs, 0 failures, 1 pending spec
    Finished in 0.005 seconds
    
You might notice that we have a skipped test described with "No reason given". That does not look very well, so let's add the reason so that the person running the tests after us understands why they are that way:

    var greeting = require('./../../server/basic/greeting');
    describe('greeting', function () {
    
        xit('returns a greeting with given name', function () {
            // test body
        }).pend('Waiting for Jeremy\'s approval');
    
        it('returns a greeting without name if not defined', function () {
            // test body
        });
    
    });

Output:

    $ ./node_modules/.bin/jasmine
    Started
    *.
    
    Pending:
    
    1) greeting returns a greeting with given name
      Waiting for Jeremy's approval
    
    2 specs, 0 failures, 1 pending spec
    Finished in 0.005 seconds
    
### Running just the one case / group

Sometimes the situation is reversed - out of a whole bunch of test, you just want to run eg. one group. This is popular when you are doing some refactoring and don't want to repeatedly run unrelated tests for unrelated source code. To do that, there is another prefix, `f`. So, `fit` will run only one test case, whilst `fdescribe` - just given tests group. For this example I've created another spec file:

    var greeting = require('./../../server/basic/greeting');
    describe('greeting', function () {
    
        fit('returns a greeting with given name', function () {
            // test body
        });
    
        it('returns a greeting without name if not defined', function () {
            // test body
        });
    
    });
    
Output:

    $ ./node_modules/.bin/jasmine
    Started
    .
    
    Ran 1 of 4 specs
    1 spec, 0 failures
    Finished in 0.004 seconds

### Running tests from single file

The previous approach for running a limited group of tests looks really pretty, but is has one major disadvantage - it requires changes in the files! It would be very annoying if you have to change it over and over again, remember to revert the changes to go back to running all tests. There is one cleaner way, that just requires you to call jasmine script with appropriate parameters.

To run all tests from given spec file:

    $ ./node_modules/.bin/jasmine ./spec/basic/bye.spec.js
    Started
    ..
    
    2 specs, 0 failures
    Finished in 0.004 seconds

To run one specific test case:

    $ ./node_modules/.bin/jasmine ./spec/basic/bye.spec.js?spec="greeting returns a greeting with given name"
    Started
    .
    
    Ran 1 of 4 specs
    1 spec, 0 failures
    Finished in 0.004 seconds

That last one it not vey convenient (you need to copy the test name), but you might use that one day. **Because you can!**

Code available at [GitHub repository](https://github.com/mycodesmells/jasmine-tutorial)