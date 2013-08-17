/**
 *
 *  SubsetIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var defineSubclass = require('kld-class-utils').defineSubclass,
    Iterator = require('./Iterator'),
    CrossProductIterator = require('./CrossProductIterator');

defineSubclass(Iterator, SubsetIterator);

/**
 *  SubsetIterator
 *
 *  @param {Object} items...
 *  @returns {CombinatationIterator}
 */
function SubsetIterator() {
    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;

    // since we're using a bit mask, we can't have more than 32 elements. That's 2^32-1
    // subsets so that should be reasonable

    if (this.items.length > 32) {
        throw new Error("SubsetIterators cannot work with more than 32 elements");
    }

    this.max = Math.pow(2, this.items.length);
    this.reset();
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
SubsetIterator.prototype.hasNext = function() {
    return (this.crossProduct !== null && this.crossProduct.hasNext()) || this.index < this.max;
};

/**
 *  next
 *
 *  @returns {Array | null}
 */
SubsetIterator.prototype.next = function() {
    if (this.hasNext()) {
        if (this.crossProduct === null || this.crossProduct.hasNext() === false) {
            var mask = 1;
            var result = [];

            for (var i = 0; i < this.items.length; i++) {
                if (mask & this.index) {
                    result.push(this.items[i]);
                }

                mask <<= 1;
            }

            this.crossProduct = new CrossProductIterator(result);

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
SubsetIterator.prototype.reset = function() {
    this.crossProduct = null;
    this.index = 1;
};

module.exports = SubsetIterator;
