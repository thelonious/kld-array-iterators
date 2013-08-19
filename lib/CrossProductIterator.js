/**
 *
 *  CrossProductIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var defineSubclass = require('kld-class-utils').defineSubclass,
    Iterator = require('./Iterator');

defineSubclass(Iterator, CrossProductIterator);

/**
 *  CrossProductIterator
 *
 *  @param {Iterator} iterators...
 *  @returns {CrossProductIterator}
 */
function CrossProductIterator() {
    Iterator.apply(this, arguments);
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
CrossProductIterator.prototype.hasNext = function() {
    var result = false;

    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];

        if (Iterator.isIterator(item)) {
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
CrossProductIterator.prototype.next = function() {
    if (this.hasNext()) {
        var length = this.items.length;

        if (this.index == 0) {
            for (var i = 0; i < length; i++) {
                var item = this.items[i];

                this.values[i] = (Iterator.isIterator(item)) ? item.next() : item;
            }

            this.index++;
        }
        else {
            for (var i = length - 1; i >= 0; i--) {
                var item = this.items[i];

                if (Iterator.isIterator(item)) {
                    var value = item.next();

                    if (value === null) {
                        item.reset();
                        this.values[i] = item.next();
                    }
                    else {
                        this.values[i] = value;
                        break;
                    }
                }
                else {
                    this.values[i] = item;
                }
            }
        }

        return this.values;
    }
    else {
        return null;
    }
};

/**
 *  reset
 */
CrossProductIterator.prototype.reset = function() {
    Iterator.prototype.reset.apply(this, arguments);
    this.values = new Array(this.items.length);
};

module.exports = CrossProductIterator;
