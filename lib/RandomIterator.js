/**
 *
 *  RandomIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

/**
 *  RandomIterator
 *
 *  @param {Object} items...
 *  @returns {RandomIterator}
 */
function RandomIterator() {
    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;
    this.shuffle();
    this.reset();
}

/**
 *  shuffle
 */
RandomIterator.prototype.shuffle = function() {
    var length = this.items.length;

    // create array of indexes
    this.indexes = new Array(length);

    // init indexes
    for (var i = 0; i < length; i++) {
        this.indexes[i] = i;
    }

    // shuffle
    for (var i = 0; i < length; i++) {
        var index = Math.floor(Math.random() * length);
        var temp = this.indexes[i];

        this.indexes[i] = this.indexes[index];
        this.indexes[index] = temp;
    }
};

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
RandomIterator.prototype.hasNext = function() {
    return this.index < this.items.length;
};

/**
 *  next
 *
 *  @returns {Object | null}
 */
RandomIterator.prototype.next = function() {
    return (this.hasNext()) ? this.items[this.indexes[this.index++]] : null;
};

/**
 *  reset
 */
RandomIterator.prototype.reset = function() {
    this.index = 0;
};

module.exports = RandomIterator;
