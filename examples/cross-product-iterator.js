#!/usr/bin/env node

var Iterator = require('kld-array-iterators').Iterator,
    SubsetIterator = require('kld-array-iterators').SubsetIterator,
    PermutationIterator = require('kld-array-iterators').PermutationIterator,
    RandomIterator = require('kld-array-iterators').RandomIterator,
    ReverseIterator = require('kld-array-iterators').ReverseIterator,
    CrossProductIterator = require('kld-array-iterators').CrossProductIterator,
    flatten = require('./flatten.js');

var count = 0;
var iter = new CrossProductIterator(
    new Iterator(1, 2),
    new SubsetIterator('a', 'b',' c'),
    new PermutationIterator('X',' Y', 'Z'),
    new RandomIterator(4, 5, 6),
    new ReverseIterator('d', 'e')
);

while (iter.hasNext()) {
    var value = iter.next();
    var flattened = flatten(value).join("");

    console.log("%d: %s", ++count, flattened);
}
