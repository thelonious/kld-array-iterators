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
 *  @param {Array} items
 *  @returns {ArrayIterator}
 */
function ArrayIterator(items) {
    this.items = (items !== undefined && items !== null) ? items : [];
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
