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
 *  hasNext
 *
 *  @returns {Boolean}
 */
PermutationIterator.prototype.hasNext = function() {
    return this.index < this.max;
};

/**
 *  next
 *
 *  @returns {Object | null}
 */
PermutationIterator.prototype.next = function() {
    if (this.hasNext()) {
        var sequence = this.getSequence(this.index++);

        return this.getList(sequence);
    }
    else {
        return null;
    }
};

/**
 *  reset
 */
PermutationIterator.prototype.reset = function() {
    this.index = 0;
};

/**
 *  forEach
 *
 *  @param {Function(Object)->Boolean} callback
 */
PermutationIterator.prototype.forEach = function(callback) {
    while (this.hasNext()) {
        if (callback(this.next()) === false) {
            break;
        }
    }
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
