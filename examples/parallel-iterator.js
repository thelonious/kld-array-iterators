#!/usr/bin/env node

var ParallelIterator = require('kld-array-iterators').ParallelIterator,
    Iterator = require('kld-array-iterators').Iterator;

var iter = new ParallelIterator(
    new Iterator(1, 2, 3),
    new Iterator('a', 'b', 'c'),
    new Iterator('!', '?', '.')
);

iter.forEach(function(item) {
    console.log(item);
});
