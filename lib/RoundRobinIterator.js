/**
 *
 *  RoundRobinIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var isIterator = require('./utils').isIterator,
    defineSubclass = require('./utils').defineSubclass,
    Iterator = require('./Iterator');

defineSubclass(Iterator, RoundRobinIterator);

/**
 *  RoundRobinIterator
 *
 *  @param {Iterator} iterators...
 *  @returns {RoundRobinIterator}
 */
function RoundRobinIterator() {
    Iterator.apply(this, arguments);
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
RoundRobinIterator.prototype.hasNext = function() {
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
            if (this.pass == 0) {
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
 *  @returns {Object | null}
 */
RoundRobinIterator.prototype.next = function() {
    if (this.hasNext()) {
        var item = this.items[this.index++];
        var result = (isIterator(item)) ? item.next() : item;

        if (this.index == this.items.length) {
            this.index = 0;
            this.pass++;
        }

        return result;
    }
    else {
        return null;
    }
};

RoundRobinIterator.prototype.reset = function() {
    Iterator.prototype.reset.apply(this, arguments);
    this.pass = 0;
}

module.exports = RoundRobinIterator;
