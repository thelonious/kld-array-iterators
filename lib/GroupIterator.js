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
    this.iters = Array.prototype.slice.call(arguments, 0);
    this.reset();
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
GroupIterator.prototype.hasNext = function() {
    var result = false;

    for (var i = 0; i < this.iters.length; i++) {
        var iter = this.iters[i];

        if (iter.hasNext()) {
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
        var length = this.iters.length;

        if (this.values === null) {
            this.values = new Array(length);

            for (var i = 0; i < length; i++) {
                this.values[i] = this.iters[i].next();
            }
        }
        else {
            for (var i = 0; i < length; i++) {
                var iter = this.iters[i];
                var value = iter.next();

                if (value === null) {
                    // reset
                    iter.reset();

                    // grab first value
                    value = iter.next();

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
    this.iters.forEach(function(iter) {
        iter.reset();
    });
    this.values = null;
}

module.exports = GroupIterator;
