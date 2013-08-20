/**
 *
 *  RepeatIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var defineSubclass = require('kld-class-utils').defineSubclass,
    Iterator = require('./Iterator'),
    CrossProductIterator = require('./CrossProductIterator');

defineSubclass(Iterator, RepeatIterator);

/**
 *  RepeatIterator
 *
 *  @param {Iterator} iterator
 *  @param {Number} minimum
 *  @param {Number} maximum
 *  @returns {RepeatIterator}
 */
function RepeatIterator(iterator, minimum, maximum) {
    if (minimum > maximum) throw new Error("minimum must be <= maximum");

    this.iterator = iterator;
    this.minimum = minimum;
    this.maximum = (maximum !== undefined) ? maximum : Math.pow(2,32);

    this.reset();
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
RepeatIterator.prototype.hasNext = function() {
    return this.current < this.maximum || this.crossProduct.hasNext();
};

/**
 *  next
 *
 *  @returns {Object}
 */
RepeatIterator.prototype.next = function() {
    if (this.hasNext()) {
        if (this.crossProduct.hasNext() === false) {
            this.current++;
            this.buildCrossProduct();
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
RepeatIterator.prototype.reset = function() {
    this.current = this.minimum;

    this.buildCrossProduct();
};

/**
 *  buildCrossProduct
 */
RepeatIterator.prototype.buildCrossProduct = function() {
    var iterators = [];

    for (var i = 0; i < this.current; i++) {
        iterators.push(this.iterator.fork());
    }

    this.crossProduct = new CrossProductIterator(iterators);
};

module.exports = RepeatIterator;
