/**
 *
 *  Generator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

/**
 *  Generator
 *
 *  @param {Function(Integer)->Object} generator
 *  @returns {Generator}
 */
function Generator(generator) {
    this.generator = generator;
    this.reset();
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
 *  forEach
 *
 *  @param {Function(Object)->Boolean} callback
 */
Generator.prototype.forEach = function(callback) {
    while (this.hasNext()) {
        if (callback(this.next()) === false) {
            break;
        }
    }
};

/**
 *  skip
 *
 *  @param {Integer} count
 */
Generator.prototype.skip = function(count) {
    this.index += count;
};

/**
 *  take
 *
 *  @param {Integer} count
 *  @returns {Array}
 */
Generator.prototype.take = function(count) {
    var result = [];

    for (var i = 0; i < count; i++) {
        result.push(this.next());
    }

    return result;
};

// common generator functions

Generator.IDENTITY = function(index) {
    return index;
};

Generator.COUNTING_NUMBER = function(index) {
    return index + 1;
};

module.exports = Generator;
