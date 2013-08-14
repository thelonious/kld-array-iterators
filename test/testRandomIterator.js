var RandomIterator = require('../lib/RandomIterator');

exports.testNothing = function(beforeExit, assert) {
    var iter = new RandomIterator();

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testEmptyArray = function(beforeExit, assert) {
    var iter = new RandomIterator([]);

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItem = function(beforeExit, assert) {
    var iter = new RandomIterator(1);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemArray = function(beforeExit, assert) {
    var items = [1, 2, 3, 4, 5];
    var iter = new RandomIterator(items);
    var visited = [];

    for (var i = 0; i < items.length; i++) {
        assert.equal(true, iter.hasNext());
        visited.push(iter.next());
    }

    // TODO: check that visited does not equal items

    // compared canonical lists
    assert.eql(items.sort(), visited.sort());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};
