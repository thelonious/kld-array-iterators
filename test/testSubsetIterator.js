var SubsetIterator = require('../lib/SubsetIterator');

exports.testNothing = function(beforeExit, assert) {
    var iter = new SubsetIterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testEmptyArray = function(beforeExit, assert) {
    var iter = new SubsetIterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItem = function(beforeExit, assert) {
    var iter = new SubsetIterator(1);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleItems = function(beforeExit, assert) {
    var iter = new SubsetIterator(1, 2, 3);

    assert.equal(true, iter.hasNext());
    assert.eql([1], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1,2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([3], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1,3], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2,3], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1,2,3], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemArray = function(beforeExit, assert) {
    var iter = new SubsetIterator([1, 2, 3]);

    assert.equal(true, iter.hasNext());
    assert.eql([1], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1,2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([3], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1,3], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2,3], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1,2,3], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testFork = function(beforeExit, assert) {
    var iter = new SubsetIterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    iter.skip(5);

    var fork = iter.fork();

    while (iter.hasNext()) {
        assert.equal(true, fork.hasNext());
        assert.eql(fork.next(), iter.next());
    }

    assert.equal(fork.hasNext(), iter.hasNext());
};
