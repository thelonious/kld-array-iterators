#!/usr/bin/env node

var ArrayIterator = require('kld-array-iterators').ArrayIterator,
    CombinationIterator = require('kld-array-iterators').CombinationIterator,
    PermutationIterator = require('kld-array-iterators').PermutationIterator,
    RandomIterator = require('kld-array-iterators').RandomIterator,
    ReverseIterator = require('kld-array-iterators').ReverseIterator,
    GroupIterator = require('kld-array-iterators').GroupIterator,
    flatten = require('./flatten.js');

var count = 0;
var iter = new GroupIterator(
    new ArrayIterator(1, 2),
    new CombinationIterator('a','b', 'c'),
    new PermutationIterator('X', 'Y','Z'),
    new RandomIterator(4, 5, 6),
    new ReverseIterator('d','e')
);

while (iter.hasNext()) {
    var value = iter.next();
    var flattened = flatten(value).join("");

    console.log("%d: %s", ++count, flattened);
}
