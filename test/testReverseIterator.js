var ReverseIterator = require('../lib/ReverseIterator'),
    Iterator = require('../lib/Iterator'),
    SubsetIterator = require('../lib/SubsetIterator'),
    PermutationIterator = require('../lib/PermutationIterator');

exports.testNothing = function(beforeExit, assert) {
    var iter = new ReverseIterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testEmptyArray = function(beforeExit, assert) {
    var iter = new ReverseIterator([]);

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItem = function(beforeExit, assert) {
    var iter = new ReverseIterator(1);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleItems = function(beforeExit, assert) {
    var iter = new ReverseIterator(1, 2, 3);

    assert.equal(true, iter.hasNext());
    assert.equal(3, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemArray = function(beforeExit, assert) {
    var iter = new ReverseIterator([1, 2, 3]);

    assert.equal(true, iter.hasNext());
    assert.equal(3, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

// nested iterator testSingleItem

exports.testSingleEmptyIterator = function(beforeExit, assert) {
    var iter = new ReverseIterator(new Iterator());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItemIterator = function(beforeExit, assert) {
    var iter = new ReverseIterator(new Iterator(1));

    assert.equal(true, iter.hasNext());
    assert.eql(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemIterator = function(beforeExit, assert) {
    var iter = new ReverseIterator(new Iterator(1, 2, 3));

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
    var iter = new ReverseIterator(
        new Iterator(1, 2, 3),
        new SubsetIterator('a', 'b', 'c'),
        new PermutationIterator('X', 'Y', 'Z')
    );

    var expectedValues = [
        [ 'X', 'Y', 'Z' ],
        [ 'X', 'Z', 'Y' ],
        [ 'Y', 'X', 'Z' ],
        [ 'Z', 'X', 'Y' ],
        [ 'Y', 'Z', 'X' ],
        [ 'Z', 'Y', 'X' ],
        [ 'a' ],
        [ 'b' ],
        [ 'a', 'b' ],
        [ 'c' ],
        [ 'a', 'c' ],
        [ 'b', 'c' ],
        [ 'a', 'b', 'c' ],
        1,
        2,
        3
    ];

    expectedValues.forEach(function(expectedValue) {
        assert.equal(true, iter.hasNext());
        assert.eql(expectedValue, iter.next());
    });

    assert.equal(false, iter.hasNext());
    assert.eql(null, iter.next());
};
