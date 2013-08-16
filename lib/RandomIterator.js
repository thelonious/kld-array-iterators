/**
 *
 *  RandomIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var defineSubclass = require('./utils').defineSubclass,
    Iterator = require('./Iterator');

defineSubclass(Iterator, RandomIterator, { shuffle: shuffle });

/**
 *  RandomIterator
 *
 *  @param {Object} items...
 *  @returns {RandomIterator}
 */
function RandomIterator() {
    Iterator.apply(this, arguments);
    this.shuffle();
}

/**
 *  shuffle
 */
function shuffle() {
    var length = this.items.length;

    // shuffle
    for (var i = 0; i < this.items.length; i++) {
        var index = Math.floor(Math.random() * length);
        var temp = this.items[i];

        this.items[i] = this.items[index];
        this.items[index] = temp;
    }
};

module.exports = RandomIterator;
