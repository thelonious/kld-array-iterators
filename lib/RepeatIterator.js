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
 *  fork
 *
 *  @returns {RepeatIterator}
 */
RepeatIterator.prototype.fork = function() {
    var fork = new RepeatIterator(this.iterator, this.minimum, this.maximum);

    fork.current = this.current;
    fork.crossProduct = this.crossProduct.fork();

    return fork;
};

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
        var result;

        if (this.crossProduct.hasNext() === false) {
            this.current++;
            this.buildCrossProduct();

            if (this.current === 1) {
                result = null;
            }
            else {
                result = this.crossProduct.next();
            }
        }
        else {
            result = this.crossProduct.next();
        }

        return result;
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
