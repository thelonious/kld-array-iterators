var Iterator = require('../lib/Iterator'),
    SubsetIterator = require('../lib/SubsetIterator'),
    PermutationIterator = require('../lib/PermutationIterator');

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

exports.testSingleItem = function(beforeExit, assert) {
    var iter = new Iterator(1);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultipleItems = function(beforeExit, assert) {
    var iter = new Iterator(1, 2, 3);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(3, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemArray = function(beforeExit, assert) {
    var iter = new Iterator([1, 2, 3]);

    assert.equal(true, iter.hasNext());
    assert.equal(1, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(2, iter.next());

    assert.equal(true, iter.hasNext());
    assert.equal(3, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

// nested iterator testSingleItem

exports.testSingleEmptyIterator = function(beforeExit, assert) {
    var iter = new Iterator(new Iterator());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testSingleItemIterator = function(beforeExit, assert) {
    var iter = new Iterator(new Iterator(1));

    assert.equal(true, iter.hasNext());
    assert.eql(1, iter.next());

    assert.equal(false, iter.hasNext());
    assert.equal(null, iter.next());
};

exports.testMultiItemIterator = function(beforeExit, assert) {
    var iter = new Iterator(new Iterator(1, 2, 3));

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
    var iter = new Iterator(
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

exports.testForEach = function(beforeExit, assert) {
    var items = [1, 2, 3, 4, 5];
    var iter = new Iterator(items);
    var counter = 0;

    iter.forEach(function(item, index, iterator) {
        assert.equal(counter++, index);
        assert.equal(items[index], item);
        assert.equal(iter, iterator);
    });

    // sanity check to make sure forEach actually ran
    assert.equal(items.length, counter);
};

exports.testEvery = function(beforeExit, assert) {
    var items = [1, 2, 3, 4, 5];
    var iter = new Iterator(items);
    var counter = 0;

    var result = iter.every(function(item, index, iterator) {
        assert.equal(counter++, index);
        assert.equal(items[index], item);
        assert.equal(iter, iterator);

        return item > 0;
    });

    assert.equal(true, result);

    // sanity check to make sure forEach actually ran
    assert.equal(items.length, counter);
};

exports.testEvery2 = function(beforeExit, assert) {
    var items = [1, 2, 3, 4, 5];
    var iter = new Iterator(items);
    var counter = 0;

    var result = iter.every(function(item, index, iterator) {
        assert.equal(counter++, index);
        assert.equal(items[index], item);
        assert.equal(iter, iterator);

        return item > 3;
    });

    assert.equal(false, result);

    // sanity check to make sure forEach actually ran
    assert.equal(1, counter);
};

exports.testSome = function(beforeExit, assert) {
    var items = [1, 2, 3, 4, 5];
    var iter = new Iterator(items);
    var counter = 0;

    var result = iter.some(function(item, index, iterator) {
        assert.equal(counter++, index);
        assert.equal(items[index], item);
        assert.equal(iter, iterator);

        return item > 5;
    });

    assert.equal(false, result);

    // sanity check to make sure forEach actually ran
    assert.equal(items.length, counter);
};

exports.testSome2 = function(beforeExit, assert) {
    var items = [1, 2, 3, 4, 5];
    var iter = new Iterator(items);
    var counter = 0;

    var result = iter.some(function(item, index, iterator) {
        assert.equal(counter++, index);
        assert.equal(items[index], item);
        assert.equal(iter, iterator);

        return item > 3;
    });

    assert.equal(true, result);

    // sanity check to make sure forEach actually ran
    assert.equal(4, counter);
};

exports.testFilter = function(beforeExit, assert) {
    var items = [1, 2, 3, 4, 5];
    var iter = new Iterator(items);
    var counter = 0;

    var result = iter.filter(function(item, index, iterator) {
        assert.equal(counter++, index);
        assert.equal(items[index], item);
        assert.equal(iter, iterator);

        return (item % 2) == 1;
    });

    assert.eql([1, 3, 5], result);

    // sanity check to make sure forEach actually ran
    assert.equal(items.length, counter);
};

exports.testMap = function(beforeExit, assert) {
    var items = [1, 2, 3, 4, 5];
    var iter = new Iterator(items);
    var counter = 0;

    var result = iter.map(function(item, index, iterator) {
        assert.equal(counter++, index);
        assert.equal(items[index], item);
        assert.equal(iter, iterator);

        return item * item;
    });

    assert.eql([1, 4, 9, 16, 25], result);

    // sanity check to make sure forEach actually ran
    assert.equal(items.length, counter);
};

exports.testReduce = function(beforeExit, assert) {
    var items = [1, 2, 3, 4, 5];
    var iter = new Iterator(items);
    var counter = 1;

    var result = iter.reduce(function(accumulator, item, index, iterator) {
        assert.equal(counter++, index);
        assert.equal(items[index], item);
        assert.equal(iter, iterator);

        return accumulator + item;
    });

    assert.equal(15, result);

    // sanity check to make sure forEach actually ran
    assert.equal(items.length, counter);
};

exports.testReduce2 = function(beforeExit, assert) {
    var items = [1, 2, 3, 4, 5];
    var iter = new Iterator(items);
    var counter = 0;

    var result = iter.reduce(function(accumulator, item, index, iterator) {
        assert.equal(counter++, index);
        assert.equal(items[index], item);
        assert.equal(iter, iterator);

        return accumulator * item;
    }, 1);

    assert.equal(120, result);

    // sanity check to make sure forEach actually ran
    assert.equal(items.length, counter);
};
