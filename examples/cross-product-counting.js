#!/usr/bin/env node

var Iterator = require('kld-array-iterators').Iterator,
    RangeIterator = require('kld-array-iterators').RangeIterator,
    CrossProductIterator = require('kld-array-iterators').CrossProductIterator;

new CrossProductIterator(
    new Iterator('', 1, 2),
    new RangeIterator(0, 10)
).forEach(function(value) {
    console.log("%s", value.join(""));
});
