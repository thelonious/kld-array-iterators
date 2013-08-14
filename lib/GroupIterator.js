/**
 *
 *  GroupIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

/**
 *  GroupIterator
 *
 *  @param {Iterator} iterators...
 *  @returns {GroupIterator}
 */
function GroupIterator() {
    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;
    this.reset();
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
GroupIterator.prototype.hasNext = function() {
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
GroupIterator.prototype.next = function() {
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
GroupIterator.prototype.reset = function() {
    this.items.forEach(function(item) {
        item.reset();
    });
    this.values = null;
}

module.exports = GroupIterator;
