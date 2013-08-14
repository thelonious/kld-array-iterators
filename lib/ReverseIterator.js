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
 *  @param {Object} items...
 *  @returns {ArrayIterator}
 */
function ReverseIterator() {
    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;
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

/**
 *  forEach
 *
 *  @param {Function(Object)->Boolean} callback
 */
ReverseIterator.prototype.forEach = function(callback) {
    while (this.hasNext()) {
        if (callback(this.next()) === false) {
            break;
        }
    }
};

module.exports = ReverseIterator;
