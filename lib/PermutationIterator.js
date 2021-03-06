/**
 *
 *  PermutationIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 *  based on an algorithm described by Joren on Stackoveflow
 *  http://stackoverflow.com/questions/1506078/fast-permutation-number-permutation-mapping-algorithms
 *
 */

var defineSubclass = require('kld-class-utils').defineSubclass,
    Iterator = require('./Iterator'),
    CrossProductIterator = require('./CrossProductIterator');

defineSubclass(Iterator, PermutationIterator);

/**
 *  PermutationIterator
 *
 *  @param {Object} items...
 *  @returns {PermutationIterator}
 */
function PermutationIterator() {
    function fact(n) {
        var result = 1;

        for (var i = 2; i <= n; i++) {
            result *= i;
        }

        return result;
    }

    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;
    this.max = (this.items.length > 0) ? fact(this.items.length) : 0;
    this.reset();
}

/**
 *  fork
 *
 *  @returns {PermutationIterator}
 */
PermutationIterator.prototype.fork = function() {
    var fork = Iterator.prototype.fork.apply(this);

    fork.crossProduct = (this.crossProduct !== null) ? this.crossProduct.fork() : null;
    fork.max = this.max;

    return fork;
};

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
PermutationIterator.prototype.hasNext = function() {
    return (this.crossProduct !== null && this.crossProduct.hasNext()) || this.index < this.max;
};

/**
 *  next
 *
 *  @returns {Object | null}
 */
PermutationIterator.prototype.next = function() {
    if (this.hasNext()) {
        if (this.crossProduct === null || this.crossProduct.hasNext() === false) {
            var sequence = this.getSequence(this.index);
            var list = this.getList(sequence);

            this.crossProduct = new CrossProductIterator(list);

            this.index++;
        }

        return this.crossProduct.next();
    }
    else {
        return null;
    }
};

/**
 *  reset
 */
PermutationIterator.prototype.reset = function() {
    this.crossProduct = null;
    this.index = 0;
};

// helper methods

/**
 *  getSequence
 *
 *  @param {Integer}
 *  @return {Array}
 */
PermutationIterator.prototype.getSequence = function(number) {
    // calculate indexes from integer
    var sequence = [];
    var base = 2;

    for (var k = 0; k < this.items.length - 1; k++) {
        sequence.push(number % base);
        number = Math.floor(number / base);
        base++;
    }

    sequence.reverse();
    sequence.push(0);

    return sequence;
};

/**
 *  getList
 *
 *  @param {Array}
 *  @param {Array}
 */
PermutationIterator.prototype.getList = function(sequence) {
    var result = new Array(this.items.length);

    // create set
    var set = [];

    for (var i = 0; i < this.items.length; i++) {
        set.push(false);
    }

    // populate result
    for (var i = 0; i < this.items.length; i++) {
        var s = sequence[i];
        var remainingPosition = 0;
        var index;

        for (index = 0; index < this.items.length; index++) {
            if (set[index] === false) {
                if (remainingPosition === s) {
                    break;
                }

                remainingPosition++;
            }
        }

        result[index] = this.items[i];
        set[index] = true;
    }

    return result;
};

module.exports = PermutationIterator;
