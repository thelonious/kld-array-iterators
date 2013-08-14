/**
 *
 *  ArrayIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

/**
 *  ArrayIterator
 *
 *  @param {Object} items...
 *  @returns {ArrayIterator}
 */
function ArrayIterator() {
    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;
    this.reset();
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
ArrayIterator.prototype.hasNext = function() {
    return this.index < this.items.length;
};

/**
 *  next
 *
 *  @returns {Object | null}
 */
ArrayIterator.prototype.next = function() {
    return (this.hasNext()) ? this.items[this.index++] : null;
};

/**
 *  reset
 */
ArrayIterator.prototype.reset = function() {
    this.index = 0;
};

module.exports = ArrayIterator;
