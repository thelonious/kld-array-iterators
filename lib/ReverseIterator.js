/**
 *
 *  ReverseIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var defineSubclass = require('./utils').defineSubclass,
    Iterator = require('./Iterator');

defineSubclass(Iterator, ReverseIterator);

/**
 *  ReverseIterator
 *
 *  @param {Object} items...
 *  @returns {ArrayIterator}
 */
function ReverseIterator() {
    Iterator.apply(this, arguments);

    this.items = this.items.reverse();
}

module.exports = ReverseIterator;
