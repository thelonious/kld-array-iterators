/**
 *
 *  SequenceIterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

/**
 *  SequenceIterator
 *
 *  @param {Iterator} iterators...
 *  @returns {SequenceIterator}
 */
function SequenceIterator() {
    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;
    this.reset();
}

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
SequenceIterator.prototype.hasNext = function() {
    var result = false;

    for (var i = this.index; i < this.items.length; i++) {
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
 *  @returns {Object | null}
 */
SequenceIterator.prototype.next = function() {
    if (this.hasNext()) {
        var result;

        for (; this.index < this.items.length; this.index++) {
            var item = this.items[this.index];

            if (item.hasNext()) {
                result = item.next();
                break;
            }
        }

        return result;
    }
    else {
        return null;
    }
};

/**
 *  reset
 */
SequenceIterator.prototype.reset = function() {
    this.items.forEach(function(item) {
        item.reset();
    });
    this.index = 0;
};

module.exports = SequenceIterator;
