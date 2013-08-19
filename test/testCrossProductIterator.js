var Iterator = require('../lib/Iterator'),
    SubsetIterator = require('../lib/SubsetIterator'),
    PermutationIterator = require('../lib/PermutationIterator'),
    CrossProductIterator = require('../lib/CrossProductIterator'),
    RangeIterator = require('../lib/RangeIterator');

exports.testNothing = function(beforeExit, assert) {
    var iter = new CrossProductIterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testEmptyArray = function(beforeExit, assert) {
    var iter = new CrossProductIterator([]);

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItem = function(beforeExit, assert) {
    var iter = new CrossProductIterator(1);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleArray = function(beforeExit, assert) {
    var iter = new CrossProductIterator([1]);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleItems = function(beforeExit, assert) {
    var iter = new CrossProductIterator(1, 2);

    assert.equal(true, iter.hasNext());
    assert.eql([1, 2], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleItemArray = function(beforeExit, assert) {
    var iter = new CrossProductIterator([1, 2]);

    assert.equal(true, iter.hasNext());
    assert.eql([1, 2], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleEmptyIterator = function(beforeExit, assert) {
    var iter = new CrossProductIterator(new Iterator());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItemIterator = function(beforeExit, assert) {
    var iter = new CrossProductIterator(new Iterator(1));

    assert.equal(true, iter.hasNext());
    assert.eql([1], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemIterator = function(beforeExit, assert) {
    var iter = new CrossProductIterator(new Iterator(1, 2, 3));

    assert.equal(true, iter.hasNext());
    assert.eql([1], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([3], iter.next());

    assert.equal(false, iter.hasNext());
    assert.eql(null, iter.next());
};

exports.testMultipleIterators = function(beforeExit, assert) {
    var iter = new CrossProductIterator(
        new Iterator(1, 2, 3),
        new SubsetIterator('a', 'b', 'c'),
        new PermutationIterator('X', 'Y')
    );

    var expectedValues = [
        [ 1, [ 'a' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a' ], [ 'Y', 'X' ] ],
        [ 1, [ 'b' ], [ 'X', 'Y' ] ],
        [ 1, [ 'b' ], [ 'Y', 'X' ] ],
        [ 1, [ 'a', 'b' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a', 'b' ], [ 'Y', 'X' ] ],
        [ 1, [ 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'c' ], [ 'Y', 'X' ] ],
        [ 1, [ 'a', 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a', 'c' ], [ 'Y', 'X' ] ],
        [ 1, [ 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 1, [ 'a', 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a', 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a' ], [ 'Y', 'X' ] ],
        [ 2, [ 'b' ], [ 'X', 'Y' ] ],
        [ 2, [ 'b' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a', 'b' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a', 'b' ], [ 'Y', 'X' ] ],
        [ 2, [ 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a', 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a', 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a', 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a', 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a' ], [ 'Y', 'X' ] ],
        [ 3, [ 'b' ], [ 'X', 'Y' ] ],
        [ 3, [ 'b' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a', 'b' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a', 'b' ], [ 'Y', 'X' ] ],
        [ 3, [ 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a', 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a', 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a', 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a', 'b', 'c' ], [ 'Y', 'X' ] ]
    ];

    expectedValues.forEach(function(expectedValue) {
        assert.equal(true, iter.hasNext());
        assert.eql(expectedValue, iter.next());
    });

    assert.equal(false, iter.hasNext());
    assert.eql(null, iter.next());
};

exports.testMultiIteratorArray = function(beforeExit, assert) {
    var iter = new CrossProductIterator([
        new Iterator(1, 2, 3),
        new SubsetIterator('a', 'b', 'c'),
        new PermutationIterator('X', 'Y')
    ]);

    var expectedValues = [
        [ 1, [ 'a' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a' ], [ 'Y', 'X' ] ],
        [ 1, [ 'b' ], [ 'X', 'Y' ] ],
        [ 1, [ 'b' ], [ 'Y', 'X' ] ],
        [ 1, [ 'a', 'b' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a', 'b' ], [ 'Y', 'X' ] ],
        [ 1, [ 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'c' ], [ 'Y', 'X' ] ],
        [ 1, [ 'a', 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a', 'c' ], [ 'Y', 'X' ] ],
        [ 1, [ 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 1, [ 'a', 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a', 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a' ], [ 'Y', 'X' ] ],
        [ 2, [ 'b' ], [ 'X', 'Y' ] ],
        [ 2, [ 'b' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a', 'b' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a', 'b' ], [ 'Y', 'X' ] ],
        [ 2, [ 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a', 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a', 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a', 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a', 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a' ], [ 'Y', 'X' ] ],
        [ 3, [ 'b' ], [ 'X', 'Y' ] ],
        [ 3, [ 'b' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a', 'b' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a', 'b' ], [ 'Y', 'X' ] ],
        [ 3, [ 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a', 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a', 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a', 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a', 'b', 'c' ], [ 'Y', 'X' ] ]
    ];

    expectedValues.forEach(function(expectedValue) {
        assert.equal(true, iter.hasNext());
        assert.eql(expectedValue, iter.next());
    });

    assert.equal(false, iter.hasNext());
    assert.eql(null, iter.next());
};

exports.testSingleItemAndIterator = function(beforeExit, assert) {
    var iter = new CrossProductIterator(
        1,
        new Iterator(2, 3)
    );

    assert.equal(true, iter.hasNext());
    assert.eql([1, 2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1, 3], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testFork = function(beforeExit, assert) {
    var iter = new CrossProductIterator(
        new RangeIterator(0, 10),
        new RangeIterator(0, 10)
    );

    iter.skip(10);

    var fork = iter.fork();

    while (iter.hasNext()) {
        assert.equal(true, fork.hasNext());
        assert.eql(fork.next(), iter.next());
    }

    assert.equal(fork.hasNext(), iter.hasNext());
};
