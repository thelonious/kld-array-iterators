#!/usr/bin/env node

var RangeIterator = require('kld-array-iterators').RangeIterator;

var iter = new RangeIterator(5, 15);

iter.forEach(function(item) {
    console.log(item);
});