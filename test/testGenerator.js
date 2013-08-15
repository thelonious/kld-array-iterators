var Generator = require('../lib/Generator');

exports.testCountingNumber = function(beforeExit, assert) {
    var gen = new Generator(Generator.COUNTING_NUMBER);
    var result = [];
    var count = 0;

    gen.forEach(function(item) {
        result.push(item);
        return ++count < 5;
    });

    assert.eql([1, 2, 3, 4, 5], result);
};

exports.testTake = function(beforeExit, assert) {
    var gen = new Generator(Generator.COUNTING_NUMBER);
    var result = gen.take(5);

    assert.eql([1, 2, 3, 4, 5], result);
};

exports.testSkip = function(beforeExit, assert) {
    var gen = new Generator(Generator.COUNTING_NUMBER);

    gen.skip(5);
    var result = gen.take(5);

    assert.eql([6, 7, 8, 9, 10], result);
};
