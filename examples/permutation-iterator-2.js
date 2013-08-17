#!/usr/bin/env node

var Iterator = require('kld-array-iterators').Iterator,
    PermutationIterator = require('kld-array-iterators').PermutationIterator;

new PermutationIterator(
    new Iterator('a', 'b'),
    'c',
    new Iterator('d', 'e')
).forEach(function(value) {
    console.log(value);
});
