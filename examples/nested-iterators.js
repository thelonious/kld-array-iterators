#!/usr/bin/env node

var Iterator = require('kld-array-iterators').Iterator;

new Iterator(
    new Iterator(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
    new Iterator('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i')
).forEach(function(value) {
    console.log(value);
});
