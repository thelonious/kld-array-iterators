#!/usr/bin/env node

var SubsetIterator = require('kld-array-iterators').SubsetIterator;

new SubsetIterator(1, 2, 3, 4).forEach(function(value) {
    console.log(value);
});
