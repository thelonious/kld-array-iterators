var ArrayIterator = require('../lib/ArrayIterator'),
    CombinationIterator = require('../lib/CombinationIterator'),
    PermutationIterator = require('../lib/PermutationIterator'),
    Iterator = require('../lib/SequenceIterator');

exports.testNothing = function(beforeExit, assert) {
    var iter = new Iterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testEmptyArray = function(beforeExit, assert) {
    var iter = new Iterator([]);

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
    assert.eql(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemArrayIterator = function(beforeExit, assert) {
    var arrayIterator = new ArrayIterator(1, 2, 3);
    var iter = new Iterator(arrayIterator);

    assert.equal(true, iter.hasNext());
    assert.eql(1, iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql(2, iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql(3, iter.next());

    assert.equal(false, iter.hasNext());
    assert.eql(null, iter.next());
};

exports.testMultipleIterators = function(beforeExit, assert) {
    var iter1 = new ArrayIterator(1, 2, 3);
    var iter2 = new CombinationIterator('a', 'b', 'c');
    var iter3 = new PermutationIterator('X', 'Y', 'Z');
    var iter = new Iterator(iter1, iter2, iter3);

    var expectedValues = [
        1,
        2,
        3,
        [ 'a' ],
        [ 'b' ],
        [ 'a', 'b' ],
        [ 'c' ],
        [ 'a', 'c' ],
        [ 'b', 'c' ],
        [ 'a', 'b', 'c' ],
        [ 'X', 'Y', 'Z' ],
        [ 'X', 'Z', 'Y' ],
        [ 'Y', 'X', 'Z' ],
        [ 'Z', 'X', 'Y' ],
        [ 'Y', 'Z', 'X' ],
        [ 'Z', 'Y', 'X' ]
    ];

    expectedValues.forEach(function(expectedValue) {
        assert.equal(true, iter.hasNext());
        assert.eql(expectedValue, iter.next());
    });

    assert.equal(false, iter.hasNext());
    assert.eql(null, iter.next());
};
