#!/usr/bin/env node

var TransformIterator = require('kld-array-iterators').TransformIterator;

var randomIterator = {
    low: 10,
    high: 100,
    hasNext: function() { return true; },
    next: function() {
        var diff = this.high - this.low;

        return Math.round(Math.random() * diff) + this.low;
    },
    reset: function() { }
};

var numbers = new TransformIterator(randomIterator).take(20);

console.log(numbers.join("\n"));
