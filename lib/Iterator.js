/**
 *
 *  Iterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

/**
 *  Iterator
 *
 *  @param {Object} items...
 *  @returns {Iterator}
 */
function Iterator() {
    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;
    this.reset();
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
Iterator.prototype.hasNext = function() {
    return this.index < this.items.length;
};

/**
 *  next
 *
 *  @returns {Object | null}
 */
Iterator.prototype.next = function() {
    return (this.hasNext()) ? this.items[this.index++] : null;
};

/**
 *  reset
 */
Iterator.prototype.reset = function() {
    this.index = 0;
};

/**
 *  forEach
 *
 *  @param {Function(Object)->Boolean} callback
 */
Iterator.prototype.forEach = function(callback) {
    while (this.hasNext()) {
        if (callback(this.next()) === false) {
            break;
        }
    }
};

module.exports = Iterator;
