#!/usr/bin/env node

var RangeIterator = require('kld-array-iterators').RangeIterator,
    RepeatIterator = require('kld-array-iterators').RepeatIterator;

var iter = new RepeatIterator(
    new RangeIterator(0, 10),
    1,
    3
);

iter.forEach(function(item) {
    console.log(item.join(""));
});
