var Iterator = require('../lib/Iterator'),
    SubsetIterator = require('../lib/SubsetIterator'),
    PermutationIterator = require('../lib/PermutationIterator'),
    SequenceIterator = require('../lib/SequenceIterator');

exports.testNothing = function(beforeExit, assert) {
    var iter = new SequenceIterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testEmptyArray = function(beforeExit, assert) {
    var iter = new SequenceIterator([]);

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleEmptyIterator = function(beforeExit, assert) {
    var iter = new SequenceIterator(new Iterator());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItemIterator = function(beforeExit, assert) {
    var iter = new SequenceIterator(new Iterator(1));

    assert.equal(true, iter.hasNext());
    assert.eql(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemIterator = function(beforeExit, assert) {
    var iter = new SequenceIterator(new Iterator(1, 2, 3));

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
    var iter = new SequenceIterator(
        new Iterator(1, 2, 3),
        new SubsetIterator('a', 'b', 'c'),
        new PermutationIterator('X', 'Y', 'Z')
    );

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
