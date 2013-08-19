var RoundRobinIterator = require('../lib/RoundRobinIterator'),
    Iterator = require('../lib/Iterator');

exports.testNothing = function(beforeExit, assert) {
    var iter = new RoundRobinIterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testEmptyArray = function(beforeExit, assert) {
    var iter = new RoundRobinIterator([]);

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItem = function(beforeExit, assert) {
    var iter = new RoundRobinIterator(1);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleArray = function(beforeExit, assert) {
    var iter = new RoundRobinIterator([1]);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleItems = function(beforeExit, assert) {
    var iter = new RoundRobinIterator(1, 2);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleItemArray = function(beforeExit, assert) {
    var iter = new RoundRobinIterator([1, 2]);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleEmptyIterator = function(beforeExit, assert) {
    var iter = new RoundRobinIterator(new Iterator());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItemIterator = function(beforeExit, assert) {
    var iter = new RoundRobinIterator(new Iterator(1));

    assert.equal(true, iter.hasNext());
    assert.eql(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemIterator = function(beforeExit, assert) {
    var iter = new RoundRobinIterator(new Iterator(1, 2, 3));

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
    var iter = new RoundRobinIterator(
        new Iterator(1, 2),
        new Iterator(3, 4)
    );

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(3, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(4, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleIteratorArray = function(beforeExit, assert) {
    var iter = new RoundRobinIterator([
        new Iterator(1, 2),
        new Iterator(3, 4)
    ]);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(3, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(4, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItemAndIterator = function(beforeExit, assert) {
    var iter = new RoundRobinIterator(
        1,
        new Iterator(2, 3)
    );

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(3, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleUnequallySizedIterators = function(beforeExit, assert) {
    var iter = new RoundRobinIterator(
        new Iterator(1),
        new Iterator(2, 3)
    );

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(null, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(3, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testFork = function(beforeExit, assert) {
    var iter = new RoundRobinIterator(
        new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
        new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
        new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    );

    iter.skip(5);

    var fork = iter.fork();

    while (iter.hasNext()) {
        assert.equal(true, fork.hasNext());
        assert.eql(fork.next(), iter.next());
    }

    assert.equal(fork.hasNext(), iter.hasNext());
};
