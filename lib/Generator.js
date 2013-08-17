/**
 *
 *  Generator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var defineSubclass = require('kld-class-utils').defineSubclass,
    Iterator = require('./Iterator');

defineSubclass(Iterator, Generator);

/**
 *  Generator
 *
 *  @param {Function(Integer)->Object} generator
 *  @returns {Generator}
 */
function Generator(generator) {
    Iterator.apply(this, arguments);
    this.generator = generator;
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
Generator.prototype.hasNext = function() {
    return true;
};

/**
 *  next
 *
 *  @returns {Object | null}
 */
Generator.prototype.next = function() {
    return this.generator(this.index++);
};

/**
 *  reset
 */
Generator.prototype.reset = function() {
    this.index = 0;
};

/**
 *  skip
 *
 *  @param {Integer} count
 */
Generator.prototype.skip = function(count) {
    this.index += count;
};

// common generator functions

Generator.IDENTITY = function(index) {
    return index;
};

Generator.COUNTING_NUMBER = function(index) {
    return index + 1;
};

module.exports = Generator;
