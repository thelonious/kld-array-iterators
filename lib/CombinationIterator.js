/**
 *
 *  CombinationIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

/**
 *  CombinationIterator
 *
 *  @param {Object} items...
 *  @returns {CombinatationIterator}
 */
function CombinationIterator() {
    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;
    this.max = Math.pow(2, this.items.length);
    this.reset();
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
CombinationIterator.prototype.hasNext = function() {
    return this.index < this.max;
};

/**
 *  next
 *
 *  @returns {Array | null}
 */
CombinationIterator.prototype.next = function() {
    if (this.hasNext()) {
        var mask = 1;
        var result = [];

        for (var i = 0; i < this.items.length; i++) {
            if (mask & this.index) {
                result.push(this.items[i]);
            }

            mask <<= 1;
        }

        this.index++;

        return result;
    }
    else {
        return null;
    }
};

/**
 *  reset
 */
CombinationIterator.prototype.reset = function() {
    this.index = 1;
}

module.exports = CombinationIterator;
