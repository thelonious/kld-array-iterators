var Iterator = require('../lib/Iterator'),
    RepeatIterator = require('../lib/RepeatIterator');

exports.testZeroOrOne = function(beforeExit, assert) {
    var iter = new RepeatIterator(
        new Iterator(1, 2, 3),
        0,
        1
    );

    assert.equal(true, iter.hasNext());
    assert.equal(null, iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([3], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testOneOrTwo = function(beforeExit, assert) {
    var iter = new RepeatIterator(
        new Iterator(1, 2, 3),
        1,
        2
    );

    assert.equal(true, iter.hasNext());
    assert.eql([1], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([3], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1, 1], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1, 2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([1, 3], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2, 1], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2, 2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([2, 3], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([3, 1], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([3, 2], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([3, 3], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testNestedRepeatIterators = function(beforeExit, assert) {
    var iter = new RepeatIterator(
        new RepeatIterator(
            new Iterator('a'),
            1,
            4
        ),
        0,
        1
    );

    assert.equal(true, iter.hasNext());
    assert.equal(null, iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([['a']], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([['a', 'a']], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([['a', 'a', 'a']], iter.next());

    assert.equal(true, iter.hasNext());
    assert.eql([['a', 'a', 'a', 'a']], iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};
