/**
 *
 *  Iterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var isIterator = require('./utils').isIterator;

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
    var result = false;

    if (this.index < this.items.length) {
        var item = this.items[this.index];

        if (isIterator(item)) {
            result = item.hasNext();
        }
        else {
            result = true;
        }
    }

    return result;
};

/**
 *  next
 *
 *  @returns {Object | null}
 */
Iterator.prototype.next = function() {
    if (this.hasNext()) {
        var item = this.items[this.index];
        var result;

        if (isIterator(item)) {
            result = item.next();

            if (item.hasNext() === false) {
                this.index++;
            }
        }
        else {
            result = item;
            this.index++;
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
Iterator.prototype.reset = function() {
    this.items.forEach(function(item) {
        if (isIterator(item)) {
            item.reset();
        }
    });
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
