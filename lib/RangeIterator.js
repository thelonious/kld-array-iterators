/**
 *
 *  Range.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var defineSubclass = require('kld-class-utils').defineSubclass,
    Iterator = require('./Iterator');

defineSubclass(Iterator, RangeIterator);

/**
 *  RangeIterator
 *
 *  @param {Number} start
 *  @param {Number} end?
 *  @param {Number} step?
 *  @returns {Range}
 */
function RangeIterator(start, end, step) {
    this.start = start;
    this.end = (end !== undefined) ? end : Math.pow(2,32);    // or should this be Number.MAX_VALUE
    this.step = (step !== undefined)
        ? step
        : (this.end >= this.start)
            ? 1
            : -1;
    this.reset();
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
RangeIterator.prototype.hasNext = function() {
    if (this.step > 0) {
        return (this.current < this.end);
    }
    else {
        return (this.end < this.current);
    }
};

/**
 *  next
 *
 *  @returns {Number | null}
 */
RangeIterator.prototype.next = function() {
    if (this.hasNext()) {
        var result = this.current;

        this.current += this.step;

        return result;
    }
    else {
        return null;
    }
};

/**
 *  reset
 */
RangeIterator.prototype.reset = function() {
    this.current = this.start;
};

module.exports = RangeIterator;
