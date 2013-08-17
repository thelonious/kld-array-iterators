var RangeIterator = require('../lib/RangeIterator');

exports.testImpliedStep = function(beforeExit, assert) {
    var iter = new RangeIterator(1, 10);
    var result = iter.takeAll();

    assert.eql([1, 2, 3, 4, 5, 6, 7, 8, 9], result);
};

exports.testImpliedNegativeStep = function(beforeExit, assert) {
    var iter = new RangeIterator(10, 0);
    var result = iter.takeAll();

    assert.eql([10, 9, 8, 7, 6, 5, 4, 3, 2, 1], result);
};

exports.testStep = function(beforeExit, assert) {
    var iter = new RangeIterator(1, 10, 2);
    var result = iter.takeAll();

    assert.eql([1, 3, 5, 7, 9], result);
};

exports.testNegativeStep = function(beforeExit, assert) {
    var iter = new RangeIterator(10, 0, -2);
    var result = iter.takeAll();

    assert.eql([10, 8, 6, 4, 2], result);
};
