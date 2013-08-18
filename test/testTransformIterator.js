var TransformIterator = require('../lib/TransformIterator'),
    RangeIterator = require('../lib/RangeIterator');

exports.testCountingNumber = function(beforeExit, assert) {
    var gen = new TransformIterator(new RangeIterator(1, 100));
    var result = [];
    var count = 0;

    gen.every(function(item) {
        result.push(item);
        return ++count < 5;
    });

    assert.eql([1, 2, 3, 4, 5], result);
};

exports.testTake = function(beforeExit, assert) {
    var gen = new TransformIterator(new RangeIterator(1, 100));
    var result = gen.take(5);

    assert.eql([1, 2, 3, 4, 5], result);
};

exports.testSkip = function(beforeExit, assert) {
    var gen = new TransformIterator(new RangeIterator(1, 100));

    gen.skip(5);
    var result = gen.take(5);

    assert.eql([6, 7, 8, 9, 10], result);
};

exports.testIdentity = function(beforeExit, assert) {
    var gen = new TransformIterator(new RangeIterator(1, 100), TransformIterator.IDENTITY);
    var result = gen.take(5);

    assert.eql([1, 2, 3, 4, 5], result);
};

exports.testCustomTransform = function(beforeExit, assert) {
    var gen = new TransformIterator(new RangeIterator(1, 100), function(x) { return x * x; });
    var result = gen.take(5);

    assert.eql([1, 4, 9, 16, 25], result);
};

exports.testCustomIterator = function(beforeExit, assert) {
    var iter = {
        counter: 0,
        hasNext: function() { return true; },
        next: function() { try { return this.counter } finally { this.counter += 2; } },
        reset: function() {}
    };
    var gen = new TransformIterator(iter);
    var result = gen.take(5);

    assert.eql([0, 2, 4, 6, 8], result);
}
