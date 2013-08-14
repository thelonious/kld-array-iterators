#!/usr/bin/env node

var ArrayIterator = require('kld-array-iterators').ArrayIterator,
    CombinationIterator = require('kld-array-iterators').CombinationIterator,
    PermutationIterator = require('kld-array-iterators').PermutationIterator,
    RandomIterator = require('kld-array-iterators').RandomIterator,
    ReverseIterator = require('kld-array-iterators').ReverseIterator,
    GroupIterator = require('kld-array-iterators').GroupIterator,
    flatten = require('./flatten.js');

var iter1 = new ArrayIterator(1, 2);
var iter2 = new CombinationIterator('a','b', 'c');
var iter3 = new PermutationIterator('X', 'Y','Z');
var iter4 = new RandomIterator(4, 5, 6);
var iter5 = new ReverseIterator('d','e');

var iter = new GroupIterator(iter1, iter2, iter3, iter4, iter5);
var count = 0;

while (iter.hasNext()) {
    var value = iter.next();
    var flattened = flatten(value).join("");
    count++;

    console.log("%d: %s", count, flattened);
}
