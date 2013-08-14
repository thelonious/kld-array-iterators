var ArrayIterator           = require('../lib/ArrayIterator'),
    CombinationIterator     = require('../lib/CombinationIterator'),
    PermutationIterator     = require('../lib/PermutationIterator'),
    Iterator                = require('../lib/GroupIterator');

exports.testNoArray = function(beforeExit, assert) {
    var iter = new Iterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleEmptyArrayIterator = function(beforeExit, assert) {
    var arrayIterator = new ArrayIterator();
    var iter = new Iterator(arrayIterator);

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItemArrayIterator = function(beforeExit, assert) {
    var arrayIterator = new ArrayIterator(1);
    var iter = new Iterator(arrayIterator);

    assert.equal(true, iter.hasNext());
    assert.eql([1], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemArrayIterator = function(beforeExit, assert) {
    var arrayIterator = new ArrayIterator(1, 2, 3);
    var iter = new Iterator(arrayIterator);

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
    var iter1 = new ArrayIterator(1, 2, 3);
    var iter2 = new CombinationIterator('a', 'b', 'c');
    var iter3 = new PermutationIterator('X', 'Y');
    var iter = new Iterator(iter1, iter2, iter3);

    var expectedValues = [
        [ 1, [ 'a' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a' ], [ 'X', 'Y' ] ],
        [ 1, [ 'b' ], [ 'X', 'Y' ] ],
        [ 2, [ 'b' ], [ 'X', 'Y' ] ],
        [ 3, [ 'b' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a', 'b' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a', 'b' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a', 'b' ], [ 'X', 'Y' ] ],
        [ 1, [ 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a', 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a', 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a', 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a', 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 2, [ 'a', 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 3, [ 'a', 'b', 'c' ], [ 'X', 'Y' ] ],
        [ 1, [ 'a' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a' ], [ 'Y', 'X' ] ],
        [ 1, [ 'b' ], [ 'Y', 'X' ] ],
        [ 2, [ 'b' ], [ 'Y', 'X' ] ],
        [ 3, [ 'b' ], [ 'Y', 'X' ] ],
        [ 1, [ 'a', 'b' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a', 'b' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a', 'b' ], [ 'Y', 'X' ] ],
        [ 1, [ 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'c' ], [ 'Y', 'X' ] ],
        [ 1, [ 'a', 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a', 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a', 'c' ], [ 'Y', 'X' ] ],
        [ 1, [ 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 1, [ 'a', 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 2, [ 'a', 'b', 'c' ], [ 'Y', 'X' ] ],
        [ 3, [ 'a', 'b', 'c' ], [ 'Y', 'X' ] ]
    ];

    expectedValues.forEach(function(expectedValue) {
        assert.equal(true, iter.hasNext());
        assert.eql(expectedValue, iter.next());
    });

    assert.equal(false, iter.hasNext());
    assert.eql(null, iter.next());
};
