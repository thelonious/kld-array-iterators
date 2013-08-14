/**
 *
 *  ReverseIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

/**
 *  ReverseIterator
 *
 *  @param {Array} items
 *  @returns {ArrayIterator}
 */
function ReverseIterator(items) {
    this.items = (items !== undefined && items !== null) ? items : [];
    this.reset();
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
ReverseIterator.prototype.hasNext = function() {
    return this.index >= 0;
};

/**
 *  next
 *
 *  @returns {Object | null}
 */
ReverseIterator.prototype.next = function() {
    return (this.hasNext()) ? this.items[this.index--] : null;
};

/**
 *  reset
 */
ReverseIterator.prototype.reset = function() {
    this.index = this.items.length - 1;
};

module.exports = ReverseIterator;
