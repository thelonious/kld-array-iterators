var Iterator = require('../lib/ReverseIterator');

exports.testEmptyArray = function(beforeExit, assert) {
    var iter = new Iterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItemArray = function(beforeExit, assert) {
    var iter = new Iterator(1);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemArray = function(beforeExit, assert) {
    var iter = new Iterator(1, 2, 3);

    assert.equal(true, iter.hasNext());
    assert.equal(3, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};
