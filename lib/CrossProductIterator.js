/**
 *
 *  CrossProductIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

/**
 *  CrossProductIterator
 *
 *  @param {Iterator} iterators...
 *  @returns {CrossProductIterator}
 */
function CrossProductIterator() {
    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;
    this.reset();
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

        if (item.hasNext()) {
            result = true;
            break;
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

        if (this.values === null) {
            this.values = new Array(length);

            for (var i = 0; i < length; i++) {
                this.values[i] = this.items[i].next();
            }
        }
        else {
            for (var i = 0; i < length; i++) {
                var item = this.items[i];
                var value = item.next();

                if (value === null) {
                    // reset
                    item.reset();

                    // grab first value
                    value = item.next();

                    this.values[i] = value;

                    // continue to process 'carry'
                }
                else {
                    this.values[i] = value;
                    break;
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
    this.items.forEach(function(item) {
        item.reset();
    });
    this.values = null;
}

module.exports = CrossProductIterator;
