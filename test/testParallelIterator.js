var ParallelIterator = require('../lib/ParallelIterator'),
    Iterator = require('../lib/Iterator');

exports.testNothing = function(beforeExit, assert) {
    var iter = new ParallelIterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testEmptyArray = function(beforeExit, assert) {
    var iter = new ParallelIterator([]);

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItem = function(beforeExit, assert) {
    var iter = new ParallelIterator(1);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleArray = function(beforeExit, assert) {
    var iter = new ParallelIterator([1]);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleItems = function(beforeExit, assert) {
    var iter = new ParallelIterator(1, 2);

    assert.equal(true, iter.hasNext());
    assert.eql([1, 2], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleItemArray = function(beforeExit, assert) {
    var iter = new ParallelIterator([1, 2]);

    assert.equal(true, iter.hasNext());
    assert.eql([1, 2], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleIterators = function(beforeExit, assert) {
    var iter = new ParallelIterator(
        new Iterator(1, 2),
        new Iterator(3, 4)
    );

    assert.equal(true, iter.hasNext());
    assert.eql([1, 3], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2, 4], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItemAndIterator = function(beforeExit, assert) {
    var iter = new ParallelIterator(
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

exports.testMultipleUnequallySizedIterators = function(beforeExit, assert) {
    var iter = new ParallelIterator(
        new Iterator(1),
        new Iterator(2, 3)
    );

    assert.equal(true, iter.hasNext());
    assert.eql([1, 2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([null, 3], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleUneqallySizedIterators2 = function(beforeExit, assert) {
    var iter = new ParallelIterator(
        new Iterator(1, 2, 3),
        new Iterator(4, 5),
        new Iterator(6, 7, 8, 9)
    );

    assert.equal(true, iter.hasNext());
    assert.eql([1, 4, 6], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2, 5, 7], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([3, null, 8], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([null, null, 9], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};
