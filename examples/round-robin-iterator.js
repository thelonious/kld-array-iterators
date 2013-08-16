#!/usr/bin/env node

var RoundRobinIterator = require('kld-array-iterators').RoundRobinIterator,
    Iterator = require('kld-array-iterators').Iterator;

var iter = new RoundRobinIterator(
    new Iterator(1, 2, 3),
    new Iterator('a', 'b', 'c'),
    new Iterator('!', '?', '.')
);

iter.forEach(function(item) {
    console.log(item);
});
