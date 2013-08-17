#!/usr/bin/env node

var Iterator = require('kld-array-iterators').Iterator,
    SubsetIterator = require('kld-array-iterators').SubsetIterator;

new SubsetIterator(
    new Iterator('a', 'b'),
    'c',
    new Iterator('d', 'e')
).forEach(function(value) {
    console.log(value);
});
