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
 *  @param {Array} items
 *  @returns {CombinatationIterator}
 */
function CombinationIterator(items) {
    this.items = (items !== undefined && items !== null) ? items : [];
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
