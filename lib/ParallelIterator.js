/**
 *
 *  ParallelIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var isIterator = require('./utils').isIterator,
    defineSubclass = require('./utils').defineSubclass,
    Iterator = require('./Iterator');

defineSubclass(Iterator, ParallelIterator);

/**
 *  ParallelIterator
 *
 *  @param {Iterator} iterators...
 *  @returns {ParallelIterator}
 */
function ParallelIterator() {
    Iterator.apply(this, arguments);
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
ParallelIterator.prototype.hasNext = function() {
    var result = false;

    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];

        if (isIterator(item)) {
            if (item.hasNext()) {
                result = true;
                break;
            }
        }
        else {
            if (this.index == 0) {
                result = true;
                break;
            }
        }
    }

    return result;
};

/**
 *  next
 *
 *  @returns {Array | null}
 */
ParallelIterator.prototype.next = function() {
    if (this.hasNext()) {
        var result = [];

        this.items.forEach(function(item) {
            if (isIterator(item)) {
                result.push(item.next());
            }
            else {
                result.push(item);
            }
        });

        this.index++;

        return result;
    }
    else {
        return null;
    }
};

module.exports = ParallelIterator;
