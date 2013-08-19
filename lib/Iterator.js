/**
 *
 *  Iterator.js
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

var classUtils = require('kld-class-utils');

/**
 *  isIterator
 *
 *  @param {Object} item
 *  @returns {Boolean}
 */
Iterator.isIterator = function(item) {
    return classUtils.conformsToInterface(item, ["hasNext", "next", "reset"]);
};

/**
 *  Iterator
 *
 *  @param {Object} items...
 *  @returns {Iterator}
 */
function Iterator() {
    var items = Array.prototype.slice.call(arguments, 0);

    this.items = (items.length == 1 && Array.isArray(items[0])) ? items[0] : items;
    this.reset();
}

/**
 *  fork
 *
 *  @returns {Iterator}
 */
Iterator.prototype.fork = function() {
    var fork = new this.constructor();

    fork.index = this.index;
    fork.items = [];

    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];

        if (Iterator.isIterator(item)) {
            fork.items.push(item.fork());
        }
        else {
            fork.items.push(item);
        }
    }

    return fork;
};

/**
 *  hasNext
 *
 *  @returns {Boolean}
 */
Iterator.prototype.hasNext = function() {
    var result = false;

    if (this.index < this.items.length) {
        var item = this.items[this.index];

        if (Iterator.isIterator(item)) {
            result = item.hasNext();
        }
        else {
            result = true;
        }
    }

    return result;
};

/**
 *  next
 *
 *  @returns {Object | null}
 */
Iterator.prototype.next = function() {
    if (this.hasNext()) {
        var item = this.items[this.index];
        var result;

        if (Iterator.isIterator(item)) {
            result = item.next();

            if (item.hasNext() === false) {
                this.index++;
            }
        }
        else {
            result = item;
            this.index++;
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
Iterator.prototype.reset = function() {
    this.items.forEach(function(item) {
        if (Iterator.isIterator(item)) {
            item.reset();
        }
    });
    this.index = 0;
};

// array-like routines

/**
 *  forEach
 *
 *  @param {Method(Object, Integer, Iterator) | Function(Object, Integer, Iterator)} callback
 *  @param {Object} scope
 */
Iterator.prototype.forEach = function(callback, scope) {
    var index = 0;

    while (this.hasNext()) {
        callback.call(scope, this.next(), index++, this);
    }
};

/**
 *  every
 *
 *  @param {Method(Object, Integer, Iterator)->Boolean | Function(Object, Integer, Iterator)->Boolean} callback
 *  @param {Object} scope
 *  @returns {Boolean}
 */
Iterator.prototype.every = function(callback, scope) {
    var index = 0;
    var result = true;

    while (this.hasNext()) {
        if (callback.call(scope, this.next(), index++, this) === false) {
            result = false;
            break;
        }
    }

    return result;
};

/**
 *  some
 *
 *  @param {Method(Object, Integer, Iterator)->Boolean | Function(Object, Integer, Iterator)->Boolean} callback
 *  @param {Object} scope
 *  @returns {Boolean}
 */
Iterator.prototype.some = function(callback, scope) {
    var index = 0;
    var result = false;

    while (this.hasNext()) {
        if (callback.call(scope, this.next(), index++, this)) {
            result = true;
            break;
        }
    }

    return result;
};

/**
 *  filter
 *
 *  @param {Method(Object, Integer, Iterator)->Boolean | Function(Object, Integer, Iterator)->Boolean} callback
 *  @param {Object} scope
 *  @returns {Array}
 */
Iterator.prototype.filter = function(callback, scope) {
    var index = 0;
    var result = [];

    while (this.hasNext()) {
        var value = this.next();

        if (callback.call(scope, value, index++, this)) {
            result.push(value);
        }
    }

    return result;
};

/**
 *  map
 *
 *  @param {Method(Object, Integer, Iterator)->Object | Function(Object, Integer, Iterator)->Object} callback
 *  @param {Object} scope
 *  @returns {Array}
 */
Iterator.prototype.map = function(callback, scope) {
    var index = 0;
    var result = [];

    while (this.hasNext()) {
        result.push(callback.call(scope, this.next(), index++, this));
    }

    return result;
};

/**
 *  reduce
 *
 *  @param {Method(Object, Integer, Iterator)->Object | Function(Object, Integer, Iterator)->Object} callback
 *  @param {Object} scope
 *  @returns {Array}
 */
Iterator.prototype.reduce = function(callback, value) {
    var index = 0;

    while (this.hasNext()) {
        if (value === undefined && index == 0) {
            value = this.next();
        }
        else {
            value = callback(value, this.next(), index, this);
        }

        index++;
    }

    return value;
};

// TODO: Hmmm, is reduceRight possible? Collect all values, then
// Array.reduceRight? Doesn't seem like a good idea.

// other miscellaneous convenience functions

/**
 *  skip
 *
 *  @param {Number} count
 @  @returns {Iterator}
 */
Iterator.prototype.skip = function(count) {
    while (count > 0 && this.hasNext()) {
        this.next();
        count--;
    }

    return this;
};

/**
 *  take
 *
 *  @param {Number} count
 *  @returns {Array}
 */
Iterator.prototype.take = function(count) {
    var result = [];

    while (count > 0 && this.hasNext()) {
        result.push(this.next());
        count--;
    }

    return result;
};

/**
 *  takeAll
 *
 *  @returns {Array}
 */
Iterator.prototype.takeAll = function() {
    var result = [];

    while (this.hasNext()) {
        result.push(this.next());
    }

    return result;
};

module.exports = Iterator;
