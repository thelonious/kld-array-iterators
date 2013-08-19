/**
 *
 *  TransformIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var defineSubclass = require('kld-class-utils').defineSubclass,
    Iterator = require('./Iterator'),
    isFunction = require('kld-class-utils').isFunction;

defineSubclass(Iterator, TransformIterator);

/**
 *  TransformIterator
 *
 *  @param {Iterator} iterator
 *  @param {Function(Object)->Object} transform
 *  @returns {TransformIterator}
 */
function TransformIterator(iterator, transform) {
    this.iterator = Iterator.isIterator(iterator) ? iterator : null;
    this.transform = isFunction(transform) ? transform : TransformIterator.IDENTITY;
    this.reset();
}

/**
 *  fork
 *
 *  @returns {TransformIterator}
 */
 TransformIterator.prototype.fork = function() {
    var fork = new TransformIterator();

    fork.iterator = (this.iterator !== null) ? this.iterator.fork() : null;
    fork.transform = this.transform;

    return fork;
};

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
TransformIterator.prototype.hasNext = function() {
    return (this.iterator !== null && this.iterator.hasNext());
};

/**
 *  next
 *
 *  @returns {Object | null}
 */
TransformIterator.prototype.next = function() {
    if (this.hasNext()) {
        return this.transform(this.iterator.next());
    }
    else {
        return null;
    }
};

/**
 *  reset
 */
TransformIterator.prototype.reset = function() {
    if (this.iterator !== null) {
        this.iterator.reset();
    }
};

// common TransformIterator functions

TransformIterator.IDENTITY = function(index) {
    return index;
};

module.exports = TransformIterator;
